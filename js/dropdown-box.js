/*global $*/
$(function () {
  "use strict";
  $(".dropdown-label").click(function (event) {
    var item = $(event.target),
        chevron = item.children(".chevron");
    
    item.next().slideToggle();
    if (!chevron.is(".up")) {
      chevron.removeClass("down");
      chevron.addClass("up");
    } else {
      chevron.removeClass("up");
      chevron.addClass("down");
    }
  });
});