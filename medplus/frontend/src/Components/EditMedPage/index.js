import AddMedPage from "../AddMedPage";
import { withFirebase } from "../Firebase";
import ModifyMedForm from "../ModifyMedForm";
import NavBar from "../NavBar";
import { withRouter } from 'react-router-dom';

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
        page_title: "Edit medication",
        submit_button_text: "Apply changes",
        times_to_take: times_to_take_arr,
    };
    
    return (
        <div className="background-with-logo-image add-med-layout">
            <div className="title font-large">
                { initial_state.page_title }
            </div>
            <ModifyMedForm firebase={props.firebase} initialState={initial_state} />
            <NavBar />
        </div>
    );
}

const EditMedPage = withRouter(withFirebase(EditMedPageBase));
export default EditMedPage;

export { EditMedPageBase };
