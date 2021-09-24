<template>
  <div class="usertable">
    <div class="user_data">
      <div class="radios">
        <div class="radios_sapn">状态：</div>
        <el-radio-group v-model="radiocyt" @change="radiochange">
          <el-radio-button label="-1">全部</el-radio-button>
          <el-radio-button label="1">待反馈</el-radio-button>
          <el-radio-button label="2">处理中</el-radio-button>
          <el-radio-button label="3">已完成</el-radio-button>
          <el-radio-button label="4">待提交</el-radio-button>
        </el-radio-group>
      </div>

      <div class="radios">
        <div class="radios_sapn">保险公司：</div>
        <el-select v-model="suosuo" placeholder="请选择" @change="baoselect">
          <el-option
            v-for="item in daticcon"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>

      <div class="radios">
        <div class="radios_sapn">省份：</div>
        <el-select
          v-model="provincesid"
          placeholder="请选择"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in citydata"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>

      <div class="radios" v-if="chulir">
        <div class="radios_sapn">当前处理人：</div>
        <el-select
          v-model="userreivws"
          @change="userreivewer"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in reivewer"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>

      <div class="radios">
        <span class="radios_sapn">日期：</span>
        <div class="iniconstatur">
          <el-date-picker
            v-model="userDateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="radios">
        <div class="radios_sapn">关键字：</div>
        <div class="boxxinput">
          <el-input placeholder="请输入内容" v-model="userkey"> </el-input>
        </div>
      </div>

      <div class="scrbtnb">
        <el-button
          type="info"
          @click.prevent="deledetabdat"
          icon="el-icon-refresh"
        >
          重置
        </el-button>
        <el-button
          type="primary"
          @click.prevent="btnsearchclick"
          icon="el-icon-search"
        >
          搜索
        </el-button>
      </div>
    </div>

    <div class="user_data_btn">
      <div class="user_btnes">
        <!-- <el-button
          type="text"
          style="background-color: #409eff"
          @click.prevent="usersbuy"
          :loading="usertabless"
          icon="el-icon-refresh"
        >
          刷新
        </el-button> -->
        <el-button
          v-if="adminuserbtn"
          type="text"
          style="background-color: #f56c6c"
          @click.prevent="userdatabtn"
          icon="el-icon-delete"
        >
          批量删除
        </el-button>
        <el-button
          v-if="userdatabottom && radiocyt == 3"
          type="text"
          style="background-color: #409eff"
          @click.prevent="downloadThelaw"
          icon="el-icon-download"
          :loading="userdownload"
        >
          批量下载法律意见书
        </el-button>
      </div>
      <el-table
        ref="tableref"
        :header-cell-style="headertextAlgin"
        :cell-style="celltextAlgin"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-class-name="tablerowclassname"
      >
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column
          type="index"
          :index="indexMethos"
          width="55"
          label="序号"
        >
        </el-table-column>
        <el-table-column prop="number" label="编号" min-width="150">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          min-width="200"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="salesman" label="申请人" min-width="120">
        </el-table-column>
        <el-table-column
          prop="application_time"
          label="申请时间"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="icco_name"
          label="保险总司"
          min-width="160"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="area_name" label="区域" min-width="80">
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="100">
        </el-table-column>
        <el-table-column
          prop="review_result"
          label="当前评估结果"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.review_result == 1">同意承保</span>
            <span v-if="scope.row.review_result == 2">拒绝承保</span>
            <span v-if="scope.row.review_result == 3">补充材料</span>
          </template>
        </el-table-column>
        <el-table-column prop="review_man" label="当前处理人" min-width="100">
        </el-table-column>
        <el-table-column prop="trade" label="出单情况" min-width="90">
          <template slot-scope="scope">
            <el-tag size="medium" type="danger" v-if="scope.row.trade == 0"
              >未出单</el-tag
            >
            <el-tag type="success" v-if="scope.row.trade == 1">已出单</el-tag>
            <span v-if="scope.row.trade == 2"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="review_time"
          label="当前处理时间"
          min-width="150"
          align="center"
        >
        </el-table-column>

        <el-table-column
          fixed="right"
          prop="stage"
          label="操作"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-button
              @click.prevent="deleteRowadmin(scope.row)"
              type="text"
              size="small"
              class="btnstab"
              style="background-color: rgb(64, 137, 229)"
            >
              查看
            </el-button>
            <!-- 1.快速反馈 2.填写详细信息 3.上级复审 4.出单确认 -->
            <el-button
              v-if="
                scope.row.stage == 1 &&
                scope.row.review_result != 3 &&
                (roleID == 1001 || roleID == 1003 || roleID == 1004)
              "
              @click.prevent="operation(scope.row)"
              type="text"
              size="small"
              class="btnstab"
              style="background-color: rgb(244, 181, 13)"
            >
              快速反馈
            </el-button>
            <el-button
              v-if="
                scope.row.stage == 2 &&
                scope.row.review_result != 3 &&
                (roleID == 1001 || roleID == 1003 || roleID == 1004)
              "
              @click.prevent="operation(scope.row)"
              type="text"
              size="small"
              class="btnstab"
              style="background-color: rgb(221, 24, 24)"
            >
              填写信息
            </el-button>
            <el-button
              v-if="
                scope.row.stage == 3 &&
                scope.row.review_result != 3 &&
                (roleID == 1001 || roleID == 1004)
              "
              @click.prevent="operation(scope.row)"
              type="text"
              size="small"
              class="btnstab"
              style="background-color: rgb(96, 96, 236)"
            >
              上级复审
            </el-button>
            <el-button
              v-if="
                scope.row.stage == 4 &&
                scope.row.review_result != 3 &&
                scope.row.review_result != 2 &&
                (roleID == 1001 || roleID == 1004)
              "
              @click.prevent="operation(scope.row)"
              type="text"
              size="small"
              class="btnstab"
              style="background-color: rgb(52, 199, 88)"
            >
              出单确认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginat">
        <el-pagination
          class="paginastyes"
          ref="paginatref"
          background
          layout="total,prev,sizes, pager, next"
          @size-change="handsizetext"
          @current-change="handsizepage"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagesize"
          :total="total"
        >
        </el-pagination>
      </div>
      <Spin fix v-show="isdone">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
  </div>
