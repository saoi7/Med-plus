import React, { useState } from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import NavBar from '../NavBar';
import { withAuthorization } from '../Session';

// TODO this should redirect to LandingPage if user is not logged in

// TODO this needs to fetch medication list from server, display 'loading...' prompt while waiting for server response

// TODO this needs to update server when a medication is clicked (is_taken is toggled)

// TODO add image and timestamp to the display & med_list objects

// TODO sort the med_list in order that user needs to take medication

function HomePageBase(props) {
    return (
        <div className='background-with-logo-image home-layout'>
            <div className="title">
                <div className="font-very-large">Pill Reminder</div>
                <div className="font-large">Todays pills</div>
            </div>
            <MedList />
            <div className="button-container flex-container flex-justify-content-end">
                <Link to="/edit" className="link-button font-small">
                    Edit your medication list
                </Link>
            </div>
            <NavBar />
        </div>
    );
}

class MedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_done_loading: false,
            med_list: []
        };
    }

    // TODO
    // try to get med list items from firebase, show prompt if the operation failed
    // show 'loading...' element in the place of this component until setState sets is_done_loading to true
    // filter for only todays entries, and sort med list in chronological order
    componentDidMount() {
        const dummy_med_list = [
            {id: 0, name: 'med1', is_taken: false},
            {id: 1, name: 'med2', is_taken: false},
            {id: 2, name: 'med3', is_taken: false}
        ];
        this.setState({ med_list: dummy_med_list });
    }

    // TODO attempt to write change to firebase, if that fails don't make any changes to the UI and give the user a prompt that the operation failed
    handle_click = ind => event => {
        const med_list_copy = [ ...this.state.med_list ];
        med_list_copy[ind].is_taken = !med_list_copy[ind].is_taken;
        this.setState({ med_list: med_list_copy });
    }

    render() {
        return (
            <div className="med-list-container flex-container flex-justify-content-space-between">
                { this.state.med_list.map((medobj, ind) => {
                    return <MedListItem data={medobj} onClick={this.handle_click(ind)}/>;
                }) }
            </div>
        );
    }
}

function MedListItem(props) {
    const { id, name, is_taken } = props.data;
    return (
        <button className="link-button font-small" key={id} onClick={props.onClick}>
            {name}
            <input type="checkbox" value="" className="check-box" checked={is_taken}></input>
        </button>
    );
}

const HomePage = withFirebase(HomePageBase);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
