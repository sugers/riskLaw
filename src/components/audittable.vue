<template>
  <div class="usertable">
    <div class="headeraudio">
      <div class="radios">
        <span class="radios_sapn">状态：</span>
        <el-radio-group v-model="radiocyt" @change="radiochange">
          <el-radio-button label="-1">全部</el-radio-button>
          <el-radio-button label="2">待审核</el-radio-button>
          <el-radio-button label="1">通过</el-radio-button>
        </el-radio-group>
      </div>

      <div class="boxdateait">
        <div class="radios">
          <div class="radios_sapn">保险公司：</div>
          <el-select
            v-model="arrbaosel"
            placeholder="请选择"
            @change="auditbaoclick"
          >
            <el-option
              v-for="item in auditarray"
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
            v-model="auditprovin"
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
      </div>
      <div class="boxdateait">
      <div class="radios">
        <span class="radios_sapn">日期：</span>
        <div class="iniconstatur">
          <el-date-picker
            v-model="auditDateTime"
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
          <el-input placeholder="请输入内容" v-model="keyword" clearable>
          </el-input>
        </div>
      </div>
      </div>

      <div class="scrbtnb">
        <el-button
          type="info"
          @click.prevent="auditdelclick"
          icon="el-icon-refresh"
        >
          重置
        </el-button>
        <el-button
          type="primary"
          @click.prevent="auditdataclick"
          icon="el-icon-search"
        >
          筛选
        </el-button>
      </div>
    </div>

    <div class="asiostable">
      <div class="audibtnes" >
        <el-button
          type="text"
          style="background-color: #409EFF"
          @click.prevent="auditbtnout"
          :loading="audittabless"
          icon="el-icon-refresh"
        >
          刷新
        </el-button>
        <el-button
          v-show="shenhebottom"
          type="text"
          size="small"
          style="background-color: #67C23A"
          @click.prevent="audiobtns(1)"
        >
          通过
        </el-button>
        <el-button
          v-show="shenhebottom"
          type="text"
          size="small"
          style="background-color: #f56c6c"
          @click.prevent="audiobtns(0)"
        >
          不通过
        </el-button>
        
      </div>
      <el-table
        ref="autotable"
        :header-cell-style="headertextAlgin"
        :cell-style="celltextAlgin"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-class-name="tablerowclassname"
        class="eltables"
      >
        <el-table-column type="selection" min-width="35"> </el-table-column>
        <el-table-column
          type="index"
          :index="indexMethos"
          width="60"
          label="序号"
        >
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="160">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" min-width="130">
        </el-table-column>
        <el-table-column
          prop="icco"
          label="保险公司"
          width="160"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="100">
          <template slot-scope="scope">
            <div class="btgstatus" v-if="scope.row.status == 2">待审核</div>
            <div class="tgstatus" v-if="scope.row.status == 1">通过</div>
          </template>
        </el-table-column>
        <el-table-column prop="iccoarea" label="所在省份" min-width="120">
        </el-table-column>
        <el-table-column prop="createdAt" label="提交时间" min-width="170">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button
              @click.prevent="deleteRows(scope.row)"
              type="text"
              size="small"
              style="background-color: #409eff"
            >
              查看
            </el-button>
            <el-button
              v-if="scope.row.status == 2"
              @click.prevent="audiostat(scope.row)"
              type="text"
              size="small"
              style="background-color: #f56c6c"
            >
              审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Spin fix v-show="isdone">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>

    <div class="paginat">
      <el-pagination
        class="paginastyes"
        ref="paginatref"
        background
        layout="prev, pager, next,total"
        @size-change="handsizetext"
        @current-change="handsizepage"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog
      width="38%"
      center
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      class="shendialog"
    >
      <div class="gir-text">
        <div class="grid-content">详情</div>
      </div>
      <div class="reviewerss">
        <el-row class="rows">
          <el-col :span="24">
            <div class="audiouser">
              <div class="auditmartext_y">
                <p>姓名：</p>
                <span class="spantxt">{{ titles.name }}</span>
              </div>
              <div class="auditmartext_y">
                <p>联系电话：</p>
                <span class="spantxt">{{ titles.phone }}</span>
              </div>
              <div class="auditmartext_y">
                <p>保险公司：</p>
                <span class="spantxt">{{ titles.icco }}</span>
              </div>
              <div class="auditmartext_y">
                <p>所在省份：</p>
                <span class="spantxt">{{ titles.iccoarea }}</span>
              </div>
              <div class="auditmartext_y">
                <p>绑定角色：</p>
                <span class="spantxt" v-if="titles.type == 1">保险业务员</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!-- 业务员审核 -->
    <el-dialog
      width="38%"
      center
      :visible.sync="notdialogVisible"
      :before-close="handleClose"
      class="shendialog"
    >
      <div class="gir-text">
        <div class="grid-content">详情</div>
      </div>

      <div class="reviewerss">
        <el-row class="rows">
          <el-col :span="24">
            <div class="auditmartext">
              <p>姓名：</p>
              <span class="spantxt">{{ titles.name }}</span>
            </div>
            <div class="auditmartext">
              <p>联系电话：</p>
              <span class="spantxt">{{ titles.phone }}</span>
            </div>
            <div class="auditmartext">
              <p>保险公司：</p>
              <span class="spantxt">{{ titles.icco }}</span>
            </div>
            <div class="auditmartext">
              <p>所在省份：</p>
              <span class="spantxt">
                <el-select
                  v-model="value"
                  placeholder="请选择"
                  @change="auditselect"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </span>
            </div>
            <div class="auditmartext">
              <p>绑定角色：</p>
              <span class="spantxt" v-if="titles.type == 1">保险业务员</span>
            </div>
            <div class="auditmartext">
              <p>审批意见：</p>
              <span class="spantxt">
                <el-input
                  :autosize="{ minRows: 5 }"
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="textarea"
                >
                </el-input>
              </span>
            </div>
            <div class="auditmartexts">
              <el-button type="primary" v-model="open" @click="refusingto(open)"
                >通过</el-button
              >
              <el-button
                type="primary"
                v-model="out"
                @click="refusingto(out)"
                style="background-color: #d7d7d7"
                >拒绝</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
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
// 引入api
import {
  Auditlist,
  Audit,
  Iccoaudit,
  // Areainfo,
  Audiobatch,
  GetinsuranceList,
  GetinsuranceAreaList,
} from "../api/api";

