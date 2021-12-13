import {
    getDateString,
    flatten_meds_obj,
    set_taken_meds_that_arent_in_schedule_obj,
    set_taken_meds,
    get_keys_of_todays_meds,
    get_todays_meds_obj,
    sort_meds_list_chronological_order
} from '../HomePage';
import { MOCK_DB_MED_ENTRIES } from './mock_db_med_entries';
import { MOCK_FIREBASE_DB_REF_PROP, MOCK_FIREBASE_PROP } from './mock_firebase_props';
import {test_dom_container} from '../../setupTests';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';
import { getByTestId, fireEvent } from '@testing-library/react';
import { MedListBase, MedListItem, HomePageBase, MedListSelection } from '../HomePage';
import { MemoryRouter } from 'react-router-dom';

// getDateString() will return a different string depending on the current date.
// mocking getDateString() function so that it will always return the same date
// so that tests will work the same no matter when you run them
// see: https://jestjs.io/docs/mock-functions#mocking-partials
jest.mock('../HomePage/med_list_helpers', () => {
    const ORIGINAL_MODULE = jest.requireActual('../HomePage/med_list_helpers');
    return {
        ...ORIGINAL_MODULE,
        getDateString: () => '2021-12-05'
    };
});

test("unit tests of get_keys_of_todays_meds", () => {
    const EXPECTED_MED_KEYS = ['abc', 'ghi'];
    const MED_KEYS = get_keys_of_todays_meds(MOCK_DB_MED_ENTRIES);
    expect(MED_KEYS.length).toBe(2);
    expect(MED_KEYS).toEqual(expect.arrayContaining(EXPECTED_MED_KEYS));
});

test("unit tests of get_todays_meds_obj", () => {
    const MOCK_MED_KEYS = ['abc', 'ghi'];
    const MEDS = get_todays_meds_obj(MOCK_DB_MED_ENTRIES, MOCK_MED_KEYS);
    expect(Object.keys(MEDS).length).toBe(2);

    expect(MEDS.abc['04:00'].is_taken).toBe(false);
    expect(MEDS.abc['04:00'].quantity).toBe('1');

    expect(MEDS.abc['05:00'].is_taken).toBe(false);
    expect(MEDS.abc['05:00'].quantity).toBe('999');

    expect(MEDS.ghi['12:34'].is_taken).toBe(false);
    expect(MEDS.ghi['12:34'].quantity).toBe('1');
});

test("unit tests of set_taken_meds_that_arent_in_schedule_obj", () => {
    const MOCK_MEDS = {
        abc: {
            '04:00': { is_taken: false, quantity: '1' },
            '05:00': { is_taken: false, quantity: '999' },
        },
        ghi: {
            '12:34': { is_taken: false, quantity: '1' }
        },
    };
    const MOCK_TAKEN_MEDS = {
        abc: {
            "05:00": "999"
        },
        ghi: {
            "12:34": "1"
        },
        zzz: {
            "01:00": "3"
        }
    };
    const MEDS = set_taken_meds_that_arent_in_schedule_obj(MOCK_MEDS, MOCK_TAKEN_MEDS);
    expect(Object.keys(MEDS).length).toBe(3);

    expect(MEDS.abc['04:00'].is_taken).toBe(false);
    expect(MEDS.abc['04:00'].quantity).toBe('1');

    expect(MEDS.abc['05:00'].is_taken).toBe(false);
    expect(MEDS.abc['05:00'].quantity).toBe('999');

    expect(MEDS.ghi['12:34'].is_taken).toBe(false);
    expect(MEDS.ghi['12:34'].quantity).toBe('1');

    expect(MEDS.zzz['01:00'].is_taken).toBe(true);
    expect(MEDS.zzz['01:00'].quantity).toBe('3');
});

test("unit tests of set_taken_meds", () => {
    const MOCK_MEDS = {
        abc: {
            '04:00': { is_taken: false, quantity: '1' },
            '05:00': { is_taken: false, quantity: '999' },
        },
        ghi: {
            '12:34': { is_taken: false, quantity: '1' }
        },
        zzz: {
            '01:00': { is_taken: true, quantity: '3' }
        }
    };
    const MOCK_TAKEN_MEDS = {
        abc: {
            "05:00": "999"
        },
        ghi: {
            "12:34": "999" // note this is different from MOCK_MEDS to represent that user has changed quantity
        },
        zzz: {
            "01:00": "3"
        }
    };
    const MEDS = set_taken_meds(MOCK_MEDS, MOCK_TAKEN_MEDS);
    expect(Object.keys(MEDS).length).toBe(3);

    expect(MEDS.abc['04:00'].is_taken).toBe(false);
    expect(MEDS.abc['04:00'].quantity).toBe('1');

    expect(MEDS.abc['05:00'].is_taken).toBe(true);
    expect(MEDS.abc['05:00'].quantity).toBe('999');

    expect(MEDS.ghi['12:34'].is_taken).toBe(true);
    expect(MEDS.ghi['12:34'].quantity).toBe('999');

    expect(MEDS.zzz['01:00'].is_taken).toBe(true);
    expect(MEDS.zzz['01:00'].quantity).toBe('3');
});

