'use strict';


var xx = '0' + Math.floor((Math.random() * 8) + 1);

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];


var getRandomInt = function (limit) {
  return Math.round(Math.random() * limit);
};

var getRandomArrayElem = function (arr) {
  var index = getRandomInt(arr.length - 1);
  return arr[index];
};

var ads = [
  {
    'author': {
      'avatar': 'img/avatars/user{{' + xx + '}}.png',
    },

    'offer': {
      'title': getRandomArrayElem(titles)
    }
  }
];

var a = ads[0];
var b = a.offer;
var c = b.title;
// console.log(c);
