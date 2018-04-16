// 设置请求的基准路径
"use strict";axios.defaults.baseURL="http://47.96.21.88:8888/api/public/v1/";
// 设置图片的基准路径
const imgUrl = {
    url : 'http://47.96.21.88:8888/',
    cid : getParamName
}
axios.interceptors.response.use(function (response) {
    // 在我们得到服务器返回的数据之前做一些处理
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
 function getParamName(paramName) {
  // name=jack&abc=hello
  let str = location.search.substring(1);
  let arr = str.split('&');
  // 定义一个空对象用来储存对应的键 与 值
  let allParam = {};
  arr.forEach(function(item) {
    // 进入到循环后 每个 item 就是 name=jack
    // 进行再次切割
    let result  = item.split('=');
    allParam[result[0]] = result[1];
  });
  return allParam[paramName];

 }
