import React from 'react';
import NavBar from '../NavBar';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { useHistory } from 'react-router-dom';

/*
function getDaysBetweenDates(a, b) {
    let a_timestamp = a.getTime();
    let b_timestamp = b.getTime();
    let diff = Math.abs(a_timestamp - b_timestamp);
    let days = (diff / 1000 / 60 / 60 / 24);
    return days;
}

// NOTE: currently this only supports time strings in the format 'HH:MM'
function convertTimeStringToTimestamp(time_str) {
    let [hours, minutes] = time_str.split(':');
    let hours_in_ms = parseInt(hours) * 60 * 60 * 1000;
    let minutes_in_ms = parseInt(minutes) * 60 * 1000;
    return hours_in_ms + minutes_in_ms;
}

const ONE_DAY_IN_MS = 86400000;
*/

// TODO split this into 2 components with 2 different routes?
// one for adding a new medication and one for editing an existing medication
// this component currently has 2 purposes depending on how its' configured (see componentDidMount())

// TODO:
// add validation for:
// quantity must be > 0
// end date must come after start date
// name must not be empty
class AddMedPageBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_page_flag: false,
            page_title: "Add new medication",
            med_name: null,
            start_date: null,
            end_date: null,
            time_to_take: null,
            quantity: null,
        };
    }

    componentDidMount() {
        if(this.props.location.state) {
            this.setState({
                edit_page_flag: true,
                page_title: "Edit medication",
                ...this.props.location.state
            })
            return;
        }

        this.setState({
            edit_page_flag: false,
            page_title: "Add new medication",
            med_name: null,
            start_date: null,
            end_date: null,
            time_to_take: null,
            quantity: null,
        });
    }

    onSubmit = event => {
        event.preventDefault();

        const med_name = this.state.med_name;
        this.props.firebase.TEST_schedules(med_name).set({
            ...this.state
        });

        // redirect to edit page
        this.props.history.push(ROUTES.EDIT_MEDS);
    };

    onChange = event => {
        this.setState( { [event.target.name]: event.target.value } );
    };

    render() {
        let { start_date, end_date, time_to_take, quantity, med_name } = this.state;
        const on_change_name_input = (this.state.edit_page_flag) ? e => e.preventDefault() : this.onChange
        return (
            <div className="background-with-logo-image add-med-layout">
                <div className="title font-large">
                    { this.state.page_title }
                </div>
                <form className="add-med-form" onSubmit={this.onSubmit} >
                    <Input labelText="Name" type="text" name="med_name" value={med_name} onChange={on_change_name_input} required />
                    <Input labelText="Start Date" type="date" name="start_date" value={start_date} onChange={this.onChange} required />
                    <Input labelText="End Date" type="date" name="end_date" value={end_date} onChange={this.onChange} required />
                    <Input labelText="Time To Take" type="time" name="time_to_take" value={time_to_take} onChange={this.onChange} required />
                    <Input labelText="Quantity" type="number" name="quantity" value={quantity} onChange={this.onChange} required />
                    <SubmitInput labelText="Submit new medication" />
                </form>
                <NavBar />
            </div>
        );
    }
}

const AddMedPage = withFirebase(AddMedPageBase);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(AddMedPage);
