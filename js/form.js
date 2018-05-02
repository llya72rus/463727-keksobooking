'use strict';

(function () {
  var userForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('.ad-form fieldset');
  var map = document.querySelector('.map');
  window.pinsField = document.querySelector('.map__pins');

  document.querySelector('.map__pin--main').addEventListener('mouseup', function () {
    window.pinsField.appendChild(window.fragmentPins);
    userForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    for (var q = 0; q < fieldsets.length; q++) {
      fieldsets[q].disabled = false;
    }

    window.active = true;
  });

  var defaultPin = {
    top: 375,
    left: 570
  };

  document.querySelector('#address').value = defaultPin.top + 65 + ', ' + (defaultPin.left + 33);

  var pricePerNightInput = userForm.querySelector('#price');
  var buildingTypeSelect = userForm.querySelector('#type');
  var checkinSelectElem = userForm.querySelector('#timein');
  var checkoutSelectElem = userForm.querySelector('#timeout');

  var housingToMinPrice = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var syncTypeWithMinPrice = function () {
    var selectedType = buildingTypeSelect.options[buildingTypeSelect.selectedIndex].value;
    var selectedPrice = housingToMinPrice[selectedType];

    pricePerNightInput.min = selectedPrice;
    pricePerNightInput.placeholder = selectedPrice;
  };


  var syncSelectElemsValue = function (changedSelect, syncingSelect) {
    var selectedValue = changedSelect.options[changedSelect.selectedIndex].value;

    for (var z = 0; z < syncingSelect.length; z++) {
      if (syncingSelect[z].value === selectedValue) {
        syncingSelect[z].selected = true;
        break;
      }
    }
  };

  userForm.addEventListener('change', syncTypeWithMinPrice);

  userForm.addEventListener('change', function () {
    syncSelectElemsValue(checkinSelectElem, checkoutSelectElem);
  }, false);

  var roomNumberSelect = userForm.querySelector('#room_number');
  var roomsCapacity = userForm.querySelector('#capacity');

  var disableOptions = function (select, selectableOption) {
    for (var t = 0; t < select.length; t++) {
      select[t].disabled = true;
    }
    selectableOption.disabled = false;
    selectableOption.selected = true;
  };

  userForm.addEventListener('change', function () {
    var selectedRooms = roomNumberSelect.options[roomNumberSelect.selectedIndex].value;
    if (selectedRooms === '1') {
      disableOptions(roomsCapacity, roomsCapacity[0]);
    } else if (selectedRooms === '2') {
      disableOptions(roomsCapacity, roomsCapacity[1]);
    } else if (selectedRooms === '3') {
      disableOptions(roomsCapacity, roomsCapacity[2]);
    } else {
      disableOptions(roomsCapacity, roomsCapacity[3]);
    }
  });

  userForm.addEventListener('submit', function () {
    document.querySelector('.success').classList.remove('hidden');
  });

})();
