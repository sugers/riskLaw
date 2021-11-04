<template>
  <div class="hello">
    <div>
      <audio
        id="audio"
        style="position: absolute; z-index: -10"
        src="https://down.ear0.com:3321/preview?soundid=12855&type=mp3"
      ></audio>
    </div>
    <el-container style="height: 100vh">
      <div class="navmask" @click="maskClick"></div>
      <el-aside
        class="sideNav"
        width="230px"
        style="background-color: rgb(25, 26, 35)"
      >
        <navtab></navtab>
      </el-aside>

      <el-container>
        <el-header>
          <el-row>
            <!-- <el-col :span="12">
              <div class="logopin">
                <img class="imgs" src="../../static/img/LOGO.png" alt="LOGO" />
              </div>
            </el-col> -->
            <el-col :span="24">
              <div class="index_tab_tou">
                <div class="menuSwitch">
                  <i class="el-icon-s-operation iconclick" @click="showNav"></i>
                </div>
                <img
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                />
                <el-dropdown size="medium" :hide-timeout="800">
                  <div>
                    <span class="tab_nv userName">{{ username }}</span>
                    <i class="el-icon-caret-bottom"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <span @click="userpassward">修改密码</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="useroutquit">
                      <span>退出</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-scrollbar
          style="height: 100vh"
          :native="false"
          :noresize="false"
          ref="myscrollbar"
        >
          <el-main>
            <!-- 子路由出口 -->
            <pageexport />
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>

    <el-dialog
      width="45%"
      center
      :visible.sync="dialogheades"
      :before-close="handleClosepass"
      class="shendialog"
    >
      <div class="gir-text">
        <div class="grid-content">修改密码</div>
      </div>
      <div class="headestpage">
        <el-row class="rows">
          <el-col :span="24">
            <div class="instaheades">
              <div class="headeditList">
                <div class="headlistLeft">
                  <span>旧密码：</span>
                </div>
                <div class="headlistRight">
                  <el-input
                    class="inputpass"
                    type="password"
                    v-model="oldpassword"
                    placeholder="请输入密码"
                  ></el-input>
                </div>
              </div>
              <div class="headeditList">
                <div class="headlistLeft">
                  <span>新密码：</span>
                </div>
                <div class="headlistRight">
                  <el-input
                    class="inputpass"
                    type="password"
                    v-model="newpassword"
                    placeholder="请输入密码"
                  ></el-input>
                </div>
              </div>
            </div>

            <div class="auditmartexts">
              <el-button type="primary" @click="refusingto">确定</el-button>
              <el-button
                type="primary"
                @click="hearescancel"
                style="background-color: #d7d7d7"
                >取消
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pageexport from "./Pageexport.vue";
import navtab from "./navtab.vue";
import { Authpassword, wslogout } from "../api/api";
// 断点的隐藏类
// import "element-ui/lib/theme-chalk/display.css";
// 引入less
import "../../static/css/index.less";
import $ from "jquery";

