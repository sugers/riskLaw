<template>
  <div class="navtab">
    <!-- 保险公司平台后台 -->
    <div>
      <div class="logopin">
        <img class="imgs" src="../../static/img/logo.png" alt="LOGO" />
      </div>
    </div>

    <el-scrollbar
      style="height: 90vh"
      :native="false"
      :noresize="false"
      ref="myscrollbar"
    >
      <el-menu router :default-active="this.$route.path">
        <el-menu-item index="/soutable">
          <template>
            <i class="el-icon-s-home"></i>
            首页
          </template>
        </el-menu-item>
        <el-menu-item
          index="/usertable"
          v-if="chusheng || baoxtai || pingtaishen"
        >
          <template slot="title">
            <i class="el-icon-s-management"></i>
            风险评估详情
          </template>
        </el-menu-item>
        <el-menu-item index="/audittable" v-if="chusheng || baoxtai">
          <template>
            <i class="el-icon-user-solid"></i>
            小程序绑定审核
          </template>
        </el-menu-item>

        <el-submenu index="1" v-if="chusheng">
          <template slot="title"
            ><i class="el-icon-menu"></i>保险公司管理</template
          >
          <el-menu-item index="/InsuranceCompany"
            >保险公司信息管理</el-menu-item
          >
          <el-menu-item index="/insuranceUser">保险公司用户管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/laywerManage" v-if="chusheng">
          <template slot="title">
            <i class="el-icon-s-cooperation"></i>
            律师管理
          </template>
        </el-menu-item>
        <el-menu-item
          index="/Financia"
          v-if="chusheng || baoxtai || baocaiw || pingcaiw"
        >
          <template>
            <i class="el-icon-s-order"></i>
            财务月对账单
          </template>
        </el-menu-item>
        <el-submenu index="" v-if="baoxtai">
          <template slot="title"
            ><i class="el-icon-s-marketing"></i>统计分析</template
          >
          <el-menu-item index="/Statistics">业务人员业绩表</el-menu-item>
          <el-menu-item index="/TrendChart">业务发展趋势图</el-menu-item>
          <!-- <el-menu-item index="">业务发展总览表</el-menu-item> -->
        </el-submenu>
        <!-- <el-menu-item index="/notics" v-if="chusheng || baoxtai">
          <template slot="title">
            <i class="el-icon-bell"></i>
            公告栏
          </template>
        </el-menu-item> -->
        <el-menu-item index="/usermanager" v-if="chusheng || baoxtai">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            后台用户管理
          </template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "navtab",
  data() {
    return {
      buytu: true,
      roleID: "",
      adminroid: false,
      chusheng: false,
      baoxtai: false,
      pingtaishen: false,
      pingcaiw: false,
      baocaiw: false,
    };
  },
  props: {
    native: Boolean,
    noresize: Boolean,
  },
  created() {
    var userinfor = JSON.parse(localStorage.getItem("userinfor"));
    
    this.roleID = userinfor.roleID;
    if (this.roleID == 1001) {
      this.chusheng = true;
    } else if (this.roleID == 1002) {
      this.pingcaiw == true;
    } else if (this.roleID == 1003 || this.roleID == 1004) {
      this.pingtaishen = true;
    } else if (this.roleID == 2001) {
      this.baoxtai = true;
    } else if (this.roleID == 2002) {
      this.baocaiw = true;
    }

    this.$nextTick(() => {
      this.$refs["myscrollbar"].wrap.scrollTop =
        this.$refs["myscrollbar"].wrap.scrollHeight;
    });
  },
  methods: {},
};
</script>

<style lang="less">
.navtab {
  .logopin {
    display: flex;
    justify-content: center;
    height: 60px;

    .imgs {
      margin: 10px 0;
      // width: 180px;
      height: 35px;
    }
  }
}

.el-menu-item {
  i {
    color: #fff !important;
    // background-color: rgb(179, 192, 209).7;
  }
}

.el-submenu {
  i {
    color: #fff !important;
  }
}
</style>