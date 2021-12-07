import AddMedPage from "../AddMedPage";
import ModifyMedForm from "../ModifyMedForm";

function EditMedPage(props) {
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
        <ModifyMedForm initialState={initial_state} />
    );
}

export default EditMedPage;
