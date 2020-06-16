function computedMoney(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i]["total"];
  }
  return sum;
}

function deepClone(obj) {
  if (typeof obj !== "object") return;
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    }
  }
  return newObj;
}

function computedCount(newState, oldState, count) {
  let temp = deepClone(oldState).cart_list;
  let pid = newState.pid;
  count = !count ? 0 : count;
  for (let i = 0; i < temp.length; i++) {
    let current = temp[i];
    if (current.pid === pid) {
      current["count"] = count;
      current["total"] = count * current["nprice"];
    }
  }
  return temp;
}

function ObjectToArray(obj) {
  obj = deepClone(obj);
  let temp = {
    用户名: "",
    昵称: "",
    性别: "",
    手机号码: "",
    出生日期: "",
    电子邮箱: "",
    收货地址: ""
  };
  let arr = [];
  temp["用户名"] = obj.username;
  temp["性别"] = obj.sex === 1 ? "男" : "女";
  temp["昵称"] = obj.nickname;
  temp["手机号码"] = obj.phone;
  temp["出生日期"] = new Date(obj.birth).toLocaleDateString();
  temp["电子邮箱"] = obj.email;
  temp["收货地址"] = obj.address;
  Object.keys(temp).forEach((key) => {
    let tem = [];
    tem[0] = key;
    tem[1] = temp[key];
    arr.push(tem);
  });
  return arr;
}

function setTimeDateFmt(s) {
  // 个位数补齐十位数
  return s < 10 ? "0" + s : s;
}

function randomTime() {
  const now = new Date();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  month = setTimeDateFmt(month);
  day = setTimeDateFmt(day);
  hour = setTimeDateFmt(hour);
  minutes = setTimeDateFmt(minutes);
  seconds = setTimeDateFmt(seconds);
  let orderCode =
    now.getFullYear().toString() +
    month.toString() +
    day +
    hour +
    minutes +
    seconds +
    Math.round(Math.random() * 1000000).toString();
  return orderCode;
}

function getUrlQueryObj(url) {
  if (!url) return;
  var obj = {};
  var queryArray = url.substring(url.indexOf("?") + 1).split("&");
  for (var i = 0; i < queryArray.length; i++) {
    var keyValue = queryArray[i].split("=");
    var key = keyValue[0];
    var value = keyValue[1];
    obj[key] = value;
  }
  return obj;
}

export { computedMoney, deepClone, computedCount, randomTime, ObjectToArray, getUrlQueryObj };
