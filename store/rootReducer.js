import { combineReducers } from 'redux';
import post from './post/reducer';
import category from './category/reducer';
import product from './product/reducer';
import setting from './setting/reducer';
import cart from './cart/reducer';
import compare from './compare/reducer';
import auth from './auth/reducer';
import wishlist from './wishlist/reducer';

export default combineReducers({
    auth,
    post,
    category,
    product,
    setting,
    cart,
    compare,
    wishlist,
});
