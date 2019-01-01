/* global $ */
/* eslint require-jsdoc: 'off', no-invalid-this: 'off' */
'use strict';

// Add click event listener to dropdown-label
$('.dropdown-label').click(function(event) {
  /* Save the clicked label in var.
  Since the event listener is 'placed' on multiple elements with the same class,
  we need to make sure to only refer to the one that actually got clicked
  = this */
  let elLabel = $(this);

  // use a build in jquery function to slide the content in and out of vision
  let elContent = elLabel.next('');
  elContent.slideToggle();

  /* by changing the class on the chevron element it is flipped,
  we first check the state it is in and then flip it the other way around */
  let elChevron = elLabel.find('.chevron');
  if (!elChevron.is('.up')) {
    elChevron.removeClass('down');
    elChevron.addClass('up');
  } else {
    elChevron.removeClass('up');
    elChevron.addClass('down');
  }
});
