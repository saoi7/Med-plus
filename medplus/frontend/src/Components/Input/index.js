import React from 'react';

function Input(props) {
   return (
        <div className={"add-med-input font-small" + " " + props.className}>
            <label className="left-padding">
                {props.labelText + ": "}
            </label>
            <input type={props.type}
                   name={props.name}
                   value={props.value}
                   onChange={props.onChange}
                   className="hidden-text-box left-padding font-small"
                   required={props.required}
                   min={props.min}
            />
        </div>
    );
}

export default Input;
