import React from 'react';
import { NavBar } from '../NavBar/NavBar';
import { TextInput } from '../TextInput/TextInput';
import { SubmitInput } from '../SubmitInput/SubmitInput';

// TODO code duplication from AddMedPage
function ProfilePage() {
    return (
        <div className="background-with-logo-image add-med-layout">
            <div className="title font-large">
                My profile
            </div>
            <form className="add-med-form">
                <TextInput labelText="Name: " />
                <TextInput labelText="Email: " />
                <TextInput labelText="Emergency Contact: " />
                <TextInput labelText="Password: " />
                <SubmitInput labelText="Submit user information" type="submit" />
            </form>
            <NavBar />
        </div>
    );
}

export { ProfilePage };