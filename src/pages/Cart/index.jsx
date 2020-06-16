import React, { Component } from "react";
import { connect } from "react-redux";
import { AddCart_Action, DelCart_Action, Count_Action } from "../../store/actions/index";
import "./style.scss";
import Cart from "../../components/Cart";

class Index extends Component {
  render() {
    const { isLogin } = this.props;
    const { cartList, change_count, delete_cart, add_cart } = this.props;
    const alreadyLogin = localStorage.getItem("token") && isLogin;
    return alreadyLogin ? (
      <Cart cartList={cartList} add_cart={add_cart} change_count={change_count} delete_cart={delete_cart} />
    ) : (
      <p>登录后可查看购物车</p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.UserReducer.isLogin,
    cartList: state.CartReducer.cart_list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_cart: (value) => {
      dispatch(AddCart_Action(value));
    },
    delete_cart: (pid) => {
      dispatch(DelCart_Action(pid));
    },
    change_count: (info, count) => {
      dispatch(Count_Action(info, count));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
