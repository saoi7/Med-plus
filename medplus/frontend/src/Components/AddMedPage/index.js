import React from 'react';
import NavBar from '../NavBar';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { useHistory } from 'react-router-dom';
import { ImPlus, ImMinus } from 'react-icons/im';
import ModifyMedForm from '../ModifyMedForm';

// TODO:
// add validation for:
// quantity must be > 0
// end date must come after start date
// name must not be empty

function AddMedPage() {
    const initial_state = {
        edit_page_flag: false,
        page_title: "Add new medication",
        submit_button_text: "Add medication",
        med_name: null,
        start_date: null,
        end_date: null,
        times_to_take: [
            { time_to_take: "", quantity: null }
        ],
    };
    return (
        <ModifyMedForm initialState={initial_state} />
    );
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AddMedPage);
