import * as type from "../constants/actionTypes";
import { deepClone, computedCount } from "../../utils/computed";

const defaultState = {
  cart_list: []
};
const CartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case type.ADD_CART_LIST:
      let newState = deepClone(state);
      newState.cart_list = action.value
      return newState;
    case type.DELETE_CART_LIST:
      let new_state = deepClone(state);
      new_state = new_state.cart_list.filter((item) => item.pid !== action.pid);
      return { cart_list: new_state };
    case type.CHANGE_COUNT:
      let computedState = computedCount(action.info,state,action.count);
      return { cart_list: computedState };
    case type.DELETE_ALLCART:
      let allState = deepClone(state);
      allState.cart_list = [];
      return allState;
    default:
      return state;
  }
};

export default CartReducer;
