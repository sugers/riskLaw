import * as type from './mutation-types'
export default {
  //登入
  [type.LOGIN_IN](state, access_token) {
    state.access_token = access_token;
    localStorage.setItem('access_token', access_token);
  },
  [type.LOGIN_IN](state, refresh_token) {
    state.refresh_token = refresh_token;
    localStorage.setItem('refresh_token', refresh_token);
  },
  //登出 or 退出登入
  [type.LOGIN_OUT](state, access_token) {
    localStorage.removeItem("access_token", access_token);
    state.access_token = access_token;
  },
  //登出 or 退出登入
  [type.LOGIN_OUT](state, refresh_token) {
    localStorage.removeItem("refresh_token", refresh_token);
    state.refresh_token = refresh_token;
  },
}