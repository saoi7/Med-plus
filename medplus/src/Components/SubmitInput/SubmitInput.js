import React from 'react';

function SubmitInput(props) {
    return (
        <div className="add-med-input font-medium">
            <input type="submit" value={props.labelText} className="hidden-submit-button font-medium"></input>
        </div>
    );
}

export { SubmitInput };