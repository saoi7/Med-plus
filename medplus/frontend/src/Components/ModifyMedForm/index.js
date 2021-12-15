import React from 'react';
import Input from '../Input';
import SubmitInput from '../SubmitInput';
import { ImPlus, ImMinus } from 'react-icons/im';
import * as ROUTES from '../../constants/routes';
import NavBar from '../NavBar';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';

// TODO:
// add validation for:
// quantity must be > 0
// end date must come after start date
// name must not be empty

const MAX_TIME_TO_TAKE_INPUTS = 3;

class ModifyMedFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_page_flag: false,
            submit_button_text: "",
            med_name: "",
            start_date: "",
            end_date: "",
            times_to_take: [
                { time_to_take: "", quantity: null }
            ],
        };
    }

    componentDidMount() {
        this.setState({
            ...this.props.initialState
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

        // redirect to manage meds page
        this.props.history.push(ROUTES.MANAGE_MEDS);
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

    addTimeToTakeQuantityGroup = event => {
        let new_times_to_take = [
            ...this.state.times_to_take,
            { time_to_take: "", quantity: "" }
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
        this.setState({
            times_to_take: new_times_to_take
        });
    }

    render() {
        let { start_date, end_date, time_to_take, quantity, med_name } = this.state;
        const on_change_name_input = (this.state.edit_page_flag) ? e => e.preventDefault() : this.onChange;
        let times_to_take_entries = this.state.times_to_take.map((times_to_take_obj, index) => {
            let add_new_time_input_button = (
                <ImMinus className="time-to-take-button background-blue-hover" onClick={this.removeTimeToTakeQuantityGroup(index)} />
            );
            if(index === this.state.times_to_take.length -1 && this.state.times_to_take.length !== MAX_TIME_TO_TAKE_INPUTS) {
                add_new_time_input_button = (
                    <ImPlus className="time-to-take-button background-blue-hover" onClick={this.addTimeToTakeQuantityGroup} data-testid="add-time-to-take-button" />
                );
            }
            return (
                <div className="med-list-time-to-take-quantity-group">
                    <Input labelText="Time To Take" type="time" name={"time_to_take"} value={times_to_take_obj.time_to_take} onChange={this.handleTimeToTakeChange(index)} required />
                    <Input className="quantity-input" labelText="Quantity" type="number" name={"quantity"} value={times_to_take_obj.quantity} onChange={this.handleQuantityChange(index)} min="1" required />
                    { add_new_time_input_button }
                </div>
            );
        });

        let name_input = ( <Input labelText="Name" type="text" name="med_name" value={med_name} onChange={on_change_name_input} required /> );
        if(this.state.edit_page_flag) {
            name_input = null;
        }

        return (
            <form className="add-med-form background-blue" onSubmit={this.onSubmit} >
                { name_input }
                <Input labelText="Start Date" type="date" name="start_date" value={start_date} onChange={this.onChange} required />
                <Input labelText="End Date" type="date" name="end_date" value={end_date} onChange={this.onChange} required />
                { times_to_take_entries }
                <SubmitInput labelText={this.state.submit_button_text} />
            </form>
        );
    }
}

//const ModifyMedForm = withRouter(withFirebase(ModifyMedFormBase));
const ModifyMedForm = withRouter(ModifyMedFormBase);
export default ModifyMedForm;

export { ModifyMedFormBase };
export { MAX_TIME_TO_TAKE_INPUTS };