export default {
  components: {
    navtab,
    pageexport,
  },
  data() {
    return {
      isshowicon: false,
      isshowNavmask: false,
      drawer: false,
      username: "",
      dialogheades: false,
      // sectiom: 600
      oldpassword: "",
      newpassword: "",
      // -websocket-
      websoce: null,
      clonew: true, //判断是否需要重莲
      // reconnectTime:'',
      // ping: 0,
      lockReconnect: false, // 建立连接
      timeout:30000, // 30秒心跳一次
      timeoutobj: null, // 心跳倒计时
      serverTimeroutobj: null, // 
      timeoutunm: null, // 重链
    };
  },
  mounted() {
    let usernames = JSON.parse(localStorage.getItem("userinfor"));
    this.username = usernames.name;
    let screenWidth = document.body.clientWidth;
    $(".navmask").hide();
    if (screenWidth > 1200) {
      $(".sideNav").show();
      $(".userName").show();
    } else {
      $(".sideNav").hide();
      $(".userName").hide();
    }

    // websock
    var access_token = window.localStorage.getItem("access_token");
    if(access_token){
      this.initwebsocket();
    }
    this.$root.$on('websock',this.initwebsocket)
    this.$root.$on('closed',this.websockclose)
  },
  methods: {
    maskClick() {
      $(".navmask").hide();
      $(".sideNav").hide();
    },
    showNav() {
      $(".navmask").show();
      let cssStype = $(".sideNav").css("display");
      console.log(cssStype);
      if (cssStype == "none") {
        $(".sideNav").show();
      } else {
        $(".sideNav").hide();
      }
    },
    refusingto() {
      if (this.oldpassword != "" && this.newpassword != "") {
        let data = {
          old_password: this.oldpassword,
          password: this.newpassword,
        };
        Authpassword(data).then((res) => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "密码修改成功",
              type: "success",
            });
            window.localStorage.removeItem("password");
            this.useroutquit();
            this.dialogheades = false;
          }
        });
      }
    },
    hearescancel() {
      this.dialogheades = false;
    },
    userpassward() {
      this.dialogheades = true;
    },
    handleClosepass() {
      this.dialogheades = false;
    },
    // 退出
    useroutquit() {
      // console.log("退出");
      var access_token = window.localStorage.getItem("access_token");
      let data = {
        token: access_token,
      };
      wslogout(data).then((res) => {
        console.log(res);
      });
      this.$root.$emit("closed");
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
      window.localStorage.removeItem("userinfor");
      this.$router.push("/adminLogin");
    },

    // webSocket
    websockclose(){
      // console.log('退出了');
      this.clonew = false;
      clearTimeout(this.timeoutobj);
      clearTimeout(this.serverTimeroutobj);
      this.websoce.close();
    },
    initwebsocket() {
      if ("WebSocket" in window) {
        this.clonew = true;
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
    //   console.log("链接成功",this.clonew);
      this.stateout()
      // let fa = this.websoce.readyState;
      // if(fa === 1){
      //   this.wsHeartflag = true;
      //   this.reconnectTime = 0;
      // }
    },
    websocketonerror() {
      // console.log('出现错误',e);
      // 开启链接
      if (this.clonew) {
        this.reconnect();
      }
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
    //   console.log('111', a);
      var received_msg = a.data && JSON.parse(a.data);
      if(received_msg.code === 200){
        // console.log('有订单');
        this.$message({
          showClose: true,
          message: "您有新的订单，请查收！",
          type: "success",
        });
        this.$root.$emit('radio');
        let evt = document.createEvent("Event");
        evt.initEvent("click", true, true);
        document.getElementById("audio").dispatchEvent(evt);

        this.audioplay();
        
      }
      if (a.code == 10000007 || a.code == 10000006) {
        this.clonew = false;
        clearTimeout(this.timeoutobj);
        clearTimeout(this.serverTimeroutobj);
        this.websoce.close();
      }
      // this.reset();
      // if (received_msg != 'pong') {
      //   this.ping++;
      //   if (this.ping == 3) {
      //     this.reset()
      //   }
      // }
      // console.log('ping',this.ping);
    },
    websocketclose() {
    //   console.log('关闭了',this.clonew);
      
      if(this.clonew){
        this.reconnect();
      }
      // this.reconnect();
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
      // console.log('来了',_that.lockReconnect);
      if (_that.lockReconnect) {
        return
      }
      
      _that.lockReconnect = true;
      // 延迟链接
      _that.timeoutunm && clearTimeout(_that.timeoutunm);
      _that.timeoutunm = setTimeout(function(){
        _that.initwebsocket(); // 新链接
        _that.lockReconnect = false;
      },3000)
    },
    // 开启心跳
    stateout(){
      let that = this
      that.timeoutobj = setTimeout(function(){
        // console.log('dd',that.websoce.readyState);
        // 这里发送一个心跳，后端收到返回一个心跳
        if (that.websoce.readyState === that.websoce.OPEN) {
          
          that.websoce.send("ping")
          // console.log('发送成功');
          
        }else{
          that.reconnect()
        }
        // that.serverTimeroutobj = setTimeout(function(){
        //   // 超时关闭
        //   that.websoce.close();
        // },that.timeout)
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

<style lang="less">
.el-header {
  background-color: #ffffff;
  line-height: 55px;
  height: 55px !important;
  box-shadow: 2px 1px 5px #d1d1d1;

  .index_tab_tou {
    // width: 20vw;
    height: 55px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .menuSwitch {
      display: none;
    }

    & > img {
      width: 30px;
      //   height: 30px;
      padding: 10px 0;
      margin: 0 10px 0 20px;
    }

    & > .tab_nv {
      padding: 0 10px;
      // display: flex;
      // align-items: center;
      font-size: 16px;
      font-weight: 600;
      // color: #ffffff;
    }

    .el-dropdown {
      cursor: pointer;

      i {
        font-size: 18px;
        color: #aaaaaa;
        // transition: 0.4s all ease-out;
        // transform-origin:30px 30px;
        // &:hover{
        //   transform: rotate(180deg);
        // }
      }
    }
  }

  .logopin {
    display: flex;
    justify-content: center;
    height: 60px;

    .imgs {
      margin: 10px 0;
      width: 180px;
    }
  }
}

.shendialog {
  .el-dialog {
    border-radius: 6px !important;
  }

  .el-dialog__header {
    padding: 0;

    .el-dialog__headerbtn {
      font-size: 22px;
      top: 8px;
      right: 15px;
    }
  }

  .el-dialog__body {
    padding: 0;

    .gir-text {
      padding: 14px 16px;
      border-bottom: 1px solid #e8eaec;

      .grid-content {
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
        font-weight: 500;
        color: #17233d;
      }
    }

    .headestpage {
      .rows {
        padding: 0 !important;

        .instaheades {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 28px;

          .headeditList {
            display: flex;
            align-items: center;
            margin-bottom: 18px;
            justify-content: center;

            .headlistLeft {
              width: 110px;
              font-size: 13px;
              font-weight: 600;
            }

            .headlistRight {
              display: flex;
              align-items: center;
              flex: 1;

              .inputpass {
                width: 300px !important;
              }
            }
          }
        }
      }
    }
  }
}

.el-scrollbar {
  .el-scrollbar__wrap {
    overflow: scroll;
    height: 100% !important;
    overflow-x: hidden !important;
  }
}

.el-aside {
  color: #333;

  .el-menu {
    background-color: rgb(25, 26, 35);
    // background-color: #304156;
    border-right: 0;

    .el-menu-item {
      color: #fff;

      &:focus,
      &:hover {
        background-color: #4089e5 !important;
      }

      &.is-active {
        background-color: #4089e5;
      }
    }

    .el-submenu {
      background-color: rgb(25, 26, 35) !important;

      .el-submenu__title {
        &:hover {
          background-color: #4089e5 !important;
        }
      }

      .el-menu-item {
        background-color: rgb(25, 26, 35);
        color: #fff;

        &:focus,
        :hover {
          background-color: #4089e5;
        }

        &.is-active {
          background-color: #4089e5;
        }
      }

      .el-submenu__title {
        color: #fff;
      }
    }
  }
}
</style>