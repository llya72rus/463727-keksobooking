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
  var limitedIndexes = randomIndexes.slice(0, getRandomInt(5));
  var result = [];
  for (var i = 0; i < limitedIndexes.length; i++) {
    var idx = limitedIndexes[i];
    result[i] = array[idx];
  }
  return result;
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
    }
  };

  ads.push(ad);
}

document.querySelector('.map').classList.remove('map--faded');

var pin = document.querySelector('.map__pin');

var renderPin = function (object) {
  var pinClone = pin.cloneNode(true);
  pinClone.style = 'left: ' + (object.location.x + 33) + 'px' + '; top: ' + (object.location.y + 87) + 'px';
  pinClone.querySelector('img').src = object.author.avatar;
  pinClone.querySelector('img').alt = object.offer.title;

  return pinClone;
};

var fragmentPins = document.createDocumentFragment();

for (var index = 0; index < ads.length; index++) {
  fragmentPins.appendChild(renderPin(ads[index]));
}

var pins = document.querySelector('.map__pins');
pins.appendChild(fragmentPins);


var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderCard = function (card) {
  var cardClone = cardTemplate.cloneNode(true);
  cardClone.querySelector('.popup__title').textContent = card.offer.title;
  cardClone.querySelector('.popup__text--address').textContent = card.offer.address;
  cardClone.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  switch (card.offer.types) {
    case 'bungalo':
      cardClone.querySelector('.popup__type').textContent = 'Бунгало';
      break;

    case 'house':
      cardClone.querySelector('.popup__type').textContent = 'Дом';
      break;

    case 'palace':
      cardClone.querySelector('.popup__type').textContent = 'Дворец';
      break;

    default:
      cardClone.querySelector('.popup__type').textContent = 'Квартира';
  }
  cardClone.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardClone.querySelector('.popup__features').textContent = card.offer.features;
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

var fragmentCard = document.createDocumentFragment();

fragmentCard.appendChild(renderCard(ads[0]));

document.querySelector('.map').appendChild(fragmentCard);
