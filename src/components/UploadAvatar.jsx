import React, { Component } from "react";
import { Upload, Avatar, message } from "antd";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class UploadAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file_list: [],
      imageUrl: props.avatar
    };
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只能上传jpg或者png文件");
    }
    const isLt = file.size / 1024 / 1024 < 0.6;
    if (!isLt) {
      message.error("图片最大限制为600k!");
    }
    return isJpgOrPng && isLt;
  };

  handleChange = (info) => {
    getBase64(info.file.originFileObj, (imageUrl) =>
      this.setState({
        imageUrl
      })
    );
  };
  render() {
    const { imageUrl } = this.state;
    return (
      <Upload
        accept=".jpg,.jpeg,.png"
        name="avatar"
        headers={{
          token: localStorage.getItem("token")
        }}
        action="http://28l680x684.qicp.vip/user/avatar"
        beforeUpload={this.beforeUpload}
        showUploadList={false}
        onChange={this.handleChange}
      >
        <Avatar title="点击上传头像" size={70} style={{ border: "1px solid #ddd", cursor: "pointer" }} src={imageUrl} />
      </Upload>
    );
  }
}
