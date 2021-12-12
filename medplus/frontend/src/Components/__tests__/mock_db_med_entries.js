// dummy test so that jest doesn't report this file
// as a failed test for having 0 tests in it
test("dummy test", () => {});

export const MOCK_DB_MED_ENTRIES = {
    "1234": {
        "edit_page_flag": true,
        "end_date": "2021-12-01",
        "med_name": "1234",
        "page_title": "Edit medication",
        "start_date": "2021-12-01",
        "submit_button_text": "Apply changes",
        "times_to_take": {
            "02:00": "2",
            "04:00": "4"
        }
    },
    "abc": {
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
    },
    "def": {
        "edit_page_flag": false,
        "end_date": "2021-12-05",
        "med_name": "def",
        "page_title": "Add new medication",
        "start_date": "2021-11-01",
        "times_to_take": {
            "12:34": "123"
        }
    },
    "ghi": {
        "edit_page_flag": false,
        "end_date": "2021-12-15",
        "med_name": "ghi",
        "page_title": "Add new medication",
        "start_date": "2021-12-01",
        "submit_button_text": "Add medication",
        "times_to_take": {
            "12:34": "1"
        }
    },
    "jkl": {
        "edit_page_flag": true,
        "end_date": "2021-12-01",
        "med_name": "jkl",
        "page_title": "Edit medication",
        "start_date": "2021-12-01",
        "submit_button_text": "Apply changes",
        "times_to_take": {
            "12:34": "3"
        }
    },
}
