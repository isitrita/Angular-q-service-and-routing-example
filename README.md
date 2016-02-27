##### To run:
`node ./server.js`

####     Promises and $q service
$q для того, чтобы легко имплементировать асинхронный

`$cookies` and `$cookieStore` and `$log`

:sparkling_heart:
*Мартин Фаулер*:
> Promises in JavaScript are objects which represents the pending result of an asynchronous operation.

$q service

#### Асинхронные вызовы с $q:

##### Клиент:
Это компонент или функция, которая хочет сделать некоторую работу асинхронно
######  обязанности Клиента:
 - Он инициализурует асинхронный вызов к сервису
 - Когда клиент получает promise, он может использовать его API, чтобы конфигурировать callback functions,  чтобы использовать их, когда работа сервиса будет завершена.
 - Когда клиент получает сигнал о том, что работа завершена, он может выполнить callback functions.

##### Сервис:
Это компонент, который будет эту работу выполнять и оповестит клиент, когда эта работа будет сделана.
######  Обязанности Сервиса:
- Когда сервис впервые получает асинхронный запрос, он использует $q сервис для того, чтобы создать *deffered object*.  *Deffered object* - это такой объект, через который сервис оповещает клиента об асинхронном статусе. После создания, deffered object немедленно отдает сервису promise

- Делает асинхронную работу
- Использует deffered API, чтобы сигнализировать клиенту о результатах.

Example:

In `dataService.js`:
```javascript
var deferred = $q.defer();
$timeout(function () {
  deferred.resolve(readersArray);
}, 1500);

return deferred.promise;
```

 In `BookController.js`:
```javascript
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
```