import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import Poke from '../../components/Poke/Poke';
import BuildControls from '../../components/Poke/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Poke/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 1,
    cheese: 0.4,
    meat: 2
};

class PokeBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        alert("Continued");
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        console.log(oldCount);
        const updatedCount = oldCount - 1;
        if (updatedCount < 0) {
            return;
        }

        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }


    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Auxilliary>
                <Modal 
                show={this.state.purchasing}
                modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                    price={this.state.totalPrice.toFixed(2)}
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    />
                </Modal>
                <Poke ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}
                    disable={disableInfo} />
            </Auxilliary>
        );
    }
}

export default PokeBuilder;