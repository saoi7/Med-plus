// created by Yi Song October 2021 
// reference  https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/
// updated by Rory O'Hare 08/12/12

import './App.css';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage';
import LandingPage from '../LandingPage';
import ManageMedsPage from '../ManageMedsPage';
import ProfilePage from '../ProfilePage';
import AddMedPage from '../AddMedPage';
import EditMedPage from '../EditMedPage';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import PasswordForgetPage from '../PasswordForget';
import AdminPage from '../Admin';
import SignOutButton from '../SignOut';
import DocSignIn from '../DoctorSignIn';
import ManagePatientPage from '../DoctorHome';
import AddPatientPage from '../AddPatient';
import SelectPatientPage from '../SelectPatientPage';
import * as ROUTES from '../../constants/routes';

import { withAuthentication } from '../Session';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

// TODO not all of these routes are accessible through navigating the app (e.g. signout)
function App() {
    return (
        <Router>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_OUT} component={SignOutButton} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.MANAGE_MEDS} component={ManageMedsPage} />
            <Route path={ROUTES.ACCOUNT} component={ProfilePage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
            <Route path={ROUTES.ADD_MED} component={AddMedPage} />
            <Route path={ROUTES.EDIT_MED} component={EditMedPage} />
            <Route path={ROUTES.DOCTOR_SIGN_IN} component={DocSignIn} />
            <Route path={ROUTES.DOCTOR_HOME} component={ManagePatientPage} />
            <Route path={ROUTES.ADD_PATIENT} component={AddPatientPage} />
            <Route path={ROUTES.SELECT_PATIENT} component={SelectPatientPage} />
        </Router>
    );
}

export default withAuthentication(App);
