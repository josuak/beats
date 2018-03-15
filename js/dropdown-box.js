/*global $*/
$(function() {
  $(".question").click(function(event) {
    var item = $(event.target),
        arrow = item.children(".arrow");
    
    item.next().slideToggle();
    if (!arrow.is(".up")) {
      arrow.addClass("up");
    } else {
      arrow.removeClass("up");
    }
  });
});