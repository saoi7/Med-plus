import React from 'react';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { ImPlus, ImMinus } from 'react-icons/im';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';

class ModifyPatientFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_page_flag: false,
            page_title: "",
            submit_button_text: "",
            patient_name: "",
            patient_email: "",
            patient_password: ""
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.initialState
        });
    }

    onSubmit = event => {
        event.preventDefault();

        const patient_name = this.state.patient_name;
        //const patient_email = this.state.patient_email;

        this.props.firebase.patients(patient_name).set({
            ...this.state//,
            //times_to_take: modified_times_to_take
        });

        // redirect to edit page
        this.props.history.push(ROUTES.DOCTOR_HOME);
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        let { patient_name, patient_email, patient_password } = this.state;
        const on_change_name_input = (this.state.edit_page_flag) ? e => e.preventDefault() : this.onChange;
        return (
            <div className="background-with-logo-image add-patient-layout">
                <div className="title font-large">
                    {this.state.page_title}
                </div>
                <form className="add-patient-form" onSubmit={this.onSubmit} >
                    <Input labelText="Name" type="text" name="patient_name" value={patient_name} onChange={on_change_name_input} required />
                    <Input labelText="E-Mail" type="text" name="patient_email" value={patient_email} onChange={on_change_name_input} required />
                    <Input labelText="Password" type="password" name="patient_password" value={patient_password} onChange={on_change_name_input} required />
                    <SubmitInput labelText={this.state.submit_button_text} />
                </form>
            </div>
        );
    }
}

const ModifyPatientForm = withRouter(withFirebase(ModifyPatientFormBase));
export default ModifyPatientForm;
