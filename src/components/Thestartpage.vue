<template>
  <div class="hello">
    <el-container style="height: 100vh">
      <el-aside width="230px" style="background-color: rgb(25, 26, 35)">
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
                <img
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                />
                <el-dropdown size="medium" :hide-timeout="800">
                  <div>
                    <span class="tab_nv">{{ this.username }}</span>
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
                >取消</el-button
              >
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
import { Authpassword } from "../api/api";
// 断点的隐藏类
// import "element-ui/lib/theme-chalk/display.css";
// 引入less
import "../../static/css/index.less";
export default {
  components: {
    navtab,
    pageexport,
  },
  data() {
    return {
      drawer: false,
      username: "",
      dialogheades: false,
      // sectiom: 600
      oldpassword: "",
      newpassword: "",
    };
  },
  created() {
    var userinfor = JSON.parse(localStorage.getItem("userinfor"));
    this.username = userinfor.name;
  },
  methods: {
    refusingto() {
      if (this.oldpassword!="" && this.newpassword!="") {
        let data = {
          old_password: this.oldpassword,
          password: this.newpassword,
        }
        Authpassword(data).then((res)=>{
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "密码修改成功",
              type: "success",
            });
            window.localStorage.removeItem("password")
            this.useroutquit()
            this.dialogheades = false;
          }
        })
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
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
      let userid = JSON.parse(localStorage.getItem("userinfor"));
      if (userid.roleID == 2001 || userid.roleID == 2002) {
        window.localStorage.removeItem("userinfor");
        this.$router.push("/taipeilogin");
      } else if (
        userid.roleID == 1001 ||
        userid.roleID == 1002 ||
        userid.roleID == 1003 ||
        userid.roleID == 1004
      ) {
        window.localStorage.removeItem("userinfor");
        this.$router.push("/adminLogin");
      }
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
              .inputpass{
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
