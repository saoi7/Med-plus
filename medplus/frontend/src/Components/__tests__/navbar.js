import { MOCK_DB_MED_ENTRIES } from './mock_db_med_entries';
import {test_dom_container} from '../../setupTests';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { getByTestId, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MOCK_FIREBASE_PROP } from './mock_firebase_props';
import NavBar from '../NavBar';
import flushPromises from 'flush-promises';

test("snapshot test of NavBar", () => {
    const COMPONENT= renderer.create(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
    );
    let tree = COMPONENT.toJSON();
    expect(tree).toMatchSnapshot();
});

test("make sure NavBar is implemented with <nav> element", () => {
    act(() => {
        render(<MemoryRouter><NavBar /></MemoryRouter>, test_dom_container);
    });
    const NAV_ELEMENT = test_dom_container.childNodes[0];
    expect(NAV_ELEMENT.tagName).toBe('NAV');
});
