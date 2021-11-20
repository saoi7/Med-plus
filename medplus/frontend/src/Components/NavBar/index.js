import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import * as ROUTES from '../../constants/routes';

function NavBar() {
    return (
        <nav className="nav-bar">
            <Link to={ROUTES.HOME} className="font-medium">
                Reminders
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

export default NavBar;
