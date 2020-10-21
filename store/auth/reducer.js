import { actionTypes } from './action';

export const initState = {
    isLoggedIn : false,
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: true },
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: false },
            };
        case actionTypes.CHANGE_LOGGED_IN_STATUS : 
        return {
            ...state , 
            ...{ isLoggedIn : action.payload }
        };
        default:
            return state;
    }
}

export default reducer;
