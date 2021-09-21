////////// Variables ////////////
// Display Elements
const $controllerEl = $('.game-controls');
const $filmWrapEl = $('.film-wrapper');
const $filmCan1El = $('.film-can-1');
const $filmCan2El = $('.film-can-2');
const $lightBeam = $('.light-beam');

// Score Element Variables
const $filmRemaning = $('.film-remain-actual');
const $frameRemaning = $('.frame-rate-actual');
const $timeRemaning = $('.time-remain-actual');

// Button Variables
const $playBtn = $('#play-button');
const $lightsBtn = $('.lights');
const $rollCamBtn = $('.roll-cam');
const $reloadMagBtn = $('.reload-mag');

// HTML Variables
const filmFrame = '<div class="film-frame"></div>';

// Randomizers
const frameRandom = () => {
  return Math.floor(Math.random() * 3) + 1;
};

// Game Objects
const timer = {
  timeRemaining: 45,

  timerDec: function () {
    setInterval(() => {
      this.timeRemaining--;
    }, 1000);
  },

  timerDisplay: function () {
    setInterval(() => {
      $timeRemaning.html(this.timeRemaining);
    }, 1000);
  },

  renderTimer: function () {
    this.timerDec();
    this.timerDisplay();
  },
};

const lighting = {
  isOn: true,

  powerSurge: function () {
    const surgeInterval = setInterval(() => {
      if (Math.floor(Math.random() * 10 + 1 < 5)) {
        this.isOn = false;
      }
      if (!this.isOn) {
        clearInterval(surgeInterval);
        $lightBeam.addClass('hidden');
      }
    }, 1000);
  },
};

const frameRate = {
  startFrame: 23.98,
  currentFrame: 23.98,
  isRolling: true,

  frameDecrement: function () {
    this.currentFrame -= 0.98;
    const frameInterval = setInterval(() => {
      this.currentFrame -= frameRandom();

      if (this.currentFrame < 0) {
        clearInterval(frameInterval);
        this.currentFrame = 0;
      }
    }, 1000);
  },

  renderCurrent: function () {
    setInterval(() => {
      $frameRemaning.html(this.currentFrame);
    }, 1000);
  },

  renderFrameRate: function () {
    this.frameDecrement();
    this.renderCurrent();
  },
};

const filmRemain = {
  startFrame: 10,
  currentFrame: 10,
  isEmpty: false,

  filmDecrement: function () {
    const decInterval = setInterval(() => {
      this.currentFrame--;
      this.renderFrames();

      if (this.currentFrame < 0) {
        clearInterval(decInterval);
        this.currentFrame = 0;
      }
    }, 1000);
  },

  renderRemaining: function () {
    setInterval(() => {
      $filmRemaning.html(this.currentFrame);
    }, 1000);
  },

  magReload: function () {
    if (this.currentFrame < 3) {
      this.currentFrame += this.startFrame - this.currentFrame;
      this.renderFrames();
    } else {
      return;
    }
  },

  renderFrames: function () {
    $filmWrapEl.empty();
    for (let i = 0; i <= this.currentFrame; i++) {
      $filmWrapEl.append(filmFrame);
    }
  },

  checkMag: function () {
    if (this.currentFrame < 1) {
      this.isEmpty = true;
    }
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

const decScores = (time = 1000) => {
  filmRemain.renderFilmRemain();
  frameRate.renderFrameRate();
  // setInterval(() => {
  //   filmRemain.renderFilmRemain();
  //   frameRate.renderFrameRate();
  // }, time);
};

// Event Listeners
$playBtn.on('click', () => {
  // Style Changes
  $playBtn.fadeOut(1000);
  $controllerEl.removeClass('hidden');

  // Game Display Changes
  timer.renderTimer();

  frameRate.renderFrameRate();

  filmRemain.renderFilmRemain();

  lighting.powerSurge();
});

$rollCamBtn.on('click', () => {
  frameRate.currentFrame++;
  frameRate.renderCurrent();
});

$reloadMagBtn.on('click', () => {
  filmRemain.magReload();
  filmRemain.renderRemaining();
});

$lightsBtn.on('click', () => {
  lighting.isOn = true;
  $lightBeam.removeClass('hidden');
  lighting.powerSurge();
});

// Game Loop
const gameInit = () => {
  while (frameRate.isRolling === true && filmRemain.isEmpty === false) {
    lighting.powerSurge();
    if (lighting.isOn) {
      decScores();
    } else {
      decScores(500);
    }
  }
};
