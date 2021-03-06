import React from 'react';
import classnames from 'classnames';

const input = (props) => {
    let formElement;

    switch (props.elementType) {
        case 'input':
            formElement = (
                <div className="form-group">
                    <input  {...props.elementConfig} 
                            value={props.value}
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': props.errors ? (props.errors[props.elementConfig.name]) : false
                            })} 
                            onChange={props.changed} />
                    
                    <small className="form-text text-muted">{props.info}</small>
                    {props.errors ? (props.errors[props.elementConfig.name] ? <div className="invalid-feedback">{props.errors[props.elementConfig.name] }</div> : null) : null}
                </div>      
            );
            break;
        case 'inputWithIcon':
            formElement = (
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className={props.iconClasses}></i>
                        </span>
                    </div>

                    <input  {...props.elementConfig} 
                            value={props.value}
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': props.errors ? (props.errors[props.elementConfig.name]) : false
                            })}
                            onChange={props.changed} />
                    
                    {props.errors ? (props.errors[props.elementConfig.name] ? <div className="invalid-feedback">{props.errors[props.elementConfig.name] }</div> : null) : null}
                </div>      
            );
            break;
        case 'textarea':
            formElement =  (
                <div className="form-group">
                    <textarea   {...props.elementConfig} 
                                value={props.value}
                                className="form-control form-control-lg"
                                onChange={props.changed} />
                    
                    <small className="form-text text-muted">{props.info}</small>
                </div>
            );
            break;
        case 'select': 
            formElement = (
                <div className="form-group">
                    <select 
                        onChange={props.changed} 
                        name={props.elementConfig.name}
                        value={props.value}
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': props.errors ? (props.errors[props.elementConfig.name]) : false
                        })}>       
                        {
                            props.elementConfig.options.map(option => {
                                return (
                                    <option key={option.value}
                                            value={option.value}>  {option.displayValue} </option>
                                );
                            })
                        }
                    </select>

                    <small className="form-text text-muted">{props.info}</small>
                    {props.errors ? (props.errors[props.elementConfig.name] ? <div className="invalid-feedback">{props.errors[props.elementConfig.name] }</div> : null) : null}
                </div>
            );
            break;
        default:
            formElement = (
                <div className="form-group">
                    <input  {...props.elementConfig} 
                                    value={props.value}
                                    className={props.classes} 
                                    onChange={props.changed} />
                    
                    <small className="form-text text-muted">{props.info}</small>
                </div>
            );
    }
    return formElement;
}

export default input;