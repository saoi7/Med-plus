// created by Yi Song October 2021 
// reference  https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/
// updated by

import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import config from '../../constants/env_config';

/*
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
*/

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  currentUser = () => {
    return this.db.ref(`users/${this.auth.currentUser.uid}`);
  }

  currentUserUID = () => { return this.auth.currentUser.uid; }

  TEST_schedules = (med_name, uid = this.auth.currentUser.uid) => {
    let db_path_str = `TEST_schedules/${uid}/`;
    if (med_name)
      db_path_str += `${med_name}/`
    return this.db.ref(db_path_str);
  }

  TEST_taken = (date_string) => {
    const uid = this.auth.currentUser.uid;
    return this.db.ref(`TEST_taken/${uid}/${date_string}/`);
  }

  patients = (patient_name, uid = this.auth.currentUser.uid) => {
    let db_path_str = `patients/${uid}/`;
    if (patient_name)
      db_path_str += `${patient_name}/`
    return this.db.ref(db_path_str);
  }

  // get firebase ref for this user's med list AND
  // the refs for the med lists that other accounts
  // have shared with this user
  //getAllAvailableMedListRefs = () => {
  //  TODO update this to return shared users lists
  //  const uid = this.auth.currentUser.uid;
  //  return [ this.db.ref(`TEST_schedules/${uid}`) ];
  //}

  getShareeOfRef = () => {
    const uid = this.auth.currentUser.uid;
    return this.db.ref(`users/${uid}/sharee_of`);
  }
}

export default Firebase;
