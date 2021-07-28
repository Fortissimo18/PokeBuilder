import React from 'react';
import classes1 from './Input.module.css';
import classes2 from './InputStyle2.module.css';
import Alert from '../../../shared/alert';

const input = (props) => {

    let classes = null;
    switch (props.mode) {
        case ('2'): classes = classes2; break;
        default: classes = classes1; break;
    }

    const inputClasses = [classes.InputElement];
    if (!props.valid.value && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let InputElement = null;

    switch (props.elementType) {
        case ('input'):
            InputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required={props.required} />
            break;
        case ('textArea'):
            InputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required={props.required} />
            break;
        case ('select'):
            InputElement =
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>))}
                </select>
            break;
        default:
            InputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                required={props.required} />
            break;
    }

    let errorMessage = null;
    if (props.valid.errorMessage) {
        errorMessage = props.valid.errorMessage.map(msg => (
            <Alert msg={msg} style={props.mode}></Alert>
        ));
    }
    return (
        <div className={classes.Input} >
            <label className={classes.Label}>{props.label}</label>
            {InputElement}
            {errorMessage}
            <i className={classes.InputIcon}></i>
        </div>
    );

}

export default input;