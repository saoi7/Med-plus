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

class EditMedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_done_loading: false,
            med_items: []
        }
    }

    // TODO
    // try to get med items from firebase, show prompt if operation failed
    // show 'loading...' element in place of this component until setState sets is_done_loading to true
    componentDidMount() {
        const dummy_med_data = [
            'med1',
            'med2',
            'med3',
            'med4'
        ];
        this.setState({ med_items: dummy_med_data });
    }

    render() {
        return (
            <div className="edit-container flex-container">
                { this.state.med_items.map((el) => {
                    // TODO wrap each one of these in a router <Link> to an edit med entry page
                    return <EditMedItem name={el} />
                }) }
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

const condition = authUser => !!authUser;
export default withAuthorization(condition)(EditPage);
