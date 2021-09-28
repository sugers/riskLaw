<template>
  <div>
    <!-- <div class="headedata">
      <div class="headerboke">
        <div class="hesde_data">数据看板</div>
      </div>
    </div> -->

    <div v-if="pingtai">
      <el-row :gutter="12" class="elrow">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">累计评估总量</div>
                <div class="number pin">{{ risk_eval_review_count }}</div>
              </div>
              <img src="../../static/img/pin.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">已合作保险公司总量</div>
                <div class="number hezuo">{{ icco_count }}</div>
              </div>
              <img src="../../static/img/hezuo.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">入驻律师总量</div>
                <div class="number lvshi">{{ lawyer_count }}</div>
              </div>
              <img src="../../static/img/lvshi.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">累积处理保额</div>
                <div class="number baoe" :title="preserv_amount_count">
                  ￥{{ preserv_amount_count | currency }}
                </div>
              </div>
              <img src="../../static/img/baoe.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">累积承保总额</div>
                <div class="number zonge" :title="underwriting_amount_count">
                  ￥{{ underwriting_amount_count | currency }}
                </div>
              </div>
              <img src="../../static/img/zonge.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">累积出单保费总额</div>
                <div class="number chudan">￥{{ amount_count | currency }}</div>
              </div>
              <img src="../../static/img/chudan.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-if="baoxingpint">
      <el-row :gutter="12" class="elrow">
        <el-col :span="8">
          <!-- <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">本省业务员总人数</div>
                <div class="number pin">{{ risk_eval_review_count }}</div>
              </div>
              <img src="../../static/img/pin.png" alt="图标" />
            </div>
          </el-card> -->
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">本月提交评估量</div>
                <div class="number lvshi">{{ risk_eval_count }}</div>
              </div>
              <img src="../../static/img/lvshi.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <!-- <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">我司开通省份数</div>
                <div class="number hezuo">{{ icco_count }}</div>
              </div>
              <img src="../../static/img/hezuo.png" alt="图标" />
            </div>
          </el-card> -->
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">本月评估通过量</div>
                <div class="number baoe">{{ risk_eval_open_count }}</div>
              </div>
              <img src="../../static/img/pin.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">本月出单量</div>
                <div class="number zonge">
                  {{ risk_eval_trade_count }}
                </div>
              </div>
              <img src="../../static/img/lvshi.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px">
      <el-card shadow="hover" :body-style="{ padding: '10px' }">
        <!-- <div class="homecharts">
          <div class="homesearch">
            <span class="homesearch_sapn">年：</span>
            <div class="homesearch_init">
              <el-date-picker
                v-model="yeared"
                type="year"
                placeholder="选择年"
                format="yyyy"
                :clearable="false"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="homesearch">
            <span class="homesearch_sapn">月：</span>
            <div class="homesearch_init">
              <el-date-picker
                v-model="monthed"
                type="month"
                placeholder="选择月"
                format="yyyy-MM"
                :clearable="false"
              >
              </el-date-picker>
            </div>
          </div>
        </div> -->
        <EchartsTable :id="'echars1'" :data="chartstable1" />
      </el-card>
    </div>
    <div style="margin-top: 20px">
      <el-card shadow="hover" :body-style="{ padding: '10px' }">
        <EchartsTable :id="'echars2'" :data="chartstable2" />
      </el-card>
    </div>
    <Spin fix v-show="isdone">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
