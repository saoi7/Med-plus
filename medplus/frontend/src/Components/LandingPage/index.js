import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignInPage from '../SignIn';

function LandingPage() {
    return (
        <div className="background-image landing-layout">
            <div className="button-container flex-container flex-justify-content-space-around">
                <Link to={ROUTES.SIGN_IN} className="link-button font-small">
                    LOGIN
                </Link>
                <Link to={ROUTES.SIGN_UP} className="link-button font-small">
                    REGISTER
                </Link>
            </div>
        </div>
    );
}

// no authentication required for this page
export default LandingPage;
