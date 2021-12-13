import { MOCK_DB_MED_ENTRIES } from './mock_db_med_entries';

export const MOCK_FIREBASE_DB_REF_PROP = {
    get: () => { return Promise.resolve({ val: () => MOCK_DB_MED_ENTRIES }); }
};

export const MOCK_FIREBASE_PROP = {
    currentUserUID: () => 123,
    currentUser: () => {
        return {
            get: () => {
                return Promise.resolve({ username: 'abc' });
            }
        };
    },
    getShareeOfRef: () => {
        return {
            get: () => {
                // returning empty object since the feature that uses this obj ended up not getting fully implement
                return Promise.resolve({});
            }
        }
    },
    TEST_schedules: () => MOCK_FIREBASE_DB_REF_PROP,
    TEST_taken: (date_str) => {
        return {
            get: () => {
                return Promise.resolve({ val: MOCK_TAKEN_MEDS });
            },
            child: (med_name) => {
                return {
                    update: () => {
                        return Promise.resolve();
                    }
                }
            }
        }
    }
};
