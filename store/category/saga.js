import { put, takeLatest } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-unfetch';

import { actionTypes, loadCategoriesSuccess, loadCategoriesError } from './action';

polyfill();

function* loadDataSaga() {
    try {
        const res = yield fetch('https://jsonplaceholder.typicode.com/users');
        const data = yield res.json();
        yield put(loadCategoriesSuccess(data));
    } catch (err) {
        yield put(loadCategoriesError(err));
    }
}

export default takeLatest(actionTypes.GET_CATEGORIES, loadDataSaga);
