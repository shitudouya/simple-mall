import React, { Component } from "react";
import { Modal, Button, Form, Input, Radio, DatePicker, message } from "antd";
import { getVerifyCode, handleRegister } from "../api/index";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 }
};

//处理日期校验
const config = {
  rules: [{ type: "object", required: true, message: "请选择日期!" }]
};
//处理手机号校验
const phoneRules = [
  { required: true, message: "请输入你的手机号!" },
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (/^1(3|4|5|7|8|9)\d{9}$/.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject("手机号格式不正确!");
    }
  })
];
//确认密码校验
const confirmPwdRules = [
  {
    required: true,
    message: "请输入你的密码！"
  },
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject("两次输入的密码不一致");
    }
  })
];

export default class RegisterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyCode: ""
    };
  }
  handleCancel = () => {
    this.props.showModal();
  };

  onFinish = (values) => {
    const results = {
      ...values,
      birth: values["birth"].format("YYYY-MM-DD")
    };
    handleRegister(results)
      .then((res) => {
        if (res.code === 200) {
          message.success("注册成功，可以去登录啦~");
          this.handleCancel();
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    const { RegisterVisible } = this.props;
    const { verifyCode } = this.state;
    return (
      <Modal
        style={{ top: 20 }}
        destroyOnClose
        title="会员注册"
        onCancel={this.handleCancel}
        visible={RegisterVisible}
        footer={null}
      >
        <Form {...layout} name="basic" onFinish={this.onFinish}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: "请输入你的用户名!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" hasFeedback name="password" rules={[{ required: true, message: "请输入你的密码!" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirm" label="确认密码" dependencies={["password"]} hasFeedback rules={confirmPwdRules}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "邮箱格式不正确"
              },
              {
                required: true,
                message: "请输入邮箱！"
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="手机" rules={phoneRules}>
            <Input addonBefore="+86" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="昵称" name="nickname" rules={[{ required: true, message: "请输入你的昵称!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="sex" label="性别" rules={[{ required: true, message: "请输入你的性别!" }]}>
            <Radio.Group>
              <Radio value="1">男</Radio>
              <Radio value="0">女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="birth" label="出生日期" {...config}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="vc" label="验证码" rules={[{ required: true, message: "请输入验证码!" }]}>
            <Input />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <img
              src={verifyCode}
              style={{ cursor: "pointer" }}
              title="点击更换验证码"
              onClick={this.RequestVerifyCode}
              alt="验证码"
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" block htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
