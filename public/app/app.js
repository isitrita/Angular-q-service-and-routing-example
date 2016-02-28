(function() {

    var app = angular.module('app', ['ngRoute', 'ngCookies']);

    app.provider('books', ['constants', function (constants) {

        var includeVersionInTitle = false;
        this.setIncludeVersionInTitle = function (value) {
            includeVersionInTitle = value;
        };

        this.$get = function () {

            var appName = constants.APP_TITLE;
            var version = constants.APP_VERSION;

            if (includeVersionInTitle) {
              appName += ' ' + version;
            }

            var appDesc = constants.APP_DESCRIPTION;

            return {
              appName: appName,
              appDesc: appDesc
            };
        };

    }]);

    app.config(['booksProvider', '$routeProvider' function (booksProvider, $routeProvider) {

      booksProvider.setIncludeVersionInTitle(true);
      $routeProvider
        .when('/',{
          templateUrl: '/app/templates/books.html',
          controller: 'BooksController',
          controllerAs: 'books'
        })
        .when('/AddBook',{
          templateUrl: '/app/templates/addBooks.html',
          controller: 'AddBookController',
          controllerAs: 'addBooks'
        })
        .when('/EditBook/:bookID', {
          templateUrl: '/app/templates/editBook.html',
          controller: 'EditBookController',
          controllerAs: 'bookEditor',
          resolve: {
            books: function (dataService) {
              return dataService.getAllBooks();
            }
          }
        })
        .otherwise('/');
    }]);

    app.run(['$rootScope', function ($rootScope) {
      $rootScope.$on('$routeChangeSuccess',function (event, current, previous) {
        console.log('successfully changed routes');
      });

      $rootScope.$on('$routeChangeError', function (event,current, previous, rejection) {
        console.log('error changing routes');

        console.log(event);
        console.log(current);
        console.log(previous);
        console.log(rejection);
      });
    }])

}());