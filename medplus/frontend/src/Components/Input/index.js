import React from 'react';

function Input(props) {
   return (
        <div className="add-med-input font-medium">
            <label className="left-padding">
                {props.labelText + ": "}
            </label>
            <input type={props.type}
                   name={props.name}
                   value={props.value}
                   onChange={props.onChange}
                   className="hidden-text-box left-padding font-small"
                   required={props.required}
            />
        </div>
    );
}

export default Input;
