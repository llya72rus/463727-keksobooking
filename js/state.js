'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var mapFilterFields = map.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  var resetPosition = function () {
    pinMain.style.left = window.data.mainPin.positionX + 'px';
    pinMain.style.top = window.data.mainPin.positionY + 'px';
  };

  var clearForms = function () {
    adForm.reset();
    mapFilterFields.reset();
  };

  var addListeners = function () {
    adForm.addEventListener('submit', window.form.submit);
    adFormSubmit.addEventListener('click', window.util.validateFields);
    adFormReset.addEventListener('click', window.state.resetPage);
  };

  var removeListeners = function () {
    adForm.removeEventListener('submit', window.form.submit);
    adFormSubmit.removeEventListener('click', window.util.validateFields);
    adFormReset.removeEventListener('click', window.state.resetPage);
  };

  window.state = {
    activatePage: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      addListeners();
      window.util.disableFields(false);
      window.backend.load(window.adverts.init, window.alert.getErrorMessage);
    },
    resetPage: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      clearForms();
      resetPosition();
      removeListeners();
      window.util.disableFields(true);
      window.util.setAddress();
      window.adverts.remove();
    }
  };
})();
