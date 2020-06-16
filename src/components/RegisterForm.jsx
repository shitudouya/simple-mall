import React, { Component } from "react";
import "../assets/login.scss";
import RegisterBox from "./RegisterBox";
import { Button } from "antd";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    const { visible } = this.state;
    const Empty = <></>;
    return (
      <React.Fragment>
        <Button type="link" onClick={this.showModal}>
          注册
        </Button>
        {visible ? <RegisterBox showModal={this.showModal} RegisterVisible={visible} /> : Empty}
      </React.Fragment>
    );
  }
}
