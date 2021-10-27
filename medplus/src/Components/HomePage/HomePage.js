import React, { useState } from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';

// TODO this should redirect to LandingPage if user is not logged in

// TODO this needs to fetch medication list from server, display 'loading...' prompt while waiting for server response

// TODO this needs to update server when a medication is clicked (isTaken is toggled)

// TODO add image and timestamp to the display & med_list objects

// TODO sort the med_list in order that user needs to take medication

function HomePage(){

    const [med_list, setMedlist] = useState([
        {id: 0, name: 'med1', isTaken: false},
        {id: 1, name: 'med2', isTaken: false},
        {id: 2, name: 'med3', isTaken: false}
    ]);

    const med_elements = med_list.map((medobj, ind) => {
        const handle_click = (event) => {
            const n = [ ...med_list ];
            n[ind].isTaken = !n[ind].isTaken;
            setMedlist(n);
            console.log(med_list);
        };
        return (
            <button className="link-button font-small" key={medobj.id} onClick={handle_click}>
                {medobj.name}
                <input type="checkbox" value="" className="check-box" checked={medobj.isTaken}></input>
            </button>
        );
    });

    return (
        <div className='background-with-logo-image home-layout'>
            <div className="title">
                <div className="font-very-large">Pill Reminder</div>
                <div className="font-large">Todays pills</div>
            </div>
            <div className="med-list-container flex-container flex-justify-content-space-between">
                {
                    med_elements.map((el) => { return el; })
                }
            </div>
            <div className="button-container flex-container flex-justify-content-end">
                <Link to="/edit" className="link-button font-small">
                    Edit your medication list
                </Link>
            </div>
            <NavBar />
        </div>
    );
}

export { HomePage };