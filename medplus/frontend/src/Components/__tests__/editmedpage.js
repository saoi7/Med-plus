import { MOCK_DB_MED_ENTRIES } from './mock_db_med_entries';
import {test_dom_container} from '../../setupTests';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { getByTestId, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MOCK_FIREBASE_PROP } from './mock_firebase_props';
import flushPromises from 'flush-promises';
import { EditMedPageBase } from '../EditMedPage';

test("snapshot test of EditMedPage", () => {
    const MOCK_LOCATION_STATE_PROP = {
        "edit_page_flag": true,
        "end_date": "2021-12-14",
        "med_name": "abc",
        "page_title": "Edit medication",
        "start_date": "2021-11-01",
        "submit_button_text": "Apply changes",
        "times_to_take": {
            "04:00": "1",
            "05:00": "999"
        }
    };
    const COMPONENT= renderer.create(
        <MemoryRouter>
            <EditMedPageBase location={{state: MOCK_LOCATION_STATE_PROP }} firebase={MOCK_FIREBASE_PROP}/>
        </MemoryRouter>
    );
    let tree = COMPONENT.toJSON();
    expect(tree).toMatchSnapshot();
});
