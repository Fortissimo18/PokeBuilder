import React, { Component } from 'react';
import Auxilliary from '../../hoc/Auxilliary';
import Poke from '../../components/Poke/Poke';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Poke/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './PokeBuilder.module.css';
import Carousel from '../Carousel/Carousel';
import { motion } from 'framer-motion';

class PokeBuilder extends Component {

    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }


    purchasingHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
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


    render() {

        //if ingredients cannot be loaded
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let poke = null;
        if (this.props.error) {
            poke = <p>Ingredients cannot be loaded</p>
        }
        else {
            if (window.visualViewport.width <= 480) {
                poke = <Spinner displaytop='25vh' displayleft='40vw' />
            }
            else {
                poke = <Spinner displaytop='33vh' displayleft='48vw' />
            }
        }


        if (this.props.ings) {
            poke = (<Auxilliary>
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{ opacity: 1, transition: { duration: 1, delay: 0.5 } }}
                    exit={{ opacity: 0, transition: { delay: 0 } }} className={classes.PokeBuilder}>

                    {window.innerWidth <= 480 ? <h1 className={classes.Neon}>Build Your Own Bowl</h1> : null}

                    <div className={classes.Left}> <Poke ingredients={this.props.ings} /></div>
                    <div className={classes.Right}>
                        {window.innerWidth <= 480 ? null : <h1 className={classes.Neon}>Build Your Own Bowl</h1>}

                        <Carousel
                            isAuth={this.props.isAuthenticated}
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            ingredientsReset={this.props.onIngredientsReset}
                            totalPrice={this.props.price}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchasingHandler}
                            disable={disableInfo}
                            ings={this.props.ings} />
                    </div>
                </motion.div>
            </Auxilliary>);

            orderSummary = <OrderSummary
                price={this.props.price.toFixed(2)}
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }

        if (this.props.ingredients === null) {
            if (window.visualViewport.width <= 480) {
                orderSummary = <Spinner displaytop='25vh' displayleft='40vw' />
            }
            else {
                orderSummary = <Spinner displaytop='33vh' displayleft='48vw' />
            }
        }


        return (
            <Auxilliary>
                <motion.div
                    initial={{
                        opacity: 0,
                        x: -500,
                        scale: 2,
                        backgroundColor: 'whitesmoke'
                    }}
                    animate={{ opacity: 1, x: 0, scale: 1, backgroundColor: 'whitesmoke' }}
                    transition={{ ease: [0.43, 0.13, 0.23, 0.96], duration: 0.5 }}
                    exit={{ opacity: 0.4, x: -500, scale: 2, backgroundColor: 'whitesmoke', transition: { ease: [0.43, 0.13, 0.23, 0.96], duration: 0.5, delay: 1 } }}
                    className={classes.PokeBG}>
                </motion.div>
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
        onIngredientsReset: (ingNames) => dispatch(actions.resetIngredients(ingNames)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PokeBuilder, axios));