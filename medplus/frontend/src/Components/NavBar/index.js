import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

function NavBar({ firebase }) {
    return (
        <nav className="nav-bar">
            <Link to={ROUTES.LANDING} onClick={firebase.doSignOut} className="font-medium">
                Sign Out
            </Link>
            <Link to={ROUTES.HOME} className="font-medium">
                <HiHome />
            </Link>
            <Link to={ROUTES.ACCOUNT} className="font-medium">
                Profile
            </Link>
        </nav>
    );
}

export default withFirebase(NavBar);
