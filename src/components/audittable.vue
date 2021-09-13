<template>
  <div class="usertable">
    <div class="radios">
      <span class="radios_sapn">状态：</span>
      <el-radio-group v-model="radiocyt" @change="radiochange">
        <el-radio-button label="1">通过</el-radio-button>
        <el-radio-button label="2">待审核</el-radio-button>
      </el-radio-group>
    </div>

    <el-table
      border
      ref="autotable"
      :height="heighttable"
      :header-cell-style="headertextAlgin"
      :cell-style="celltextAlgin"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-class-name="tablerowclassname"
    >
      <el-table-column type="selection" min-width="35"> </el-table-column>
      <!-- <el-table-column
        type="index"
        :index="indexMethos"
        width="60"
        label="序号"
      >
      </el-table-column> -->
      <el-table-column prop="name" label="姓名" min-width="160"> </el-table-column>
      <el-table-column prop="phone" label="联系电话" min-width="130">
      </el-table-column>
      <el-table-column prop="icco" label="保险公司" width="160">
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="100">
        <template slot-scope="scope">
          <i v-if="scope.row.status == 2">待审核</i>
          <i v-if="scope.row.status == 1">通过</i>
        </template>
      </el-table-column>
      <el-table-column prop="iccoarea" label="所在省份" min-width="120">
      </el-table-column>
      <el-table-column prop="createdAt" label="提交时间" min-width="170">
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="130">
        <template slot-scope="scope">
          <el-button
            @click.prevent="deleteRows(scope.row)"
            type="text"
            size="small"
            style="background-color: rgb(64, 137, 229)"
          >
            查看
          </el-button>
          <el-button
            v-if="scope.row.status == 2"
            @click.prevent="audiostat(scope.row)"
            type="text"
            size="small"
            style="background-color: rgb(221, 24, 24)"
          >
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="paginat">
      <el-pagination
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
      width="43%"
      center
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <div class="grid-content">详情</div>

      <div class="reviewerss">
        <el-row>
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
              <span class="spantxt">{{ titles.iccoarea }}</span>
            </div>
            <div class="auditmartext">
              <p>绑定角色：</p>
              <span class="spantxt" v-if="titles.type == 1">保险业务员</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!-- 业务员审核 -->
    <el-dialog
      width="40%"
      center
      :visible.sync="notdialogVisible"
      :before-close="handleClose"
    >
      <div class="grid-content">详情</div>

      <div class="reviewerss">
        <el-row>
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
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
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
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="textarea"
                >
                </el-input>
              </span>
            </div>
            <div class="auditmartext">
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
import { Auditlist, Audit, Iccoaudit, Areainfo } from "../api/api";

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      radiocyt: "2",
      total: 0, //总条数
      pagesize: 6, //每页的个数
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
      // 审批意见
      textarea: "",
      // 业务员id
      salesmanid: "",
      // 通过与拒绝
      open: 1,
      out: 0,
      heighttable: 400,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.heighttable =
        window.innerHeight -
        this.$refs.autotable.$el.getBoundingClientRect().top -
        this.$refs.paginatref.$el.offsetHeight - 25;
    });
    this.radiochange();
  },
  methods: {
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
    deleteRows(data) {
      
      this.dialogVisible = true;
      
      //点击拿到数据
      // console.log("点击拿到的数据", data);
      this.titles = data;
      this.value = data.iccoarea;
      this.options = provinces;
      this.salesmanid = data.id;
    },
    audiostat(data){
      this.notdialogVisible = true;
      this.titles = data;
      this.value = data.iccoarea;
      this.options = provinces;
      this.salesmanid = data.id;
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
      // console.log("cur", this.currentPage);
      this.radiochange();
    },
    radiochange() {
      var data = {
        status: this.radiocyt,
        page: this.currentPage,
      };
      Auditlist(data).then((res) => {
        // console.log("res=", res);
        if (res.data.list) {
          this.total = res.data.total;
          var tab = [];
          this.usernameaudit = res.data.list;
          var evll = res.data.list;
          for (var i = 0; i < evll.length; i++) {
            let ts = {
              id: evll[i].id,
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
      console.log("..", dat);
      Areainfo().then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          if (dat == res.data[i].adcode) {
            var id = res.data[i].ID;
            console.log(id);
          }
        }
        let data = {
          user_id: this.salesmanid,
          area_id: id,
        };
        Audit(data)
          .then((res) => {
            console.log("修改成功", res);
          })
          .catch((err) => {
            console.log("er", err);
            this.$message({
              showClose: true,
              message: "请选择正确的省份",
              type: "error",
            });
            this.value = "";
          });
      });
    },
    // 审核通过拒绝
    refusingto(res) {
      // user_id	是	number	保险业务员id
      // result	是	number	审核结果，0.不通过 1.通过
      // reason	是	string	原因
      console.log("通过", res);
      var data = {
        user_id: this.salesmanid,
        result: res,
        reason: this.textarea,
      };

      Iccoaudit(data).then((res) => {
        console.log(res);
        this.notdialogVisible = false;
      });
    },
  },
};
</script>

<style lang="less">
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
  margin-bottom: 10px;
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
  .el-button {
    border: 0;
    margin: 20px 15px 0 15px;
    font-size: 16px;
    padding: 6px 20px;
  }
}
.usertable {
  .radios {
    margin-bottom: 25px;
    .radios_sapn{
      width: 54px;
      height: 30px;
      font-size: 18px;
      margin-right: 50px;
      line-height: 30px;
    }
    .el-radio-group {
      .el-radio-button {
        .el-radio-button__inner {
          padding: 5px 20px;
        }
      }
    }
  }
  .el-table {
    .success-row {
      background-color: #f7f7f7;
    }
    .el-button{
      padding: 2px 3px;
      color: #fff;
    }
  }
  .paginat {
    text-align: center;
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