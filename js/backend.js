'use strict';

(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT_VALUE = 10000;
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var ErrorMessage = {
    load: 'Статус ответа: ',
    error: 'Произошла ошибка соединения',
    timeout: 'Привышен лимит ожидания: '
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          onLoad();
        } else {
          onError(ErrorMessage.load + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError(ErrorMessage.error);
      });
      xhr.addEventListener('timeout', function () {
        onError(ErrorMessage.timeout + xhr.timeout);
      });

      xhr.timeout = TIMEOUT_VALUE;

      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          onLoad(xhr.response);
        } else {
          onError(ErrorMessage.load + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError(ErrorMessage.error);
      });
      xhr.addEventListener('timeout', function () {
        onError(ErrorMessage.timeout + xhr.timeout);
      });

      xhr.timeout = TIMEOUT_VALUE;

      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  };
})();
