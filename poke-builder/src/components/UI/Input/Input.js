import React from 'react';
import classes from './Input.module.css';
import clases from './Input.module.css';

const input = (props) => {
    let InputElement = null;
    const inputClasses = [classes.InputElement];
    if (!props.valid && props.touched){
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            InputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('textArea'):
            InputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
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
                onChange={props.changed} />
            break;
    }

    return (
        <div className={clases.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputElement}
        </div>
    );

}

export default input;