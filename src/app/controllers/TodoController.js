(function () {
    angular
        .module('app')
        .controller('TodoController', [
            'todoListService',
            '$location',
            TodoController
        ]);

    function TodoController(todoListService, $location) {
        var vm = this;

        vm.navigateToDetail = navigateToDetail;
        vm.languages = [];

        todoListService
            .loadAllItems()
            .then(function (languages) {
                vm.languages = [].concat(languages);
            });

        function navigateToDetail(language) {
            $location.path('/repo/' + language.name)
        }
    }
})();
