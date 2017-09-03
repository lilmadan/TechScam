(function() {
    'use strict';

    angular.module('app')
        .service('todoListService', [
            '$q',
            '$http',
            todoList
        ]);

    function todoList($q, $http) {
        var languages = [{
                name: 'Java',
                text: 'Java',
                imgUrl: 'https://image.flaticon.com/icons/svg/226/226777.svg',
                gitRepoUrl: 'https://api.github.com/search/repositories?q=language:java',
                desc: 'is a general-purpose computer programming language that is concurrent, class-based, object-oriented, and specifically designed to have as few implementation dependencies as possible.',
                wikiLink : 'https://en.wikipedia.org/wiki/Java_(programming_language)'
            },
            {
                name: 'JavaScript',
                text: 'Java Script',
                imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
                gitRepoUrl: 'https://api.github.com/search/repositories?q=language:JavaScript',
                wikiLink : 'https://en.wikipedia.org/wiki/JavaScript',
                desc: 'is a high-level, dynamic, weakly typed, object-based, multi-paradigm, and interpreted programming language. Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production.'
            },
            {
                name: 'python',
                text: 'Python',
                imgUrl: 'https://www.python.org/static/opengraph-icon-200x200.png',
                gitRepoUrl: 'https://api.github.com/search/repositories?q=language:python',
                desc : 'is a widely used high-level programming language for general-purpose programming, created by Guido van Rossum and first released in 1991.',
                wikiLink: 'https://en.wikipedia.org/wiki/Python_(programming_language)'
            },
            {
                name: 'PHP',
                text: 'PHP',
                imgUrl: 'https://corephp-corephp.netdna-ssl.com/components/com_wordpress/wp/wp-content/uploads/2014/01/php-logo.png',
                gitRepoUrl: 'https://api.github.com/search/repositories?q=language:php',
                desc : 'is a server-side scripting language designed primarily for web development but also used as a general-purpose programming language.',
                wikiLink: 'https://en.wikipedia.org/wiki/PHP'
            },
            {
                name: 'Ruby',
                text: 'Ruby',
                imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1024px-Ruby_logo.svg.png',
                gitRepoUrl: 'https://api.github.com/search/repositories?q=language:Ruby',
                desc : 'Ruby is a dynamic, reflective, object-oriented, general-purpose programming language. It was designed and developed in the mid-1990s by Yukihiro "Matz" Matsumoto in Japan.',
                wikiLink: 'https://en.wikipedia.org/wiki/Ruby_(programming_language)'
            },
        ];

        var languageCounts = {};

        function callAjaxService(url, type, successFunction, errFunction) {
            $http({
                method: type,
                url: url
            }).then(successFunction, errFunction);
        }

        return {
            loadAllItems: function() {
                return $q.when(languages);
            },
            setLanguageCounts : function(obj) {              
              languageCounts = obj;
            },
            getLanguageCounts : function() {
              return languageCounts;
            },
            callAjaxService: callAjaxService
        };
    }
})();