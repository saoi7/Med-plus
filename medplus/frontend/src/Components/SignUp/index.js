// created by Yi Song October 2021 
// reference  https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/
// add UI div updated by Yi Song 2021/12/1

import React, { Component } from 'react';
import {  Router, Route, Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
//import {HomePage} from '../HomePage/HomePage';

import { withFirebase } from '../Firebase';
//import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes';
 
const SignUpPage = () => (
  <div className="background-image landing-layout">
    <div className="button-container flex-container flex-justify-content-space-around">
    <h1>SignUp</h1>
    <SignUpForm />
    </div>
  </div>
);
 

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
//class SignUpForm extends Component {
  constructor(props) {
    super(props);
this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
 const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
	this.props.history.push(ROUTES.HOME);
      })
      .catch( 
        error => {this.setState({ error });}
     );
 
    event.preventDefault();
  }
 
onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
 <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
		Sign Up</button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
 
//const SignUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
 
export { SignUpForm, SignUpLink };
