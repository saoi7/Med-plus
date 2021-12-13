import React from 'react';

function SubmitInput(props) {
    return (
        <div className="add-med-input font-small">
            <input type="submit" value={props.labelText} className="hidden-submit-button background-grey background-grey-hover font-small"></input>
        </div>
    );
}

export default SubmitInput;
