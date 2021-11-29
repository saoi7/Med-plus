import React from 'react';
import NavBar from '../NavBar';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { withAuthorization } from '../Session';

// TODO code duplication from AddMedPage
function ProfilePage() {
    return (
        <div className="background-with-logo-image add-med-layout">
            <div className="title font-large">
                My profile
            </div>
            <form className="add-med-form">
                <Input labelText="Name" />
                <Input labelText="Email" />
                <Input labelText="Emergency Contact" />
                <Input labelText="Password" />
                <SubmitInput labelText="Submit user information" type="submit" />
            </form>
            <NavBar />
        </div>
    );
}

// TODO firebase integration:
/*
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
const AccountPage = () => (
<AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);
*/

const condition = authUser => !!authUser;
export default withAuthorization(condition)(ProfilePage);
