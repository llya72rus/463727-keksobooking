'use strict';

(function () {
  var pin = document.querySelector('.map__pin');
  var renderPin = function (object) {
    var pinClone = pin.cloneNode(true);
    pinClone.style = 'left: ' + (object.location.x + 33) + 'px' + '; top: ' + (object.location.y + 87) + 'px';
    pinClone.querySelector('img').src = object.author.avatar;
    pinClone.querySelector('img').alt = object.offer.title;
    pinClone.dataset.id = object.index;
    return pinClone;
  };

  window.fragmentPins = document.createDocumentFragment();

  for (var index = 0; index < window.ads.length; index++) {
    window.fragmentPins.appendChild(renderPin(window.ads[index]));
  }
})();