</template>

<script>
// 省份过滤器
function pcacode(res, data) {
  for (let a = 0; a < data.length; a++) {
    if (data[a].code == res) {
      res = data[a].name;
    }
  }
  return res;
}
// 引入json
import provinces from "../../static/js/pca-code.json";
import "../../static/css/autdiodialog.less";

import {
  Caselist,
  // Reviewcase,
  // 获取案由类型
  Casetype,
  // 查看保险公司
  GetinsuranceList,
  // 审核人员
  Reivewerinfo,
  // 删除评估申请数据
  Reviewcasedata,
  GetinsuranceAreaList,
  LawOpinions,
} from "../api/api";
export default {
  components: {},
  data() {
    return {
      userkey: "",
      // 任务池查看的数据
      taskview: "",
      // 保险公司搜索
      suosuo: "",
      daticcon: [],
      // 按省份搜索
      provins: "",
      citydata: [],
      // 按处理人搜索
      userreivws: "",
      provincesid: "",
      // 按时间搜索
      userDateTime: [],
      // 案由类型
      anyou: "",
      tableData: [],

      multipleSelection: [],
      radiocyt: "1",
      total: null,
      pagesize: 10, //每页的个数
      currentPage: 1, //当前页数

      riskevalid: "",

      //角色id
      roleID: "",

      // 开启内容高度自适应
      autosize: true,

      // 上传的文件
      fileList: [],
      // table高度
      // 审核人员
      reivewer: [],
      usereciu: "",
      // tableheight: 400,
      websoce: null,
      // 刷新
      // usertabless: false,
      // 批量删除
      adminuserbtn: false,
      userdatabottom: false,
      // loading
      isdone: false,
      // 批量下载法律意见书
      userdownload: false,
      currendRole: "",
      chulir: false,
    };
  },
  created() {
    // 权限
    var userinfor = JSON.parse(localStorage.getItem("userinfor"));
    this.roleID = userinfor.roleID;

    this.radiochange();
    this.casetypess();
    this.$root.$on("radio", this.radiochange);

    // this.admniccorapi();
    // this.$nextTick(() => {
    //   this.$refs["myscrollbar"].wrap.scrollTop = document.body.scrollTop = 0;
    // });
  },
  watch: {
    userDateTime(newval) {
      if (newval == null) {
        this.userDateTime = [];
      }
    },
  },
  mounted() {
    this.admniccorapi();
    // this.$nextTick(function () {
    //   this.tableheight =
    //     window.innerHeight -
    //     this.$refs.tableref.$el.getBoundingClientRect().top -
    //     this.$refs.paginatref.$el.offsetHeight -
    //     25;
    // });
    window["postData"] = () => {
      // console.log('66666');
      this.usertableapi();
    };

    let userid = JSON.parse(localStorage.getItem("userinfor"));

    // 获取审核人员
    if (
      userid.roleID == 1001 ||
      userid.roleID == 1002 ||
      userid.roleID == 1003 ||
      userid.roleID == 1004
    ) {
      Reivewerinfo().then((res) => {
        // console.log("审核人员", res);
        this.reivewer = res.data;
      });
      this.provins = provinces;
    }

    // this.currendRole = userid;
    if (userid.roleID == 1001) {
      this.adminuserbtn = true;
    }
    if (
      userid.roleID == 1001 ||
      userid.roleID == 1004 ||
      userid.roleID == 2001
    ) {
      this.userdatabottom = true;
    } else {
      this.userdatabottom = false;
    }
    this.currendRole = userid.roleID;
    if (
      userid.roleID == 1001 ||
      userid.roleID == 1002 ||
      userid.roleID == 1003 ||
      userid.roleID == 1004
    ) {
      this.chulir = true;
    }
    if (userid.roleID == 1001) {
      this.shushenhe = false;
    }
  },
  methods: {
    // 筛选
    btnsearchclick() {
      if (
        this.userreivws != "" ||
        this.suosuo != "" ||
        this.provincesid != "" ||
        this.userDateTime.length != 0 ||
        this.userkey != ""
      ) {
        this.usertableapi(1);
      }
    },
    // 重置
    deledetabdat() {
      if (
        this.userreivws != "" ||
        this.suosuo != "" ||
        this.provincesid != "" ||
        this.userDateTime.length != 0 ||
        this.userkey != ""
      ) {
        if (this.currendRole != 2001) {
          this.suosuo = "";
          this.provincesid = "";
        }
        this.citydata = [];
        this.userDateTime = [];
        this.userreivws = "";
        this.userkey = "";
      }
      this.usertableapi(1);
    },
    // 刷新
    usersbuy() {
      this.usertabless = true;
      var timer = setTimeout(() => {
        this.usertableapi();
        clearInterval(timer);
      }, 2000);
    },
    // 删除
    userdatabtn() {
      // console.log(this.multipleSelection);
      if (this.multipleSelection.length != 0) {
        this.$confirm("是否确定删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            for (let j = 0; j < this.multipleSelection.length; j++) {
              let data = {
                risk_eval_id: this.multipleSelection[j],
              };
              Reviewcasedata(data).then((res) => {
                // console.log(res.code);
                if (res.code == 200) {
                  // console.log('进来了');
                  this.usertableapi();
                }
              });
            }
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // this.multipleSelection = [];
          })
          .catch(() => {
            // console.log("否");
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }else{
        this.$message({
          showClose: true,
          type: "info",
          message: "请勾选订单",
        });
      }
    },
    // 批量下载法律意见书
    downloadThelaw() {
      
      // console.log("uu", this.multipleSelection);
      if (this.multipleSelection.length) {
        this.userdownload = true;
        let data = {
          risk_eval_ids: this.multipleSelection,
        };
        LawOpinions(data)
          .then((res) => {
            // console.log("yy", res);
            let url = window.URL.createObjectURL(
              new Blob([res.data], { type: "application/zip" })
            );
            let filename = window.decodeURI(
              res.headers["content-disposition"].split("=")[1],
              "UTF-8"
            );
            let filenames = filename.replace('"', "").replace('"', "");
            let files = document.createElement("a");
            files.href = url;
            files.download = filenames;
            files.click();
            if (res.status == 200) {
              this.userdownload = false;
            }
          })
          .catch(() => {
            this.userdownload = false;
          });
      } else {
        this.$message({
          showClose: true,
          type: "info",
          message: "请勾选订单",
        });
      }
    },
    // 查找保险公司
    admniccorapi() {
      let daticcon = [];
      let data = {
        status: this.currendRole == 2001 ? -1 : -1,
      };
      GetinsuranceList(data).then((res) => {
        // console.log("保险公司", res);
        if (res.code == 200) {
          for (let i = 0; i < res.data.list.length; i++) {
            let icco = {
              id: res.data.list[i].ID,
              name: res.data.list[i].name,
            };
            daticcon.push(icco);
          }
          if (daticcon.length == 1) {
            setTimeout(() => {
              this.suosuo = daticcon[0].id;
              this.baoselect(this.suosuo);
            }, 200);
          }
        }
      });
      // console.log("保险公司",daticcon);
      this.daticcon = daticcon;
    },
    baoselect(ind) {
      // console.log(ind);
      this.provincesid = [];
      let citydata = [];
      let data = {
        icco_id: ind,
      };
      // console.log(data);
      GetinsuranceAreaList(data).then((res) => {
        // console.log("res", res);
        for (let i = 0; i < res.data.list.length; i++) {
          for (let j = 0; j < provinces.length; j++) {
            if (res.data.list[i].adcode == provinces[j].code) {
              let cl = {
                id: res.data.list[i].ID,
                name: provinces[j].name,
              };
              citydata.push(cl);
            }
          }
        }
        if (citydata.length == 1) {
          setTimeout(() => {
            this.provincesid = citydata[0].id;
          }, 150);
        }
      });
      this.citydata = citydata;

      // console.log("7777", this.citydata);
    },
    // 表格
    headertextAlgin() {
      return "text-align: center; background:#F7F7F7; color:#2F2E2E; font-size:14px;";
    },
    // 表格内容
    celltextAlgin({ columnIndex }) {
      if (columnIndex != 12) {
        return "text-align: center;";
      }
    },
    casetypess() {
      Casetype().then((res) => {
        // console.log('案由',res.data);
        this.anyou = res.data;
      });
    },
    deleteRowadmin(cur) {
      //点击拿到数据
      // console.log("点击拿到的数据", cur);
      // this.titles = cur;
      let rowadin = this.$router.resolve({
        path: "/usertable/adminfiedlook",
        query: {
          data: cur.id,
        },
      });
      window.open(rowadin.href, "_blank");

      this.riskevalid = cur.id;
    },
    // 表单操作 1.快速反馈 2.填写详细信息 3.上级复审 4.出单确认
    operation(dat) {
      // console.log("ktsc", dat);
      if (dat.stage == 1) {
        let insutdyd = this.$router.resolve({
          path: "/usertable/adminfiedform",
          query: {
            data: dat.id,
          },
        });
        window.open(insutdyd.href, "_blank");
      } else if (dat.stage == 2) {
        // this.hisupervis = true;
        this.riskevalid = dat.id;

        let hisuper = this.$router.resolve({
          path: "/usertable/hisupervisor",
          query: {
            data: dat.id,
          },
        });
        window.open(hisuper.href, "_blank");
      } else if (dat.stage == 3) {
        // this.shanhisupervis = true;
        this.riskevalid = dat.id;

        let hisupered = this.$router.resolve({
          path: "/usertable/hisupervisores",
          query: {
            data: dat.id,
          },
        });
        window.open(hisupered.href, "_blank");
      } else if (dat.stage == 4) {
        // this.singconfirm = true;
        this.riskevalid = dat.id;

        let asing = this.$router.resolve({
          path: "/usertable/asingconfirm",
          query: {
            data: dat.id,
          },
        });
        window.open(asing.href, "_blank");
      }
    },
    handleSelectionChange(val) {
      // console.log("val", val);
      let isthid = [];
      let selectids = val;
      for (let k = 0; k < selectids.length; k++) {
        isthid.push(selectids[k].id);
      }
      this.multipleSelection = isthid;
      // console.log(this.multipleSelection);
    },
    tablerowclassname({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    indexMethos(index) {
      return index + 1 + (this.currentPage - 1) * this.pagesize;
    },
    handsizetext(size) {
      this.pagesize = size;
      // console.log('每页多少条',size);
      this.usertableapi();
    },
    handsizepage(cur) {
      this.currentPage = cur;

      this.usertableapi();
    },
    radiochange() {
      this.userreivws = "";
      if (this.currendRole != 2001) {
        this.suosuo = "";
        this.provincesid = "";
      }
      // this.currentPage = 1
      this.radclick = true;
      let page = 1;
      this.currentPage = page;
      this.usertableapi(page);
    },
    // 表格数据api
    usertableapi(ind) {
      this.isdone = true;
      var data = {
        status:
          this.radiocyt == 1 || this.radiocyt == 4 || this.radiocyt == 3
            ? ""
            : this.radiocyt,
        review_stage: this.radiocyt == 1 ? this.radiocyt : "",
        is_add_data: this.radiocyt == 4 ? 1 : "",
        is_law_opinion: this.radiocyt == 3 ? 1 : "",
        reviewer: this.userreivws,
        icco_id: this.suosuo,
        area_id: this.provincesid,
        created_at: this.userDateTime[0],
        ended_at: this.userDateTime[1],
        limit: this.pagesize,
        keyword: this.userkey,
        page: ind ? ind : this.currentPage,
      };
      // console.log('data',data);
      // console.log(data);
      Caselist(data).then((res) => {
        // console.log("数据", res);
        this.isdone = false;
        if (res.data.list) {
          // this.tabsdatas = res.data.list;
          this.total = res.data.total;
          var tab = [];
          var evll = res.data.list;
          for (var i = 0; i < evll.length; i++) {
            let ts = {
              id: evll[i].id,
              // 标题
              title: evll[i].title,
              // 申请人
              salesman: evll[i].salesman,
              // 评估编号
              number: evll[i].number,
              // 申请时间
              application_time: evll[i].application_time,
              // 保险公司
              icco_name: evll[i].icco_name,
              // 地区
              area_name: pcacode(evll[i].area_name, provinces),
              // 状态
              status: evll[i].status,
              // 评估结果
              review_result: evll[i].review_result ? evll[i].review_result : "",
              // 处理人
              review_man: evll[i].review_man ? evll[i].review_man : "",
              // 出单情况
              trade: evll[i].trade ? evll[i].trade : "",
              // 处理时间
              review_time: evll[i].review_time,
              // 操作
              stage: evll[i].stage,
            };
            tab.push(ts);
          }
          this.tableData = tab;
          this.usertabless = false;
        } else {
          this.tableData = [];
          this.total = 0;
          this.currentPage = 1;
        }
      });
    },
    userreivewer(rev) {
      // console.log("675", rev);
      this.usereciu = rev;
      // this.radiochange(1);
    },
  },
};
</script>

<style lang="less">
.el-select-dropdown {
  .el-scrollbar {
    height: 268px !important;
  }
}
.user_data {
  border-bottom: 1px solid #bbbbbb;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  .scrbtnb {
    margin: 0 0 0 30px;
    button {
      width: 66px;
      height: 30px;
      padding: 0;
      + button {
        margin-left: 20px;
      }
    }
  }
  .iniconstatur {
    .el-input__inner {
      width: inherit !important;
      padding: 0 30px;
      width: 300px !important;
      height: 34px !important;
    }
  }
}

.user_data_btn {
  position: relative;
  padding-top: 20px;
  .user_btnes {
    margin: 0 0 15px 30px;
    button {
      height: 30px;
      padding: 0 8px;
      font-size: 13px;
      + button {
        margin-left: 20px;
      }
    }
    .el-button--text {
      color: #fff;
    }
  }
}
.btnstab {
  padding: 8px 12px;
  color: #f7f7f7;
}
.btnfrom {
  text-align: center;
  .el-button {
    padding: 8px 12px;
    margin: 10px 20px 0 20px;
  }
}
.margin {
  margin: 2px 0 10px 0;
}
.tabform {
  display: flex;
  justify-content: flex-end;
}
.mar {
  // height: 25px;
  line-height: 25px;
  font-size: 14px;
}
.martext {
  display: flex;
  p {
    min-height: 25px;
    line-height: 25px;
    margin: 0;
    width: 140px;
  }
  span {
    min-height: 25px;
    line-height: 25px;
    width: 360px;
    .uploadbtn {
      padding: 1px 9px;
    }
  }
  .radiospan {
    display: flex;
  }
}
.martexts {
  display: flex;
  p {
    min-height: 25px;
    line-height: 25px;
    margin: 0;
    width: 140px;
  }
  .radiospan {
    display: flex;
    align-items: center;
  }
}
.bxsdata {
  display: flex;
}
.usertable {
  margin-bottom: 45px;
  .radios {
    display: flex;
    align-items: center;
    margin: 0 0 20px 30px;
    .radios_sapn {
      width: 90px;
      height: 30px;
      font-size: 18px;
      line-height: 30px;
      .boxxinput {
        .el-input__inner {
          width: 300px !important;
          height: 34px !important;
        }
      }
    }
    .el-select {
      width: 300px !important;
    }
    .el-radio-group {
      .el-radio-button {
        .el-radio-button__inner {
          padding: 8px 20px;
        }
      }
    }
  }

  .el-table {
    .success-row {
      background-color: #f7f7f7;
    }
  }
  .paginat {
    height: 60px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    z-index: 4;
    left: 230px;
    right: 20px;
    background-color: #fff;
    .paginastyes {
      .el-pagination__sizes {
        .el-select {
          .el-input {
            .el-input__inner {
              width: 100px !important;
              height: 28px !important;
            }
          }
        }
      }
    }
  }
  .el-dialog {
    .el-steps {
      .el-step {
        .el-step__head.is-success {
          color: #4089e5;
          border-color: #4089e5;
        }
        .el-step__main {
          .el-step__title {
            font-size: 14px;
          }
          .el-step__title.is-success {
            color: #4089e5;
          }
          .el-step__description.is-success {
            color: #4089e5;
          }
        }
      }
    }
    .reviewer {
      margin-top: 35px;
      .grid-content {
        background-color: #d1e2f8;
        padding: 5px;
      }
    }
    .reviewerss {
      margin-top: 15px;
      margin-bottom: 15px;
      .el-row {
        padding-left: 20px;
      }
      .bg-purple {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .img {
          height: 19vh;
          display: flex;
          align-items: center;
          .el-image {
            display: flex;
            width: 200px;
            min-height: 100px;
            background-color: #bbbbbb;
            align-items: center;
            justify-content: center;
            .image-slot {
              display: flex;
            }
          }
        }
      }
    }
    .reviewersss {
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }
}
</style>