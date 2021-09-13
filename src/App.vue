<template>
  <div id="app">
    <div>
      <audio
        id="audio"
        style="position: absolute; z-index:-10;"
        src="https://down.ear0.com:3321/preview?soundid=35825&type=mp3"
      ></audio>
    </div>
    <router-view />
  </div>
</template>

<script>
// import units from "../static/js/units.js";
export default {
  name: "app",
  data(){
    return{
      websoce: null,
      // reconnectTime:'',

      lockReconnect: false, // 建立连接
      timeout: 40000, // 30秒心跳一次
      timeoutobj: null, // 心跳倒计时
      serverTimeroutobj: null, // 
      timeoutunm: null, // 重链
    }
    
  },
  beforeDestory(){
    this.websoce.close();
    clearTimeout(this.timeoutobj);
    clearTimeout(this.serverTimeroutobj);
  },
  created() {
    var access_token = window.localStorage.getItem("access_token");
    if(access_token){
      this.initwebsocket();
    }
    this.$root.$on('websock',this.initwebsocket)
  },
  methods: {

    initwebsocket() {
      if ("WebSocket" in window) {
        var access_token = window.localStorage.getItem("access_token");
        // console.log(typeof(access_token));
        const wsui =
          process.env.VUE_APP_API_URL.replace("https", "wss") +
          "/api/v1/backend/auth/ws" +
          "?token=" +
          access_token;
        // console.log(wsui);
        this.websoce = new WebSocket(wsui);
        this.websoce.onopen = this.websocketonopen;
        this.websoce.onerror = this.websocketonerror;
        this.websoce.onmessage = this.websocketonmessage;
        this.websoce.onclose = this.websocketclose;

      } else {
        this.$message({
          showClose: true,
          message: "当前浏览器不支持WebSocket",
          type: "success",
        });
      }
    },
    audioplay() {

      const audio = document.getElementById("audio");
      audio.play();
    },
    websocketonopen() {
      // console.log("链接成功");
      this.stateout()
      // let fa = this.websoce.readyState;
      // if(fa === 1){
      //   this.wsHeartflag = true;
      //   this.reconnectTime = 0;
      // }
    },
    websocketonerror(e) {
      console.log('出现错误',e);
      // 开启链接
      this.reconnect();
      // this.wsHeartflag = false;
      // if (this.reconnectTime <= 3) {
      //   setTimeout(() => {
      //     this.websocketonopen();
      //     this.reconnectTime += 1;
      //   }, 5000);
      // } else {
      //   this.websocketclose();
      // }
    },
    websocketonmessage(a) {
      var received_msg = a && JSON.parse(a.data);
      // console.log('111', a);
      if(received_msg.code === 200){
        
        this.$message({
          showClose: true,
          message: "您有新的订单，请查收！",
          type: "success",
        });
        this.$root.$emit('radio');
        var evt = document.createEvent("Event");
        evt.initEvent("click", true, true);
        document.getElementById("audio").dispatchEvent(evt);

        this.audioplay();
        
      }
      if (a.code == 10000007 || a.code == 10000006) {
        this.websoce.close();
      }
      this.reset();
      
    },
    websocketclose() {
      // console.log('关闭了');
      this.reconnect();
      // this.wsHeartflag = false;
      // this.websoce && this.websoce.close && this.websoce.close();
      // // 重连
      // var timer = setTimeout(() => {
      //   this.initwebsocket()
      //   clearInterval(timer);
      // }, 8000);
      
    },
    // 重新连接
    reconnect(){
      let _that = this
      if (_that.lockReconnect) {
        return
      }
      _that.lockReconnect = true;
      // 延迟链接
      _that.timeoutunm && clearTimeout(_that.timeoutunm);
      _that.timeoutunm = setTimeout(function(){
        _that.initwebsocket(); // 新链接
        _that.lockReconnect = false;
      },5000)
    },
    // 开启心跳
    stateout(){
      let that = this
      that.timeoutobj = setTimeout(function(){
        // console.log('dd',that.websoce.readyState);
        // 这里发送一个心跳，后端收到返回一个心跳
        if (that.websoce.readyState === that.websoce.OPEN) {
          
          that.websoce.send(JSON.stringify({
            data:{
              messageType: 'heartchean'
            }
          }))
          // console.log('发送成功');
          
        }else{
          that.reconnect()
        }
        that.serverTimeroutobj = setTimeout(function(){
          // 超时关闭
          that .websoce.close();
        },that.timeout)
      },that.timeout)
      
    },
    // 重置心跳
    reset(){
      // 清除时间
      let _self = this
      clearTimeout(_self.timeoutobj);
      clearTimeout(_self.serverTimeroutobj);
      // 开启心跳
      _self.stateout();
    },
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* background-color: #f8f8f8; */
}
#app {
  /* width: 100%;s */
  /* font-family: SourceHanSansSC-regular; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}
</style>
