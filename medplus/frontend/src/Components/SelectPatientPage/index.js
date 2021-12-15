import React from 'react';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { ImPlus, ImMinus } from 'react-icons/im';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { compose } from 'recompose';

/*function SelectPatientPage(props) {
    const email = props.location.state.email;
    const password = props.location.state.password;
    //window.alert(email + "   " + password);
    this.props.Firebase.to
        .then(() => {
            this.props.history.push(ROUTES.HOME);
        });
}*/

class SelectPatientPageBase extends React.Component {
    constructor(props) {
        super(props);
        const email = this.props.location.state.email
        const password = this.props.location.state.password
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.history.push(ROUTES.HOME);
            })
        //window.alert(password)
    }
}
const SelectPatientPage = compose(withRouter, withFirebase,)(SelectPatientPageBase);
export default SelectPatientPage;
