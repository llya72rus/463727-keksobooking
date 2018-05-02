'use strict';
window.util = (function () {
  return {
    getRandomIntOutOfRange: function (min, max) {
      var length = max - min;
      var rand = Math.round(Math.random() * length) + min;
      return rand;
    },
    getRandomInt: function (limit) {
      return Math.floor(Math.random() * limit);
    },
    getRandomArrayElem: function (arr) {
      var index = window.util.getRandomInt(arr.length - 1);
      return arr[index];
    },
    getUniqueItem: function (arr, limit) {
      var randomIdx = window.util.getRandomInt(limit);
      if (arr.includes(randomIdx)) {
        return window.util.getUniqueItem(arr, limit);
      }

      return randomIdx;
    },

    generateRandomSequence: function (limit) {
      var result = [];
      while (result.length < limit) {
        var randomItem = window.util.getUniqueItem(result, limit);
        result.push(randomItem);
      }

      return result;
    },

    shuffle: function (array) {
      var randomIndexes = window.util.generateRandomSequence(array.length);
      var limitedIndexes = randomIndexes.slice(0, window.util.getRandomInt(6));
      var result = [];
      for (var i = 0; i < limitedIndexes.length; i++) {
        var idx = limitedIndexes[i];
        result[i] = array[idx];
      }
      return result;
    }
  };
})();
