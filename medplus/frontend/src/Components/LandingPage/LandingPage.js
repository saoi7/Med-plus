import React from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="background-image landing-layout">
            <div className="button-container flex-container flex-justify-content-space-around">
                <Link to="/login" className="link-button font-small">
                    LOGIN
                </Link>
                <Link to="/register" className="link-button font-small">
                    REGISTER
                </Link>
            </div>
        </div>
    );
}

export { LandingPage };