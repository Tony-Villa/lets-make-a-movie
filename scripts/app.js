// Variables
// Display Elements
const $controllerEl = $('.game-controls');
const $filmWrapEl = $('.film-wrapper');

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
