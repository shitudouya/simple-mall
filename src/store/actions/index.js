import * as type from "../constants/actionTypes";
import { getUserInfo } from "../../api";

export const AddCart_Action = (value) => {
  return {
    type: type.ADD_CART_LIST,
    value
  };
};

export const DelCart_Action = (pid) => {
  return {
    type: type.DELETE_CART_LIST,
    pid
  };
};

export const Add_User_Action = () => {
  return (dispatch) => {
    getUserInfo()
      .then((res) => {
        const action = {
          type: type.ADD_USER,
          value: res.data,
          isLogin: true
        };
        dispatch(action);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const Count_Action = (info, count) => {
  return {
    type: type.CHANGE_COUNT,
    info,
    count
  };
};

export const Recommend_Action = (value) => {
  return {
    type: type.ADD_RECOMMEND,
    value
  };
};

export const DeleteAllCart_Action = () => {
  return {
    type: type.DELETE_ALLCART
  };
};
export const Like_Action = (value) => {
  return {
    type: type.ADD_LIKE,
    value
  };
};
export const DeLike_Action = (pid) => {
  return {
    type: type.DELETE_LIKE,
    pid
  };
};
