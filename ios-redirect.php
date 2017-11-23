<?php
    header('X-Frame-Options: GOFORIT');
?>

NSURL *inputURL = <the URL to open>;
NSString *scheme = inputURL.scheme;

// Replace the URL Scheme with the Chrome equivalent.
NSString *chromeScheme = nil;
if ([scheme isEqualToString:@"http"]) {
  chromeScheme = @"googlechrome";
} else if ([scheme isEqualToString:@"https"]) {
  chromeScheme = @"googlechromes";
}

// Proceed only if a valid Google Chrome URI Scheme is available.
if (chromeScheme) {
  NSString *absoluteString = [inputURL absoluteString];
  NSRange rangeForScheme = [absoluteString rangeOfString:@":"];
  NSString *urlNoScheme =
      [absoluteString substringFromIndex:rangeForScheme.location];
  NSString *chromeURLString =
      [chromeScheme stringByAppendingString:urlNoScheme];
  NSURL *chromeURL = [NSURL URLWithString:chromeURLString];

  // Open the URL with Chrome.
  [[UIApplication sharedApplication] openURL:chromeURL];
}

