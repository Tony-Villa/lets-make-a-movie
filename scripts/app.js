////////// Variables ////////////
// Display Elements
const $controllerEl = $('.game-controls');
const $filmWrapEl = $('.film-wrapper');
const $filmCan1El = $('.film-can-1');
const $filmCan2El = $('.film-can-2');

// Score Element Variables
const $filmRemaning = $('.film-remain-actual');

// Button Variables
const $playBtn = $('#play-button');
const $lightsBtn = $('.lights');
const $rollCamBtn = $('.roll-cam');
const $reloadMagBtn = $('.reload-mag');

// HTML Variables
const filmFrame = '<div class="film-frame"></div>';

// Randomizers
const frameRandom = () => {
  return Math.floor(Math.random() * 7) + 1;
};

// Game Objects
const frameRate = {
  startFrame: 23.98,
  currentFrame: 23.98,
  isRolling: true,

  frameDecrement: function () {
    this.currentFrame -= frameRandom();
  },
};

const filmRemain = {
  startFrame: 10,
  currentFrame: 10,
  isEmpty: false,
  filmDecrement: function () {
    this.currentFrame -= 1;
    this.renderFrames();
  },
  magReload: function () {
    this.currentFrame += this.startFrame - this.currentFrame;
    this.renderFrames();
  },
  renderFrames: function () {
    $filmWrapEl.empty();
    for (let i = 0; i <= this.currentFrame; i++) {
      $filmWrapEl.append(filmFrame);
    }
  },
  renderRemaining: function () {
    $filmRemaning.html(filmRemain.currentFrame);
  },
  renderFilmRemain: function () {
    this.filmDecrement();
    this.renderRemaining();
  },
};

// Functions

const animateFilmCans = () => {
  $filmCan1El.addClass('.spin');
  $filmCan2El.addClass('.spin');
};

// Event Listeners

$playBtn.on('click', () => {
  $playBtn.fadeOut(1000);
  $controllerEl.removeClass('hidden');
  filmRemain.renderRemaining();
});

$rollCamBtn.on('click', () => {
  filmRemain.renderFilmRemain();
  console.log('Rolling!');
});
