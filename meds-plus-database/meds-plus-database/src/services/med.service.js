import firebase from "../firebase";

const db = firebase.ref("/meds");

class MedDataService {
  getAll() {
    return db;
  }

  create(med) {
    return db.push(med);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new MedDataService();
