import React, { Component } from 'react';
import Auxilliary from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render(){
          const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>
                    {igKey}
                </span>
                : {this.props.ingredients[igKey]}</li>
        }
        );
    return (
        <Auxilliary>
            <h3>Your Order: </h3>
            <ul>
                {ingredientSummary}    
            </ul>
            <p><strong>Total Price: {this.props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
        </Auxilliary>
    );}
}

export default OrderSummary;