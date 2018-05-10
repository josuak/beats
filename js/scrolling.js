/* global $ document window $navLi $sections setTimeout */
var preventScrollEvent = false;

function checkSection() {
	var $document = $(document),
			scrollTop = $document.scrollTop(),
      windowHeight = $(window).innerHeight(),
      documentHeight = $document.height(),
			pauseTime = 250;

	//Check if scrollTop is larger then the distance to the top from each section minus half the window size. Starting from highest distance section to lowest distance section to the top of the document.
	if (scrollTop > ( $("#contact").offset().top - windowHeight / 2 ) || scrollTop > ( documentHeight - 100 )) {

		//Check if the section we're on is already "active" to only trigger the "newActive" event when the section actually changes.
		if (!$navLi.eq(5).is(".active")) {
			$navLi.eq(5).trigger("newActive");
			//Run pause function and after time has passed run this function 
			pause(pauseTime, true);
		}

	} else if (scrollTop > ( $("#social").offset().top - windowHeight / 2 )) {
		if (!$navLi.eq(4).is(".active")) {
			$navLi.eq(4).trigger("newActive");
			pause(pauseTime, true);
		}

	} else if (scrollTop > ( $("#mission").offset().top - windowHeight / 2 )) {
		if (!$navLi.eq(3).is(".active")) {
			$navLi.eq(3).trigger("newActive");
			pause(pauseTime, true);
		}

	} else if (scrollTop > ( $("#QnA").offset().top - windowHeight / 2 )) {
		if (!$navLi.eq(2).is(".active")) {
			$navLi.eq(2).trigger("newActive");
			pause(pauseTime, true);
		}

	} else if (scrollTop > ( $("#licensing").offset().top - windowHeight / 2 ) && scrollTop > 50) {
		if (!$navLi.eq(1).is(".active")) {
			$navLi.eq(1).trigger("newActive");
			pause(pauseTime, true);
		}

	} else {
		if (!$navLi.eq(0).is(".active")) {
			$navLi.removeClass("active");
			$navLi.eq(0).trigger("newActive");
			pause(pauseTime, true);
		}
	}
}

//function "pause" to set preventScrollEvent to true and after a certain period of time to false again
function pause(time, check) {
	//while the preventScrollEvent var is == true, no other animation should be induced by the on.scroll event. So there're no hickups
	preventScrollEvent = true;
	setTimeout(function() {
		preventScrollEvent = false;
		if (check === true) {
			checkSection();
		}
	}, time);
};

function scrolling() {
	
  //Check if scroll is induced by a click on the nav if so -> //prevent on.scroll reaction for the scrolling that happens because of the animation.
  if (preventScrollEvent === true) {
		
    //nothing happens
		
  } else {
		
		checkSection();
		
	}
};

//create eventlistener to fire when user scrolls the page
$(document).on("scroll", scrolling);

$navLi.each(function (index) {
  //click event for each navItem
  $(this).on("click", function() {
		pause(600, false);
    //animation for scrolling to different sections
    $("html, body").animate({
      //using index to determine target section
      scrollTop: $sections.eq(index).offset().top - (50)
    }, 500);
    $(this).trigger("newActive");
  });
});