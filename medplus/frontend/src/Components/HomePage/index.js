import React, { useState } from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import NavBar from '../NavBar';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';

class HomePageBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active_med_list: null,
            // TODO usernames don't have to be unique, this may cause issues
            med_lists: {
                //username: {ref: ___, uid: ___}
            }
        }
    }

    componentDidMount() {
        let curr_uid = this.props.firebase.currentUserUID();
        let curr_user_medlist_ref = this.props.firebase.TEST_schedules();
        this.props.firebase.currentUser().get().then(snapshot => {
            if(!snapshot.val())
            {
                // TODO
            }
            // console.log("SNAPSHOT:", snapshot.val());
            let curr_username = snapshot.val().username;
            let new_med_lists = {
                ...this.state.med_lists,
                [curr_username]: { ref: curr_user_medlist_ref, uid: curr_uid }
            };
            this.setState({
                active_med_list: curr_username,
                med_lists: new_med_lists
            });
            console.log("STATE:", this.state);
        }).catch(err => {
            // TODO
        }).then(val => {
            console.log("PART 2");
            let sharee_of_ref = this.props.firebase.getShareeOfRef();
            sharee_of_ref.get().then(snapshot => {
                // console.log("SNAPSHOT:", snapshot.val());
                if(!snapshot.val()) {
                    // TODO
                }
                Object.entries(snapshot.val()).forEach(entry => {
                    let [uid, username] = entry;
                    let med_list_ref = this.props.firebase.TEST_schedules(undefined, uid);
                    let new_med_lists = {
                        ...this.state.med_lists,
                        [username]: { ref: med_list_ref, uid}
                    };
                    this.setState({ med_lists: new_med_lists });
                    console.log("ABCDEFG", this.state);
                })
            }).catch(err => {
                // TODO
            });
        });
    }

    updateActiveMedList = (new_active_med_list) => () => {
        console.log("UPDATE ACTIVE MED LIST CALLED", new_active_med_list);
        this.setState({ active_med_list: new_active_med_list });
    }

    render() {
        let key = this.state.active_med_list;
        let current_med_list = null;
        if(key !== null)
            current_med_list = this.state.med_lists[key].ref;

        console.log("UPDATE",current_med_list);
        // TODO update css for this div
        return (
            <div className='background-with-logo-image home-layout'>
                <MedListSelection updateActiveMedList={this.updateActiveMedList} activeMedList={this.state.active_med_list} medListObjs={this.state.med_lists}/>
                <div className="title">
                    <div className="font-very-large">Pill Reminder</div>
                    <div className="font-large">Todays pills</div>
                </div>
                <MedList medListDBRef={key && this.state.med_lists[key].ref}/>
                <div className="button-container flex-container flex-justify-content-end">
                    <Link to={ROUTES.EDIT_MEDS} className="link-button font-small">
                        Edit your medication list
                    </Link>
                </div>
                <NavBar />
            </div>
        );
    }
}

function MedListSelection(props) {
    let items = "";
    if(props.medListObjs && props.medListObjs.length > 1) {
        items = Object.entries(props.medListObjs).map(entry => {
            let [username, obj] = entry;
            // TODO make this different color
            if(username === props.activeMedList)
            {
                return (
                    <button className="link-button" onClick={props.updateActiveMedList(username)}>{username}</button>
                );
            }
            return (
                <button className="link-button" onClick={props.updateActiveMedList(username)}>{username}</button>
            );
        });
    }

    return (
        <div className="med-list-selection">
            { items }
        </div>
    );
}

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

function set_taken_meds(meds, taken_meds) {
    Object.entries(taken_meds).forEach((entry) => {
        let [key, value] = entry;
        meds[key][value.time_taken].is_taken = true;
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
        meds[key] = {
            [meds_obj[key].time_to_take]: {
                is_taken: false,
                quantity: meds_obj[key].quantity,
            }
        }
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
        const {med_name, time_to_take} = med_obj;
        const new_is_taken = !med_obj.is_taken;
        const new_val = (new_is_taken) ? time_to_take : null;  // setting value to null in firebase is equivalent to deleting it
        this.props.firebase.TEST_taken(getDateString()).update({
            [med_name]: {
                time_taken: new_val,
            }
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
                console.log(medobj);
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
    return (
        <div className="med-list-entry-container font-medium" key={med_name+time_to_take} >
            {time_to_take}
            <button className="med-list-entry-box font-small" onClick={props.onClick}>
                <span>{med_name}</span>
                <span>{"Qty: "+quantity}</span>
                <input type="checkbox" value="" className="check-box" checked={is_taken} />
            </button>
        </div>
    );
}

const HomePage = withFirebase(HomePageBase);
const MedList = withFirebase(MedListBase);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
