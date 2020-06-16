import React, { Component } from "react";
import CommonHeader from "./components/CommonHeader";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./router/index";
import { connect } from "react-redux";
import { Add_User_Action } from "./store/actions/index";

class App extends Component {
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("token")) {
      this.props.add_user();
    }
    if (!localStorage.getItem("history")) {
      localStorage.setItem("history", JSON.stringify(JSON.parse("[]")));
    }
  }
  render() {
    return (
      <BrowserRouter>
        <CommonHeader user_info={this.props.user_info} isLogin={this.props.isLogin} />
        <Routes />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_info: state.UserReducer.userInfo,
    isLogin: state.UserReducer.isLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_user: () => {
      dispatch(Add_User_Action());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
