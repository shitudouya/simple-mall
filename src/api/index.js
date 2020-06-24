import axios from "../config/axios";

//获取图形验证码
const getVerifyCode = async () => {
  return await axios.get("/mx/imageVerificationCode");
};

//提交注册
const handleRegister = async (params) => {
  return await axios.post("/mx/register", params);
};

//提交登录
const handleLogin = async (params) => {
  return await axios.post("/mx/login", params);
};

//获取用户个人信息
const getUserInfo = async () => {
  return await axios.get("/user/info");
};

//请求商品信息
const getProduct = async (params) => {
  return await axios.get("/product/classify", { params });
};

//更新用户地址
const updateUserAddress = async (params) => {
  return await axios.post("/user/address", params);
};

//查询某个商品的信息
const getProductDetail = async (params) => {
  return await axios.get("/product/get", { params });
};

//获取购物车
const getCart = async () => {
  return await axios.get("/cart");
};

//加入购物车
const addCart = async (params) => {
  return await axios.post("/cart", params);
};

//删除购物车
const deleteCart = async (pid) => {
  return await axios.delete(`/cart/${pid}`);
};

//提交订单
const submitOrder = async (params) => {
  return await axios.post("/cart/submit", params);
};

//搜索商品功能
const searchProduct = async (params) => {
  return await axios.get("/product/search", { params });
};

//获取商品评论
const getComments = async (pid) => {
  return await axios.get(`/comment/${pid}`);
};

//对商品进行评论
const sendComments = async (params) => {
  return await axios.post("/comment", params);
};
//清空购物车
const clearCart = async () => {
  return await axios.delete("/cart");
};
//获取收藏物品
const getLike = async () => {
  return await axios.get("/slove");
};
//添加收藏
const addMyLike = async (pid) => {
  return await axios.get(`/slove/${pid}`);
};
//删除收藏
const deleteLike = async (pid) => {
  return await axios.delete(`/slove/${pid}`);
};
//获取首页推荐
const getRecommend = async () => {
  return await axios.get("/product/recommend");
};

//沙箱支付接口
const Pay = async (params) => {
  return await axios.post('/order/toPay',params)
}

//获取订单信息
const getOrder = async () => {
  return await axios.get('/order')
}
//删除所有订单
const deleteAllOrder = async() =>{
  return await axios.delete('/order');
}
//根据订单号删除订单
const deleteOrderByID = async(id) => {
  return await axios.delete(`/order/${id}`)
}
export {
  getVerifyCode,
  handleRegister,
  handleLogin,
  getProduct,
  updateUserAddress,
  getProductDetail,
  getUserInfo,
  deleteCart,
  getCart,
  addCart,
  getComments,
  getLike,
  searchProduct,
  submitOrder,
  sendComments,
  clearCart,
  addMyLike,
  deleteLike,
  getRecommend,
  Pay,
  getOrder,
  deleteAllOrder,
  deleteOrderByID
};
