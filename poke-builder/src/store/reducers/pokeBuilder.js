import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    building: false
};

const INGREDIENT_PRICE = {
    quinoa: 5,
    whiterice: 3,
    brownrice: 4,
    prawn: 3,
    egg: 2,
    tofu: 2,
    lettuce: 1,
    peas: 1,
    tomato: 2,

};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                //overwrite the copy of ingredients
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                building: true
            };
        case actionTypes.RESET_INGREDIENTS:
            let resetIngredients = { ...state.ingredients };
            let resetPrice = state.totalPrice;
            action.ingredientNames.forEach(ing => {
                if (resetIngredients[ing] !== 0) {
                    resetPrice = resetPrice - INGREDIENT_PRICE[ing];

                }
                resetIngredients[ing] = 0;

            });
            return {
                ...state,
                ingredients: resetIngredients,
                totalPrice: resetPrice,
                building: true
            };

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 0,
                error: false,
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            {
                return {
                    ...state,
                    error: true
                }
            }
        default: return state;
    }
}

export default reducer;