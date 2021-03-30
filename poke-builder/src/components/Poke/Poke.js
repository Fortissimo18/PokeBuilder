import React from 'react';
import classes from './Poke.module.css';
import PokeIngredients from './PokeIngredients/PokeIngredients';

const poke = (props) => {
    let transformedIngredients = [];

    Object.keys(props.ingredients)
    .forEach(igKey => {
            return [...Array(props.ingredients[igKey])].forEach((_, i) => {
                    transformedIngredients.push(<PokeIngredients key={igKey + i} type={igKey} />);
                });
        });
    // .reduce((arr, el) => {
    //     return arr.concat(el);
    // },[]);


    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add at least 1 ingredient</p>
    } 
    return (
        <div className={classes.Poke}>
            <PokeIngredients type="bread-top" />
            {transformedIngredients}
            <PokeIngredients type="bread-buttom" />
        </div>
    );
};

export default poke;