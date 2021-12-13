import { MOCK_DB_MED_ENTRIES } from './mock_db_med_entries';
import {test_dom_container} from '../../setupTests';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { getByTestId, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MOCK_FIREBASE_PROP } from './mock_firebase_props';
import flushPromises from 'flush-promises';
import { ProfilePageBase } from '../ProfilePage';

test("snapshot test of ProfilePage", () => {
    const COMPONENT= renderer.create(
        <MemoryRouter>
            <ProfilePageBase firebase={MOCK_FIREBASE_PROP}/>
        </MemoryRouter>
    );
    let tree = COMPONENT.toJSON();
    expect(tree).toMatchSnapshot();
});
