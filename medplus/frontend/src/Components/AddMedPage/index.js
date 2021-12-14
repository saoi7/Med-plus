import React from 'react';
import NavBar from '../NavBar';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { withRouter, useHistory } from 'react-router-dom';
import { ImPlus, ImMinus } from 'react-icons/im';
import ModifyMedForm from '../ModifyMedForm';

function AddMedPageBase(props) {
    const initial_state = {
        edit_page_flag: false,
        page_title: "Add New Medication",
        submit_button_text: "Add medication",
        med_name: "",
        start_date: "",
        end_date: "",
        times_to_take: [
            { time_to_take: "", quantity: null }
        ],
    };
    return (
        <div className="background-with-logo-image add-med-layout">
            <div className="title font-large">
                { initial_state.page_title }
            </div>
            <ModifyMedForm firebase={props.firebase} initialState={initial_state} />
            <NavBar />
        </div>
    );
}

const AddMedPage = withRouter(withFirebase(AddMedPageBase));

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AddMedPage);

export { AddMedPageBase };
