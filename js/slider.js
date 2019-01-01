/* global $, twttr */
/* eslint require-jsdoc: 'off', no-invalid-this: 'off' */
/* eslint-env browser */
twttr.ready(() => {
  // specify tweet id's
  let tweets = ['948292603178610688',
                '882307169810599937',
                '1070064374105034752',
                '1079593651754487813',
                '1028369467569528834'];

  // create tweets for each id
  for (let i = 0; i < 5; i++) {
    twttr.widgets.createTweet(
      tweets[i],
      // place tweet in corresponding slide element
      document.getElementById('slide-' + (i)),
      {
        linkColor: '#d1af6c',
        cards: 'hidden',
        conversation: 'none',
      }
    );
  }
});


let slidingTimer;
// variable to determine wehther a transition is currently in running
let sliding = false;

const prevBtn = $('#prev-btn-container');
prevBtn.click(() => {
  if (sliding === false) {
    clearInterval(slidingTimer);
    sliding = true;
    slideLeft();
    // after transition finished (1000ms) set variable to false again
    slidingTimer = setInterval(() => {
      sliding = false;
    }, 1000);
  }
});

const nextBtn = $('#next-btn-container');
nextBtn.click(() => {
  if (sliding === false) {
    clearInterval(slidingTimer);
    sliding = true;
    slideRight();
    slidingTimer = setInterval(() => {
      sliding = false;
    }, 1000);
  }
});

const slides = $('#testimonials-container > .slide');
const container = $('#testimonials-container');

function slideRight() {
  // setting z-indexes so you don't see wierd overlapping transitions
  let prevPrevEl = slides.filter('.prev-prev');
  prevPrevEl.css('z-index', 5);

  let prevEl = slides.filter('.prev');
  prevEl.css('z-index', 10);

  let activeEl = slides.filter('.active');
  activeEl.css('z-index', 15);

  let nextEl = slides.filter('.next');
  nextEl.css('z-index', 20);

  let nextNextEl = slides.filter('.next-next');
  nextNextEl.css('z-index', 15);

  // get width to adjust movement of slides, with the width
  let width = container.width();
  // Moving slides
  prevPrevEl.css({
    transition: 'none',
    left: (width * 2).toString() + 'px',
  });

  prevEl.css({
    'transition': 'left 1s',
    'left': (width * -2).toString() + 'px',
  });

  activeEl.css({
    'transition': 'left 1s',
    'left': (width * -1).toString() + 'px',
  });

  nextEl.css({
    'transition': 'left 1s',
    'left': '0',
  });

  /* determine the height of the tweet and adjust the container accordingly
  let newActiveHeight = nextEl.children().innerHeight();
  container.css({
    'height': newActiveHeight.toString() + 'px',
  });

  // adjust position of the buttons accordingly aswell
  $('.slider-btn').css({
    'top': ((newActiveHeight / 2) - 14).toString() + 'px',
  }); */

  nextNextEl.css({
    'transition': 'none',
    'left': width.toString() + 'px',
  });

  // setting classes according to the new positions of the slide elements
  prevPrevEl.removeClass('prev-prev').addClass('next-next');
  prevEl.removeClass('prev').addClass('prev-prev');
  activeEl.removeClass('active').addClass('prev');
  nextEl.removeClass('next').addClass('active');
  nextNextEl.removeClass('next-next').addClass('next');
}

function slideLeft() {
  let width = container.width();
  let prevPrevEl = slides.filter('.prev-prev');
  prevPrevEl.css('z-index', 15);

  let prevEl = slides.filter('.prev');
  prevEl.css('z-index', 20);

  let activeEl = slides.filter('.active');
  activeEl.css('z-index', 15);

  let nextEl = slides.filter('.next');
  nextEl.css('z-index', 10);

  let nextNextEl = slides.filter('.next-next');
  nextNextEl.css('z-index', 5);

  prevPrevEl.css({
    transition: 'none',
    left: (width * -1).toString() + 'px',
  });

  prevEl.css({
    'transition': 'left 1s',
    'left': '0px',
  });

  /*
  let newActiveHeight = prevEl.children().innerHeight();
  container.css({
    'height': newActiveHeight.toString() + 'px',
  });
  $('.slider-btn').css({
    'top': (newActiveHeight / 2 - 14).toString() + 'px',
  }); */

  activeEl.css({
    'transition': 'left 1s',
    'left': width.toString() + 'px',
  });

  nextEl.css({
    'transition': 'left 1s',
    'left': (width * 2).toString() + 'px',
  });

  nextNextEl.css({
    transition: 'none',
    left: (width * -2).toString() + 'px',
  });


  prevPrevEl.removeClass('prev-prev').addClass('prev');
  prevEl.removeClass('prev').addClass('active');
  activeEl.removeClass('active').addClass('next');
  nextEl.removeClass('next').addClass('next-next');
  nextNextEl.removeClass('next-next').addClass('prev-prev');
}
