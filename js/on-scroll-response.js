/*global $ document window $navLi*/

//create eventlistener to fire when user scrolls the page
$(document).on("scroll", function() {
  var $this = $(this),
      scrollTop = $this.scrollTop(),
      windowHeight = $(window).innerHeight(),
      documentHeight = $this.height();
  
  $("#helper").text(scrollTop);
  
  //Check if scrollTop is larger then the distance to the top from each section minus half the window size. Starting from highest distance section to lowest distance section to the top of the document.
  if (scrollTop > ( $("#contact").offset().top - windowHeight / 2 ) || scrollTop > ( documentHeight - 100 )) {
    //Check if the section we're on is already "active" to only trigger the "newActive" event when the section actually changes.
    if (!$navLi.eq(5).is(".active")) {
      $navLi.removeClass("active");
      $navLi.eq(5).addClass("active").trigger("newActive");
    }
  } else if (scrollTop > ( $("#social").offset().top - windowHeight / 2 )) {
    if (!$navLi.eq(4).is(".active")) {
      $navLi.removeClass("active");
      $navLi.eq(4).addClass("active").trigger("newActive");
    }
  } else if (scrollTop > ( $("#about").offset().top - windowHeight / 2 )) {
    if (!$navLi.eq(3).is(".active")) {
      $navLi.removeClass("active");
      $navLi.eq(3).addClass("active").trigger("newActive");
    }
  } else if (scrollTop > ( $("#QnA").offset().top - windowHeight / 2 )) {
    if (!$navLi.eq(2).is(".active")) {
      $navLi.removeClass("active");
      $navLi.eq(2).addClass("active").trigger("newActive");
    }
  } else if (scrollTop > ( $("#licenses").offset().top - windowHeight / 2 ) && scrollTop > 50) {
    if (!$navLi.eq(1).is(".active")) {
      $navLi.removeClass("active");
      $navLi.eq(1).addClass("active").trigger("newActive");
    }
  } else {
    if (!$navLi.eq(0).is(".active")) {
      $navLi.removeClass("active");
      $navLi.eq(0).addClass("active").trigger("newActive");
    }
  }
});