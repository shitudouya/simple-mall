import * as type from "../constants/actionTypes";
import { deepClone } from "../../utils/computed";

const defaultState = {
  like_list: []
};
const LikeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case type.ADD_LIKE:
      let newState = deepClone(state);
      newState.like_list = action.value;
      return newState;
    case type.DELETE_LIKE:
      let new_state = deepClone(state);
      new_state = new_state.like_list.filter((item) => item.pid !== action.pid);
      return { like_list: new_state };
    default:
      return state;
  }
};

export default LikeReducer;
