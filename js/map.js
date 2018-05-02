'use strict';
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 87;
  var LIMIT_TOP_Y = 90;
  var LIMIT_BOTTOM_Y = 710;
  var LIMIT_LEFT_X = 65;
  var LIMIT_RIGHT_X = 1200;

  var pinMain = document.querySelector('.map__pin--main');

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (!window.active) {
      return;
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      var pinMainLeftCoord = parseInt(pinMain.style.left.split('px')[0], 10);
      var pinMainTopCoord = parseInt(pinMain.style.top.split('px')[0], 10);

      if (pinMainTopCoord < LIMIT_TOP_Y - MAIN_PIN_HEIGHT) {
        pinMain.style.top = LIMIT_TOP_Y - MAIN_PIN_HEIGHT + 'px';
      }

      if (pinMainTopCoord > LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT) {
        pinMain.style.top = LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT + 'px';
      }

      if (pinMainLeftCoord < LIMIT_LEFT_X - MAIN_PIN_WIDTH) {
        pinMain.style.left = LIMIT_LEFT_X - MAIN_PIN_WIDTH + 'px';
      }

      if (pinMainLeftCoord > LIMIT_RIGHT_X - MAIN_PIN_WIDTH) {
        pinMain.style.left = LIMIT_RIGHT_X - MAIN_PIN_WIDTH + 'px';
      }

      var showedCoordsTop = pinMain.offsetTop - shift.y;
      var showedCoordsLeft = pinMain.offsetLeft - shift.x;
      document.querySelector('#address').value = showedCoordsTop + 0 + ', ' + (showedCoordsLeft + 33);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