export default {
  data() {
    return {
      // 筛选
      auditDateTime: [],
      tableData: [],
      multipleSelection: [],
      radiocyt: "2",
      total: 0, //总条数
      pagesize: 10, //每页的个数
      currentPage: 1, //当前页数
      //弹出框
      titles: "",
      dialogVisible: false,
      notdialogVisible: false,
      //角色id
      // bendID: "1000",

      // 保额
      usernameaudit: "",
      // 省份选择
      options: "",
      value: "",
      auditprovin: "",
      citydata: [],
      // 审批意见
      textarea: "",
      // 业务员id
      salesmanid: "",
      // 通过与拒绝
      open: 1,
      out: 0,

      icco_id: "",
      shenhebottom: false,
      // 关键字
      keyword: "",
      // 保险公司
      arrbaosel: "",
      auditarray: [],
      isdone: false,

      audittabless: false,
    };
  },
  created() {
    this.auditiccorapi();
  },
  mounted() {
    // this.$nextTick(function () {
    //   this.heighttable =
    //     window.innerHeight -
    //     this.$refs.autotable.$el.getBoundingClientRect().top -
    //     this.$refs.paginatref.$el.offsetHeight -
    //     25;
    // });
    this.radiochange();
  },
  methods: {
    auditbtnout(){
      this.audittabless = true;
      var timer = setTimeout(() => {
        this.radiochange();
        clearInterval(timer);
      }, 2000);
    },
    // 重置
    auditdelclick() {
      
      if (this.auditprovin != "" || 
          this.arrbaosel != "" || 
          this.auditDateTime.length != 0 || 
          this.keyword != ""
      ) {
        this.auditprovin = "";
        this.arrbaosel = "";
        this.auditDateTime = [];
        this.keyword = "";
        this.Auditlistapi(1);
      }

    },
    // 筛选
    auditdataclick() {
      this.Auditlistapi(1);
    },
    auditbaoclick(ind) {
      this.auditprovin = "";
      let citydata = [];
      let data = {
        icco_id: ind,
      };
      // console.log(data);
      GetinsuranceAreaList(data).then((res) => {
        console.log('res',res);
        for (let i = 0; i < res.data.list.length; i++) {
          for (let j = 0; j < provinces.length; j++) {
            if (res.data.list[i].adcode == provinces[j].code) {
              let cl = {
                id: res.data.list[i].ID,
                name: provinces[j].name,
              }
              citydata.push(cl);
            }
          }
        }
      });
      this.citydata = citydata;
    },
    // 查找保险公司
    auditiccorapi() {
      let daticcon = [];
      let data = {
        status: -1,
      };
      GetinsuranceList(data).then((res) => {
        // console.log("保险公司", res);
        for (let i = 0; i < res.data.list.length; i++) {
          let icco = {
            id: res.data.list[i].ID,
            name: res.data.list[i].name,
          };
          daticcon.push(icco);
        }
      });
      // console.log("保险公司",daticcon);
      this.auditarray = daticcon;
    },
    // 地区api
    aresintd() {
      let data = {
        icco_id: this.icco_id,
      };
      var diqudata = [];
      GetinsuranceAreaList(data).then((res) => {
        // console.log('huhhu',res);
        let diqu = res.data.list;
        for (let i = 0; i < diqu.length; i++) {
          for (let j = 0; j < provinces.length; j++) {
            if (diqu[i].adcode == provinces[j].code) {
              let a = {
                id: diqu[i].ID,
                name: provinces[j].name,
              };
              diqudata.push(a);
            }
          }
        }
      });
      this.options = diqudata;
      // console.log(this.options);
    },
    // 表格
    headertextAlgin() {
      return "text-align: center; background: #f7f7f7; color:#2F2E2E; font-size:14px;";
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
    deleteRows(data) {
      this.dialogVisible = true;

      //点击拿到数据
      // console.log("点击拿到的数据", data);
      this.titles = data;
      this.value = data.iccoarea;
      // this.options = provinces;
      this.salesmanid = data.id;
    },
    audiostat(data) {
      // console.log('拿到数据',data);
      this.notdialogVisible = true;
      this.titles = data;
      this.value = data.iccoarea;
      this.salesmanid = data.id;
      this.icco_id = data.icco_id;
      this.aresintd();
    },
    handleSelectionChange(val) {
      // console.log("val", val);
      // console.log('hu',this.radiocyt);
      let idarrer = [];
      let select = val;
      for (let i = 0; i < select.length; i++) {
        idarrer.push(select[i].id);
      }
      this.multipleSelection = idarrer;
      if (this.radiocyt == 2 && val.length) {
        this.shenhebottom = true;
        console.log("y");
      } else {
        this.shenhebottom = false;
        console.log("n");
      }
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
      // console.log(size);
    },
    handsizepage(cur) {
      this.currentPage = cur;
      // console.log("cur", this.currentPage);
      this.Auditlistapi();
    },
    radiochange() {
      let pagee = 1;
      this.currentPage = pagee;
      this.Auditlistapi(pagee);
    },
    // 表格数据
    Auditlistapi(ind) {
      this.isdone = true
      var data = {
        icco_id: this.arrbaosel,
        area_id: this.auditprovin,
        keyword: this.keyword,
        created_at: this.auditDateTime[0],
        ended_at: this.auditDateTime[1],
        status: this.radiocyt,
        page: ind ? ind : this.currentPage,
      };
      Auditlist(data).then((res) => {
        // console.log("res=", res);
        this.isdone = false;
        if (res.data.list) {
          this.total = res.data.total;
          var tab = [];
          this.usernameaudit = res.data.list;
          var evll = res.data.list;
          for (var i = 0; i < evll.length; i++) {
            let ts = {
              id: evll[i].id,
              icco_id: evll[i].icco_id,
              name: evll[i].name,
              phone: evll[i].phone,
              icco: evll[i].icco_name,
              status: evll[i].status,
              iccoarea: pcacode(evll[i].area_name, provinces),
              createdAt: evll[i].created_at,
              type: "1",
            };
            tab.push(ts);
          }
          // console.log(">", tab);
          this.tableData = tab;
          this.audittabless = false;
        } else {
          console.log("没有数据");
          this.tableData = [];
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.notdialogVisible = false;
    },
    // 修改省份
    auditselect(dat) {
      console.log(dat);
      console.log("..", this.value);
    },
    // 审核通过拒绝
    refusingto(red) {
      // console.log(red);
      // user_id	是	number	保险业务员id
      // result	是	number	审核结果，0.不通过 1.通过
      // reason	是	string	原因
      // console.log("通过", res);
      let das = {
        user_id: this.salesmanid,
        area_id: this.value,
      };
      console.log('ggg',das);
      Audit(das).then((res) => {
        console.log("修改成功", res);
      });
      var data = {
        user_id: this.salesmanid,
        result: red,
        reason: this.textarea,
      };
      Iccoaudit(data).then((res) => {
        console.log(res);
        this.Auditlistapi();
        this.notdialogVisible = false;
      });
    },
    // 批量审核
    audiobtns(ind) {
      // console.log(ind);
      let data = {
        user_ids: this.multipleSelection,
        result: ind,
      };
      // console.log('l',data);
      Audiobatch(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "全部审核通过",
            type: "success",
          });
          this.Auditlistapi();
        }
      });
    },
  },
};
</script>

