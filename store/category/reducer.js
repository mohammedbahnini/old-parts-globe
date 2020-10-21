import { actionTypes } from './action';

export const initialState = {
    data: null,
    error: false
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{ data: action.data }
            };

        case actionTypes.GET_CATEGORIES_ERROR:
            return {
                ...state,
                ...{ error: action.error }
            };

        default:
            return state;
    }
}

export default reducer;
