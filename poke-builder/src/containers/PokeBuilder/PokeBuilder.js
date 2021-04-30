import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import Poke from '../../components/Poke/Poke';
import BuildControls from '../../components/Poke/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Poke/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';


class PokeBuilder extends Component {

    state = {
        // purchasable: false,
        purchasing: false,
    };

    purchasingHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true });
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    // purchaseContinueHandler = () => {
    //     const queryParams = [];
    //     for (let i in this.props.ings) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
    //     }
    //     queryParams.push('price=' + this.props.price);
    //     const queryString = queryParams.join('&');
    //     this.props.history.push(
    //         {
    //             pathname: '/checkout',
    //             search: '?' + queryString
    //         });
    // }
    componentDidMount() {
        this.props.onInitIngredients()
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = { ...this.props.ings };
    //     updatedIngredients[type] = updatedCount;

    //     const newPrice = this.props.price + INGREDIENT_PRICE[type];
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);

    // }

    // removeIngredientHandler = (type) => {
    //     const ol dCount = this.props.ings[type];
    //     const updatedCount = oldCount - 1;
    //     if (updatedCount < 0) {
    //         return;
    //     }

    //     const updatedIngredients = { ...this.props.ings };
    //     updatedIngredients[type] = updatedCount;

    //     const newPrice = this.props.price - INGREDIENT_PRICE[type];
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }


    render() {
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }


        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }
        let orderSummary = null;
        let poke = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
        if (this.props.ings) {
            poke = <Auxilliary>
                <Poke ingredients={this.props.ings} />
                <BuildControls
                    isAuth = {this.props.isAuthenticated}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    totalPrice={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchasingHandler}
                    disable={disableInfo} />
            </Auxilliary>;

            orderSummary = <OrderSummary
                price={this.props.price.toFixed(2)}
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }
        if (this.props.ingredients === null) {
            orderSummary = <Spinner></Spinner>
        }
        return (
            <Auxilliary>                
                <Modal
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
                {poke}
                </Auxilliary>

        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.pokeBuilder.ingredients,
        price: state.pokeBuilder.totalPrice,
        error: state.pokeBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase:() => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=> dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PokeBuilder, axios));