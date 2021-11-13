import React from 'react';

function TextInput(props) {
   return (
        <div className="add-med-input font-medium">
            <label className="left-padding">{props.labelText}</label>
            <input type='text' className="hidden-text-box left-padding font-small"></input>
        </div>
    );
}

export default TextInput;
