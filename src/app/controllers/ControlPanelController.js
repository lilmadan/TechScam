(function() {

    angular
        .module('app')
        .controller('ControlPanelController', [
            '$mdDialog', 'todoListService', '$state', '$mdToast', '$location', '$scope',
            ControlPanelController
        ]);

    function ControlPanelController($mdDialog, todoListService, $state, $mdToast, $location, $scope) {
        var vm = this;

        vm.repos = [];
        vm.codeCount = '25k';
        vm.commitCount = '35k';
        vm.issueCount = '28k';
        vm.users = '19k';
        vm.wiki = '10k';
        vm.filter = '';
        vm.flip = flip;
        vm.asc = true;
        vm.navigateToDetail = navigateToDetail;


        var baseUrl = 'https://api.github.com/search/repositories?q=';


        $scope.selected = [];
        vm.totalItems = 0;
        $scope.query = {
            order: (vm.asc) ? 'asc' : 'desc',
            limit: 9,
            page: 1,
            pageArray: [9, 18, 27, 36, 45]
        };

        $scope.render = function(T) {
            return T;
        }
        var lastQuery = null;

        vm.sortOrder = function() {
            vm.asc = !vm.asc;
            $scope.query.page = 1;
            $scope.query.order = (vm.asc) ? 'asc' : 'desc';
            vm.getItems();
        }

        vm.filterResult = function() {            
            $scope.query.page = 1;
            vm.getItems();
        }

        vm.getItems = function() {
            /**
             * I don't know why this function is being called too many times,
             * it supposed to call once per pagination, so the next 3 lines are only to avoid
             * multiple requests. 
             */
            var query = JSON.stringify($scope.query);
            if (query == lastQuery) return;
            lastQuery = query;
            getRepos();

        }

        activate();

        function activate() {
            getRepos();
        }

        function flip() {
            //console.log('ok');
        }


        function getRepos() {
            vm.repos = [];
            todoListService.callAjaxService(baseUrl + vm.filter + ':language=' + $state.params.repoId + '&page=' + $scope.query.page + '&per_page=' + $scope.query.limit + '&order=' + $scope.query.order, 'GET', function(response) {
                if (response.data) {
                    response = response.data;
                    vm.totalItems = response.total_count;
                    if (response.items && response.items.length > 0) {
                        vm.repos = response.items;
                    }
                }
            }, function(err) {
                showSimpleToast('Some Error occurred while calling server');
                //console.log(err);
            });
        }

        function showSimpleToast(title) {
            $mdToast.show(
                $mdToast.simple()
                .content(title)
                .hideDelay(2000)
                .position('bottom right')
            );
        }

        function navigateToDetail(owner) {
            $location.path('/profile/' + owner.login)
        }


    }

})();