import { Commondashboard, Dashboard } from "../api/api";
import EchartsTable from "./EChartsTable.vue";
// function getThisMonthDays(days) {
//   //传天数，返天数数组
//   var arr = [];
//   for (var i = 1; i <= days; i++) {
//     arr.push(i);
//   }
//   return arr;
// }
export default {
  name: "soutable",
  components: {
    EchartsTable,
  },
  data() {
    return {
      risk_eval_review_count: "",
      icco_count: "",
      lawyer_count: "",
      preserv_amount_count: "",
      underwriting_amount_count: "",
      amount_count: "",

      risk_eval_count: "",
      risk_eval_open_count: "",
      risk_eval_trade_count: "",

      // 表1提交量
      chartstable1: {
        textTitle: "提交量",
        nameArray: "",
        series: [],
      },
      // 表1数据
      chartsData1: [
        // {
        //   name: "通过量",
        //   type: "bar",
        //   barWidth: 25,
        //   stack: "Ad",
        //   data: [120, 132, 101, 134, 90, 230, 210, 135, 91, 114, 90, 121],
        // },
        // {
        //   name: "拒绝量",
        //   type: "bar",
        //   barWidth: 25,
        //   stack: "Ad",
        //   data: [12, 32, 10, 34, 20, 13, 10, 35, 11, 14, 10, 16],
        // },
      ],

      // 表2出单量
      chartstable2: {
        textTitle: "出单量",
        nameArray: "",
        series: [],
      },
      // 表2数据
      chartsData2: [
        // {
        //   // name: "出单量",
        //   type: "bar",
        //   barWidth: 25,
        //   data: [90, 80, 62, 74, 94, 70, 55, 63, 71, 86, 54, 79],
        // },
      ],

      yeared: "",
      monthed: "",

      pingtai: false,
      baoxingpint: false,
      // loading
      isdone: false,
    };
  },
  created() {},
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userinfor"));
    if (
      userInfo.roleID == 1001 ||
      userInfo.roleID == 1002 ||
      userInfo.roleID == 1003 ||
      userInfo.roleID == 1004
    ) {
      this.pingtai = true;
      this.dashboardapi();
    }
    if (userInfo.roleID == 2001 || userInfo.roleID == 2002) {
      this.baoxingpint = true;
      this.theinsurer();
    }

    this.hometimeDate();

    this.chartstable1.series = this.chartsData1;
    this.chartstable2.series = this.chartsData2;
  },
  methods: {
    hometimeDate() {
      let date = new Date();
      console.log("日期", date.getUTCFullYear());
      // console.log('月',date.getMonth()+1);
      this.yeared = date.getUTCFullYear().toString();
    },
    // 看板数据api
    dashboardapi() {
      this.isdone = true;
      Commondashboard().then((res) => {
        this.isdone = false;
        // console.log("看板", res.data.dashboard);
        this.risk_eval_review_count = res.data.dashboard.risk_eval_review_count;
        this.icco_count = res.data.dashboard.icco_count;
        this.lawyer_count = res.data.dashboard.lawyer_count;
        this.preserv_amount_count = res.data.dashboard.preserv_amount_count;
        this.underwriting_amount_count =
          res.data.dashboard.underwriting_amount_count;
        this.amount_count = res.data.dashboard.amount_count;
      });
    },

    theinsurer() {
      this.isdone = true;
      Dashboard().then((res) => {
        this.isdone = false;
        console.log("看板", res);
        // this.risk_eval_review_count = res.data.user_count;
        // this.icco_count = res.data.area_count;
        this.risk_eval_count = res.data.risk_eval_count;
        this.risk_eval_open_count = res.data.risk_eval_open_count;
        this.risk_eval_trade_count = res.data.risk_eval_trade_count;
        console.log("22", res.data.risk_eval_submit_data_range);
        this.chartstable1.nameArray = res.data.risk_eval_submit_data_range.dates;
        let success_vals = {
          name: "通过量",
          type: "bar",
          barWidth: 25,
          stack: "Ad",
          data: res.data.risk_eval_submit_data_range.success_vals,
        };
        let reject_vals = {
          name: "拒绝量",
          type: "bar",
          barWidth: 25,
          stack: "Ad",
          data: res.data.risk_eval_submit_data_range.reject_vals,
        };
        this.chartsData1.push(success_vals);
        this.chartsData1.push(reject_vals);

        this.chartstable2.nameArray = res.data.risk_eval_trade_data_range.dates;
        let counts = {
            name: "出单",
            type: "line",
            data: res.data.risk_eval_trade_data_range.counts,
        }
        
        this.chartsData2.push(counts);

      });
    },
  },
};
</script>

<style lang="less">
.pin {
  color: #007aff;
}
.hezuo {
  color: #34c758;
}
.lvshi {
  color: #5756d7;
}
.baoe {
  color: #ff3a30;
}
.zonge {
  color: #ff9502;
}
.chudan {
  color: #34c758;
}
.elrow {
  margin: 0 0 20px 0;
}
.headedata {
  // border: 1px solid red;
  .headerboke {
    // width: 100%;
    height: 43px;
    background-color: #d1e2f8;
    margin-bottom: 29px;
    .hesde_data {
      color: #000;
      font-size: 17px;
      font-weight: 600;
      line-height: 43px;
      padding-left: 20px;
    }
  }
}
.databoard {
  display: flex;
  // width: 300px;
  height: 100px;
  // background-color: #f2f2f7;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  .datatext {
    flex: 1;
    .txt {
      min-width: 108px;
      height: 27px;
      color: #606266;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .number {
      max-width: 200px;
      height: 29px;
      font-size: 20px;
      font-weight: 600;
      margin-top: 15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  img {
    width: 50px;
    height: 50px;
  }
}
.homecharts {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-end;
  .homesearch {
    display: flex;
    align-items: center;
    margin: 0 0 20px 30px;
    .homesearch_sapn {
      width: 50px;
      height: 30px;
      font-size: 18px;
      line-height: 30px;
    }
    .homesearch_init {
      .el-input__inner {
        // width: inherit !important;
        padding: 0 30px;
        width: 120px !important;
        height: 34px !important;
      }
      .el-input__prefix,
      .el-input__suffix {
        top: -3px;
      }
    }
  }
}
</style>