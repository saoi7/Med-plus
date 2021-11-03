import React from 'react';
import { NavBar } from '../NavBar/NavBar';
import { TextInput } from '../TextInput/TextInput';
import { SubmitInput } from '../SubmitInput/SubmitInput';

// TODO:
//  Color should be a radio input type with images
//  Picture should be a file type
//  Alarm should take the same timestamp format that the database uses

// TODO need to add button for sending form

// TODO implement proper form functionality, make POST request to server, redirect to /home

function AddMedPage() {
    return (
        <div className="background-with-logo-image add-med-layout">
            <div className="title font-large">
                Add new medication
            </div>
            <form className="add-med-form">
                <TextInput labelText="Name: " />
                <TextInput labelText="Dose: " />
                <TextInput labelText="Colour: " />
                <TextInput labelText="Picture: " />
                <TextInput labelText="Alarm: " />
                <SubmitInput labelText="Submit new medication" type="submit" />
            </form>
            <NavBar />
        </div>
    );
}

export { AddMedPage };