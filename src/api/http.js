import axios from "axios";

var orignalSetItem = localStorage.setItem;
localStorage.setItem = function (key, newValue) {
  var access_token = new Event("access_token");
  access_token.newValue = newValue;
  window.dispatchEvent(access_token);
  orignalSetItem.apply(this, arguments);
}

window.addEventListener("access_token", function () {
  var timeout = setInterval(() => {
    
    var access_token = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : '';
    
    // var access_token = access_token;
    
    // 添加请求拦截器
    axios.interceptors.request.use(
      
      function (config) {
  
        // 请求之前做什么
        if (access_token) {
          config.headers.Authorization = "Bearer " + access_token
        }
        return config
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    clearInterval(timeout);
  })
  
})

// 环境切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = process.env.VUE_APP_API_URL
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = process.env.VUE_APP_API_URL
}

// 请求超时
axios.defaults.timeout = 220000;
axios.defaults.headers.Authorization = ''

// 默认post请求tou
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// get请求
export function get (url, params, type) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            responseType: type
        }).then(res => {
            type == 'blob' ? resolve(res) : resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    }
    );
}

// post请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
       axios.post(url,params)
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}

// put请求
export function put(url, params) {
  return new Promise((resolve, reject) => {
       axios.put(url, params)
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}

// DELETE请求
export function Delete (url, params ) {
  return new Promise((resolve, reject) => {
      axios.delete(url, {params})
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
  });
}