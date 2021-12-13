import React from 'react';
import NavBar from '../NavBar';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { withRouter, useHistory } from 'react-router-dom';

class ProfilePageBase extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="background-with-logo-image add-med-layout">
                <div className="title font-large">
                    My profile
                </div>
                <ProfilePageForm firebase={this.props.firebase}/>
                <NavBar />
            </div>
        );
    }
}

class ProfilePageForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
            <form className="add-med-form">
                <Input labelText="Name" />
                <Input labelText="Email" />
                <Input labelText="Emergency Contact" />
                <Input labelText="Password" />
                <SubmitInput labelText="Submit user information" type="submit" />
            </form>
       );
    }
}


const condition = authUser => !!authUser;
const ProfilePage = withRouter(withFirebase(ProfilePageBase));
export default withAuthorization(condition)(ProfilePage);

export { ProfilePageForm, ProfilePageBase };
