/*global $, $sections, $navLi */
/*jslint plusplus: true */

$(function () {
	"use strict";
	
	$(document).on("scroll", function () {

		//get vertical scroll position
		var scrollPos = $(this).scrollTop(),
			windowHeight = $(window).height(),
			navItemsLength = $navLi.length,
			documentHeight = $(document).height(),
			sectionOffset = [];
		
		//Check if we are scrolled all the way to the bottom of the page
		if (scrollPos + windowHeight > documentHeight - 50) {
			
            $navLi.not(":eq(" + navItemsLength - 1 + ")").removeClass("active").addClass("unactive");
          
            if ($navLi.eq(navItemsLength - 1).is(".unactive")) {
                $navLi.eq(navItemsLength - 1).removeClass("unactive").addClass("active");
                $navLi.not(":eq(" + navItemsLength - 1 + ")").addClass("unactive");
            }
			
			

		//Check if we are scrolled all the way to the top of the page
		} else if (scrollPos < 50) {
			
            $navLi.not(":eq(0)").removeClass("active");
          
			if ($navLi.eq(0).is(".unactive")) {
                $navLi.eq(0).removeClass("unactive").addClass("active");
                $navLi.not(":eq(0)").addClass("unactive")
            }
			
		//If we are not scrolled to the top or bottom look for the section we are in
		} else {
			
			(function () {
				var i;
				//loop through every element in $sections selection and save offset().top in array
				for (i = 0; i < $sections.length; i++) {
					sectionOffset[i] = $sections.eq(i).offset().top;
				}
			}());
			
			(function () {
				var i;
				for (i = $sections.length; i > 0; i--) {

					if ((scrollPos + 0.5 * windowHeight) > sectionOffset[i]) {
                      
                        $navLi.not(":eq(" + i + ")").removeClass("active");
                      
						if ($navLi.eq(i).is(".unactive")) {
                            $navLi.eq(i).removeClass("unactive").addClass("active");
                            $navLi.not(":eq(" + i + ")").addClass("unactive");
                        }
						break;

					} else {

                        $navLi.not(":eq(0)").removeClass("active");
                      
						if ($navLi.eq(0).is(".unactive")) {
                            $navLi.eq(0).removeClass("unactive").addClass("active");
                            $navLi.not(":eq(0)").addClass("unactive");
                        }
					}
				}
			}());
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

		});
	});
});


