import React from 'react';
import NavBar from '../NavBar';
import { ImPlus } from 'react-icons/im';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// TODO update this so that it can dynamically resize the buttons to fit properly for larger numbers of medications

function EditPageBase(){
    return (
        <div className='background-with-logo-image edit-layout'>
            <div className="title font-large">
                Medication List
            </div>

            <EditMedList />

            <div className="add-new-button ">
                <Link to={ROUTES.ADD_MED} className="link-button edit-button font-small">
                    <div>Add new</div>
                    <ImPlus />
                </Link>
            </div>
            <NavBar />
        </div>
    );
}

class EditMedListBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_done_loading: false,
            firebase_error_flag: false,
            med_entries: []
        }
    }

    // TODO only display entries that are active (end_date has not passed yet)
    // can re-use code for checking if entry is active with the HomePage
    componentDidMount() {
        this.setState({ is_done_loading: false, firebase_error_flag: false, med_entries: [] });
        this.props.firebase.TEST_schedules().get().then(snapshot => {
            let db_meds_entries = snapshot.val();
            if(!db_meds_entries) {
                this.setState({ is_done_loading: true });
                return;
            }
            const med_items = Object.keys(db_meds_entries).map(key => key);
            this.setState({ is_done_loading: true, med_entries: med_items });
        }).catch(err => {
            this.setState({ is_done_loading: true, firebase_error_flag: true });
        });
    }

    render() {
        let result = "loading...";
        if(this.state.is_done_loading) {
            if(this.state.firebase_error_flag) {
                result = "ERROR: failed to load data";
            } else {
                result = this.state.med_entries.map((el) => {
                    // TODO wrap each one of these in a router <Link> to an edit med entry page
                    return <EditMedItem name={el} />
                });
            }
        }
        return (
            <div className="edit-container flex-container">
                { result }
            </div>
        );
    }
}

function EditMedItem(props) {
    //const { name } = props;
    return (
        <button className="link-button edit-button font-small">
            { props.name }
        </button>
    );
}

const EditPage = withFirebase(EditPageBase);
const EditMedList = withFirebase(EditMedListBase);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(EditPage);
