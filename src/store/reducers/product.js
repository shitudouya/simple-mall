import * as type from "../constants/actionTypes";
import { deepClone } from "../../utils/computed";

const defaultState = {
  recommendList: []
};
const ProductReducer = (state = defaultState, action) => {
  switch (action.type) {
    case type.ADD_RECOMMEND:
      let recState = deepClone(state);
      recState.recommendList = action.value;
      return recState;
    default:
      return state;
  }
};

export default ProductReducer;
