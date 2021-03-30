import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },

];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price: {props.totalPrice.toFixed(2)}</p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            added = {()=>props.ingredientAdded(ctrl.type)}
            removed = {()=>props.ingredientRemoved(ctrl.type)}
            disable = {props.disable[ctrl.type]}/>
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchasable}
        onClick={props.ordered}>
        Order Now </button>
    </div>
);

export default buildControls;