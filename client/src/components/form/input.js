import React from 'react';

const input = (props) => {
    let formElement;

    switch (props.element) {
        case 'input':
            formElement = <input  {...props.elementConfig} 
                                    value={props.value}
                                    className={props.classes} 
                                    onChange={props.changed} />;
            break;
        case 'textarea':
            formElement = <textarea {...props.elementConfig} 
                                    value={props.value}
                                    className={props.classes} 
                                    onChange={props.changed} />;
            break;
        case 'select': 
            formElement = (
                <select value={props.value} onChange={props.changed}>       
                    {
                        props.elementConfig.options.map(option => {
                            return (
                                <option key={option.value}
                                        value={option.value}>  {option.displayValue} </option>
                            );
                        })
                    }
                </select>
            );
            break;
        default:
            formElement = <input  {...props.elementConfig} 
                                    value={props.value}
                                    className={props.classes} 
                                    onChange={props.changed} />;

    }
    return (
        <div className="form-group">
            {formElement}
        </div>
    );
}

export default input;