function getDBRequestObject() {
  var request = indexedDB.open("message_offline_database");

  request.onerror = (event) => {
    console.error("IndexedDB open failed :", event.target.errorCode);
  };

  request.onupgradeneeded = (event) => {
    this.createDatabaseStructure(event);
  };

  return request;
}

function getStoreObject(db) {
  var tx = db.transaction('message_offline', 'readwrite');
  return tx.objectStore('message_offline');
}

function createDatabaseStructure(event) {
  var db = event.target.result;

  var objStore = db.createObjectStore("message_offline", {keyPath : 'id', autoIncrement : true});

  objStore.createIndex('author', 'author', {unique : false});
  objStore.createIndex('content', 'content', {unique : false});
}

function clearOfflineMessages() {
  var request = this.getDBRequestObject();

  request.onsuccess = (event) => {
    var store = this.getStoreObject(event.target.result);

    store.clear();
  }
}

function saveMessageOffline(author, content) {
  var request = this.getDBRequestObject();

  request.onsuccess = (event) => {
    var store = this.getStoreObject(event.target.result);

    var rq = store.add({author : author, content : content});

    rq.onerror = (error) => {
      console.log('IndexedDB insert error : ' + error);
    };

    rq.onsuccess = (event) => {
      console.log('IndexedDB insert success');
    };
  };
}

function getAllOfflineMessages(success_callback) {
  var request = this.getDBRequestObject();

  request.onsuccess = (event) => {
    var store = this.getStoreObject(event.target.result);
    var rq = store.getAll();

    rq.onerror = (error) => {
      console.log('IndexedDB get all error : ' + error);
    };

    rq.onsuccess = (event) => {
      console.log('IndexedDB get all success');

      success_callback(event.target.result);
    };
  }
}
