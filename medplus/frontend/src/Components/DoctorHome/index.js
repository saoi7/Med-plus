import React from 'react';
import { ImPlus } from 'react-icons/im';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AiFillEdit } from 'react-icons/ai';

// TODO update this so that it can dynamically resize the buttons to fit properly for larger numbers of patientications

function ManagePatientsPageBase() {
    return (
        <div className='background-with-logo-image edit-layout'>
            <div className="title font-large">
                Patient List
            </div>

            <EditPatientList />

            <div className="add-new-button ">
                <Link to={ROUTES.ADD_PATIENT} className="link-button background-blue background-blue-hover font-small">
                    <div>Add new</div>
                    <ImPlus />
                </Link>
            </div>

        </div>
    );
}

class EditPatientListBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_done_loading: false,
            firebase_error_flag: false,
            patient_entries: []
        }
    }

    // TODO only display entries that are active (end_date has not passed yet)
    // can re-use code for checking if entry is active with the HomePage
    componentDidMount() {
        this.setState({ is_done_loading: false, firebase_error_flag: false, patient_entries: [] });
        this.props.firebase.patients().get().then(snapshot => {
            let db_patients = snapshot.val();
            if (!db_patients) {
                this.setState({ is_done_loading: true });
                return;
            }
            const patient_items = Object.values(db_patients);
            this.setState({ is_done_loading: true, patient_entries: patient_items });
        }).catch(err => {
            this.setState({ is_done_loading: true, firebase_error_flag: true });
        });
    }

    onClick = (user_data) => (event) => {
        event.preventDefault();

        const username = user_data.patient_name;
        const email = user_data.patient_email;
        const password = user_data.patient_password;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.history.push('/home');//ROUTES.HOME);
            })
            .catch(err => {
                window.alert(`failed to login as user: ${username}`);
            });
    }

    // TODO implement better views for loading and error conditions
    render() {
        //window.alert("hello");
        let result = "loading...";
        if (this.state.is_done_loading && this.state.firebase_error_flag)
            result = "ERROR: failed to load data";
        if (this.state.is_done_loading && !this.state.firebase_error_flag) {
            result = this.state.patient_entries.map((patient_entry) => {
                const initial_state = {
                    patient_name: patient_entry.patient_name,
                    patient_email: patient_entry.patient_email,
                    patient_password: patient_entry.patient_password
                }
                //window.alert(initial_state.patient_name);
                return (
                        <EditPatientItem onClick={this.onClick(initial_state)} name={patient_entry.patient_name} />
                );
            });
        }
        return (
            <div className="edit-container flex-container">
                <div className="med-list-item-flexbox flex-container flex-justify-content-space-between">
                    {result}
                </div>
            </div>
        );
    }
}

function EditPatientItem(props) {
    return (
        <div onClick={props.onClick} className="med-selection-button link-button background-blue background-blue-hover font-small">
            <span className="med-selection-button-name" >{props.name}</span>
            <span className="med-selection-button-edit-icon" ><AiFillEdit /></span>
        </div>
    );
}

const ManagePatientPage = withFirebase(ManagePatientsPageBase);
const EditPatientList = withRouter(withFirebase(EditPatientListBase));

const condition = authUser => !!authUser;
export default withAuthorization(condition)(ManagePatientPage);
