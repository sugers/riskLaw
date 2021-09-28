import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import { RefreshToken } from './api';
import router from '../router/index';
// 拿到 access_token 和 refresh_token

// 是否正在刷新的标记
var isRefreshing = false
/* 被挂起的请求数组 */
var refreshSubscribers = []


/* push所有请求到数组中 */
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

/* 刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据） */
function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token))
}

axios.interceptors.request.use(
  function (config) {
    // 发送请求之前做什么
    var access_token = window.localStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = "Bearer " + access_token
    }
    if (config.url !== '/api/v1/backend/auth/login' && config.url !== '/api/v1/user/refreshToken') {
      config.headers.Authorization = "Bearer " + access_token;
      if (computedTime()) {
        if (!isRefreshing) {
          isRefreshing = true
          var refresh_token = window.localStorage.getItem("refresh_token");

          var data = {
            access_token: access_token,
            refresh_token: refresh_token,
          }
          // 重新刷新access_token
          RefreshToken(data).then((res) => {
            window.localStorage.setItem("access_token", res.data.access_token);

            if (res.data.refresh_token != '' && res.data.refresh_token != undefined && res.data.refresh_token != null) {
              window.localStorage.setItem("refresh_token", res.data.refresh_token);
            }
            window.localStorage.setItem(
              "expires_in",
              res.data.expires_in
            );
            onRrefreshed(res.data.access_token);
            refreshSubscribers = []
            isRefreshing = false
          })
        }
        /* 把请求(token)=>{....}都push到一个数组中 */
        let retry = new Promise((resolve) => {
          /* (token) => {...}这个函数就是回调函数 */
          subscribeTokenRefresh((token) => {
            config.headers.Authorization = 'Bearer ' + token
            /* 将请求挂起 */
            resolve(config)
          })
        })
        return retry
      } else {
        return config
      }
    } else {
      return config
    }
  }, (error) => {
    return Promise.reject(error)
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (res) {
    if(!window.localStorage.getItem('expires_in')){
      // console.log('有');
      gotoLogin();
    }
    return res
  },
  function (error) {
    let err = error.response
    if (err.data.code === 10000009) {
      Message({
        message: '长期未使用，请重新登陆!',
        type: 'error'
      })
      setTimeout(() => {
        gotoLogin()
      }, 1000);
      return
    } else if (err.data.code == 2002005) {
      MessageBox({
        title: '错误',
        message: '密码错误!',
        type: 'warning'
      })
    } 
    else if (error && error.response) {
      Message({
        showClose: true,
        message: err.data.msg,
        type: "error",
      });
    }
    return Promise.reject(error);
  }
)


function gotoLogin() {
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("refresh_token");
  window.localStorage.removeItem("expires_in");
  // let userid = JSON.parse(localStorage.getItem("userinfor"));
  
  // if (userid.roleID == 2001) {
  //   window.localStorage.removeItem("userinfor");
  //   window.location.href = '/taipeilogin'
  //   return
  // } else if (
  //   userid.roleID == 1001 ||
  //   userid.roleID == 1003 ||
  //   userid.roleID == 1004
  // ) {
    window.localStorage.removeItem("userinfor");
    // window.location.href = '/#/adminLogin'
    router.push('/adminLogin')
    // return
  // }
}

function computedTime() {
  let r = window.localStorage.getItem('expires_in');
  if (!r) return false;
  let currentTime = Date.parse(new Date()) / 1000;
  let expiresTime = r;
  // 600秒后即将过期,true则不需要刷新
  return expiresTime - currentTime <= 600
}


