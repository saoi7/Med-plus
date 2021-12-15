import React from 'react';
import NavBar from '../NavBar';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { useHistory } from 'react-router-dom';
import { ImPlus, ImMinus } from 'react-icons/im';
import ModifyPatient from '../ModifyPatient';

// TODO:
// add validation for:
// quantity must be > 0
// end date must come after start date
// name must not be empty

function AddPatientPage() {
    const initial_state = {
        edit_page_flag: false,
        page_title: "Add new patient",
        submit_button_text: "Add patient",
        patient_name: null,
        patient_email: null,
        patient_password: null,
    };
    return (
        <ModifyPatient initialState={initial_state} />
    );
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AddPatientPage);
