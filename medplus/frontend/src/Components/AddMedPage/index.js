import React from 'react';
import NavBar from '../NavBar';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import { useHistory } from 'react-router-dom';
import { ImPlus, ImMinus } from 'react-icons/im';

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
            times_to_take: [],
        };
    }

    componentDidMount() {
        // TODO update the link from EditMedPage
        if(this.props.location.state) {
            let times_to_take_arr = Object.entries(this.props.location.state.times_to_take).map(entry => {
                let [time_to_take, quantity] = entry;
                return {
                    time_to_take,
                    quantity
                };
            });
            this.setState({
                ...this.props.location.state,
                edit_page_flag: true,
                page_title: "Edit medication",
                times_to_take: times_to_take_arr,
            });
            return;
        }

        this.setState({
            edit_page_flag: false,
            page_title: "Add new medication",
            med_name: null,
            start_date: null,
            end_date: null,
            times_to_take: [
                { time_to_take: "", quantity: null }
            ],
        });
    }

    onSubmit = event => {
        event.preventDefault();

        const med_name = this.state.med_name;
        let modified_times_to_take = {};
        this.state.times_to_take.forEach((time_obj, index) => {
            let time_str = time_obj.time_to_take;
            let qty = time_obj.quantity;
            modified_times_to_take[time_str] = qty;
        });

        this.props.firebase.TEST_schedules(med_name).set({
            ...this.state,
            times_to_take: modified_times_to_take
        });

        // redirect to edit page
        this.props.history.push(ROUTES.EDIT_MEDS);
    };

    handleTimeToTakeChange = index => event => {
        let new_times_to_take = [ ...this.state.times_to_take ];
        new_times_to_take[index] = { 
            ...this.state.times_to_take[index], 
            time_to_take: event.target.value
        };
        this.setState({
            times_to_take: new_times_to_take
        });
    }

    handleQuantityChange = index => event => {
        let new_times_to_take = [ ...this.state.times_to_take ];
        new_times_to_take[index] = { 
            ...this.state.times_to_take[index],
            quantity: event.target.value
        };
        this.setState({
            times_to_take: new_times_to_take
        });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    addNewTimeToTakeQuantityGroup = event => {
        let new_times_to_take = [
            ...this.state.times_to_take,
            { time_to_take: "", quantity: null }
        ];
        this.setState({
            times_to_take: new_times_to_take
        });
    }

    removeTimeToTakeQuantityGroup = index => event => {
        let new_times_to_take = [
            ...this.state.times_to_take.slice(0, index),
            ...this.state.times_to_take.slice(index+1),
        ];
        console.log(this.state);
        this.setState({
            times_to_take: new_times_to_take
        });
    }

    render() {
        let { start_date, end_date, time_to_take, quantity, med_name } = this.state;
        const on_change_name_input = (this.state.edit_page_flag) ? e => e.preventDefault() : this.onChange;
        let times_to_take_entries = this.state.times_to_take.map((times_to_take_obj, index) => {
            let add_new_time_input_button = (
                <ImMinus className="time-to-take-button" onClick={this.removeTimeToTakeQuantityGroup(index)}></ImMinus>
            );
            if(index === this.state.times_to_take.length -1) {
                add_new_time_input_button = (
                    <ImPlus className="time-to-take-button" onClick={this.addNewTimeToTakeQuantityGroup}></ImPlus>
                );
            }
            if(index === this.state.times_to_take.length -1 && this.state.times_to_take.length === 4)
                add_new_time_input_button = null;
            return (
                <div className="med-list-time-to-take-quantity-group">
                    <Input labelText="Time To Take" type="time" name={"time_to_take"} value={times_to_take_obj.time_to_take} onChange={this.handleTimeToTakeChange(index)} required />
                    <Input className="quantity-input" labelText="Quantity" type="number" name={"quantity"} value={times_to_take_obj.quantity} onChange={this.handleQuantityChange(index)} required />
                    { add_new_time_input_button }
                </div>
            );
        })
        return (
            <div className="background-with-logo-image add-med-layout">
                <div className="title font-large">
                    { this.state.page_title }
                </div>
                <form className="add-med-form" onSubmit={this.onSubmit} >
                    <Input labelText="Name" type="text" name="med_name" value={med_name} onChange={on_change_name_input} required />
                    <Input labelText="Start Date" type="date" name="start_date" value={start_date} onChange={this.onChange} required />
                    <Input labelText="End Date" type="date" name="end_date" value={end_date} onChange={this.onChange} required />
                    { times_to_take_entries }
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
