<template>
  <div class="usertable">
    <!-- <audio id="audio" controls="controls" style="height:0;" src="https://down.ear0.com:3321/preview?soundid=35825&type=mp3"></audio> -->
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
    <div class="suosuo">
      <!-- <div class="sousou_txt">
        <div class="s_bao_txt">保险公司：</div>
        <el-select
          style="width: 338px; height: 38px"
          v-model="suosuo"
          placeholder="请选择"
        >
          <el-option
            v-for="(item,ind) in tabsdatas"
            :key="ind"
            :label="item.icco_name"
            :value="item.icco_name"
          >
          </el-option>
        </el-select>
      </div> -->

      <div class="sousou_txt">
        <div class="s_bao_txs">当前处理人：</div>
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
    </div>
    <!-- <div class="suosuo">
      <div class="sousou_txt">
        <div class="s_bao_txt">省份：</div>
        <el-select
          v-model="provincesid"
          placeholder="请选择"
          :popper-append-to-body="false"
          @change="provselect"
        >
          <el-option
            v-for="item in provins"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </div>
    </div> -->

    <div>
      <el-table
        ref="tableref"
        border
        :height="tableheight"
        :header-cell-style="headertextAlgin"
        :cell-style="celltextAlgin"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-class-name="tablerowclassname"
      >
        <el-table-column type="selection" width="35"> </el-table-column>
        <!-- <el-table-column
          type="index"
          :index="indexMethos"
          width="55"
          label="序号"
        > 
        </el-table-column> -->
        <el-table-column prop="number" label="编号" min-width="150">
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="120">
        </el-table-column>
        <el-table-column prop="salesman" label="申请人" min-width="120">
        </el-table-column>
        <el-table-column
          prop="application_time"
          label="申请时间"
          min-width="150"
        >
        </el-table-column>
        <el-table-column prop="icco_name" label="保险总司" min-width="130">
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
            <div v-if="scope.row.review_result == 1">同意承保</div>
            <div v-if="scope.row.review_result == 2">拒绝承保</div>
            <div v-if="scope.row.review_result == 3">补充材料</div>
          </template>
        </el-table-column>
        <el-table-column prop="review_man" label="当前处理人" min-width="90">
        </el-table-column>
        <el-table-column prop="trade" label="出单情况" min-width="90">
          <template slot-scope="scope">
            <div style="color: #f56c6c" v-if="scope.row.trade == 0">未出单</div>
            <div style="color: #67c23a" v-if="scope.row.trade == 1">已出单</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="review_time"
          label="当前处理时间"
          min-width="150"
        >
        </el-table-column>

        <el-table-column
          fixed="right"
          prop="stage"
          label="操作"
          min-width="130"
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
                scope.row.stage == 1 && scope.row.review_result != 3
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
                scope.row.review_result != 3
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
                scope.row.review_result != 3
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
                scope.row.review_result != 2
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
          style=""
          ref="paginatref"
          background
          layout="prev, pager, next,total"
          @size-change="handsizetext"
          @current-change="handsizepage"
          :current-page="currentPage"
          :page-sizes="[50, 100, 150, 200]"
          :page-size="pagesize"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 查看 -->
    <!-- <el-dialog
      width="70%"
      center
      :visible.sync="dialogVilook"
      v-if="dialogVilook"
      :before-close="handleClose"
    >
      <adminfiedlook
        :taskview="taskview"
        :anyou="anyou"
        @kuaie="radiochange"
        @func="handleClose"
      ></adminfiedlook>
    </el-dialog> -->
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

