import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.module.css';
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = null;

        if (window.visualViewport.width <= 480) {
            orders = <Spinner displaytop='25vh' displayleft='40vw' />
        }
        else {
            orders = <Spinner displaytop='33vh' displayleft='46%' />
        }

        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }
        if (this.props.orders.length === 0) {
            orders = <div className={classes.NoOrder}><h1>Enjoy your first order with us now!</h1></div>
        }
        return (
            <div >
                <div className={classes.OrdersBG}></div>
                <div className={classes.Orders}>{orders}</div>
            </div>);
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));