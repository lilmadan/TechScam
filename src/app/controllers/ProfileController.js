(function() {

    angular
        .module('app')
        .controller('ProfileController', ['todoListService', '$state',
            ProfileController
        ]);

    function ProfileController(todoListService, $state) {
        var vm = this;

        var baseUrl = 'https://api.github.com/search/users?q=' + $state.params.profileId;

        activate();

        function activate() {
          getUser();
        }

        function getUser() {
            todoListService.callAjaxService(baseUrl + '&page=1&per_page=1', 'GET', function(response) {
                if (response.data) {
                    response = response.data;
                    if (response.items && response.items.length > 0) {
                        vm.user = response.items[0];
                        getRepoDetails();
                    }
                }
            }, function(err) {
                showSimpleToast('Some Error occurred while calling server');
                //console.log(err);
            });
        }

        function getRepoDetails() {
            todoListService.callAjaxService('https://api.github.com/users/' + $state.params.profileId + '/repos', 'GET', function(response) {
                if (response.data) {
                    response = response.data;
                    if (response.length > 0) {
                        vm.repos = response;
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
    }

})();