import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import Auxilliary from '../../../hoc/Auxilliary';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                validity: { value: false, errorMessage: null },
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true
                },
                validity: { value: false, errorMessage: null },
                touched: false
            },

            postcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4,
                    isNumeric: true
                },
                validity: { value: false, errorMessage: null },
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    isNumeric: true
                },
                validity: { value: false, errorMessage: null },
                touched: false
            },

        },
        formValidity: false
    }


    orderHandler = (event) => {
        event.preventDefault(); //prevent page reload
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderPoke(order, this.props.token);
    }

    //display the typed in content on the form in real time (two-way binding)
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }; //deep clone

        updatedFormElement.value = event.target.value;
        updatedFormElement.validity = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formValidity = true;
        for (let inputIdentifier in updatedOrderForm) {
            formValidity = updatedOrderForm[inputIdentifier].validity.value && formValidity
        }

        this.setState({ orderForm: updatedOrderForm, formValidity: formValidity });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (<form >
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    mode='2'
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    valid={formElement.config.validity}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ))}
            <button disabled={!this.state.formValidity} onClick={this.orderHandler}>Order</button>
        </form>);

        if (this.props.loading) {
            if (window.visualViewport.width <= 480) {
                form = <Spinner displaytop='5vh' displayleft='23vw' />
            }
            else {
                form = <Spinner displaytop='5vh' displayleft='37%' />
            }
        }
        return (
            <Auxilliary>
                <div className={classes.ContactData}>
                    {form}
                </div>
            </Auxilliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.pokeBuilder.ingredients,
        price: state.pokeBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderPoke: (orderData, token) => dispatch(actions.purchasePoke(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));