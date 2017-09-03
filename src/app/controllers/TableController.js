(function(){

  angular
    .module('app')
    .controller('TableController', [
      'todoListService',
      '$state',
      '$window',
      TableController
    ]);

  function TableController(todoListService, $state, $window) {
    var vm = this;

    vm.name = $state.params.repoId;

    vm.languageRepoCount = JSON.parse($window.localStorage.getItem('repoCounts'))[$state.params.repoId];
  }

})();
