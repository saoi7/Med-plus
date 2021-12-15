import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignInPage from '../SignIn';
import { CgPill } from 'react-icons/cg';

function LandingPage() {
    return (
        <div className="background-image landing-layout">
            <div className="landing-title font-very-large">
                MedPlus<span style={{ marginLeft: 20 }}><CgPill /></span>
            </div>
            <div className="button-container flex-container flex-justify-content-space-around">
                <Link to={ROUTES.SIGN_IN} className="link-button background-blue background-blue-hover font-small">
                    LOGIN
                </Link>
                <Link to={ROUTES.SIGN_UP} className="link-button background-blue background-blue-hover font-small">
                    REGISTER
                </Link>
                <Link to={ROUTES.DOCTOR_SIGN_IN} className="link-button background-blue background-blue-hover font-small">
                    DOCTOR LOGIN
                </Link>
            </div>
        </div>
    );
}

// no authentication required for this page
export default LandingPage;
