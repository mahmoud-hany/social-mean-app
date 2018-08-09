import React from 'react';

const Input = (props) => {
    let input =  null;

    switch(props.elemntType) {
        case 'input': 
            input = <input onChange={props.changed}  { ...props.elemntConfig } />;
        case 'textarea':
            input = <textarea onChange={props.changed} { ...props.elemntConfig} ></textarea>;
        case 'select':
            input = <select></select>;
        default:
            input = <input onChange={props.changed}  { ...props.elemntConfig } />;
    }

    return input;
};

export default Input;