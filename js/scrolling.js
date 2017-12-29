/*global $ document window $navLi $sections setTimeout*/

var preventScrollEvent = false;

//create eventlistener to fire when user scrolls the page
$(document).on("scroll", function() {
  var $this = $(this),
      scrollTop = $this.scrollTop(),
      windowHeight = $(window).innerHeight(),
      documentHeight = $this.height();

  //Check if scroll is induced by a click on the nav 
  if (preventScrollEvent === true) {
    setTimeout(function() {
      preventScrollEvent = false;
    }, 350);
    
  } else {
    
    //Check if scrollTop is larger then the distance to the top from each section minus half the window size. Starting from highest distance section to lowest distance section to the top of the document.
    if (scrollTop > ( $("#contact").offset().top - windowHeight / 2 ) || scrollTop > ( documentHeight - 100 )) {
      //Check if the section we're on is already "active" to only trigger the "newActive" event when the section actually changes.
      if (!$navLi.eq(5).is(".active")) {
        $navLi.eq(5).trigger("newActive");
      }
    } else if (scrollTop > ( $("#social").offset().top - windowHeight / 2 )) {
      if (!$navLi.eq(4).is(".active")) {
        $navLi.eq(4).trigger("newActive");
      }
    } else if (scrollTop > ( $("#about").offset().top - windowHeight / 2 )) {
      if (!$navLi.eq(3).is(".active")) {
        $navLi.eq(3).trigger("newActive");
      }
    } else if (scrollTop > ( $("#QnA").offset().top - windowHeight / 2 )) {
      if (!$navLi.eq(2).is(".active")) {
        $navLi.eq(2).trigger("newActive");
      }
    } else if (scrollTop > ( $("#licenses").offset().top - windowHeight / 2 ) && scrollTop > 50) {
      if (!$navLi.eq(1).is(".active")) {
        $navLi.eq(1).trigger("newActive");
      }
    } else {
      if (!$navLi.eq(0).is(".active")) {
        $navLi.removeClass("active");
        $navLi.eq(0).trigger("newActive");
      }
    }
  }
});


$navLi.each(function (index) {
  //click event for each navItem
  $(this).on("click", function () {
    //animation for scrolling to different sections
    $("html, body").animate({
      //using index to determine target section
      scrollTop: $sections.eq(index).offset().top - (50)
    }, 500);
    preventScrollEvent = true;
  });
});