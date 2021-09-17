<template>
  <div class="usertable">
    <div class="radios">
      <span>状态：</span>
      <el-radio-group v-model="radiocyt" @change="radiochange">
        <el-radio-button label="-1">全部</el-radio-button>
        <el-radio-button label="1">评估中</el-radio-button>
        <el-radio-button label="2">评估完成</el-radio-button>
        <el-radio-button label="3">已完成</el-radio-button>
        <el-radio-button label="0">暂存</el-radio-button>
      </el-radio-group>
    </div>

    <div style="height: 460px">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="450"
        @selection-change="handleSelectionChange"
        :row-class-name="tablerowclassname"
      >
        <el-table-column type="selection" width="25"> </el-table-column>
        <el-table-column
          type="index"
          :index="indexMethos"
          width="60"
          label="序号"
        >
        </el-table-column>
        <el-table-column prop="number" label="评估编号" width="160">
        </el-table-column>
        <el-table-column prop="name" label="销售业务员" width="130">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="160">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <i v-if="scope.row.status == 0">暂存</i>
            <i v-if="scope.row.status == 1">评估中</i>
            <i v-if="scope.row.status == 2">评估完成</i>
            <i v-if="scope.row.status == 3">已完成</i>
          </template>
        </el-table-column>
        <el-table-column prop="casetype" label="案由类型" width="120">
        </el-table-column>
        <el-table-column prop="createdAt" label="提交时间" width="170">
        </el-table-column>
        <el-table-column fixed="right" prop="status" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.prevent="deleteRow(scope.row)"
              type="text"
              size="small"
            >
              查看
            </el-button>
            <el-button v-if="scope.row.status == 2" @click.prevent="singlebutton(scope.row)" type="text" size="small">
              出单确认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="paginat">
      <el-pagination
        background
        layout="prev, pager, next,total"
        @current-change="handsizepage"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      width="80%"
      center
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <aunifiedform />
      
    </el-dialog>
  </div>
</template>

<script>
//转换时间戳函数
function datetimes(res, date) {
  let ret = "";
  date = new Date(date);
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(res);
    if (ret) {
      res = res.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return res;
}
// 引入组件
import aunifiedform from "./aunifiedform.vue"
// API
import { Evallist, Casetype } from "../api/api";
export default {
  components:{
    aunifiedform,
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      radiocyt: "-1",
      total: null, //总条数
      pagesize: 10, //每页的个数
      currentPage: 1, //当前页数
      //弹出框
      titles: "",
      dialogVisible: false,
      //角色id
      // bendID: "1000",
      // 风险评估数据
      datafenx: "",
      // 详情
      detailsdata: "",
      // 用户名
      username: "",
      // 电话
      userphone: "",
      // 申请日期
      datacreat: "",
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      // 起诉状图片
      src: "",
      srcList: [],
      // 营业执照文件/身份证文件图片
      srcs: "",
      srcLists: [],
      // 保全申请书图片
      srca: "",
      srcLista: [],
      // 所有的案由类型
      totalcause: "",
    };
  },
  created() {
    this.radiochange();
  },
  methods: {
    deleteRow(data) {
      this.dialogVisible = true;
      let as = this.datafenx;
      this.srcList = [];
      //点击拿到数据
      for (var i = 0; i < as.length; i++) {
        if (data.number == as[i].number) {
          this.titles = as[i];
        }
      }
      // console.log("点击拿到的数据", this.titles);
      // this.titles = data;
      this.username = this.titles.user.name;
      this.userphone = this.titles.user.phone;
      this.datacreat = datetimes(
        "YYYY-mm-dd HH:MM:SS",
        this.titles.user.CreatedAt
      );
      // 营业执照文件
      let businesslicense = this.titles.Files.business_license;
      // 身份证文件
      let idcard = this.titles.Files.id_card;
      // 起诉状文件
      let indictment = this.titles.Files.indictment;
      // 保全申请文件
      let preservation = this.titles.Files.preservation;
      let htt = process.env.VUE_APP_API_URL;

      if (businesslicense != null) {
        for (var s = 0; s < businesslicense.length; s++) {
          this.srcs = htt + "/" + businesslicense[s].path;
          let ims = htt + "/" + businesslicense[s].path;
          this.srcLists.push(ims);
        }
      }
      if (idcard != null) {
        for (var b = 0; b < idcard.length; b++) {
          this.srcs = htt + "/" + idcard[b].path;
          let ims = htt + "/" + idcard[b].path;
          this.srcLists.push(ims);
        }
      }
      if (indictment != null) {
        for (var c = 0; c < indictment.length; c++) {
          this.src = htt + "/" + indictment[c].path;
          let ims = htt + "/" + indictment[c].path;
          this.srcList.push(ims);
        }
      }
      if (preservation != null) {
        for (var y = 0; y < preservation.length; y++) {
          this.src = htt + "/" + preservation[y].path;
          let ims = htt + "/" + preservation[y].path;
          this.srcList.push(ims);
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log("val", val);
    },
    tablerowclassname({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    indexMethos(index) {
      return (index + 1)+(this.currentPage - 1)*this.pagesize;
    },
    // handsizetext(size) {
    //   // this.pagesize = size;
    //   console.log("size", size);
    // },
    handsizepage(cur) {
      this.currentPage = cur;
      console.log("cur", this.currentPage);
      this.radiochange();
    },
    // 出单回显
    singlebutton(data){
      // 参数	         必填   类型	   说明
      // risk_eval_id 是	   number	 评估申请id
      console.log('评估申请id',data.id);
    },
    radiochange() {
      // console.log("data", data);
      Casetype().then((res) => {
        this.totalcause = res.data;
      });

      var data = {
        status: this.radiocyt,
        page: this.currentPage,
      };
      Evallist(data).then((res) => {
        console.log("res=", res);
        if (res.data.list) {
          this.total = res.data.total;
          this.datafenx = res.data.list;

          var tab = [];
          var evll = res.data.list;
          for (var i = 0; i < evll.length; i++) {
            for (var j = 0; j < this.totalcause.length; j++) {
              if (evll[i].case_type == this.totalcause[j].ID) {
                let ts = {
                  id:evll[i].id,
                  number: evll[i].number,
                  name: evll[i].user.name,
                  title: evll[i].title,
                  status: evll[i].status,
                  casetype: this.totalcause[j].name,
                  createdAt: datetimes(
                    "YYYY-mm-dd HH:MM:SS",
                    evll[i].user.CreatedAt
                  ),
                };
                tab.push(ts);
              }
            }
          }
          this.tableData = tab;
        } else {
          this.tableData = [];
          console.log("没有数据");
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less">
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
    min-width: 280px;
  }
  span {
    min-height: 25px;
    line-height: 25px;
    width: 360px;
    .el-image {
      min-height: 100px;
      background-color: #bbbbbb;
      display: flex;
      align-items: center;
      justify-content: center;
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
    // align-items: center;
  }
}
.usertable {
  .radios {
    margin-bottom: 25px;
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
  }
  .paginat {
    text-align: center;
  }
  // .el-dialog {
    // .reviewer {
    //   margin-top: 35px;
    //   .grid-content {
    //     background-color: #d1e2f8;
    //     padding: 5px;
    //   }
    // }
    // .reviewerss {
    //   margin-bottom: 15px;

    //   .el-row {
    //     padding-left: 20px;
    //   }
    // }
  // }
}
</style>