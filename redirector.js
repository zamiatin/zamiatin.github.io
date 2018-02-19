var data = utils.url.getParams();

var projectName = data.s;
var refCode = data.ref;
var click_id = data.click_id;
var sub = data.sub;
var landing = data.landing;

delete data.s;
delete data.ref;
delete data.click_id;
delete data.sub;
delete data.landing;

var mirrors = utils.core.mirrorMap[projectName] || utils.core.mirrorMap[utils.core.mirrorMap.default];
var cryptMirror = utils.core.getRandom(mirrors.domains);
var mirror = CryptoJS.AES.decrypt(cryptMirror, utils.private.secretPassphrase).toString(CryptoJS.enc.Utf8);
var host = (mirrors.https ? 'https' : 'http') + '://' + mirror + '/';
for (var attrname in mirrors.extraGETParams) {
    data[attrname] = mirrors.extraGETParams[attrname];
};

var promo_data = {};
if (click_id) {
    promo_data.click_id = click_id;
};
if (sub) {
    promo_data.sub = sub;
};
if (landing) {
    promo_data.landing = landing;
};
if (click_id || sub || landing) {
    data.promo = btoa(JSON.stringify(promo_data));
} else {
    data.promo = 'redirector';
};
if (refCode) {
    data.partner = refCode;
};

function desktopRedirect() {
        var hash = '';
        var path = '';
        if (data.url) {
            if (data.url.indexOf('#') === 0) {
                hash = data.url;
            } else if (data.url.indexOf('/') === 0) {
                path = data.url.slice(1);
            } else {
                path = data.url;
            }
            delete data.url;
        }

        urlPath = path + '?' + utils.url.encodeQueryData(data) + hash
        if (mirrors.newRedirector){
          redirectUrl = host + 'redirect?uri=' + encodeURIComponent('/' + urlPath);
        } else {
          redirectUrl = host + urlPath;
        };

    window.location.replace(redirectUrl);
}

// redirect Insta browser
if (/instagram/i.test(navigator.userAgent)) {
    (function() {
        var instaRedirect = {
            userAgent: navigator.userAgent,

            isInstaBrowser: function() {
                return /instagram/i.test(this.userAgent)
            },

            isAndroid: function() {
                return /android/i.test(this.userAgent);
            },

            isIOS: function() {
                return /iphone|ipad|ipod/i.test(this.userAgent);
            },

            createFrame: function() {
                var f = document.createElement('iframe');
                f.src = 'https://google.com';
                f.style.display = 'none';

                return document.body.appendChild(f);
            },

            deleteFrame: function(f) {
                document.body.removeChild(f);
            },

            setLocation: function(url) {
                var frame = instaRedirect.createFrame();

                frame.onload = function() {
                    frame.contentWindow.parent.location = url;
                    instaRedirect.deleteFrame(frame);
                };
            },

            getLinkForAndroid: function(clearUrl, protocol, targetLink) {
                    return 'intent://' + clearUrl + '#Intent' +
                            ';scheme=' + protocol + ';S.browser_fallback_url='
                            + encodeURIComponent(targetLink) + ';end'
            },

            openInBrowser: function(targetLink) {
                var url = new URL(targetLink),
                protocol = url.protocol.replace(':', ''),
                clearUrl = url.hostname + url.pathname + url.search;

                if (this.isAndroid()) {
                    var openInDefaultBrowser = this.getLinkForAndroid(clearUrl, protocol, targetLink);

                    instaRedirect.setLocation(openInDefaultBrowser);

                } else if (this.isIOS()) {
                    instaRedirect.setLocation('googlechrome://' + clearUrl);
                    // desktopRedirect();
                } else {
                    instaRedirect.setLocation(protocol + '://' + clearUrl);
                }
            }
        };

        instaRedirect.openInBrowser(location.href);
    })();

} else {
    desktopRedirect();
}
