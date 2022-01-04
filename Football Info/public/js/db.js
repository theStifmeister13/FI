const dbPromised = idb.open("favorite-schedule", 1, function (upgradeDb) {
  const scheduleObjectStore = upgradeDb.createObjectStore("schedules", {
    keyPath: "id",
  });
});

export function saveFavorite(schedule) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("schedules", "readwrite");
      var store = tx.objectStore("schedules");
      console.log(schedule);
      store.add(schedule.match);
      return tx.complete;
    })
    .then(function () {
      alert("Schedule berhasil di simpan.");
    })
    .catch(err => alert(err))
}

export function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("schedules", "readonly");
        var store = tx.objectStore("schedules");
        return store.getAll();
      })
      .then(function (schedules) {
        resolve(schedules);
      });
  });
}

export function deleteSchedule(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("schedules", "readwrite");
        var store = tx.objectStore("schedules");
        console.log(id)
        store.delete(parseInt(id));
        return tx.complete;
      })
      .then(function (schedules) {
        resolve(schedules);
        alert("Item deleted");
      });
  });
}
