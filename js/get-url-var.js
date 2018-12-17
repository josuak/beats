/* eslint-env browser */
/* global $, clickScroll */
if (window.location.search.includes('bsta.rs')) {
  let $newUrl = 'http://' + window.location.search.substr(1);
  $('iframe').attr('src', $newUrl);
  $(window).on('load', clickScroll(0));
}
