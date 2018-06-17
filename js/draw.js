/* global SVG, setInterval, setTimeout */
/* eslint switch-colon-spacing: "off", new-cap: "off", require-jsdoc: "off" */

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
  youtube.linkTo('http://youtubed.com/prodbyjozu');

let iconObjects = [instagram, twitter, soundcloud, youtube];

// align and style all circles and icon images
for (let iconObject of iconObjects) {
  iconObject.arrange();
  iconObject.style();
}

// function that creates a svg line between two iconObjects
// (with the svgjs line() function)
function line(iconOne, iconTwo) {
  return s.line(iconOne.cx, iconOne.cy, iconTwo.cx, iconTwo.cy);
}

let line1 = line(instagram, twitter);
let line2 = line(twitter, soundcloud);
let line3 = line(soundcloud, youtube);
let line4 = line(youtube, instagram);
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

// lines animation
function lineAnimation() {
  for (let i = 0; i < lines.length; i++) {
    lines[i].stop(true);
    // reset dashoffset
    lines[i].style('animation: reset-dash 0 forwards');
    // reset opacity
    lines[i].attr('opacity', '1');
    // actual animation
    setTimeout(() => {
      lines[3-i].style('animation: dash 1s forwards');
    }, 500 * i);
    lines[i].animate(500, '>', 3000).attr('opacity', '0');
  }
}

let initAnimationOnce = true;

// function initAnimation is used in scrolling.js
function initAnimation() {
  // check if function already ran (null = falsy)
  if (initAnimationOnce) {
    for (let i = 0; i < iconObjects.length; i++) {
      let group = iconObjects[i].group;
      group.scale(.01, .01);
      group.opacity(1);
      group.animate(500, '>', i * 200).scale(1.1, 1.1);
      group.animate(500, '-').scale(1, 1);
    }
    // intial lineAnimation
    setTimeout(lineAnimation, 1300);
    // execute lineAnimation every 4000ms
    setTimeout(() => setInterval(lineAnimation, 4000), 1300);
  }
  // only let function run once
  initAnimationOnce = null;
}

