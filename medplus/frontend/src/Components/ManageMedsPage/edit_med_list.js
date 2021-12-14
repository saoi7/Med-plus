import React from 'react';
import NavBar from '../NavBar';
import { AiFillEdit } from 'react-icons/ai';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class EditMedListBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_done_loading: false,
            firebase_error_flag: false,
            med_entries: []
        }
    }

    componentDidMount() {
        this.setState({ is_done_loading: false, firebase_error_flag: false, med_entries: [] });
        this.props.firebase.TEST_schedules().get().then(snapshot => {
            let db_meds_entries = snapshot.val();
            if(!db_meds_entries) {
                this.setState({ is_done_loading: true });
                return;
            }
            const med_items = Object.values(db_meds_entries);//.map(key => key);
            this.setState({ is_done_loading: true, med_entries: med_items });
        }).catch(err => {
            this.setState({ is_done_loading: true, firebase_error_flag: true });
        });
    }

    // TODO implement better views for loading and error conditions
    render() {
        let result = "loading...";
        if(this.state.is_done_loading && this.state.firebase_error_flag)
            result = "ERROR: failed to load data";
        if(this.state.is_done_loading && !this.state.firebase_error_flag) {
            result = this.state.med_entries.map((med_entry) => {
                return (
                    <Link className="no-underline" to={{ pathname: ROUTES.EDIT_MED, state: {...med_entry} }}>
                        <EditMedItem name={med_entry.med_name} />
                    </Link>
                );
            });
        }
        return (
            <div className="edit-container flex-container">
                <div className="med-list-item-flexbox flex-container flex-justify-content-space-between">
                    { result }
                </div>
            </div>
        );
    }
}

function EditMedItem(props) {
    return (
        <div className="med-selection-button link-button background-blue background-blue-hover font-small">
            <span className="med-selection-button-name" >{ props.name }</span>
            <span className="med-selection-button-edit-icon" ><AiFillEdit /></span>
        </div>
    );
}

const EditMedList = withFirebase(EditMedListBase);
export default EditMedList
export { EditMedListBase, EditMedItem };
