function compareDate(a, b) {
    return ((a.getDate() === b.getDay()) && 
            (a.getMonth() === b.getMpnth()) &&
            (a.getFullYear() === b.getFullYear()));
}

function deep_copy(obj_to_be_copied) {
    return JSON.parse(JSON.stringify(obj_to_be_copied));
}

function getDateString() {
    let today = new Date();
    // NOTE: .getMonth() starts at 0, so add 1 to get proper month number
    return `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
}

function flatten_meds_obj(meds) {
    let med_list = [];
    Object.entries(meds).forEach(entry => {
        let [med_name, val] = entry;
        Object.entries(val).forEach(entry => {
            let [timestamp, obj] = entry;
            let med_list_item = {
                med_name,
                is_taken: obj.is_taken,
                time_to_take: timestamp,
                quantity: obj.quantity,
            };
            med_list.push(med_list_item);
        });
    });
    return med_list;
}

function set_taken_meds_that_arent_in_schedule_obj(meds, taken_meds) {
    let meds_copy = deep_copy(meds);
    Object.entries(taken_meds).forEach((entry) => {
        let [med_name, times_taken_obj] = entry;
        Object.entries(times_taken_obj).forEach((time_obj) => {
            let [time_taken, quantity] = time_obj;
            if(!meds_copy[med_name])
                meds_copy[med_name] = {};
            if(!meds_copy[med_name][time_taken]) {
                // time: { is_taken, quantity } // data structure of meds
                meds_copy[med_name][time_taken] = { is_taken: true, quantity };
            }
        });
    });
    return meds_copy;
}

function set_taken_meds(meds, taken_meds) {
    let meds_copy = deep_copy(meds);
    Object.entries(taken_meds).forEach((entry) => {
        let [med_name, times_taken_obj] = entry;
        Object.entries(times_taken_obj).forEach((time_obj) => {
            let [time_taken, quantity] = time_obj;

            // the if check prevents bugs when you set meds as taken, then change
            // the times for a schedule, then re-load homepage on the same day
            if(meds_copy[med_name] && meds_copy[med_name][time_taken]) {
                meds_copy[med_name][time_taken] = {
                    is_taken: true,
                    quantity: quantity
                };
            }
        });
    });
    return meds_copy;
}

function get_keys_of_todays_meds(meds_obj) {
    let today = new Date(getDateString());  // using getDateString() to create today's date since getDateString() doesn't include the current time in today's date
    let keys_of_todays_meds = Object.keys(meds_obj).filter(key => {
        let start_date = new Date(meds_obj[key].start_date);
        let end_date = new Date(meds_obj[key].end_date);
        return (start_date <= today && today <= end_date);
    });
    return keys_of_todays_meds;
}

function get_todays_meds_obj(meds_obj, filtered_meds_keys) {
    let meds = {};
    filtered_meds_keys.forEach(key => {
        let times_to_take_obj = Object.entries(meds_obj[key].times_to_take);
        times_to_take_obj.forEach((entry, index) => {
            let [time_to_take, quantity] = entry;
            meds[key] = {
                ...meds[key],
                [time_to_take]: {
                    is_taken: false,
                    quantity
                }
            }
        });
    });
    return meds;
}

function sort_meds_list_chronological_order(med_list) {
    let med_list_copy = deep_copy(med_list);
    med_list_copy.sort((a, b) => {
        if(a.time_to_take < b.time_to_take)
            return -1;
        return 1;
    })
    return med_list_copy;
}

export { 
    getDateString,
    flatten_meds_obj,
    set_taken_meds_that_arent_in_schedule_obj,
    set_taken_meds,
    get_keys_of_todays_meds,
    get_todays_meds_obj,
    sort_meds_list_chronological_order
};
