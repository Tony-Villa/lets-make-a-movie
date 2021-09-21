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
  isOutOfTime: false,

  timerDec: function () {
    const timerInterval = setInterval(() => {
      this.timeRemaining--;

      if (this.timeRemaining < 0) {
        clearInterval(timerInterval);
        this.timeRemaining = 0;
        this.isOutOfTime = true;
      }
    }, 1000);
  },

  timerDisplay: function () {
    setInterval(() => {
      $timeRemaning.html(this.timeRemaining);
    }, 1000);
  },

  checkTimer: function () {
    return this.isOutOfTime;
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
        this.isRolling = false;
      }
    }, 1000);
  },

  renderCurrent: function () {
    setInterval(() => {
      $frameRemaning.html(this.currentFrame);
    }, 1000);
  },

  checkFramRate: function () {
    return this.isRolling;
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
        this.isEmpty = true;
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
    return this.isEmpty;
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

// Game Loop
const checkWinLoss = () => {
  console.log('win loss invoked');
  while (frameRate.isRolling === true && filmRemain.isEmpty === false && timer.isOutOfTime === false) {
    if (frameRate.isRolling === true) {
      frameRate.checkFramRate();
      console.log('Checking Roll');
    }
    if (filmRemain.isEmpty === false) {
      filmRemain.checkMag('Checking Mag');
    }
    if (timer.isOutOfTime === false) {
      timer.checkTimer('Checking Time');
    }
    console.log('Game is active');
    if (frameRate.isRolling == false || filmRemain.isEmpty == true) {
      console.log('You Lose');
    } else if (timer.isOutOfTime === true && frameRate.isRolling === true && filmRemain.isEmpty === false) {
      console.log('You Win');
    }
  }
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

  // Init Game
  // checkWinLoss();
});

$rollCamBtn.on('click', () => {
  if (frameRate.isRolling) {
    if (frameRate.currentFrame < 23) {
      frameRate.currentFrame++;
      frameRate.renderCurrent();
    }
  }
});

$reloadMagBtn.on('click', () => {
  if (!filmRemain.isEmpty && lighting.isOn) {
    filmRemain.magReload();
    filmRemain.renderRemaining();
  }
});

$lightsBtn.on('click', () => {
  lighting.isOn = true;
  $lightBeam.removeClass('hidden');
  lighting.powerSurge();
});
