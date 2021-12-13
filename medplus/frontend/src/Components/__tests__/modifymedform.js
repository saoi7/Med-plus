import { ModifyMedFormBase, MAX_TIME_TO_TAKE_INPUTS } from '../ModifyMedForm';
import {test_dom_container} from '../../setupTests';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { getByTestId, fireEvent } from '@testing-library/react';
import { MOCK_FIREBASE_DB_REF_PROP } from './mock_firebase_props';

// NOTE: you must provide an array as a 'history' prop
// this normally comes from react router so we must provide a
// dummy object here 

test("check no unintended changes have been made to rendered component", () => {
    const COMPONENT_NO_PROPS = renderer.create(
        <ModifyMedFormBase history={[]}/>
    );
    let tree = COMPONENT_NO_PROPS.toJSON();
    expect(tree).toMatchSnapshot();

    const STATE_1 = {
        edit_page_flag: false,
        page_title: "Add new medication",
        submit_button_text: "Add medication",
        med_name: "abc",
        start_date: "2021-10-20",
        end_date: "2021-10-30",
        times_to_take: [
            { time_to_take: "12:34", quantity: "2" },
            { time_to_take: "01:00", quantity: "1" },
        ],
    };
    const COMPONENT_WITH_PROPS_1 = renderer.create(
        <ModifyMedFormBase initialState={STATE_1} history={[]}/>
    );
    tree = COMPONENT_WITH_PROPS_1.toJSON();
    expect(tree).toMatchSnapshot();

    const STATE_2 = {
        edit_page_flag: true,
        page_title: "edit medication",
        submit_button_text: "edit",
        med_name: "2hwqlkmgtnqpewjirn",
        start_date: "2021-11-20",
        end_date: "2021-11-29",
        times_to_take: [
            { time_to_take: "12:34", quantity: "1" },
            { time_to_take: "03:00", quantity: "2" },
            { time_to_take: "04:00", quantity: "3" },
            { time_to_take: "05:00", quantity: "123" },
        ],
    };
    const COMPONENT_WITH_PROPS_2 = renderer.create(
        <ModifyMedFormBase initialState={STATE_2} history={[]}/>
    );
    tree = COMPONENT_WITH_PROPS_2.toJSON();
    expect(tree).toMatchSnapshot();

});

const verify_time_to_take_buttons_count = (initial_input_count) => {
    let ADD_TIME_TO_TAKE_BUTTON;
    for(let current_input_count = initial_input_count; current_input_count < MAX_TIME_TO_TAKE_INPUTS; current_input_count++)
    {
        ADD_TIME_TO_TAKE_BUTTON = getByTestId(test_dom_container, 'add-time-to-take-button');
        expect(ADD_TIME_TO_TAKE_BUTTON).toBeDefined();
        expect(ADD_TIME_TO_TAKE_BUTTON).not.toBeNull();
        act(() => {
            ADD_TIME_TO_TAKE_BUTTON.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
    }

    const TIME_TO_TAKE_QUERY = document.querySelector("[data-testid=add-time-to-take-button]");
    expect(TIME_TO_TAKE_QUERY).toBeNull();

    const TIME_TO_TAKE_GROUP = document.getElementsByClassName('med-list-time-to-take-quantity-group');
    expect(TIME_TO_TAKE_GROUP.length).toBe(MAX_TIME_TO_TAKE_INPUTS);
}

test("check max time to take input count is correct with no initialState input", () => {
    act(() => {
        render(<ModifyMedFormBase history={[]}/>, test_dom_container);
    });
    // NOTE: the input count starts at 1 if no time_to_take inputs are set as props to ModifyMedForm
    verify_time_to_take_buttons_count(1);
});

test("check max time to take input count is correctwith an initialState input", () => {
    const initial_state = {
        edit_page_flag: false,
        page_title: "Add new medication",
        submit_button_text: "Add medication",
        med_name: "",
        start_date: "",
        end_date: "",
        times_to_take: [
            { time_to_take: "", quantity: null },
            { time_to_take: "", quantity: null },
        ],
    };
    act(() => {
        render(<ModifyMedFormBase initialState={initial_state} history={[]}/>, test_dom_container);
    });
    verify_time_to_take_buttons_count(initial_state.times_to_take.length);
});

test("check that name input can be modified when edit flag is not set", () => {
    const initial_state = {
        edit_page_flag: false,
        page_title: "Add new medication",
        submit_button_text: "Add medication",
        med_name: "",
        start_date: "",
        end_date: "",
        times_to_take: [
            { time_to_take: "", quantity: null },
        ],
    };
    act(() => {
        render(<ModifyMedFormBase initialState={initial_state} history={[]}/>, test_dom_container);
    });
    const TEST_INPUT_STRING = 'abcefgh';
    let MED_NAME_INPUT = document.querySelector('[name=med_name]');
    expect(MED_NAME_INPUT.value).toBe("");
    fireEvent.change(MED_NAME_INPUT, {target: {value: TEST_INPUT_STRING}});
    expect(MED_NAME_INPUT.value).toBe(TEST_INPUT_STRING);
});

test("check that name input cannot be modified when edit flag is set", () => {
    const initial_state = {
        edit_page_flag: true,
        page_title: "",
        submit_button_text: "",
        med_name: "",
        start_date: "",
        end_date: "",
        times_to_take: [
            { time_to_take: "", quantity: null },
        ],
    };
    act(() => {
        render(<ModifyMedFormBase initialState={initial_state} history={[]}/>, test_dom_container);
    });
    const TEST_INPUT_STRING = 'abcefgh';
    let MED_NAME_INPUT = document.querySelector('[name=med_name]');
    expect(MED_NAME_INPUT.value).toBe("");
    fireEvent.change(MED_NAME_INPUT, {target: {value: TEST_INPUT_STRING}});
    expect(MED_NAME_INPUT.value).toBe("");
});
