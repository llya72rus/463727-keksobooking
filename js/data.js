'use strict';

(function () {
  var MainPin = {
    width: 62,
    height: 84,
    positionX: 570,
    positionY: 375
  };

  var Types = {
    'palace': {
      name: 'Дворец',
      price: '10000'
    },
    'house': {
      name: 'Дом',
      price: '5000'
    },
    'flat': {
      name: 'Квартира',
      price: '1000'
    },
    'bungalo': {
      name: 'Бунгало',
      price: '0'
    }
  };

  window.data = {
    types: Types,
    mainPin: MainPin
  };
})();
