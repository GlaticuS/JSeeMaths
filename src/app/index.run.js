(function() {
  'use strict';

  angular
    .module('jseeMath')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
