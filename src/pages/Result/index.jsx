import React from "react";
import { Result, Button } from "antd";
import { randomTime } from "../../utils/computed";

export default function index(props) {
  return (
    <Result
      status="success"
      title="订单支付成功！"
      style={{marginTop:"50px"}}
      subTitle={"订单编号：" + randomTime()}
      extra={[<Button type="primary" key="1" onClick={(e)=>props.history.push('/')}>返回首页</Button>]}
    />
  );
}
