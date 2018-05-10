'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var OfferType = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var createFeatureElement = function (featureData) {
    var featureElement = document.createElement('li');

    featureElement.classList.add('popup__feature', 'popup__feature--' + featureData);
    featureElement.textContent = featureData;

    return featureElement;
  };

  var createPhotoElement = function (photoData) {
    var photoElement = document.createElement('img');

    photoElement.classList.add('popup__photo');
    photoElement.width = '45';
    photoElement.height = '40';
    photoElement.alt = 'Фотография жилья';
    photoElement.src = photoData;

    return photoElement;
  };

  var createCardElement = function (cardTemplate) {
    var cardItemElement = cardTemplate.cloneNode(true);
    var btnCloseItemElement = cardItemElement.querySelector('.popup__close');

    var hideCardItemElement = function () {
      cardItemElement.classList.add('hidden');
    };

    hideCardItemElement();

    window.hideCardOnEscapeKeyPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        hideCardItemElement();
        document.removeEventListener('keydown', window.hideCardOnEscapeKeyPress);
      }
    };

    document.addEventListener('keydown', window.hideCardOnEscapeKeyPress);

    btnCloseItemElement.addEventListener('click', hideCardItemElement);

    return cardItemElement;
  };

  window.fillCardElement = function (data) {
    var offer = data.offer;

    var photosElement = window.cardElement.querySelector('.popup__photos');
    var featuresListElement = window.cardElement.querySelector('.popup__features');

    window.cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    var textContentCard = {
      '.popup__title': offer.title,
      '.popup__text--address': offer.address,
      '.popup__text--price ': offer.price + '₽/ночь',
      '.popup__type': OfferType[offer.type],
      '.popup__text--capacity': offer.rooms + ' комнат(ы) для ' + offer.guests + ' гостей(я)',
      '.popup__text--time': 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout,
      '.popup__description': offer.description
    };

    for (var selector in textContentCard) {
      if (textContentCard.hasOwnProperty(selector)) {
        window.cardElement.querySelector(selector).textContent = textContentCard[selector];
      }
    }


    featuresListElement.innerHTML = '';
    for (var i = 0; i < offer.features.length; i++) {
      featuresListElement.appendChild(createFeatureElement(offer.features[i]));
    }

    photosElement.innerHTML = '';
    for (i = 0; i < offer.photos.length; i++) {
      photosElement.appendChild(createPhotoElement(offer.photos[i]));
    }

    document.addEventListener('keydown', window.hideCardOnEscapeKeyPress);
    window.cardElement.classList.remove('hidden');
  };

  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  window.cardElement = createCardElement(cardTemplate);
})();
