import React, { useState } from 'react';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import NavBar from '../NavBar';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import MedList from './med_list';

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
            let curr_username = snapshot.val().username;
            let new_med_lists = {
                ...this.state.med_lists,
                [curr_username]: { ref: curr_user_medlist_ref, uid: curr_uid }
            };
            this.setState({
                active_med_list: curr_username,
                med_lists: new_med_lists
            });
        }).catch(err => {
            // TODO
        }).then(val => {
            let sharee_of_ref = this.props.firebase.getShareeOfRef();
            sharee_of_ref.get().then(snapshot => {
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
                })
            }).catch(err => {
                // TODO
            });
        });
    }

    updateActiveMedList = (new_active_med_list) => () => {
        this.setState({ active_med_list: new_active_med_list });
    }

    render() {
        let key = this.state.active_med_list;
        let current_med_list_ref = null;
        if(key !== null)
            current_med_list_ref = this.state.med_lists[key].ref;

        return (
            <div className='background-with-logo-image home-layout'>
                <MedListSelection updateActiveMedList={this.updateActiveMedList} activeMedList={this.state.active_med_list} medListObjs={this.state.med_lists}/>
                <div className="title font-very-large">
                    Today's Medications
                </div>
                <MedList medListDBRef={current_med_list_ref}/>
                <div className="button-container flex-container flex-justify-content-end">
                    <Link to={ROUTES.MANAGE_MEDS} className="link-button background-blue background-blue-hover font-small">
                        Edit medications
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
                    <button className="link-button background-blue background-blue-hover" onClick={props.updateActiveMedList(username)}>{username}</button>
                );
            }
            return (
                <button className="link-button background-blue background-blue-hover" onClick={props.updateActiveMedList(username)}>{username}</button>
            );
        });
    }

    return (
        <div className="med-list-selection">
            { items }
        </div>
    );
}

const HomePage = withFirebase(HomePageBase);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);

export { HomePageBase, MedListSelection };
