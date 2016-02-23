 (function() {

    angular.module('app')
        // Now we are injecting $q service to perform data asynchroniusly
        // $timeout to simulate delay
        .factory('dataService', ['$q', '$timeout', dataService]);


    function dataService($q, $timeout) {

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };

        function getAllBooks() {
            // result instead just return
            var booksArray =  [
                {
                    book_id: 1,
                    title: 'Harry Potter and the Deathly Hallows',
                    author: 'J.K. Rowling',
                    yearPublished: 2000
                },
                {
                    book_id: 2,
                    title: 'The Cat in the Hat',
                    author: 'Dr. Seuss',
                    yearPublished: 1957
                },
                {
                    book_id: 3,
                    title: 'Encyclopedia Brown, Boy Detective',
                    author: 'Donald J. Sobol',
                    yearPublished: 1963
                }
            ];

            var deferred = $q.defer();

            $timeout(function () {
              var successful = true;
              if (successful) {
                deferred.notify('Just started gathering books');
                deferred.notify('Almost done..');
                deferred.resolve(booksArray);
              } else {
                deferred.reject('Error retrieving books.');
              }
            },1000);

            return deferred.promise;
        }

        function getAllReaders() {

            var readersArray = [
                {
                    reader_id: 1,
                    name: 'Marie',
                    weeklyReadingGoal: 315,
                    totalMinutesRead: 5600
                },
                {
                    reader_id: 2,
                    name: 'Daniel',
                    weeklyReadingGoal: 210,
                    totalMinutesRead: 3000
                },
                {
                    reader_id: 3,
                    name: 'Lanier',
                    weeklyReadingGoal: 140,
                    totalMinutesRead: 600
                }
            ];

            var deferred = $q.defer();
            $timeout(function () {
              deferred.resolve(readersArray);
            }, 1500);

            return deferred.promise;
        }
    }

}());