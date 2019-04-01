/* eslint-env browser */
/* global clickScroll */
if (window.location.search.includes('trackId')) {
  let newUrl = 'https://player.beatstars.com/?storeId=28517&' + window.location.search.substr(1);
  document.getElementById('beatstore').setAttribute('src', newUrl);
  window.onload = clickScroll(0);
}
