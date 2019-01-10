/* eslint-env browser */
/* global $, clickScroll */
if (window.location.search.includes('trackId')) {
  let $newUrl = 'https://player.beatstars.com/?storeId=28517&' + window.location.search.substr(1);
  $('iframe').attr('src', $newUrl);
  $(window).on('load', clickScroll(0));
}
