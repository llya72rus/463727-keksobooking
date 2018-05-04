'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var CARD_PHOTO_WIDTH = 45;
  var CARD_PHOTO_HEIGHT = 45;
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var pageTemplate = document.querySelector('template').content;
  var cardTemplate = pageTemplate.querySelector('.map__card');
  var filterContainer = map.querySelector('.map__filters-container');
  var pinsList = map.querySelector('.map__pins');

  var Adverts = {
    all: [],
    filtered: []
  };

  var cardEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  var openCard = function (evt) {
    renderCard(Adverts.filtered[evt.currentTarget.dataset.id]);
  };

  var closeCard = function () {
    var advertCard = map.querySelector('.map__card');
    if (advertCard) {
      advertCard.remove();
      advertCard.querySelector('.popup__close').removeEventListener('click', closeCard);
      document.removeEventListener('keydown', cardEscHandler);
    }
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
      pin.removeEventListener('click', openCard);
    });
  };

  var createCardFeatures = function (data) {
    var featuresFragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var featuresItem = document.createElement('li');
      featuresItem.classList.add('popup__feature');
      featuresItem.classList.add('popup__feature--' + data[i]);
      featuresFragment.appendChild(featuresItem);
    }
    return featuresFragment;
  };

  var createCardPhotos = function (data) {
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var photosItem = document.createElement('img');
      photosItem.src = data[i];
      photosItem.classList.add('popup__photo');
      photosItem.width = CARD_PHOTO_WIDTH;
      photosItem.height = CARD_PHOTO_HEIGHT;
      photosItem.alt = 'Фотография жилья';
      photosFragment.appendChild(photosItem);
    }
    return photosFragment;
  };

  var createCard = function (data) {
    var cardItem = cardTemplate.cloneNode(true);
    cardItem.querySelector('.popup__avatar').src = data.author.avatar;
    cardItem.querySelector('.popup__title').textContent = data.offer.title;
    cardItem.querySelector('.popup__text--address').textContent = data.offer.address;
    cardItem.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardItem.querySelector('.popup__type').textContent = window.data.types[data.offer.type].name;
    cardItem.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardItem.querySelector('.popup__text--time').textContent = 'заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardItem.querySelector('.popup__features').innerHTML = '';
    if (data.offer.features.length > 0) {
      cardItem.querySelector('.popup__features').appendChild(createCardFeatures(data.offer.features));
    } else {
      cardItem.querySelector('.popup__features').remove();
    }
    cardItem.querySelector('.popup__description').textContent = data.offer.description;
    cardItem.querySelector('.popup__photos').innerHTML = '';
    if (data.offer.photos.length > 0) {
      cardItem.querySelector('.popup__photos').appendChild(createCardPhotos(data.offer.photos));
    } else {
      cardItem.querySelector('.popup__photos').remove();
    }
    cardItem.querySelector('.popup__close').addEventListener('click', closeCard);
    return cardItem;
  };

  var createPin = function (data, id) {
    var pinTemplate = pageTemplate.querySelector('.map__pin');
    var pinItem = pinTemplate.cloneNode(true);
    pinItem.dataset.id = id;
    pinItem.style.left = (data.location.x - PIN_WIDTH / 2) + 'px';
    pinItem.style.top = (data.location.y - PIN_HEIGHT) + 'px';
    pinItem.querySelector('img').src = data.author.avatar;
    pinItem.querySelector('img').alt = data.offer.title;
    pinItem.addEventListener('click', openCard);
    return pinItem;
  };

  var showPins = function (data) {
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      pinFragment.appendChild(createPin(data[i], i));
    }
    pinsList.appendChild(pinFragment);
  };

  var renderCard = function (data) {
    var advert = createCard(data);
    var advertCard = map.querySelector('.map__card');
    if (advertCard) {
      map.replaceChild(advert, advertCard);
    } else {
      map.insertBefore(advert, filterContainer);
      document.addEventListener('keydown', cardEscHandler);
    }
  };

  var renderPins = window.util.debounce(function () {
    Adverts.filtered = window.filters.adverts.filter(Adverts.all).slice(0, 5);
    removeAdverts();
    showPins(Adverts.filtered);
  }, 500);

  var initAdverts = function (data) {
    Adverts.all = data;
    renderPins();
  };

  var removeAdverts = function () {
    closeCard();
    removePins();
  };

  var mapFiltersList = Array.from(map.querySelector('.map__filters').elements);
  mapFiltersList.forEach(function (field) {
    field.addEventListener('change', renderPins);
  });

  window.adverts = {
    init: initAdverts,
    remove: removeAdverts
  };
})();
