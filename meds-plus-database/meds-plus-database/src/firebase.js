import firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "AIzaSyDWVg9PAoriXWMDubMKxx7sVvY0j4qcmPw",
  authDomain: "medication-reminder-8b42b.firebaseapp.com",
  databaseURL: "https://medication-reminder-8b42b-default-rtdb.firebaseio.com",
  projectId: "medication-reminder-8b42b",
  storageBucket: "medication-reminder-8b42b.appspot.com",
  messagingSenderId: "871079230196",
  appId: "1:871079230196:web:31f5c6957915a0b1b8bca1",
  measurementId: "G-GRCRP47F3W"
};

firebase.initializeApp(config);

export default firebase.database();
