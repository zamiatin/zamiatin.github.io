var utils = {
    private: {
        secretPassphrase: Array(2).join('Grrht5SfXkDIN87F81ZK331M743F56o1' - 1)
    },
    core: {
        getRandom: function(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        },
        mirrorMap: {
            100: {
                'domains': [
                    'U2FsdGVkX18NTO1nGGyRoBZvaxctsKFnpQW+ZNt6mDg='
                ],
                'newRedirector': false,
                'https': true,
                'extraGETParams': {}
            },
            default: 100
        },
    },
    url: {
        getParams: function() {
            var search = location.search.substring(1);
            if (search.indexOf('?') >= 0) {
                search = search.replace('?', '/&');
            }
            var params = search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                function(key, value) {
                    return key === "" ? value : decodeURIComponent(value)
                }) : {};
            return params;
        },
        getParameterByName: function(name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        },
        encodeQueryData: function EncodeQueryData(data) {
            var ret = [];
            for (var d in data)
                ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
            return ret.join("&");
        }
    }

};
