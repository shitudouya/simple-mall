import React, { Component } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { getVerifyCode, handleLogin } from "../api";
import { Add_User_Action } from "../store/actions/index";
import { connect } from "react-redux";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 }
};

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyCode: ""
    };
  }
  onFinish = (values) => {
    handleLogin(values)
      .then((res) => {
        if (res.code === 200) {
          message.success("登录成功");
          localStorage.setItem("token", res.data);
          this.props.handleCancel();
          this.props.add_user();
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Success:", values);
  };
  RequestVerifyCode = () => {
    getVerifyCode()
      .then((res) => {
        this.setState({
          verifyCode: "data:image/jpeg;base64," + res.data.img
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.RequestVerifyCode();
  }
  render() {
    const { verifyCode } = this.state;
    const { visible, handleCancel } = this.props;
    return (
      <Modal title="登录" destroyOnClose onCancel={handleCancel} visible={visible} footer={null}>
        <Form {...layout} name="basic" onFinish={this.onFinish}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入你的用户名!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入你的密码!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="验证码" name="vc" rules={[{ required: true, message: "请输入验证码!" }]}>
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item style={{ textAlign: "center", cursor: "pointer" }}>
            <img title="点击更换验证码" onClick={this.RequestVerifyCode} src={verifyCode} alt="验证码" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" block htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add_user: () => {
      dispatch(Add_User_Action());
    }
  };
};

export default connect(null, mapDispatchToProps)(LoginBox);
