// Variables
// Display Elements
const $controllerEl = $('.game-controls');
const $filmWrapEl = $('.film-wrapper');
const $filmCan1El = $('.film-can-1');
const $filmCan2El = $('.film-can-2');

// Buttons
const $playBtn = $('#play-button');
const $lightsBtn = $('.lights');
const $rollCamBtn = $('.roll-cam');
const $reloadMagBtn = $('.reload-mag');

$playBtn.on('click', () => {
  $playBtn.fadeOut(1000);
  $controllerEl.removeClass('hidden');
  //   $controllerEl.fadeIn(1500);
  //   $filmWrapEl.append('<div class="film-frame"></div>');
});

$rollCamBtn.on('click', () => {
  $filmCan1El.addClass('.spin');
  $filmCan2El.addClass('.spin');
  console.log('Rolling!');
});
