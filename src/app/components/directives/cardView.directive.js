(function() {
    'use strict';

    angular
        .module('app')
        .directive('flippy', messagesSectionDirective);

    function messagesSectionDirective() {
        return {
            restrict: 'EA',           
            link : function(scope, element, attrs) {
                scope.flipped = false;
                var options = {
                    flipDuration: (attrs.flipDuration) ? attrs.flipDuration : 400,
                    timingFunction: 'ease-in-out'
                };

                // setting flip options
                angular.forEach(['flippy-front', 'flippy-back'], function (name) {
                    var el = element.find(name);
                    if (el.length == 1) {
                        angular.forEach(['', '-ms-', '-webkit-'], function (prefix) {
                            angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration / 1000 + 's ' + options.timingFunction);
                        });
                    }
                });

                /**
                 * behaviour for flipping effect.
                 */
                scope.flip = function () {
                    element.toggleClass('flipped');
                    scope.flipped = !scope.flipped;
                }

            }
        };
    }
})();