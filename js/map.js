'use strict';


var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var buildingTypes = ['palace', 'flat', 'house', 'bungalo'];

var times = ['12:00', '13:00', '14:00'];

var availableFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var availablePhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

function getRandomIntOutOfRange(min, max) {
  var length = max - min;
  var rand = Math.round(Math.random() * length) + min;
  return rand;
}

var getRandomInt = function (limit) {
  return Math.floor(Math.random() * limit);
};

var getRandomArrayElem = function (arr) {
  var index = getRandomInt(arr.length - 1);
  return arr[index];
};

var getUniqueItem = function (arr, limit) {
  var randomIdx = getRandomInt(limit);
  if (arr.includes(randomIdx)) {
    return getUniqueItem(arr, limit);
  }

  return randomIdx;
};

function generateRandomSequence(limit) {
  var result = [];
  while (result.length < limit) {
    var randomItem = getUniqueItem(result, limit);
    result.push(randomItem);
  }

  return result;
}

var shuffle = function (array) {
  var randomIndexes = generateRandomSequence(array.length);
  var limitedIndexes = randomIndexes.slice(0, getRandomInt(6));
  var result = [];
  for (var i = 0; i < limitedIndexes.length; i++) {
    var idx = limitedIndexes[i];
    result[i] = array[idx];
  }
  return result;
};


var generateIconsFeatures = function (list, arrayFeatures) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayFeatures.length; i++) {
    var iconFeature = document.createElement('li');
    iconFeature.classList.add('popup__feature');
    iconFeature.classList.add('popup__feature--' + arrayFeatures[i]);
    fragment.appendChild(iconFeature);
  }
  list.innerHTML = '';
  list.appendChild(fragment);
};

var ads = [];

for (var i = 0; i < 8; i++) {
  var ad = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + getRandomIntOutOfRange(1, 8) + '.png',
    },

    'offer': {
      'title': getRandomArrayElem(titles),
      'address': 'location.' + getRandomIntOutOfRange(300, 900) + ' location.' + getRandomIntOutOfRange(150, 500),
      'price': getRandomIntOutOfRange(1000, 1000000),
      'types': getRandomArrayElem(buildingTypes),
      'guests': getRandomIntOutOfRange(1, 20),
      'rooms': getRandomIntOutOfRange(1, 5),
      'checkin': getRandomArrayElem(times),
      'checkout': getRandomArrayElem(times),
      'features': shuffle(availableFeatures),
      'descrtiption': '',
      'photos': generateRandomSequence(availablePhotos.length)
    },

    'location': {
      'x': getRandomIntOutOfRange(300, 900),
      'y': getRandomIntOutOfRange(150, 500)
    },
    'index': i
  };

  ads.push(ad);
}

var deleteCard = function (someCard) {
  if (someCard) {
    someCard.remove();
  }
};

var translateType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return type;
  }
};

var pin = document.querySelector('.map__pin');

var renderPin = function (object) {
  var pinClone = pin.cloneNode(true);
  pinClone.style = 'left: ' + (object.location.x + 33) + 'px' + '; top: ' + (object.location.y + 87) + 'px';
  pinClone.querySelector('img').src = object.author.avatar;
  pinClone.querySelector('img').alt = object.offer.title;
  pinClone.dataset.id = object.index;
  return pinClone;
};

var fragmentPins = document.createDocumentFragment();

for (var index = 0; index < ads.length; index++) {
  fragmentPins.appendChild(renderPin(ads[index]));
}

var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderCard = function (card) {
  var cardClone = cardTemplate.cloneNode(true);
  cardClone.querySelector('.popup__title').textContent = card.offer.title;
  cardClone.querySelector('.popup__text--address').textContent = card.offer.address;
  cardClone.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardClone.querySelector('.popup__type').textContent = translateType(card.offer.types);
  cardClone.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  var featuresList = cardClone.querySelector('.popup__features');
  generateIconsFeatures(featuresList, shuffle(availableFeatures));
  cardClone.querySelector('.popup__description').textContent = card.offer.description;
  cardClone.querySelector('.popup__avatar').src = card.author.avatar;
  var img = cardClone.querySelector('.popup__photos img');
  for (var q = 0; q < card.offer.photos.length; q++) {
    var imgClone = img.cloneNode(true);
    imgClone.src = availablePhotos[card.offer.photos[q]];
    cardClone.querySelector('.popup__photos').appendChild(imgClone);
  }
  cardClone.querySelector('.popup__photos').removeChild(img);
  return cardClone;
};

var pinsBlock = document.querySelector('.map__pins');


document.querySelector('.map__pins').addEventListener('click', function (evt) {
  var target = evt.target;

  while (target !== null) {
    if (target.matches('.map__pin--main') && target.hasAttribute('data-id')) {
      var renderedCard = renderCard(ads[target.dataset.id]);
      deleteCard(document.querySelector('.popup'));
      document.querySelector('.map').appendChild(renderedCard);
      document.querySelector('.popup__close').addEventListener('click', function () {
        deleteCard(document.querySelector('.popup'));
      });
      break;
    }
    target = target.parentElement;
  }

});

var userForm = document.querySelector('.ad-form');
var fieldsets = document.querySelectorAll('.ad-form fieldset');
var map = document.querySelector('.map');

document.querySelector('.map__pin--main').addEventListener('mouseup', function () {
  pinsBlock.appendChild(fragmentPins);
  userForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  for (var q = 0; q < fieldsets.length; q++) {
    fieldsets[q].disabled = false;
  }
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

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 87;
var LIMIT_TOP_Y = 90;
var LIMIT_BOTTOM_Y = 710;
var LIMIT_LEFT_X = 65;
var LIMIT_RIGHT_X = 1200;

var metka = document.querySelector('.map__pin--main');

metka.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

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

    metka.style.top = (metka.offsetTop - shift.y) + 'px';
    metka.style.left = (metka.offsetLeft - shift.x) + 'px';

    var metkaLeftCoord = parseInt(metka.style.left.split('px')[0], 10);
    var metkaTopCoord = parseInt(metka.style.top.split('px')[0], 10);
    // console.log(metkaLeftCoord + ' ' + metkaTopCoord);

    if (metkaTopCoord < LIMIT_TOP_Y - MAIN_PIN_HEIGHT) {
      metka.style.top = LIMIT_TOP_Y - MAIN_PIN_HEIGHT + 'px';
    }

    if (metkaTopCoord > LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT) {
      metka.style.top = LIMIT_BOTTOM_Y - MAIN_PIN_HEIGHT + 'px';
    }

    if (metkaLeftCoord < LIMIT_LEFT_X - MAIN_PIN_WIDTH) {
      metka.style.left = LIMIT_LEFT_X - MAIN_PIN_WIDTH + 'px';
    }

    if (metkaLeftCoord > LIMIT_RIGHT_X - MAIN_PIN_WIDTH) {
      metka.style.left = LIMIT_RIGHT_X - MAIN_PIN_WIDTH + 'px';
    }

    var showedCoordsTop = metka.offsetTop - shift.y;
    var showedCoordsLeft = metka.offsetLeft - shift.x;
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
