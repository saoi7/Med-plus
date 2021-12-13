import { MOCK_DB_MED_ENTRIES } from './mock_db_med_entries';
import {test_dom_container} from '../../setupTests';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { getByTestId, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MOCK_FIREBASE_PROP } from './mock_firebase_props';
import { EditMedListBase, EditMedItem } from '../ManageMedsPage/edit_med_list';
import flushPromises from 'flush-promises';

test("snapshot test of EditMedList", () => {
    const COMPONENT= renderer.create(
        <MemoryRouter>
            <EditMedListBase firebase={MOCK_FIREBASE_PROP} />
        </MemoryRouter>
    );
    let tree = COMPONENT.toJSON();
    expect(tree).toMatchSnapshot();
});

test("check number of meds listed in EditMedList is correct", async () => {
    act(() => {
        render(<MemoryRouter><EditMedListBase firebase={MOCK_FIREBASE_PROP} /></MemoryRouter>, test_dom_container);
    });
    await flushPromises();  // causes componentDidMount() to complete before continuing
    const LINKS = test_dom_container.childNodes[0].childNodes;

    expect(LINKS.length).toBe(Object.keys(MOCK_DB_MED_ENTRIES).length);
    const KEYS = Object.keys(MOCK_DB_MED_ENTRIES);
    const LINK_TEXT_CONTENT_ARR = Object.values(LINKS).map((link_element) => link_element.textContent );
    expect(LINK_TEXT_CONTENT_ARR.sort()).toEqual(KEYS.sort());
});

test("snapshot test of EditMedItem", () => {
    const NAME_PROP = 'abcdefg';
    const COMPONENT= renderer.create(
        <EditMedItem name={NAME_PROP} />
    );
    let tree = COMPONENT.toJSON();
    expect(tree).toMatchSnapshot();
});