<style lang="less">
.eltables {
  .el-table__header-wrapper {
    .el-table__header {
      .has-gutter {
        tr {
          th {
            color: rgb(47, 46, 46);
            font-size: 14px;
          }
        }
      }
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
    .reviewerss {
      .rows {
        padding: 0 !important;
        .audiouser {
          padding-bottom: 50px;
          .auditmartext_y {
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
            p {
              min-height: 25px;
              line-height: 25px;
              margin: 0;
              width: 140px;
            }
            .spantxt {
              min-height: 25px;
              line-height: 25px;
              min-width: 169px;
              max-width: 200px;
            }
          }
        }
      }
    }
  }
}
.headeraudio {
  border-bottom: 1px solid #bbbbbb;
  padding-bottom: 20px;
  .scrbtnb {
    margin: 0 0 0 30px;
    button {
      width: 66px;
      height: 30px;
      padding: 0;
      +button{
        margin-left: 20px;
      }
    }
  }
  .boxdateait {
    display: flex;
  }
}
.asiostable {
  position: relative;
  padding-top: 20px;
  .audibtnes {
    margin: 0 0 15px 30px;
    button {
      width: 66px;
      height: 30px;
      padding: 0;
      +button{
        margin-left: 20px;
      }
    }
    .el-button--text {
      color: #fff;
    }
  }
}

.tgstatus {
  color: rgb(103, 194, 58);
}
.btgstatus {
  color: rgb(245, 108, 108);
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
.auditmartext {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  p {
    min-height: 25px;
    line-height: 25px;
    margin: 0;
    width: 140px;
  }
  .spantxt {
    min-height: 25px;
    line-height: 25px;
    width: 200px;
  }
  .radiospan {
    display: flex;
  }
  // .el-button {
  //   border: 0;
  //   margin: 20px 15px 0 15px;
  //   font-size: 16px;
  //   padding: 6px 20px;
  // }
}
.auditmartexts{
  display: flex;
  justify-content: center;
  margin-bottom: 55px;
  .el-button {
    border: 0;
    margin: 20px 15px 0 15px;
    font-size: 16px;
    padding: 6px 20px;
  }
}
.usertable {
  .radios {
    display: flex;
    align-items: center;
    margin: 0 0 20px 30px;
    .radios_sapn {
      width: 90px;
      height: 30px;
      font-size: 14px;
      font-weight: 600;
      // margin-right: 50px;
      line-height: 30px;
    }
    .boxxinput {
      .el-input__inner {
        width: 350px;
      }
    }
    .el-select {
      width: 350px !important;
    }

    .el-radio-group {
      .el-radio-button {
        .el-radio-button__inner {
          padding: 8px 20px;
        }
      }
    }
    .iniconstatur {
      .el-input__inner {
        padding: 0 10px;
      }
    }
  }
  .el-table {
    .success-row {
      background-color: #f7f7f7;
    }
    .el-button {
      padding: 8px 12px;
      color: #fff;
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
              height: 28px !important;
            }
          }
        }
      }
    }
  }
  .el-dialog {
    .reviewer {
      text-align: center;
      margin-top: 35px;
      .grid-content {
        background-color: #d1e2f8;
        padding: 5px;
      }
    }
    .reviewerss {
      // text-align: center;
      margin-top: 15px;
      margin-bottom: 15px;
      .el-row {
        padding-left: 20px;
      }
    }
  }
}
</style>