import React from 'react';
import NavBar from '../NavBar';
import { ImPlus } from 'react-icons/im';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import EditMedList, { EditMedListBase, EditMedItem } from './edit_med_list';

// TODO update this so that it can dynamically resize the buttons to fit properly for larger numbers of medications

function ManageMedsPageBase(){
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

const ManageMedsPage = withFirebase(ManageMedsPageBase);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(ManageMedsPage);

export { ManageMedsPageBase, EditMedList, EditMedListBase, EditMedItem };
