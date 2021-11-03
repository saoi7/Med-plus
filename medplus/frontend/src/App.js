import logo from './logo.svg';
import './App.css';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import {HomePage} from './Components/HomePage/HomePage';
import {LandingPage} from './Components/LandingPage/LandingPage';
import {EditPage} from './Components/EditPage/EditPage';
import {ProfilePage} from './Components/ProfilePage/ProfilePage';
import {AddMedPage} from './Components/AddMedPage/AddMedPage';

// TODO all routes except for login, register and landing page should redirect to the landing page unless user is authenticated

// TODO move fonts into CSS classes and re-use anywhere there is text

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route path="/login">
                    PLACEHOLDER
                </Route>
                <Route path="/register">
                    PLACEHOLDER
                </Route>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/edit">
                    <EditPage />
                </Route>
                <Route path="/profile">
                    <ProfilePage />
                </Route>
                <Route path="/add-med">
                    <AddMedPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
