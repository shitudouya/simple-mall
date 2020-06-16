import * as type from "../constants/actionTypes";
import { deepClone } from "../../utils/computed";

const defaultState = {
  userInfo: {},
  isLogin:false
};
const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case type.ADD_USER:
      let newState = deepClone(state);
      newState.userInfo = action.value
      newState.isLogin = action.isLogin;
      return newState;
    default:
      return state;
  }
};

export default UserReducer;
