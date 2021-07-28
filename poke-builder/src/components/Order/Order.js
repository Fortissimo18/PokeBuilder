import React from 'react';
import classes from './Order.module.css';

//display all orders placed by the user
const order = (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        if (ig.amount !== 0) {
            return <span
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}>
                {ig.name} X {ig.amount} </span>;
        }
        else {
            return <span />
        }
    });

    return (
        <div className={classes.Order}>
            <p><strong>Ingredients</strong>: {ingredientOutput}</p>
            <p>Price: <strong>AUD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};



export default order;
