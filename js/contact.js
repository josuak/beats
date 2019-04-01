/* global $ loadjs */
/* eslint require-jsdoc: 'off', no-invalid-this: 'off' */
/* eslint-env browser */
// loadjs.ready('jquery', () => {
  // let preventSubmit = false;
  const $validation = $('#validation');
  const $userName = $('#user-name');
  const $userEmail = $('#user-email');
  // regex for checking email validity
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const $subject = $('#subject');
  const $message = $('#message');
  const $submit = $('#submit');
  $('#contact form').on('submit', function(event) {
    // prevent form action upon submitting the form
    event.preventDefault();
    // get values from form inputs to post in contact php
    let userName = $userName.val();
    let userEmail = $userEmail.val();
    let subject = $subject.val();
    let message = $message.val();
    let submit = $submit.val();

    if (userEmail.length < 1 || userName.length < 1 || subject.length < 1 || message.length < 1) {
      $validation.html('<span class="error-message">Please fill out all fields.</span>');

      if (userEmail.length < 1) {
        $userEmail.addClass('input-error');
      } else {
        $userEmail.removeClass('input-error');
      }

      if (userName.length < 1) {
        $userName.addClass('input-error');
      } else {
        $userName.removeClass('input-error');
      }

      if (subject.length < 1) {
        $subject.addClass('input-error');
      } else {
        $subject.removeClass('input-error');
      }

      if (message.length < 1) {
        $message.addClass('input-error');
      } else {
        $message.removeClass('input-error');
      }

    } else if (!re.test(userEmail)) {
      $validation.html('<span class="error-message">Seems like you\'ve entered an invalid email address.</span>');
      $userEmail.addClass('input-error');
    } else {
      $validation.html('<span class="success-message">Sending...</span>');
      // load contact php (ajax) and post values declared above
      $validation.load('../php/contact.php', {
        'user-name': userName,
        'user-email': userEmail,
        'subject': subject,
        'message': message,
        'submit': submit,
      });
      $('.user-input').val('');
    /* SPAM BLOCK
      preventSubmit = true;
      setTimeout(function() {
        preventSubmit = false;
      }, 3000);
    } else {
      alert('don\'t spam bruh');
      // <span class="error-message">Please fill out all fields.</span>
    }*/
  }
});
$('.user-input').on('change', function() {
    $(this).removeClass('input-error');
});
// });
