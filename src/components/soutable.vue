<template>
  <div>
    <div v-if="pingtai" class="soutableDiv">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">合作保司分公司总数</div>
                <div class="number pin">{{ icco_count }}</div>
              </div>
              <img src="../../static/img/pin.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">入驻业务人员总数</div>
                <div class="number hezuo">{{ salesmen_count }}</div>
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

      <el-row :gutter="12" class="elrow">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">本月提交评估量</div>
                <div class="number pin">{{ total_count }}</div>
              </div>
              <img src="../../static/img/pin.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">本月评估通过量</div>
                <div class="number hezuo">{{ success_count }}</div>
              </div>
              <img src="../../static/img/hezuo.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">本月出单量</div>
                <div class="number lvshi">{{ trade_count }}</div>
              </div>
              <img src="../../static/img/lvshi.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="12" class="elrow">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">本月提交总金额</div>
                <div class="number baoe">
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
                <div class="txt">本月通过总金额</div>
                <div class="number zonge">
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
                <div class="txt">本月出单总金额</div>
                <div class="number chudan">￥{{ amount_count | currency }}</div>
              </div>
              <img src="../../static/img/chudan.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div style="margin-top: 12px; display: flex">
        <div style="flex: 1; width: 78%;margin-right:12px;">
          <div>
            <el-card shadow="hover" :body-style="{ padding: '10px' }">
              <EchartsTable :id="'submit'" :data="submitdatarange" />
            </el-card>
          </div>
          <div style="margin-top: 12px">
            <el-card shadow="hover" :body-style="{ padding: '10px' }">
              <div id="echars4" style="width: 100%; height: 400px"></div>
            </el-card>
          </div>
        </div>

        <div class="admincare" style="width: 20%">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div>
              <div class="paiming">
                <span>本月法务人员排行榜</span>
              </div>
              <div
                class="progress"
                v-for="(item, index) in backendusertop"
                :key="index"
              >
                <span
                  :class="
                    index + 1 == 1
                      ? 'nunberred'
                      : index + 1 == 2
                      ? 'nunberorgin'
                      : index + 1 == 3
                      ? 'nunbergerrn'
                      : 'nunber'
                  "
                  >{{ index + 1 }}</span
                >
                <span class="sumname">{{ item.name }}</span>
                <div class="gress">
                  <el-progress
                    :percentage="item.totalpercent"
                    :show-text="false"
                  ></el-progress>
                </div>
                <span class="snum">{{ item.total }}</span>
              </div>
            </div>
          </el-card>
          <el-card
            style="margin-top: 12px"
            shadow="hover"
            :body-style="{ padding: '10px' }"
          >
            <div>
              <div class="paiming">
                <span>本年法务人员排行榜</span>
              </div>
              <div
                class="progress"
                v-for="(item, index) in backendtopyear"
                :key="index"
              >
                <span
                  :class="
                    index + 1 == 1
                      ? 'nunberred'
                      : index + 1 == 2
                      ? 'nunberorgin'
                      : index + 1 == 3
                      ? 'nunbergerrn'
                      : 'nunber'
                  "
                  >{{ index + 1 }}</span
                >
                <span class="sumname">{{ item.name }}</span>
                <div class="gress">
                  <el-progress
                    :percentage="item.totalpercent"
                    :show-text="false"
                  ></el-progress>
                </div>
                <span class="snum">{{ item.total }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div v-if="baoxingpint">
      <el-row :gutter="12" class="elrow">
        <el-col :span="8">
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
              <img src="../../static/img/hezuo.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" class="elrow">
        <el-col :span="8">
          <el-card shadow="hover" :body-style="{ padding: '10px' }">
            <div class="databoard">
              <div class="datatext">
                <div class="txt">本月提交总金额</div>
                <div class="number baoe">
                  ￥{{ risk_preserv_amount_count | currency }}
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
                <div class="txt">本月通过总金额</div>
                <div class="number zonge">
                  ￥{{ risk_underwriting_amount_count | currency }}
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
                <div class="txt">本月出单总金额</div>
                <div class="number chudan">￥{{ risk_amount_count | currency }}</div>
              </div>
              <img src="../../static/img/chudan.png" alt="图标" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="headdata" v-if="baoxingpint">
      <div style="flex: 1; width: 78%; margin-right:12px;">
        <div>
          <div>
            <el-card shadow="hover" :body-style="{ padding: '10px' }">
              <EchartsTable :id="'echars1'" :data="chartstable1" />
            </el-card>
          </div>
          <div style="margin-top: 12px">
            <el-card shadow="hover" :body-style="{ padding: '10px' }">
              <div id="echars5" style="width: 100%; height: 400px"></div>
            </el-card>
          </div>
        </div>
      </div>
      <div class="care" style="width: 20%">
        <el-card shadow="hover" :body-style="{ padding: '10px' }">
          <div>
            <div class="paiming">
              <span>本月业务人员业绩排名</span>
            </div>
            <div class="progress" v-for="(item, index) in usert" :key="index">
              <span
                :class="
                  index + 1 == 1
                    ? 'nunberred'
                    : index + 1 == 2
                    ? 'nunberorgin'
                    : index + 1 == 3
                    ? 'nunbergerrn'
                    : 'nunber'
                "
                >{{ index + 1 }}</span
              >
              <span class="sumname">{{ item.name }}</span>
              <div class="gress">
                <el-progress
                  :percentage="item.totalpercent"
                  :show-text="false"
                ></el-progress>
              </div>
              <span class="snum">{{ item.total }}</span>
            </div>
          </div>
        </el-card>
        <el-card style="margin-top: 12px" shadow="hover" :body-style="{ padding: '10px' }">
          <div>
            <div class="paiming">
              <span>本年业务人员业绩排名</span>
            </div>
            <div class="progress" v-for="(item, index) in mayusert" :key="index">
              <span
                :class="
                  index + 1 == 1
                    ? 'nunberred'
                    : index + 1 == 2
                    ? 'nunberorgin'
                    : index + 1 == 3
                    ? 'nunbergerrn'
                    : 'nunber'
                "
                >{{ index + 1 }}</span
              >
              <span class="sumname">{{ item.name }}</span>
              <div class="gress">
                <el-progress
                  :percentage="item.totalpercent"
                  :show-text="false"
                ></el-progress>
              </div>
              <span class="snum">{{ item.total }}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <Spin fix v-show="isdone">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
import {toThousandFilterZero} from '../../static/js/formatAmount';
import { Commondashboard, Dashboard } from "../api/api";
import EchartsTable from "./EChartsTable.vue";

export default {
  name: "soutable",
  components: {
    EchartsTable,
  },
  data() {
    return {
      salesmen_count: "",
      icco_count: "",
      lawyer_count: "",
      preserv_amount_count: "",
      underwriting_amount_count: "",
      amount_count: "",
      total_count: "",
      success_count: "",
      trade_count: "",

      risk_eval_count: "",
      risk_eval_open_count: "",
      risk_eval_trade_count: "",
      risk_preserv_amount_count: "",
      risk_underwriting_amount_count: "",
      risk_amount_count: "",

      // 平台数据表
      echars4: null,
      submitdatarange: {
        textTitle: "提交量",
        nameArray: "",
        colors: ["#409EFF", "#F4AA43"],
        legends: "",
        yaxis: "",
        series: [],
      },
      submitdata: [],

      // 表1提交量
      chartstable1: {
        textTitle: "提交量",
        nameArray: "",
        colors: ["#409EFF", "#F4AA43"],
        legends: "",
        yaxis: "",
        series: [],
      },
      // 表1数据
      chartsData1: [],

      // 表2出单量
      echars5: null,
      chartstable2: {
        textTitle: "出单量",
        nameArray: "",
        colors: ["#409EFF"],
        legends: "",
        yaxis: "",
        series: [],
      },
      // 表2数据
      chartsData2: [],

      yeared: "",
      monthed: "",

      pingtai: false,
      baoxingpint: false,
      // loading
      isdone: false,
      // 排名
      backendusertop: "",
      backendtopyear: "",
      usert: "",
      mayusert: "",
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
    // 平台
    this.submitdatarange.series = this.submitdata;
    // 保司
    this.chartstable1.series = this.chartsData1;
    this.chartstable2.series = this.chartsData2;
  },
  methods: {
    // 看板数据api
    dashboardapi() {
      this.isdone = true;
      let sum = [];
      Commondashboard().then((res) => {
        this.isdone = false;
        // console.log("看板", res.data.dashboard);
        this.salesmen_count = res.data.dashboard.salesmen_count;
        this.icco_count = res.data.dashboard.icco_count;
        this.lawyer_count = res.data.dashboard.lawyer_count;
        this.preserv_amount_count = parseInt(res.data.dashboard.preserv_amount_count);
        this.underwriting_amount_count =
          parseInt(res.data.dashboard.underwriting_amount_count);
        this.amount_count = parseInt(res.data.dashboard.amount_count);
        this.total_count = res.data.dashboard.total_count;
        this.success_count = res.data.dashboard.success_count;
        this.trade_count = res.data.dashboard.trade_count;
        // 提交量图
        this.submitdatarange.nameArray =
          res.data.dashboard.submit_data_range.dates;
        this.submitdatarange.legends = ["通过量", "拒绝量"];
        let reject = res.data.dashboard.submit_data_range.reject_vals;
        let success = res.data.dashboard.submit_data_range.success_vals;
        reject.map((item, index) => {
          sum.push(Number(item) + Number(success[index]));
        });
        this.submitdatarange.yaxis = Math.max(...sum) * 2;
        let successvals = {
          name: "通过量",
          type: "bar",
          stack: "Ads",
          data: res.data.dashboard.submit_data_range.success_vals,
          label: {
            normal: {
              show: false,
              position: "top",
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return "";
                }
              },
            },
          },
        };
        let rejectvals = {
          name: "拒绝量",
          type: "bar",
          stack: "Ads",
          data: res.data.dashboard.submit_data_range.reject_vals,
          label: {
            normal: {
              show: false,
              position: "top",
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return "";
                }
              },
            },
          },
        };
        let sume = {
          name: "总数",
          type: "bar",
          barGap: "-100%",
          itemStyle: {
            normal: {
              borderColor: "transparent",
              color: "transparent",
            },
          },
          data: sum,
          label: {
            normal: {
              show: true, //显示数值
              position: "top", // 位置设为top
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return "";
                }
              },
              textStyle: {
                color: "#000",
              }, //设置数值颜色
            },
          },
        };
        this.submitdata.push(sume);
        this.submitdata.push(successvals);
        this.submitdata.push(rejectvals);
        let amounts = res.data.dashboard.trade_data_range.amounts.map((i)=>{
          return parseInt(i)
        });
        // 出单量图
        this.echars4 = this.$echarts.init(document.getElementById("echars4"));
        let currentMaxVal =
          Math.max(...res.data.dashboard.trade_data_range.counts) * 2;
        this.echars4.setOption({
          title: {
            text: "出单量",
          },
          tooltip: {
            trigger: "axis",
          },
          color: ["#F4AA43", "#409EFF"],
          legend: {
            data: ["出单量", "出单保费金额"],
            right: 30,
          },
          xAxis: {
            type: "category",
            data: res.data.dashboard.trade_data_range.dates,
          },
          yAxis: [
            {
              type: "value",
              name: "出单量",
              min: 0,
              max: currentMaxVal ? currentMaxVal : 10,
              minInterval: "1",
              splitLine: {
                //网格线
                show: true,
              },
            },
            {
              type: "value",
              name: "出单保费金额",
              min: 0,
              max: Math.max(...res.data.dashboard.trade_data_range.amounts)
                ? Math.max(...res.data.dashboard.trade_data_range.amounts) + 1000
                : 1000,
              splitLine: {
                //网格线
                show: false,
              },
            },
          ],
          series: [
            {
              name: "出单量",
              type: "line",
              data: res.data.dashboard.trade_data_range.counts,
            },
            {
              name: "出单保费金额",
              type: "bar",
              yAxisIndex: 1,
              data: amounts,
              label: {
                normal: {
                  show: true, //显示数值
                  position: "top", // 位置设为top
                  formatter: function (params) {
                    if (params.value > 0) {
                      return toThousandFilterZero(params.value);
                    } else {
                      return "";
                    }
                  },
                  textStyle: {
                    color: "#000",
                  }, //设置数值颜色
                },
              },
            },
          ],
        });
        // 本月法务
        this.backendusertop = res.data.dashboard.backend_user_top_10_month;
        let adminpainum = this.backendusertop[0].total;
        this.backendusertop.map((item) => {
          item.totalpercent = (item.total / (adminpainum + 20)) * 100;
        });
        // 本年法务
        this.backendtopyear = res.data.dashboard.backend_user_top_10_year;
        let admintopyear = this.backendtopyear[0].total;
        this.backendtopyear.map((item) => {
          item.totalpercent = (item.total / (admintopyear + 20)) * 100;
        });

      });
    },
    theinsurer() {
      let sumNum = [];
      this.isdone = true;
      Dashboard().then((res) => {
        console.log('rr',res);
        this.isdone = false;
        this.risk_eval_count = res.data.risk_eval_count;
        this.risk_eval_open_count = res.data.risk_eval_open_count;
        this.risk_eval_trade_count = res.data.risk_eval_trade_count;
        this.risk_preserv_amount_count = parseInt(res.data.preserv_amount_count);
        this.risk_underwriting_amount_count = parseInt(res.data.underwriting_amount_count);
        this.risk_amount_count = parseInt(res.data.amount_count);

        this.chartstable1.nameArray =
          res.data.risk_eval_submit_data_range.dates;
        this.chartstable1.legends = ["通过量", "拒绝量"];

        let reject = res.data.risk_eval_submit_data_range.reject_vals;
        let success = res.data.risk_eval_submit_data_range.success_vals;
        reject.map((item, index) => {
          sumNum.push(Number(item) + Number(success[index]));
        });
        this.chartstable1.yaxis = Math.max(...sumNum) * 2;
        let success_vals = {
          name: "通过量",
          type: "bar",
          // barWidth: 20,
          stack: "Ad",
          data: res.data.risk_eval_submit_data_range.success_vals,
          label: {
            normal: {
              show: false,
              position: "top",
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return "";
                }
              },
            },
          },
        };
        let sun = {
          name: "总数",
          type: "bar",
          barGap: "-100%",
          itemStyle: {
            normal: {
              borderColor: "transparent",
              color: "transparent",
            },
          },
          data: sumNum,
          label: {
            normal: {
              show: true, //显示数值
              position: "top", // 位置设为top
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return "";
                }
              },
              textStyle: {
                color: "#000",
              }, //设置数值颜色
            },
          },
        };
        let reject_vals = {
          name: "拒绝量",
          type: "bar",
          // barWidth: 20,
          stack: "Ad",
          data: res.data.risk_eval_submit_data_range.reject_vals,
          label: {
            normal: {
              show: false,
              position: "top",
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return "";
                }
              },
            },
          },
        };
        this.chartsData1.push(sun);
        this.chartsData1.push(success_vals);
        this.chartsData1.push(reject_vals);

        let amountss = res.data.risk_eval_trade_data_range.amounts.map((i)=>{
          return parseInt(i);
        })
        this.echars5 = this.$echarts.init(document.getElementById("echars5"));
        let currentMaxVal =
          Math.max(...res.data.risk_eval_trade_data_range.counts) * 2;
        this.echars5.setOption({
          title: {
            text: "出单量",
          },
          tooltip: {
            trigger: "axis",
          },
          color: ["#F4AA43", "#409EFF"],
          legend: {
            data: ["出单量", "出单保费金额"],
            right: 30,
          },
          xAxis: {
            type: "category",
            data: res.data.risk_eval_trade_data_range.dates,
          },
          yAxis: [
            {
              type: "value",
              name: "出单量",
              min: 0,
              max: currentMaxVal ? currentMaxVal : 10,
              minInterval: "1",
              splitLine: {
                //网格线
                show: true,
              },
            },
            {
              type: "value",
              name: "出单保费金额",
              min: 0,
              max: Math.max(...res.data.risk_eval_trade_data_range.amounts)
                ? Math.max(...res.data.risk_eval_trade_data_range.amounts) + 1000
                : 1000,
              splitLine: {
                //网格线
                show: false,
              },
            },
          ],
          series: [
            {
              name: "出单量",
              type: "line",
              data: res.data.risk_eval_trade_data_range.counts,
            },
            {
              name: "出单保费金额",
              type: "bar",
              yAxisIndex: 1,
              data: amountss,
              label: {
                normal: {
                  show: true, //显示数值
                  position: "top", // 位置设为top
                  formatter: function (params) {
                    if (params.value > 0) {
                      return toThousandFilterZero(params.value);
                    } else {
                      return "";
                    }
                  },
                  textStyle: {
                    color: "#000",
                  }, //设置数值颜色
                },
              },
            },
          ],
        });

        // 排名
        this.usert = res.data.mini_app_user_top10;
        // console.log('pai',this.usert);
        let painum = this.usert[0].total;
        this.usert.map((item) => {
          item.totalpercent = (item.total / (painum + 20)) * 100;
        });

        this.mayusert = res.data.mini_app_user_top10_year;
        let postds = this.mayusert[0].total;
        this.mayusert.map((item)=>{
          item.totalpercent = (item.total / (postds + 20)) * 100;
        })
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
  color: #F56C6C;
}
.baoe {
  color: #007aff;
}
.zonge {
  color: #34c758;
}
.chudan {
  color: #F56C6C;
}
.elrow {
  margin: 12px 0 0 0;
}
.headdata {
  display: flex;
  margin-top: 12px;
}
.care {
  margin-left: 12px;
}
.admincare {
  // width: 10%;
  // margin-left: 12px;
}
// 排名
.paiming {
  font-size: 14px;
  font-weight: 600;
  height: 30px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c7c7cc;
  padding-bottom: 10px;
}
.progress {
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #c7c7cc;
  .nunber {
    display: flex;
    background-color: #909399;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    font-size: 12px;
    padding: 9px;
    // border: 1px solid #ff3a30;
    border-radius: 10px;
    line-height: 20px;
    color: #fff;
  }
  .nunberred {
    display: flex;
    background-color: #f56c6c;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    font-size: 12px;
    padding: 9px;
    border-radius: 10px;
    line-height: 20px;
    color: #fff;
  }
  .nunberorgin {
    display: flex;
    background-color: #409eff;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    font-size: 12px;
    padding: 9px;
    border-radius: 10px;
    line-height: 20px;
    color: #fff;
  }
  .nunbergerrn {
    display: flex;
    background-color: #e6a23c;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    font-size: 12px;
    padding: 9px;
    border-radius: 10px;
    line-height: 20px;
    color: #fff;
  }
  .sumname {
    width: 71px;
    font-size: 12px;
    color: #101010;
    margin: 0 0 0 15px;
  }
  .gress {
    width: 100px;
    margin-right: 10px;
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