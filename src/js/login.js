$(function(){
  // 隔离的空间
  // 实现登录

 /* $('#loginBtn').on('click',function(){
    let mobile = $("#mobile").val();
    let password = $("#password").val();
    axios.post('login', {
        username : mobile,
        password : password
    })
    .then(function(data) {
        // 取得数据后打印出来的data 进行过包装 需要进行直接响应体劫持
        // 判断data的状态 
        let info = JSON.stringify(data.data);                 
         if(data.meta.status == 200) {
            // 写入本地存储中
            localStorage.setItem('userinfo', info);
            // 并且跳转到主页
            location.href = "/index.html";

        } else {
            $.toast(data.meta.msg);
        }
    })
  })*/

// 登录验证功能的代码优化 
function checkForm(params) {
   return new Promise(function(resolve, reject) {
     // 首先先验证 用户的账户跟密码 
    let reg = /^1\d{10}$/g;
    // 判断不满足正则的情况 或者 手机号 密码为 空 返回错误
    if( !reg.test(params.username) ||  !params.username) {
        reject('手机号格式错误')
    }
    if( !params.password || params.password.length < 6) {
        reject('密码错误')
    }
    // 全部都执行下来后 进行参数的传递
    resolve(params);
   })
}

//  发送 axios 模块
 function login(params) {
    // 这里直接return 的是 axios 的请求方法 不需要写promise  因为直接支持promise 内部返回的就是promise对象
   return axios.post('login',params);
 }

        // 拉取数据模块
function check(data) {
    //  这里是验证的 发送的数据后 后台返回的验证是否正确
    return new Promise(function(resolve, reject) {
        
        if(data.meta.status == 200) {
            let info = JSON.stringify(data.data);
            // 写入本地存储中
            localStorage.setItem('userinfo', info);
            // 成功的话 需要执行 reslove 操作
            resolve();
        } else {
            reject(data.meta.msg);
        }
    })
}

  $('#loginBtn').on('click',function(){
    let mobile = $("#mobile").val();
    let password = $("#password").val();
    let params = {
        username : mobile,
        password : password
    }
    checkForm(params)
    .then(login)
    .then(check)
    .then(function() {
        // 成功时候的回调函数 进行后续的业务代码i
        location.href = "/index.html"; 
    })
    .catch(function(err) {
        $.toast(err);
    }) 

  })

// 页面初始化完成后触发该事件
 $(document).on("pageInit", function(e,pageId,$page) {
    // 从本地缓存中取出用户信息，显示到输入框
    let info = localStorage.getItem('userinfo');
    let uname = JSON.parse(info).username;
    $("#mobile").val(uname);

 });
 $.init();



});