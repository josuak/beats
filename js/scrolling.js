/* global $ */
/* eslint-disable */
$(function () {
	
	'use strict';
	
	var $navLi = $('nav ul li'),
    $navUl = $('nav ul'),
    $indicator = $('#pos-indicator'),
    $sections = $('section'),
		preventScrollEvent = false,
		timerID;

	function checkSection() {
		var $document = $(document),
			scrollTop = $document.scrollTop(),
			windowHeight = $(window).innerHeight(),
			documentHeight = $document.height();
			//pauseTime = 100;

		//Check if scrollTop is larger then the distance to the top from each section minus half the window size. Starting from highest distance section to lowest distance section to the top of the document.
		if (scrollTop > ($('#contact').offset().top - windowHeight / 2) || scrollTop > (documentHeight - 100)) {

			//Check if the section we're on is already 'active' to only trigger the 'newActive' event when the section actually changes.
			if (!$navLi.eq(5).is('.active')) {
				$navLi.eq(5).trigger('newActive');
				//Run pause function and after time has passed run this function 
				//pause(pauseTime, true);
			}

		} else if (scrollTop > ($('#social').offset().top - windowHeight / 2)) {
			if (!$navLi.eq(4).is('.active')) {
				$navLi.eq(4).trigger('newActive');
			}

		} else if (scrollTop > ($('#mission').offset().top - windowHeight / 2)) {
			if (!$navLi.eq(3).is('.active')) {
				$navLi.eq(3).trigger('newActive');
			}

		} else if (scrollTop > ($('#QnA').offset().top - windowHeight / 2)) {
			if (!$navLi.eq(2).is('.active')) {
				$navLi.eq(2).trigger('newActive');
			}

		} else if (scrollTop > ($('#licensing').offset().top - windowHeight / 2) && scrollTop > 50) {
			if (!$navLi.eq(1).is('.active')) {
				$navLi.eq(1).trigger('newActive');
			}

		} else {
			if (!$navLi.eq(0).is('.active')) {
				$navLi.removeClass('active');
				$navLi.eq(0).trigger('newActive');
			}
		}
	}

	//function 'pause' to set preventScrollEvent to true and after a certain period of time to false again
	function pause(time, check) {
		//while the preventScrollEvent var is == true, no other animation should be induced by the on.scroll event. So there're no hickups
		clearTimeout(timerID);
		preventScrollEvent = true;
		timerID = setTimeout(function () {
			preventScrollEvent = false;
			if (check === true) {
				checkSection();
			}
		}, time);
	}

	function scrolling() {
		//Check if scroll is induced by a click on the nav if so -> //prevent on.scroll reaction for the scrolling that happens because of the animation.
		if (preventScrollEvent === false) {
			checkSection();
		}
	}
	
	$navLi.each(function (index) {
		//click event for each navItem
		$(this).on('click', function () {
			pause(550, false);
			//animation for scrolling to different sections
			$('html, body').stop(true, false).animate({
				//using index to determine target section
				scrollTop: $sections.eq(index).offset().top - (50)
			}, 500);
			$(this).trigger('newActive');
		});
	});

	function mobileNavResponse() {
		var $this = $(this);

		//removeClass active from all Nav elements and add class active to the clicked element
		$navLi.removeClass('active');
		$this.addClass('active');

		//get the positionLeft from the clicked item. Also taking the overflowing distance into account by adding the scrollLeft position. Otherwise the positionLeft would change depending on the scroll position. P.S. kinda hard to explain in words
		var $thisPositionLeft = $this.position().left + $navUl.scrollLeft(),
			$thisWidth = $this.outerWidth(),
			windowWidth = $(window).width();

		//Determine newScrollPosition 
		var newScrollPosition = $thisPositionLeft + ($thisWidth / 2) - (windowWidth / 2);

		//Make a smooth transition to the newScrollPosition
		$navUl.stop(true, false).animate({
			scrollLeft: newScrollPosition
		}, 500, 'linear');

		//set proper css position and width for pos-indicator
		$indicator.css({'left': $thisPositionLeft, 'width': $thisWidth});
	}
	
	//create eventlistener to fire when user scrolls the page
	$(document).on('scroll', scrolling);
	
	//create eventlistener to fire when 'newActive' is triggered
	$navLi.on('newActive', mobileNavResponse);
	
	//set the first nav option 'store' to active when the page loads
	$navLi.eq(0).trigger('newActive');
	
	//set transition time from 0 to .25s after processing the code to prevent indicator position/width bug while loading the page initially.
	$navLi.css('transition', '.25s');

});