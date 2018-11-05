/* global $ */
/* eslint require-jsdoc: 'off', no-invalid-this: 'off' */
/* eslint-env browser */
$(function() {
  $('#contact form').on('submit', function(event) {
    // prevent form action upon submitting the form
    event.preventDefault();

    // get values from form inputs to post in contact php
    let userName = $('#user-name').val();
    let userEmail = $('#user-email').val();
    let subject = $('#subject').val();
    let message = $('#message').val();
    let submit = $('#submit').val();

    // load contact php (ajax) and post values declared above
    $('#validation').load('../php/contact.php', {
      'user-name': userName,
      'user-email': userEmail,
      'subject': subject,
      'message': message,
      'submit': submit,
    });
  });

  $('.user-input').on('change', function() {
    $(this).removeClass('input-error');
  });
});
