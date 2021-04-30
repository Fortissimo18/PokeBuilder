import React, { Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import classes from './ContactData/ContactData.module.css';
import { connect } from 'react-redux';

class CheckOut extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }


    render() {
        let summary = <Redirect to='/' />;
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = (
                <div className={classes.ContactData}>
                    {purchaseRedirect}
                    <CheckOutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} /> </div>)
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.pokeBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(CheckOut);