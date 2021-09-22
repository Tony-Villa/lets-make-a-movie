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
const $reloadWarn = $('.reload');

// Button Variables

// Live Game Buttons
const $playBtn = $('#play-button');
const $actionBtn = $('.action');
const $lightsBtn = $('.lights');
const $rollCamBtn = $('.roll-cam');
const $reloadMagBtn = $('.reload-mag');

// Reset Game Buttons
const $winBtn = $('.win-btn');
const $lossBtn = $('.lose-btn');

// HTML Variables
const $instructions = $('.instructions');
const $winner = $('#win-screen');
const $loser = $('#lose-screen');
const $bg = $('.main-content');
const $title = $('.title');
const $screen = $('.movie-screen');
const $crowd = $('.crowd');

const $filmFrame = $('.film-frame');

// Randomizers
const frameRandom = () => {
  return Math.floor(Math.random() * 3) + 1;
};

// Win/Loss Variables
let youWin = false;
let youLose = false;

// Game Objects
const timer = {
  timeRemaining: 45,
  isOutOfTime: false,

  timerDec: function () {
    const timerInterval = setInterval(() => {
      if (youLose || youWin) {
        clearInterval(timerInterval);
      }

      this.timeRemaining--;

      if (this.timeRemaining <= 0) {
        clearInterval(timerInterval);
        this.timeRemaining = 0;
        this.isOutOfTime = true;
        youWin = true;
        checkWinLoss();
        return youWin;
      }
    }, 1000);
  },

  timerDisplay: function () {
    const timeInterval = setInterval(() => {
      $timeRemaning.html(this.timeRemaining);
    }, 1000);
  },

  checkTimer: function () {
    return this.isOutOfTime;
  },

  resetTimer: function () {
    this.timeRemaining = 45;
    this.isOutOfTime = false;
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
      if (youLose || youWin) {
        clearInterval(surgeInterval);
      }

      if (Math.floor(Math.random() * 10 + 1 < 5)) {
        this.isOn = false;
      }
      if (!this.isOn) {
        clearInterval(surgeInterval);
        $lightBeam.addClass('hidden');
      }
    }, 1000);
  },

  resetLights: function () {
    this.isOn = true;
  },
};

const frameRate = {
  startFrame: 23.98,
  currentFrame: 23.98,
  isRolling: true,

  frameDecrement: function () {
    this.currentFrame -= 0.98;
    const frameInterval = setInterval(() => {
      if (youLose || youWin) {
        clearInterval(frameInterval);
      }

      this.currentFrame -= frameRandom();

      if (this.currentFrame <= 0) {
        clearInterval(frameInterval);
        this.currentFrame = 0;
        this.isRolling = false;
        youLose = true;
        checkWinLoss();
        return youLose;
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

  resetFrames: function () {
    this.currentFrame = 23.98;
    this.isRolling = true;
  },

  renderFrameRate: function () {
    this.frameDecrement();
    this.renderCurrent();
  },
};

const filmRemain = {
  startFrame: 11,
  currentFrame: 11,
  isEmpty: false,

  filmDecrement: function () {
    const decInterval = setInterval(() => {
      let filmWidth = $filmFrame.width() - 65.16;
      if (youLose || youWin) {
        clearInterval(decInterval);
      }

      this.currentFrame--;
      this.removeFrames(filmWidth);
      // this.renderFrames();

      if (this.currentFrame < 4) {
        $reloadWarn.removeClass('hidden');
      }

      if (this.currentFrame <= 0) {
        clearInterval(decInterval);
        this.currentFrame = 0;
        this.isEmpty = true;
        youLose = true;
        checkWinLoss();
        return youLose;
      }
    }, 1000);
  },

  renderRemaining: function () {
    const renderFilm = setInterval(() => {
      $filmRemaning.html(this.currentFrame);

      if (youLose || youWin) {
        clearInterval(renderFilm);
      }
    }, 1000);
  },

  magReload: function () {
    if (this.currentFrame < 4) {
      this.currentFrame += this.startFrame - this.currentFrame;
      this.renderFrames();
      $reloadWarn.addClass('hidden');
    } else {
      return;
    }
  },

  renderFrames: function (numFrames) {
    $filmFrame.css('width', '724px');
  },

  removeFrames: function (newWidth) {
    $filmFrame.css(`width`, `${newWidth}`);
  },

  checkMag: function () {
    return this.isEmpty;
  },

  resetMag: function () {
    this.currentFrame = 10;
    this.isEmpty = false;
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
};

const startGame = () => {
  // Game Display Changes
  timer.renderTimer();
  frameRate.renderFrameRate();
  filmRemain.renderFilmRemain();
  lighting.powerSurge();
};

const resetGame = () => {
  timer.timeRemaining = 45;
  frameRate.currentFrame = frameRate.startFrame;
  filmRemain.currentFrame = filmRemain.startFrame;
  lighting.resetLights();
  timer.resetTimer();
  frameRate.resetFrames();
  filmRemain.resetMag();
  $reloadWarn.addClass('hidden');
};

const checkWinLoss = () => {
  if (youWin) {
    resetGame();
    $winner.removeClass('hidden');
  }
  if (youLose) {
    resetGame();
    $loser.removeClass('hidden');
  }
};

// Event Listeners
$playBtn.on('click', () => {
  // Style Changes
  $playBtn.addClass('poof');
  $controllerEl.removeClass('hidden');
  $instructions.removeClass('hidden');
  $bg.addClass('bg-dim');
  $title.addClass('title-light');
  $screen.addClass('movie-start');
  $crowd.addClass('tadaa');
});

$actionBtn.on('click', () => {
  $instructions.addClass('hidden');
  startGame();
});

$rollCamBtn.on('click', () => {
  if (frameRate.isRolling) {
    if (frameRate.currentFrame < 23) {
      frameRate.currentFrame++;
      frameRate.renderCurrent();
      // if ($filmCan1El.hasClass('spin')) {
      //   $filmCan1El.removeClass('spin');
      // } else {
      //   $filmCan1El.addClass('spin');
      // }
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

$winBtn.on('click', () => {
  $winner.addClass('hidden');
  resetGame();
  youLose = false;
  youWin = false;
  startGame();
});
$lossBtn.on('click', () => {
  $loser.addClass('hidden');
  resetGame();
  youLose = false;
  youWin = false;
  startGame();
});

// console.log($filmFrame.width());
