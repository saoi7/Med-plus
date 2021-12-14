import AddMedPage from "../AddMedPage";
import { withFirebase } from "../Firebase";
import ModifyMedForm from "../ModifyMedForm";
import NavBar from "../NavBar";
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function EditMedPageBase(props) {
    let times_to_take_arr = Object.entries(props.location.state.times_to_take).map(entry => {
        let [time_to_take, quantity] = entry;
        return {
            time_to_take,
            quantity
        };
    });
    const initial_state = {
        ...props.location.state,
        edit_page_flag: true,
        page_title: `Edit Medication: ${props.location.state.med_name}`,
        submit_button_text: "Apply changes",
        times_to_take: times_to_take_arr,
    };
    
    const deleteMed = () => {
        props.firebase.TEST_schedules(initial_state.med_name).set(null);

        // redirect to manage meds page
        props.history.push(ROUTES.MANAGE_MEDS);
    }

    return (
        <div className="background-with-logo-image edit-med-layout">
            <div className="title font-large">
                { initial_state.page_title }
            </div>
            <ModifyMedForm firebase={props.firebase} initialState={initial_state} />
            <div className="delete-med-container">
                <button onClick={deleteMed} className="link-button font-small background-red background-red-hover delete-med-button">
                    Delete Med
                </button>
            </div>
            <NavBar />
        </div>
    );
}

const EditMedPage = withRouter(withFirebase(EditMedPageBase));
export default EditMedPage;

export { EditMedPageBase };
