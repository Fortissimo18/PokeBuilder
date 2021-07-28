import React from 'react';
import classes from './BuildControl.module.css';

//single control to add or remove a ingredient
const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <span className={classes.IngredientPrice}>  ${props.ingPrice}</span>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.removed} disabled={props.disable}>-</button>
        <div className={classes.number}> {props.numIngs} </div>
        <button onClick={props.added}>+</button>
    </div>
);

export default buildControl;