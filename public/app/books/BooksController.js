(function() {

    angular.module('app')
        .controller('BooksController', ['books', 'dataService', 'badgeService','$cookies', '$cookieStore', BooksController]);


    function BooksController(books, dataService, badgeService, $cookies, $cookieStore) {

        var vm = this;

        vm.appName = books.appName;
        dataService.getAllBooks()
          .then(getBooksSuccess, null, getBooksNotification)
          .catch(errorCallback)
          .finally(lastTry);

        function getBooksSuccess(books) {
          vm.allBooks = books;
        }

        function errorCallback(errorMsg) {
          console.log('Error message:' + errorMsg);
        }

        function lastTry() {
            console.log('Finally: Tried everything');
        }

        dataService.getAllReaders()
          .then(getReadersSuccess)
          .catch(errorCallback)
          .finally(getAllReadersComplete);

        function getReadersSuccess(readers) {
          vm.allReaders = readers;
        }

        function getAllReadersComplete() {
          console.log("Did everything for readers");
        }


        function getBooksNotification(status) {
            console.log(status);
        }

        vm.getBadge = badgeService.retrieveBadge;
        console.log("cookies:");
        console.log($cookies);
        vm.favoriteBook = $cookies.get('favoriteBook');

        vm.lastEdited = $cookieStore.get('lastEdited');
    }

}());