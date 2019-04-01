/* eslint require-jsdoc: 'off', no-invalid-this: 'off' */
/* eslint-env browser*/

/* get all elements with class 'dropdown-label'
   -> turn element collection into array */
const labelClass = document.getElementsByClassName('question-container');
// convert html collection into array
const labelArray = Array.from(labelClass);

// for each dropdown-label element in the array
labelArray.forEach(function(element) {
  // is a css transition happening rn?
  let inTransition = false;
  // create on click event listener
  element.addEventListener('click', () => {
    let answerContainer = element.nextElementSibling;
    let answerContainerStyle = window.getComputedStyle(answerContainer);
    let currentHeight = answerContainerStyle.getPropertyValue('height');
    let chevron = element.querySelector('.chevron');

    // is the max-height 0? -> transition to desired height
    if ((currentHeight == '0' && inTransition === false) ||
        (currentHeight == 'none' && inTransition === false) ||
        (currentHeight == '0px' && inTransition === false)) {
      inTransition = true;
      let answerContent = answerContainer.querySelector('.answer-text');
      let desiredHeight = answerContent.scrollHeight.toString();
      answerContainer.style.height = desiredHeight + 'px';

      chevron.classList.remove('down');
      chevron.classList.add('up');
      // set timeout while transitioning
      setTimeout(() => {
        inTransition = false;
      }, 500);
    } else if (inTransition === false) {
      inTransition = true;
      answerContainer.style.height = '0px';

      chevron.classList.remove('up');
      chevron.classList.add('down');

      setTimeout(() => {
        inTransition = false;
      }, 500);
    }
  });
});
