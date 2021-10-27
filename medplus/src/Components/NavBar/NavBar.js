import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';

function NavBar() {
    return (
        <nav className="nav-bar">
            <Link to="/home" className="font-medium">
                Reminders
            </Link>
            <Link to="/home" className="font-medium">
                <HiHome />
            </Link>
            <Link to="/profile" className="font-medium">
                Profile
            </Link>
        </nav>
    );
}

export { NavBar };
