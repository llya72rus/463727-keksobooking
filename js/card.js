'use strict';
(function () {
  window.active = false;

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

  window.ads = [];

  for (var i = 0; i < 8; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + window.util.getRandomIntOutOfRange(1, 8) + '.png',
      },

      'offer': {
        'title': window.util.getRandomArrayElem(window.titles),
        'address': 'location.' + window.util.getRandomIntOutOfRange(300, 900) + ' location.' + window.util.getRandomIntOutOfRange(150, 500),
        'price': window.util.getRandomIntOutOfRange(1000, 1000000),
        'types': window.util.getRandomArrayElem(window.buildingTypes),
        'guests': window.util.getRandomIntOutOfRange(1, 20),
        'rooms': window.util.getRandomIntOutOfRange(1, 5),
        'checkin': window.util.getRandomArrayElem(window.times),
        'checkout': window.util.getRandomArrayElem(window.times),
        'features': window.util.shuffle(window.availableFeatures),
        'descrtiption': '',
        'photos': window.util.generateRandomSequence(window.availablePhotos.length)
      },

      'location': {
        'x': window.util.getRandomIntOutOfRange(300, 900),
        'y': window.util.getRandomIntOutOfRange(150, 500)
      },
      'index': i
    };

    window.ads.push(ad);
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
    generateIconsFeatures(featuresList, window.util.shuffle(window.availableFeatures));
    cardClone.querySelector('.popup__description').textContent = card.offer.description;
    cardClone.querySelector('.popup__avatar').src = card.author.avatar;
    var img = cardClone.querySelector('.popup__photos img');
    for (var q = 0; q < card.offer.photos.length; q++) {
      var imgClone = img.cloneNode(true);
      imgClone.src = window.availablePhotos[card.offer.photos[q]];
      cardClone.querySelector('.popup__photos').appendChild(imgClone);
    }
    cardClone.querySelector('.popup__photos').removeChild(img);
    return cardClone;
  };

  var ESC_KEYCODE = 27;

  var advertEscHandler = function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      closeAdvert();
    }
  };

  var closeAdvert = function () {
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', advertEscHandler);
  };

  window.pinsField = document.querySelector('.map__pins');


  document.querySelector('.map__pins').addEventListener('click', function (evt) {
    var target = evt.target;

    while (target !== null) {
      if (target.matches('.map__pin--main') && target.hasAttribute('data-id')) {
        var renderedCard = renderCard(window.ads[target.dataset.id]);
        deleteCard(document.querySelector('.popup'));
        document.querySelector('.map').appendChild(renderedCard);
        document.addEventListener('keydown', advertEscHandler);
        document.querySelector('.popup__close').addEventListener('click', function () {
          deleteCard(document.querySelector('.popup'));
        });
        break;
      }
      target = target.parentElement;
    }

  });
})();
