import React from 'react';
import NavBar from '../NavBar';
import { ImPlus } from 'react-icons/im';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { withAuthorization } from '../Session';

// TODO update this so that it can dynamically resize the buttons to fit properly for larger numbers of medications

function EditPage(){
    let med_list = ['a','b','c','d'];
    return (
        <div className='background-with-logo-image edit-layout'>
            <div className="title font-large">
                Medication List
            </div>
            <div className="edit-container flex-container">
                {
                    med_list.map((el) => {
                        return (<button className="link-button edit-button font-small">{el}</button>);
                    })
                }
            </div>

            <div className="add-new-button ">
                <Link to="/add-med" className="link-button edit-button font-small">
                    <div>Add new</div>
                    <ImPlus />
                </Link>
            </div>
            <NavBar />
        </div>
    );
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(EditPage);
