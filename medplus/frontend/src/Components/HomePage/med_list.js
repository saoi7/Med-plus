import React, { useState } from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import NavBar from '../NavBar';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';

function compareDate(a, b) {
    return ((a.getDate() === b.getDay()) && 
            (a.getMonth() === b.getMpnth()) &&
            (a.getFullYear() === b.getFullYear()));
}

function getDateString() {
    let today = new Date();
    // NOTE: .getMonth() starts at 0, so add 1 to get proper month number
    return `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
}

function flatten_meds_obj(meds) {
    let med_list = [];
    Object.entries(meds).forEach(entry => {
        let [med_name, val] = entry;
        Object.entries(val).forEach(entry => {
            let [timestamp, obj] = entry;
            let med_list_item = {
                med_name,
                is_taken: obj.is_taken,
                time_to_take: timestamp,
                quantity: obj.quantity,
            };
            med_list.push(med_list_item);
        });
    });
    return med_list;
}

function set_taken_meds_that_arent_in_schedule_obj(meds, taken_meds) {
    Object.entries(taken_meds).forEach((entry) => {
        let [med_name, times_taken_obj] = entry;
        Object.entries(times_taken_obj).forEach((time_obj) => {
            let [time_taken, quantity] = time_obj;
            if(!meds[med_name])
                meds[med_name] = {};
            if(!meds[med_name][time_taken]) {
                // time: { is_taken, quantity } // data structure of meds
                meds[med_name][time_taken] = { is_taken: true, quantity };
            }
        });
    });
    return meds;

}

function set_taken_meds(meds, taken_meds) {
    Object.entries(taken_meds).forEach((entry) => {
        let [med_name, times_taken_obj] = entry;
        Object.entries(times_taken_obj).forEach((time_obj) => {
            let [time_taken, quantity] = time_obj;

            // the if check prevents bugs when you set meds as taken, then change
            // the times for a schedule, then re-load homepage on the same day
            if(meds[med_name] && meds[med_name][time_taken]) {
                meds[med_name][time_taken] = {
                    is_taken: true,
                    quantity: quantity
                };
            }
        });
    });
    return meds;
}

function get_keys_of_todays_meds(meds_obj) {
    let today = new Date(getDateString());  // using getDateString() to create today's date since getDateString() doesn't include the current time in today's date
    let keys_of_todays_meds = Object.keys(meds_obj).filter(key => {
        let start_date = new Date(meds_obj[key].start_date);
        let end_date = new Date(meds_obj[key].end_date);
        return (start_date <= today && today <= end_date);
    });
    return keys_of_todays_meds;
}

function get_todays_meds_obj(meds_obj, filtered_meds_keys) {
    let meds = {};
    filtered_meds_keys.forEach(key => {
        let times_to_take_obj = Object.entries(meds_obj[key].times_to_take);
        times_to_take_obj.forEach((entry, index) => {
            let [time_to_take, quantity] = entry;
            meds[key] = {
                ...meds[key],
                [time_to_take]: {
                    is_taken: false,
                    quantity
                }
            }
        });
    });
    return meds;
}

function sort_meds_list_chronological_order(med_list) {
    med_list.sort((a, b) => {
        if(a.time_to_take < b.time_to_take)
            return -1;
        return 1;
    })
    return med_list;
}

class MedListBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            db_ref: null,
            is_done_loading: false,
            firebase_error_flag: false,
            med_list: []
        };
    }

    // TODO
    // show 'no meds today' if everything goes successfully but
    // there are no meds after filtering
    // firebase_error_flag will be false && med_list.length === 0
    populateMedList() {
        this.setState({
            db_ref: this.props.medListDBRef,  // this is necessary for componentDidUpdate() to not enter infinite loop
            is_done_loading: false,
            firebase_error_flag: false,
            med_list: []
        });

        // TODO
        // currently we pull all entries in schedules from firebase
        // then we loop through the entries and filter for entries where today falls between the start_date and end_date
        // see if we can make firebase do the filtering for us (may require restructuring the data in the firebase db)
        // 
        // there are edge cases where you set meds as taken, then modify the schedules object for that med, then check the HomePage again
        if(!this.props.medListDBRef)
            return;
        this.props.medListDBRef.get().then(snapshot => {
            let db_meds_entries = snapshot.val();
            if(!db_meds_entries) {   
                this.setState({ is_done_loading: true });
                return;
            }
            let todays_meds_keys = get_keys_of_todays_meds(db_meds_entries);
            let meds = get_todays_meds_obj(db_meds_entries, todays_meds_keys);
            this.props.firebase.TEST_taken(getDateString()).get().then(snapshot => {
                let taken_meds = snapshot.val();
                if(taken_meds) {
                    meds = set_taken_meds_that_arent_in_schedule_obj(meds, taken_meds);
                    meds = set_taken_meds(meds, taken_meds);
                }
                let med_list = flatten_meds_obj(meds);
                med_list = sort_meds_list_chronological_order(med_list);
                this.setState({ is_done_loading: true, med_list: med_list });
            }).catch(err => {
                this.setState({ is_done_loading: true, firebase_error_flag: true });
            });
        }).catch(err => {
            this.setState({ is_done_loading: true, firebase_error_flag: true });
        });
    }

    componentDidMount() {
        this.populateMedList();
    }

    componentDidUpdate() {
        if(this.state.db_ref !== this.props.medListDBRef)
            this.populateMedList();
    }

    // TODO display prompt if firebase operation failed
    handle_click = ind => event => {
        const med_obj = this.state.med_list[ind];
        const {med_name, time_to_take, quantity} = med_obj;
        const new_is_taken = !med_obj.is_taken;
        const new_val = (new_is_taken) ? quantity : null;  // setting value to null in firebase is equivalent to deleting it
        this.props.firebase.TEST_taken(getDateString()).child(med_name).update({
            [time_to_take]: new_val,
        }).then(arg => {
            const med_list_copy = [ ...this.state.med_list ];
            med_list_copy[ind].is_taken = new_is_taken;
            this.setState({ med_list: med_list_copy });
        });
    }


    // TODO implement better views for loading & error conditions
    render() {
        let result = "loading...";
        if(this.state.is_done_loading && this.state.firebase_error_flag)
            result = "ERROR: failed to load data";
        if(this.state.is_done_loading && !this.state.firebase_error_flag) {
            result = this.state.med_list.map((medobj, ind) => {
                return <MedListItem data={medobj} onClick={this.handle_click(ind)}/>;
            });
        }
        return (
            <div className="med-list-container flex-container flex-justify-content-space-evenly">
                { result }
            </div>
        );
    }
}

function MedListItem(props) {
    const { med_name, time_to_take, is_taken, quantity } = props.data;
    const color_class_str = is_taken ? "background-grey" : "background-blue";
    return (
        <div className="med-list-entry-container font-medium" key={med_name+time_to_take} >
            {time_to_take}
            <button className={"med-list-entry-box font-small " + color_class_str} onClick={props.onClick}>
                <span>{med_name}</span>
                <span>{"Qty: "+quantity}</span>
                <input type="checkbox" value="" className="check-box" checked={is_taken} />
            </button>
        </div>
    );
}

const MedList = withFirebase(MedListBase);

export default MedList;