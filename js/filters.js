'use strict';

(function () {
  var ANY_VALUE = 'any';

  var map = document.querySelector('.map');
  var mapFilterFields = map.querySelector('.map__filters');

  var PriceRange = function (min, max) {
    this.min = min;
    this.max = max;
  };

  PriceRange.prototype.contains = function (price) {
    return price >= this.min && (price <= this.max || !this.max);
  };

  var AdvertsTypes = function () {
    this.any = ANY_VALUE;
    this.field = mapFilterFields.querySelector('#housing-type');
  };

  AdvertsTypes.prototype.justify = function (data) {
    return this.field.value === data.offer.type || this.field.value === this.any;
  };

  var AdvertsPrice = function () {
    this.any = ANY_VALUE;
    this.prices = {
      low: new PriceRange(0, 10000),
      middle: new PriceRange(10000, 50000),
      high: new PriceRange(50000)
    };
    this.field = mapFilterFields.querySelector('#housing-price');
  };

  AdvertsPrice.prototype.justify = function (data) {
    var price = this.prices[this.field.value];
    return !price || price.contains(data.offer.price) || this.field.value === this.any;
  };

  var AdvertsRooms = function () {
    this.any = ANY_VALUE;
    this.field = mapFilterFields.querySelector('#housing-rooms');
  };

  AdvertsRooms.prototype.justify = function (data) {
    return parseInt(this.field.value, 10) === data.offer.rooms || this.field.value === this.any;
  };

  var AdvertsGuests = function () {
    this.any = ANY_VALUE;
    this.field = mapFilterFields.querySelector('#housing-guests');
  };

  AdvertsGuests.prototype.justify = function (data) {
    return parseInt(this.field.value, 10) === data.offer.guests || this.field.value === this.any;
  };

  var AdvertsFeatures = function () {
    this.field = Array.from(mapFilterFields.querySelectorAll('#housing-features .map__checkbox'));
  };

  AdvertsFeatures.prototype.justify = function (data) {
    return this.field.every(function (option) {
      return data.offer.features && data.offer.features.includes(option.value) || option.checked === false;
    });
  };

  var AdvertsFilter = function () {
    this.result = [];
    this.result.push(new AdvertsTypes());
    this.result.push(new AdvertsPrice());
    this.result.push(new AdvertsRooms());
    this.result.push(new AdvertsGuests());
    this.result.push(new AdvertsFeatures());
  };

  AdvertsFilter.prototype.justify = function (data) {
    return this.result.every(function (filter) {
      return filter.justify(data);
    });
  };

  AdvertsFilter.prototype.filter = function (array) {
    return array.filter(function (data) {
      return this.justify(data);
    }, this);
  };

  window.filters = {
    adverts: new AdvertsFilter()
  };
})();
