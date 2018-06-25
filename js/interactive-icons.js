/* eslint-env browser */
/* global SVG $ */
/* eslint switch-colon-spacing: "off", new-cap: "off", require-jsdoc: "off" */
$(function() {
  const s = SVG('canvas').size(200, 200);

  // template to create an "iconObject" containing svg-circle and svg-icon-image
  class iconObject {
    constructor(iconUrl, cx, cy, groupId) {
      this.circle = s.circle(50);
      this.icon = s.image(iconUrl, 30, 30);
      this.group = s.group();
      this.cx = cx;
      this.cy = cy;
      this.groupId = groupId;
    }

    // align circle and icon above each other
    arrange() {
      this.circle.center(this.cx, this.cy);
      this.icon.center(this.cx, this.cy);
      this.group.add(this.circle).add(this.icon);
      this.circle.back();
    }

    // add styling to circle
    style() {
      this.circle.attr({
        'fill': 'white',
        'stroke': '#e4c079',
        'stroke-width': 2,
      });

      this.group.attr({
        'cursor': 'pointer',
        'opacity': 0,
        'id': this.groupId,
      });
    }

    // scale the icons group (containing circle and image) with animation
    scale(factor, duration) {
      this.group.animate(duration, '<>').scale(factor, factor);
    }

    // use svgjs linkTo() directly on iconObject
    // -> apply 'linkTo()' to the icon & circle svg group
    linkTo(linkUrl) {
      this.group.linkTo(linkUrl);
    }
  }

  // create iconObjects for all the different icons
  let instagram = new iconObject('img/instagram.svg', 100, 40, 'icon-ig');
    instagram.linkTo('http://instagram.com/jozugoingcrazy');

  let twitter = new iconObject('img/twitter.svg', 40, 100, 'icon-t');
    twitter.linkTo('http://twitter.com/prodbyjozu');

  let soundcloud = new iconObject('img/soundcloud.svg', 100, 160, 'icon-scl');
    soundcloud.linkTo('http://soundcloud.com/prodbyjozu');

  let youtube = new iconObject('img/youtube.svg', 160, 100, 'icon-yt');
    youtube.linkTo('http://youtube.com/prodbyjozu');

  let iconObjects = [instagram, twitter, soundcloud, youtube];

  // align and style all circles and icon images
  for (let iconObject of iconObjects) {
    iconObject.arrange();
    iconObject.style();
  }

  // function that creates a svg line between two iconObjects
  // (with the svgjs line() function)
  function line(icon) {
    return s.line(icon.cx, icon.cy, icon.cx, icon.cy);
  }

  let line1 = line(instagram);
  let line2 = line(twitter);
  let line3 = line(soundcloud);
  let line4 = line(youtube);
  const lines = [line1, line2, line3, line4];

  for (let i = 0; i < lines.length; i++) {
    /* move lines to the back of the canvas /
    position them before the other items in the html code */
    lines[i].back();
    // fill lines
    lines[i].stroke({width: 2, color: '#31444a'});
    // give lines class of 'line'
    lines[i].attr({
      'class': 'line',
      'opacity': 0,
      'id': 'line' + i,
    });
  }


  let animationTimers = [];
  // lines animation
  function lineAnimation() {
    for (let i = 0; i < 4; i++) {
      lines[i].attr('opacity', 1);
      // each line should start animating 500ms offset from the prior
      animationTimers[i] = setInterval(() => {
        if (i === 0) {
          lines[i].animate(800, '-')
                  .plot(iconObjects[i].cx,
                        iconObjects[i].cy,
                        iconObjects[i+3].cx,
                        iconObjects[i+3].cy);
        } else {
          lines[4-i].animate(800, '-')
                    .plot(iconObjects[4-i].cx,
                          iconObjects[4-i].cy,
                          iconObjects[3-i].cx,
                          iconObjects[3-i].cy);
        }
      }, 500 * i + 100);
      // this here  |  is the + 100 from below in initAnimation
    }
  }


  let initAnimationOnce = true;
  let animationStartDelay;
  // function initAnimation is used in scrolling.js
  function initAnimation() {
    clearInterval(animationStartDelay);
    // check if function already ran (null = falsy)
    if (initAnimationOnce) {
      for (let i = 0; i < 4; i++) {
        let group = iconObjects[i].group;
        group.scale(.01, .01);
        group.opacity(1);
        group.animate(500, '>', i * 200).scale(1.1, 1.1);
        group.animate(500, '-').scale(1, 1);
      }
      // intial lineAnimation after icons been animated in
      // (after 1300 sec / 1200 + 100) - see above
      animationStartDelay = setTimeout(lineAnimation, 1200);
    }
  }

  // variable saying if the svg is inView or not
  let inView = false;
  // event to determine if the svg is in the viewport, to trigger animation.
  $(window).scroll(() => {
    let scrollTopBottomViewport = $(window).scrollTop() + $(window).height();
    let itemOffsetTop = $('#canvas').offset().top;

    if (scrollTopBottomViewport - 150 > itemOffsetTop) {
      // if the svg is already in view animation shouldn't run again
      if (!inView === true) {
        // run animation
        initAnimation();
        inView = true;
      }
    }
    if (scrollTopBottomViewport + 150 < itemOffsetTop) {
      if (!inView === false) {
        inView = false;
        // svg is out of view, make invisible for next animation to start fresh.
        for (let i = 0; i < 4; i++) {
          // resetting all the values for the next animation
          let currentIcon = iconObjects[i];
          // clear all lined up intervals so there're no overlapping animations
          clearInterval(animationTimers[i]);
          lines[i].stop(true, true)
                  .attr('opacity', 0)
                  .plot(currentIcon.cx,
                        currentIcon.cy,
                        currentIcon.cx,
                        currentIcon.cy);
          currentIcon.group.attr('opacity', 0);
        }
      }
    }
  });
});
