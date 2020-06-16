import React, { Component } from "react";
import { Button } from "antd";
import LoginBox from "./LoginBox";
import "../assets/login.scss";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleCancel = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    const { visible } = this.state;
    const Empty = <></>;
    return (
      <React.Fragment>
        <Button type="link" onClick={this.showModal}>
          登录
        </Button>
        {visible ? <LoginBox visible={visible} handleCancel={this.handleCancel} /> : Empty}
      </React.Fragment>
    );
  }
}
