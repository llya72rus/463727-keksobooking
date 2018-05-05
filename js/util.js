'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var mapFilterFeatures = map.querySelector('#housing-features');
  var mapFilterFields = map.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var adFormRequired = adForm.querySelectorAll('[required]');

  var checkField = function (field) {
    if (!field.checkValidity()) {
      field.classList.add('error');
    } else if (field.classList.contains('error')) {
      field.classList.remove('error');
    }
  };

  window.util = {
    disableFields: function (boolean) {
      mapFilterFeatures.disabled = boolean;
      mapFilterFields.forEach(function (field) {
        field.disabled = boolean;
      });
      adFormFields.forEach(function (field) {
        field.disabled = boolean;
      });
    },
    setAddress: function () {
      var addressX = parseInt(pinMain.style.left, 10) + window.data.mainPin.width / 2;
      var addressY = parseInt(pinMain.style.top, 10) + window.data.mainPin.height;
      adFormAddress.value = addressX + ', ' + addressY;
    },
    validateFields: function () {
      adFormRequired.forEach(function (field) {
        checkField(field);
      });
    },
    debounce: function (action, interval) {
      var lastTimeout;
      return function () {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(action, interval);
      };
    }
  };
})();