test("unit tests of flatten_meds_obj", () => {
    const MOCK_MEDS = {
        abc: {
            '04:00': { is_taken: true, quantity: '2' },
        },
        ghi: {
            '12:34': { is_taken: false, quantity: '1' }
        },
        zzz: {
            '01:00': { is_taken: true, quantity: '3' }
        }
    };
    const MEDS = flatten_meds_obj(MOCK_MEDS);
    expect(MEDS.length).toBe(3);

    expect(MEDS[0].med_name).toBe('abc');
    expect(MEDS[0].is_taken).toBe(true);
    expect(MEDS[0].time_to_take).toBe('04:00');
    expect(MEDS[0].quantity).toBe('2');

    expect(MEDS[1].med_name).toBe('ghi');
    expect(MEDS[1].is_taken).toBe(false);
    expect(MEDS[1].time_to_take).toBe('12:34');
    expect(MEDS[1].quantity).toBe('1');

    expect(MEDS[2].med_name).toBe('zzz');
    expect(MEDS[2].is_taken).toBe(true);
    expect(MEDS[2].time_to_take).toBe('01:00');
    expect(MEDS[2].quantity).toBe('3');
});

test("unit tests of sort_meds_list_chronological_order", () => {
    const MOCK_FLATTENED_MEDS_OBJ = [
        {
            med_name: 'abc',
            is_taken: true,
            time_to_take: '14:11',
            quantity: '2'
        },
        {
            med_name: 'ghi',
            is_taken: false,
            time_to_take: '12:34',
            quantity: '1'
        },
        {
            med_name: 'zzz',
            is_taken: true,
            time_to_take: '01:00',
            quantity: '3'
        }
    ];

    const MEDS = sort_meds_list_chronological_order(MOCK_FLATTENED_MEDS_OBJ);
    expect(MEDS.length).toBe(3);

    expect(MEDS[0].med_name).toBe('zzz');
    expect(MEDS[0].is_taken).toBe(true);
    expect(MEDS[0].time_to_take).toBe('01:00');
    expect(MEDS[0].quantity).toBe('3');

    expect(MEDS[1].med_name).toBe('ghi');
    expect(MEDS[1].is_taken).toBe(false);
    expect(MEDS[1].time_to_take).toBe('12:34');
    expect(MEDS[1].quantity).toBe('1');

    expect(MEDS[2].med_name).toBe('abc');
    expect(MEDS[2].is_taken).toBe(true);
    expect(MEDS[2].time_to_take).toBe('14:11');
    expect(MEDS[2].quantity).toBe('2');
});

const MOCK_TAKEN_MEDS = {
    abc: {
        "05:00": "999"
    },
    ghi: {
        "12:34": "999" // note this is different from MOCK_MEDS to represent that user has changed quantity
    },
    zzz: {
        "01:00": "3"
    }
};

test("snapshot test of MedList to prevent unintentional changes", () => {
    const COMPONENT= renderer.create(
        <MedListBase firebase={MOCK_FIREBASE_PROP} medListDBRef={MOCK_FIREBASE_DB_REF_PROP} />
    );
    let tree = COMPONENT.toJSON();
    expect(tree).toMatchSnapshot();
});

test("snapshot test of MedListItem to prevent unintentional changes", () => {
    const PROP_1 = {
        med_name: 'abc',
        time_to_take: '01:00',
        is_taken: true,
        quantity: '123'
    }

    const COMPONENT_1 = renderer.create(
        <MedListItem data={PROP_1} />
    );
    let tree = COMPONENT_1.toJSON();
    expect(tree).toMatchSnapshot();

    const PROP_2 = {
        med_name: 'e9rtjqn32knto34ijy',
        time_to_take: '12:34',
        is_taken: false,
        quantity: '999'
    }

    const COMPONENT_2 = renderer.create(
        <MedListItem data={PROP_2} />
    );
    tree = COMPONENT_2.toJSON();
    expect(tree).toMatchSnapshot();
});

test("snapshot test of HomePage to prevent unintentional changes", () => {
    const COMPONENT = renderer.create(
        <MemoryRouter>
            <HomePageBase firebase={MOCK_FIREBASE_PROP} />
        </MemoryRouter>
    );
    let tree = COMPONENT.toJSON();
    expect(tree).toMatchSnapshot();
});

test("snapshot test of MedListSelection to prevent unintentional changes", () => {
    const COMPONENT = renderer.create(
        <MedListSelection medListObjs={{ 'abc': {ref: 'zzz', uid: 123 } }} />
    );
    let tree = COMPONENT.toJSON();
    expect(tree).toMatchSnapshot();
});
