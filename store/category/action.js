export const actionTypes = {
    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
    GET_CATEGORIES_ERROR: 'GET_CATEGORIES_ERROR'
};

export function loadCategories() {
    return { type: actionTypes.GET_CATEGORIES };
}

export function loadCategoriesSuccess(data) {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        data
    };
}

export function loadCategoriesError(error) {
    return {
        type: actionTypes.GET_CATEGORIES_ERROR,
        error
    };
}
