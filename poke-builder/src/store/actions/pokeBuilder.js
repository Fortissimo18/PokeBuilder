import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const resetIngredients = (names) => {
    return {
        type: actionTypes.RESET_INGREDIENTS,
        ingredientNames: names
    };
};
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
        totalPrice: 4,
        error: false
    };
};

export const fetchIngredientsFailed = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        ingredients: ingredients
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://poke-builder-87324-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed(error))
            });
    }
}