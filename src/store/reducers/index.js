import {combineReducers} from 'redux';
import CartReducer from './cart'
import LikeReducer from './like';
import UserReducer from './user'
import ProductReducer from './product'
const rootReducer = combineReducers({
  CartReducer,
  LikeReducer,
  UserReducer,
  ProductReducer
})

export default rootReducer