import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = {
    base: {
        value: '',
        ingredients: [
            { label: 'Quinoa', type: 'quinoa', price: '5' },
            { label: 'White Rice', type: 'whiterice', price: '3' },
            { label: 'Brown Rice', type: 'brownrice', price: '4' },],
    },
    proteins: [
        { label: 'Prawn', type: 'prawn', price: '3' },
        { label: 'Egg', type: 'egg', price: '2' },
        { label: 'Tofu', type: 'tofu', price: '2' },],
    toppings: [
        { label: 'Lettuce', type: 'lettuce', price: '1' },
        { label: 'Peas', type: 'peas', price: '1' },
        { label: 'Tomato', type: 'tomato', price: '2' },
    ],
};


//change the selection of base ingredient
const selectionChangedHandler = (event, props) => {
    controls.base.value = event.target.value;
    let resetIngNames = []
    controls.base.ingredients.forEach(ing => {
        if (ing.type !== controls.base.value) {
            resetIngNames.push(ing.type);
        }
    });
    props.ingredientsReset(resetIngNames);
    props.ingredientAdded(controls.base.value);
}


const buildControls = (props) => {

    //animate control step switching
    let animationClass = [classes.Controls];
    if (props.animationCSS === "up") {
        animationClass = [classes.Controls, classes.GoUp];
    }
    if (props.animationCSS === "down") {
        animationClass = [classes.Controls, classes.GoDown];
    }

    //load different control style based on ingredient type
    let transformedControls = [];
    if (props.category === 'base') {
        controls['base'].ingredients.map(base => (transformedControls.push(
            <div className={classes.RadioGroup} key={base.type}>
                <label className={classes.RadioLabel} >
                    <input type="radio" id={base.type} name="base" value={base.type} onChange={(event) => selectionChangedHandler(event, props)}></input>
                    <span className={classes.InnerLabel}>{base.label}</span>
                    <span className={classes.IngredientPrice}>  ${base.price}</span>
                </label>
            </div>
        )));
    }

    else {
        controls[props.category].forEach(ctrl => {
            transformedControls.push(
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    ingPrice={ctrl.price}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disable={props.disable[ctrl.type]}
                    numIngs={props.ings[ctrl.type]}
                    animationCSS={props.animationCSS}
                    animationReset={props.animationReset}
                />
            );
        });
    }

    return (
        <div>
            <div className={animationClass.join(' ')} onAnimationEnd={props.animationReset}>
                {transformedControls}
            </div>
            <p className={classes.TotalPrice}>Total Price: {props.totalPrice.toFixed(2)}</p>
        </div>
    )

}

export default buildControls;