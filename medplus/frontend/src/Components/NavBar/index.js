import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

function NavBar({ firebase }) {
    return (
        <nav className="nav-bar background-grey">
            <Link to={ROUTES.LANDING} onClick={firebase.doSignOut} className="nav-bar-button font-medium background-grey-hover">
                Sign Out
            </Link>
            <Link to={ROUTES.HOME} className="nav-bar-button font-medium background-grey-hover">
                <HiHome />
            </Link>
            <Link to={ROUTES.ACCOUNT} className="nav-bar-button font-medium background-grey-hover">
                Profile
            </Link>
        </nav>
    );
}

export default withFirebase(NavBar);
