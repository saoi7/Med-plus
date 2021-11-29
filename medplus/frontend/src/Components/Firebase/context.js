// created by Yi Song October 2021 
// reference  https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/
// updated by

import React from 'react';
 
const FirebaseContext = React.createContext(null);
 
export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
