'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormRooms = adForm.querySelector('#room_number');
  var adFormGuests = adForm.querySelector('#capacity');
  var adFormCheckIn = adForm.querySelector('#timein');
  var adFormCheckOut = adForm.querySelector('#timeout');

  var adFormTypeHandler = function (evt) {
    var offerType = evt.target.value;
    if (Object.getOwnPropertyNames(window.data.types).includes(offerType)) {
      adFormPrice.min = window.data.types[offerType].price;
      adFormPrice.placeholder = window.data.types[offerType].price;
    } else {
      adFormPrice.min = '0';
      adFormPrice.placeholder = '0';
    }
  };

  var adFormRoomsHandler = function () {
    var roomsValue = adFormRooms.options[adFormRooms.selectedIndex].value;
    var guestsValue = adFormGuests.options[adFormGuests.selectedIndex].value;
    if (roomsValue === '1' && guestsValue !== '1') {
      adFormGuests.setCustomValidity('Подходит только для 1 гостя');
      adFormGuests.classList.add('error');
    } else if (roomsValue === '2' && guestsValue !== '1' && guestsValue !== '2') {
      adFormGuests.setCustomValidity('Подходит только для 1 или 2 гостей');
      adFormGuests.classList.add('error');
    } else if (roomsValue === '3' && guestsValue !== '1' && guestsValue !== '2' && guestsValue !== '3') {
      adFormGuests.setCustomValidity('Подходит только для 1,2 или 3 гостей');
      adFormGuests.classList.add('error');
    } else if (roomsValue === '100' && guestsValue !== '0') {
      adFormGuests.setCustomValidity('Не подходит для гостей');
      adFormGuests.classList.add('error');
    } else {
      adFormGuests.setCustomValidity('');
      adFormGuests.classList.remove('error');
    }
  };

  var adFormCheckHandler = function (evt) {
    var selectTarget = evt.target.id === 'timein' ? adFormCheckIn : adFormCheckOut;
    var selectCompare = evt.target.id === 'timein' ? adFormCheckOut : adFormCheckIn;
    selectCompare.value = selectTarget.options[selectTarget.selectedIndex].value;
  };

  var adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), window.alert.getSuccessMessage, window.alert.getErrorMessage);
  };

  window.util.disableFields(true);
  window.util.setAddress();

  adFormType.addEventListener('change', adFormTypeHandler);
  adFormRooms.addEventListener('change', adFormRoomsHandler);
  adFormGuests.addEventListener('change', adFormRoomsHandler);
  adFormCheckIn.addEventListener('change', adFormCheckHandler);
  adFormCheckOut.addEventListener('change', adFormCheckHandler);

  window.form = {
    submit: adFormSubmitHandler
  };
})();
