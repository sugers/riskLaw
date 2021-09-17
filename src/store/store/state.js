export default {
  state:{
    access_token: localStorage.getItem("access_token") ? localStorage.getItem("access_token") : "",
    refresh_token: localStorage.getItem("refresh_token") ? localStorage.getItem("refresh_token") : "",
  }
}