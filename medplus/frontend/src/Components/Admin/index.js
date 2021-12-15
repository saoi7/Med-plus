// created by Yi Song October 2021 
// reference https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/
// updated by Yi Song 2021/12/15

import React, { Component } from 'react';
import {compose} from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization,withAuthUser } from '../Session';
import NavBar from '../NavBar';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
 
class AdminPage extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
    };
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }
 
  componentDidMount() {
    this.setState({ loading: true });
 
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
 
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }
 
  render() {
    const { users, loading } = this.state;
    const {authUser, firebase} = this.props;
    return (
      <div className="background-with-logo-image add-med-layout">
      <div className="title font-large">
          My profile
      </div>
      {users.filter( function (user) {
            return user.uid === authUser.uid
          }).map(user => (
            <form className="add-med-form">
          <Input labelText="Name" value={user.username}/>
          <Input labelText="Email" value={user.email} />
          <Input labelText="Emergency Contact" />
          <Input labelText="Password" />
          <SubmitInput labelText="Submit user information" type="submit" />
      </form>
              
            ))}

      <NavBar />
      </div>   
    );
  }
}

 
const condition = authUser => !!authUser;
 
export default compose(withAuthorization(condition),withAuthUser,withFirebase)(AdminPage);
//export default withFirebase(AdminPage);
