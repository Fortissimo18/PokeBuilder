import React, { Component } from 'react';
import classes from './OrderSummary.module.css'

//order preview popup
class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                if (this.props.ingredients[igKey] !== 0) {
                    return <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>
                            {igKey}
                        </span>
                        : {this.props.ingredients[igKey]}</li>
                }
                else {
                    return <div key={igKey}/>;
                }
            });

        return (
            <div id="summary" className={classes.OrderSummary}>
                <h1>Your Order: </h1>
                <ul className={classes.List}>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p></p>
                <p>Continue to Checkout?</p>
                <button className={classes.ContinueButton} onClick={this.props.purchaseContinued}>Continue</button>
                <button className={classes.CancelButton} onClick={this.props.purchaseCancelled}>Cancel</button>
            </div>
        );
    }
}

export default OrderSummary;