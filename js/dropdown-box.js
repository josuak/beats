/* global $ */
/* eslint-disable */
$(function () {
  'use strict';
  
  //Add click event listener to dropdown-label
  $('.dropdown-label').click(function (event) {
    //Save the clicked label in var. Since the event listener is 'placed' on multiple elements with the same class we need to make sure to only refer to the one that actually got clicked -> event.target
    var elLabel = $(event.target),
      elChevron = elLabel.children('.chevron'),
			elContent = elLabel.next('');
    
    //use a build in jquery function to slide the content in and out of vision
    elContent.slideToggle();
    
    //by changing the class on the chevron element it is flipped, we first check the state it is in and then flip it the other way around
    if (!elChevron.is('.up')) {
      elChevron.removeClass('down');
      elChevron.addClass('up');
    } else {
      elChevron.removeClass('up');
      elChevron.addClass('down');
    }
  });
  
  
  $('.dropdown-label .chevron').click(function (event) {
    var elChevron = $(event.target),
			elContent = elChevron.parent().next();
    
    elContent.slideToggle();
    
    if (!elChevron.is('.up')) {
      elChevron.removeClass('down');
      elChevron.addClass('up');
    } else {
      elChevron.removeClass('up');
      elChevron.addClass('down');
    }
  });
});