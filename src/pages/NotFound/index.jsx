import React from "react";
import { Result, Button } from "antd";

export default function index(props) {
  function backHome() {
    props.history.push('/')
  }
  return (
    <Result
    style={{padding:0}}
      status="404"
      title="404 Not Found"
      subTitle="对不起，请求的资源路径不存在"
      extra={<Button style={{backgroundColor:"#F85F66",border:"1px solid #F85F66"}} onClick={backHome} type="primary">返回主页</Button>}
    />
  );
}