import {
  Caselist,
  Iccoarea,
  // Reviewcase,
  // 获取案由类型
  Casetype,
  // 查看保险公司
  // Admniccor,
  // 审核人员
  Reivewerinfo,
} from "../api/api";
export default {
  components: {},
  data() {
    return {
      // 任务池查看的数据
      taskview: "",
      // 保险公司搜索
      suosuo: "",
      // 按省份搜索
      provins: "",
      // 按处理人搜索
      userreivws: "",
      provincesid: "",
      // 案由类型
      anyou: "",
      tableData: [],

      multipleSelection: [],
      radiocyt: "1",
      total: null,
      pagesize: 50, //每页的个数
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
      tableheight: 400,
      websoce: null,
      // lockReconnect: false, //是否真正建立连接
      // timeout: 28 * 1000, //30秒一次心跳
      // timeoutObj: null, //心跳心跳倒计时
      // serverTimeoutObj: null, //心跳倒计时
      // timeoutnum: null, //断开 重连倒计时
    };
  },
  created() {
    // 权限
    var userinfor = JSON.parse(localStorage.getItem("userinfor"));
    this.roleID = userinfor.roleID;

    this.radiochange();
    this.casetypess();
    this.$root.$on('radio',this.radiochange)
    // Admniccor().then((res) => {
    //   console.log("baox", res);
    //   this.tabsdatas = res.data;
    // });
    let data = {
      icco_id: 1,
    };
    Iccoarea(data).then(() => {
      // console.log("sssss", res);
    });
    // 获取审核人员
    Reivewerinfo().then((res) => {
      // console.log("审核人员", res);
      this.reivewer = res.data;
    });
    this.provins = provinces;
    // this.initwebsocket();
  },
  // destroyed: function () {
  //   
  // },
  mounted() {
    this.$nextTick(function () {
      this.tableheight =
        window.innerHeight -
        this.$refs.tableref.$el.getBoundingClientRect().top -
        this.$refs.paginatref.$el.offsetHeight -
        25;
    });
  },
  methods: {
    // websocket
    // initwebsocket() {
    //   if('WebSocket' in window){
    //     var access_token = window.localStorage.getItem("access_token");
    //   // console.log(typeof(access_token));
    //   const wsui = process.env.VUE_APP_API_URL.replace('https','wss') + "/api/v1/backend/auth/ws"+'?token='+access_token;
    //   // console.log(wsui);
    //   this.websoce = new WebSocket(wsui);
    //   this.websoce.onopen = this.websocketonopen;
    //   this.websoce.onerror = this.websocketonerror;
    //   this.websoce.onmessage = this.websocketonmessage;
    //   this.websoce.onclose = this.websocketclose;
    //   }else{
    //     this.$message({
    //       showClose: true,
    //       message: '当前浏览器不支持WebSocket',
    //       type: "success",
    //     });
    //   }
      
    // },
    // 重新连接
    // reconnect(){
    //   if (this.lockReconnect) {
    //     return;
    //   }
    //   this.lockReconnect = true;
    //   this.timeoutnum && clearTimeout(this.timeoutnum);
    //   this.timeoutnum = setTimeout(function () {
    //     //新连接
    //     this.initWebSocket();
    //     this.lockReconnect = false;
    //   }, 5000);
    // },
    // 重置心跳
    // reset(){
    //   //清除时间
    //   clearTimeout(this.timeoutObj);
    //   clearTimeout(this.serverTimeoutObj);
    //   //重启心跳
    //   this.start();
    // },
    // start(){
    //   this.timeoutObj && clearTimeout(this.timeoutObj);
    //   this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    //   this.timeoutObj = setTimeout(function(){
    //     if(this.websoce.readyState == 1){
          
    //     }
    //   })
    // },
    //声音提示
    // audioplay(){
    //   const audio = document.getElementById("audio");
    //   audio.play()
    // },
    // websocketonopen() {
    //   console.log("链接成功");
    //   // this.websoce.send('sttes');
    //   let fa = this.websoce.readyState;
    //   console.log('1',fa);
    // },
    // websocketonerror(e) {
    //   console.log("链接失败", e);
    // },
    // websocketonmessage(a) {
    //   this.websoce.send('111')
    //   // console.log(a);
    //   const redata = JSON.parse(a.data);
    //   console.log("redata", redata);
    //   if(redata.code == 200){
    //     this.radiochange();
    //     this.$message({
    //       showClose: true,
    //       message: '有消息来了',
    //       type: "success",
    //     });
    //     var evt = document.createEvent('Event');
    //     evt.initEvent('click',true,true);
    //     document.getElementById("audio").dispatchEvent(evt);

    //     this.audioplay();
    //   }
      
    // },
    // websocketclose(e) {
    //   console.log("关闭了", e);
    //   let fa = this.websoce.readyState;
    //   console.log('2222',fa);
    //   // 重连
    //   // this.initwebsocket()
    // },
    // 表格
    headertextAlgin() {
      return "text-align: center; background: #f5f7fa;";
    },
    // 表格内容
    celltextAlgin({ columnIndex }) {
      // console.log('colum',column);
      // console.log('rowind',rowIndex);
      // console.log('colummu',columnIndex);
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
      console.log("ktsc", dat);
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
      this.multipleSelection = val;
      console.log("val", val);
    },
    tablerowclassname({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    // indexMethos(index) {
    //   return index + 1 + (this.currentPage - 1) * this.pagesize;
    // },
    handsizetext(size) {
      this.pagesize = size;
      // console.log(size);
    },
    handsizepage(cur) {
      this.currentPage = cur;

      this.usertableapi();
    },
    radiochange() {
      // this.currentPage = 1
      this.radclick = true;
      let page = 1
      this.currentPage = page
      this.usertableapi(page);
    },
    // 表格数据api
    usertableapi(ind) {
      var data = {
        status:
          this.radiocyt == 1 || this.radiocyt == 4 || this.radiocyt == 3
            ? ""
            : this.radiocyt,
        review_stage: this.radiocyt == 1 ? this.radiocyt : "",
        is_add_data: this.radiocyt == 4 ? 1 : "",
        is_law_opinion: this.radiocyt == 3 ? 1 : "",
        reviewer: this.usereciu,
        page: ind ? ind : this.currentPage,
      };

      Caselist(data).then((res) => {
        console.log("数据", res);
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
        } else {
          this.tableData = [];
          this.total = 0;
          this.currentPage = 1;
        }
      });
    },
    provselect(dat) {
      console.log(dat);
      // this.radiochange(dat)
    },
    userreivewer(rev) {
      // console.log("675", rev);
      this.usereciu = rev;
      this.radiochange(1);
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

.btnstab {
  padding: 2px 3px;
  color: #f7f7f7;
}
.btnfrom {
  text-align: center;
  .el-button {
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
.usertable {
  .radios {
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    .radios_sapn {
      width: 54px;
      height: 30px;
      font-size: 18px;
      margin-right: 50px;
      line-height: 30px;
    }
    .el-radio-group {
      .el-radio-button {
        .el-radio-button__inner {
          padding: 12px 20px !important;
        }
      }
    }
  }
  .suosuo {
    display: flex;
    .sousou_txt {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      margin-right: 30px;
      .s_bao_txt {
        width: 90px;
        height: 27px;
        font-size: 18px;
        margin-right: 14px;
      }
      .s_bao_txs {
        width: 108px;
        height: 27px;
        font-size: 18px;
        margin-right: 14px;
      }
    }
  }
  .el-table {
    .success-row {
      background-color: #f7f7f7;
    }
  }
  .paginat {
    text-align: center;
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