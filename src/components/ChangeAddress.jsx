import React, { Component } from "react";
import { Modal, Button, Form, Input } from "antd";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 }
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

export default class ChangeAddress extends Component {
  onFinish = (values) => {
    this.props.sendAddress(values);
    this.props.handleCancel();
  };
  render() {
    const { visible, handleCancel } = this.props;
    return (
      <Modal title="填写收货地址" destroyOnClose onCancel={handleCancel} visible={visible} footer={null}>
        <Form {...layout} name="basic" onFinish={this.onFinish}>
          <Form.Item label="地址" name="address" rules={[{ required: true, message: "请输入你的地址!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="收货人" name="person" rules={[{ required: true, message: "请输入收货人!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="手机号码" name="phone" rules={phoneRules}>
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" block htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
