import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchasePokeSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_POKE_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchasePokeFail = (error) => {
    return {
        type: actionTypes.PURCHASE_POKE_FAIL,
        error: error
    };
};

export const purchasePokeStart = () => {
    return {
        type: actionTypes.PURCHASE_POKE_START
    };
};

export const purchasePoke = (orderData, token) => {
    return dispatch => {
        dispatch(purchasePokeStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchasePokeSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchasePokeFail(error));
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};


export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    };
};