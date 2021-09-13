<template>
  <div id="app">
    <audio
      id="audio"
      controls="controls"
      style="height: 0; position: absolute; z-index:-10;"
      src="https://down.ear0.com:3321/preview?soundid=35825&type=mp3"
    ></audio>
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
      reconnectTime:'',
    }
    
  },
  created() {
    var access_token = window.localStorage.getItem("access_token");
    if(access_token){
      // this.initwebsocket();
    }
  },
  methods: {
    username(){},
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
      console.log("链接成功");
      let fa = this.websoce.readyState;
      if(fa === 1){
        this.wsHeartflag = true;
        this.reconnectTime = 0;
      }
    },
    websocketonerror() {
      this.wsHeartflag = false;
      if (this.reconnectTime <= 3) {
        setTimeout(() => {
          this.websocketonopen();
          this.reconnectTime += 1;
        }, 5000);
      } else {
        this.websocketclose();
      }
    },
    websocketonmessage(a) {
      var received_msg = a && JSON.parse(a.data);
      console.log('111');
      if(received_msg.code === 200){
        this.usertablespi();
        this.$message({
          showClose: true,
          message: "您有新的订单，请查收！",
          type: "success",
        });
        var evt = document.createEvent("Event");
        evt.initEvent("click", true, true);
        document.getElementById("audio").dispatchEvent(evt);

        this.audioplay();
        // this.websocketclose();
      }
      
    },
    websocketclose() {
      this.wsHeartflag = false;
      this.websoce && this.websoce.close && this.websoce.close();
      // 重连
      // this.initwebsocket()
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
