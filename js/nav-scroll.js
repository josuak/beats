/*jslint browser: true*/
/*global $*/

$(function () {
  "use strict";
  
  //make var for ul and li elements in the nav
  var $navLi = $("nav ul li"),
      $navUl = $("nav ul");
  
  $navLi.on("click", function() {
    var $this = $(this),
        //get the positionLeft from the clicked item. Also taking the overflowing distance into account by adding the scrollLeft position. Otherwise the positionLeft would change depending on the scroll position. P.S. kinda hard to explain in words
        $thisPositionLeft = $this.position().left + $navUl.scrollLeft(),
        $thisWidth = $this.width(),
        windowWidth = $( window ).width();
    
    //Determine newScrollPosition 
    var newScrollPosition = $thisPositionLeft + ($thisWidth / 2) - (windowWidth / 2);
    
    //Make a smooth transition to the newScrollPosition
    $navUl.animate({
      scrollLeft: newScrollPosition
    }, 500),
    
    $("#helper").text($thisWidth);
    
    
  });
  
});