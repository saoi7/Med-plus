import './App.css';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage';
import LandingPage from '../LandingPage';
import EditPage from '../EditPage';
import ProfilePage from '../ProfilePage';
import AddMedPage from '../AddMedPage';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import PasswordForgetPage from '../PasswordForget';
import AdminPage from '../Admin';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { withAuthentication } from '../Session';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

// TODO all routes except for login, register and landing page should redirect to the landing page unless user is authenticated

// TODO move fonts into CSS classes and re-use anywhere there is text

// TODO not all of these routes are accessible through navigating the app
// TODO move all route strings to constants/routes.js
function App() {
    return (
        <Router>
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_OUT} component={SignOutButton} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path="/edit" component={EditPage} />
            <Route path={ROUTES.ACCOUNT} component={ProfilePage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} /> 
            <Route path="/add-med" component={AddMedPage} />
        </Router>
    );
}

export default withAuthentication(App);
