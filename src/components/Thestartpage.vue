<template>
  <div class="hello">
    <el-container style="height: 100vh">

      <el-aside
        class="hidden-xs-only"
        width="230px"
        style="background-color: #304156"
      >
        <navtab></navtab>
      </el-aside>

      <el-container >

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
                <div class="tab_nv hidden-xs-only">{{ this.username }}</div>
                <el-dropdown size="medium">
                  <i class="el-icon-caret-bottom"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="useroutquit"
                      >退出</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>

        <el-main>
          <!-- 子路由出口 -->
          <pageexport />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import pageexport from "./Pageexport.vue";
import navtab from "./navtab.vue";
// 断点的隐藏类
import "element-ui/lib/theme-chalk/display.css";
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
      // sectiom: 600
    };
  },
  created() {
    var userinfor = JSON.parse(localStorage.getItem("userinfor"));
    this.username = userinfor.name;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 退出
    useroutquit() {
      console.log("退出");
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
      let userid = JSON.parse(localStorage.getItem("userinfor"));
      if (userid.roleID == 2001) {
        window.localStorage.removeItem("userinfor");
        this.$router.push("/taipeilogin");
      } else if (
        userid.roleID == 1001 ||
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      // color: #ffffff;
    }

    .el-dropdown {
      i {
        font-size: 18px;
        color: #aaaaaa;
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
    background-color: #304156;
    border-right: 0;
    .el-menu-item {
      color: #bfcbd9;
      &:focus,
      &:hover {
        background-color: #263445 !important;
      }
      &.is-active {
        background-color: #263445;
      }
    }
    .el-submenu {
      .el-submenu__title {
        &:hover {
          background-color: #263445 !important;
        }
      }
      .el-menu-item {
        background: #1f2d3d;
        color: #bfcbd9;
        &:focus,
        :hover {
          background-color: #001528;
        }
        &.is-active {
          background-color: #263445;
        }
      }
      .el-submenu__title {
        color: #bfcbd9;
      }
    }
  }
}
</style>
