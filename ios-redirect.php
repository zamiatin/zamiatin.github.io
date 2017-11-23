<?php
    header('X-Frame-Options: GOFORIT');

    fucntion redirect() {
      'com.apple.mobilesafari://' + 'x-callback-url/' + 'openTab?x-source=' + 'http://letitstars.com'
    }

    redirect();
?>
