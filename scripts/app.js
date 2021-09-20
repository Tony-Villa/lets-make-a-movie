// Variables
// Display Elements
const $controllerEl = $('.game-controls');
const $filmWrapEl = $('.film-wrapper');
const $filmCan1El = $('.film-can-1');
const $filmCan2El = $('.film-can-2');

// Score Elements
const $filmRemaning = $('.film-remain-actual');

// Buttons
const $playBtn = $('#play-button');
const $lightsBtn = $('.lights');
const $rollCamBtn = $('.roll-cam');
const $reloadMagBtn = $('.reload-mag');

// Game Objects

const frameRate = {
  startFrame: 23.98,
  currentFrame: 23.98,
  isRolling: true,
};

const filmRemain = {
  startFrame: 10,
  currentFrame: 10,
  isEmpty: false,
  filmDecrement: function () {
    this.currentFrame -= 1;
  },
  magReload: function () {
    this.currentFrame += this.startFrame - this.currentFrame;
  },
};

// Functions

const frameDecrement = () => {
  return Math.floor(Math.random() * 5) + 1;
};

// Event Listeners

$playBtn.on('click', () => {
  $playBtn.fadeOut(1000);
  $controllerEl.removeClass('hidden');
  $filmRemaning.html(filmRemain.currentFrame);
  //   $controllerEl.fadeIn(1500);
  //   $filmWrapEl.append('<div class="film-frame"></div>' * filmRemain.currentFrame);
});

$rollCamBtn.on('click', () => {
  $filmCan1El.addClass('.spin');
  $filmCan2El.addClass('.spin');

  filmRemain.filmDecrement();
  $filmRemaning.html(filmRemain.currentFrame);
  console.log('Rolling!');
});
