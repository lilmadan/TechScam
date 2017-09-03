(function() {
    angular
        .module('app')
        .controller('MemoryController', [
            'todoListService',
            '$mdToast',
            '$window',
            MemoryController
        ]);

    function MemoryController(todoListService, $mdToast, $window) {
        var vm = this;

        vm.memoryChartData = [];
        var languages = languageCounts = {};

        todoListService
            .loadAllItems()
            .then(function(todos) {
                languages = [].concat(todos);
                showSimpleToast('Loading Language Metrics');
                getLanguageCounts();
            });

        //NOTE:As I found no API to get distinct count of languages, the following is being used.
        //TODO: Find an API that suits this requirement
        function getLanguageCounts() {
            showSimpleToast('Loading Language Metrics');
            languages.map(function(language) {
                todoListService.callAjaxService(language.gitRepoUrl, 'GET', function(response) {
                    if (response.data) {
                        response = response.data;
                        if (response.items && response.items.length > 0 && response.items[0].language) {
                            //Get Language from first Object....
                            languageCounts[response.items[0].language] = response.total_count;
                            //NOTE: THIS CAN BE DONE WITH ANGULAR FACTORY. JUST SHOWING OFF CAPABILITY & SIMPLICITY OF $window
                            $window.localStorage.setItem('repoCounts', JSON.stringify(languageCounts));
                            vm.memoryChartData.push({ key: response.items[0].language, values: [{ value: response.total_count, label: response.items[0].language }] });
                        }
                    }
                }, function(err) {
                    showSimpleToast('Some Error occurred while calling server');
                    //console.log(err);
                });
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

        vm.chartOptions = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                x: function(d) { return d.label; },
                y: function(d) { return d.value; },
                showControls: false,
                showValues: true,
                duration: 500,
                xAxis: {
                    showMaxMin: false
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d) {
                        return d3.format(',.2f')(d);
                    }
                },
                tooltip: {
                    enable: false
                }
            }
        };
    }
})();