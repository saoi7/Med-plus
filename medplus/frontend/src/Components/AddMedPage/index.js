import React from 'react';
import NavBar from '../NavBar';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

// TODO:
//  Color should be a radio input type with images
//  Picture should be a file type
//  Alarm should take the same timestamp format that the database uses

// TODO re-use this form for both adding new meds and editing existing meds

// TODO:
// quantity must be > 0
// end date must come after start date
// should start date be today or later??
// name must not be empty

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

class AddMedPageBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        // TODO make this use data from prop if being used to edit 
        if(this.props.schedule_obj) {
            return;
        }

        this.setState({
            med_name: null,
            start_date: null,
            end_date: null,
            time_to_take: null,
            quantity: null,
        });
    }

    onSubmit = event => {
        event.preventDefault();
        console.log(this.state); // DEBUG

        // TODO check if exists first, delete then create new schedule events entries if it does exist
        const med_name = this.state.med_name;
        this.props.firebase.TEST_schedules(med_name).set({
            ...this.state
        });
        // this.props.firebase.TEST_taken(med_name).set(null); // this doesn't do anything

/*
        let schedule_events_list = {};
        let start_date_obj = new Date(this.state.start_date);
        let end_date_obj = new Date(this.state.end_date);
        let days_between = getDaysBetweenDates(end_date_obj, start_date_obj);
        let time_to_take_timestamp = convertTimeStringToTimestamp(this.state.time_to_take);
        let temp_timestamp = start_date_obj.getTime() + time_to_take_timstamp;
        for(let i=0; i<=days_between; i++)
        {
            console.log(i, days_between);
            schedule_events_list[temp_timestamp] = {
                med_name,
                is_taken: false,
            };
            temp_timestamp += ONE_DAY_IN_MS;
        }

        this.props.firebase.TEST_schedule_events().set({
            ...schedule_events_list
        });
        console.log(schedule_events_list); // DEBUG
*/

/*
        // DEBUG ********************************************
        let now = new Date();
        let start_of_today_timestamp = (new Date(now.getFullYear, now.getMonth, now.getDate)).getTime();
        let start_of_tomorrow_timestamp = start_of_today_timestamp + 2*ONE_DAY_IN_MS;
        let TEST_ref = this.props.firebase.TEST_schedule_events(med_name)
                                        .orderByKey()
                                        .startAt(start_of_today_timestamp.toString())
                                        .endAt(start_of_tomorrow_timestamp.toString());
        let list = TEST_ref.get().then(snapshot => {
            console.log(" ================= DEBUG ===============" );
            // snapshot.val() is null if there is no data
            console.log(snapshot.val());
        });
        // TEST.forEach(item => {console.log(item)});
*/
    };

    onChange = event => {
        this.setState( { [event.target.name]: event.target.value } );
    };

    render() {
        let { start_date, end_date, time_to_take, quantity, med_name } = this.state;
        return (
            <div className="background-with-logo-image add-med-layout">
                <div className="title font-large">
                    Add new medication
                </div>
                <form className="add-med-form" onSubmit={this.onSubmit} >
                    <Input labelText="Name" type="text" name="med_name" value={med_name} onChange={this.onChange} required />
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
