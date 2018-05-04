'use strict';

(function () {
  var TIMEOUT_VALUE = 5000;

  window.alert = {
    getSuccessMessage: function () {
      var successBlock = document.querySelector('.success');
      successBlock.classList.remove('hidden');
      setTimeout(function () {
        successBlock.classList.add('hidden');
      }, TIMEOUT_VALUE);
      window.state.resetPage();
    },
    getErrorMessage: function (errorMessage) {
      var deleteError = function () {
        document.querySelector('.error-message').remove();
      };

      var errorBlock = document.createElement('div');
      errorBlock.classList.add('error-message');
      errorBlock.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorBlock);
      setTimeout(deleteError, TIMEOUT_VALUE);
    }
  };
})();
