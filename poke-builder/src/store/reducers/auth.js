import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    signUpError: null,
    signInError: null,
    loading: false,
    authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                signUpError: null,
                signInError: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                signUpError: null,
                signInError: null,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                signUpError: action.signUpError,
                signInError: action.signInError,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state;
    }
}

export default reducer;