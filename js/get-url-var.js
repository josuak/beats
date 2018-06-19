/* eslint-env browser */
/* global $ */
$(function() {
  if (window.location.search.includes('bsta.rs')) {
    let $newUrl = 'http://' + window.location.search.substr(1);
    $('iframe').attr('src', $newUrl);
  }
});
