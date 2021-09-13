<template>
  <div>
    <div class="headedata">
      <div class="headerboke">
        <div class="hesde_data">数据看板</div>
      </div>
    </div>

    <el-row :gutter="12" class="elrow">
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{padding:'10px'}">
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
        <el-card shadow="hover" :body-style="{padding:'10px'}">
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
        <el-card shadow="hover" :body-style="{padding:'10px'}">
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
        <el-card shadow="hover" :body-style="{padding:'10px'}">
          <div class="databoard">
            <div class="datatext">
              <div class="txt">累积处理保额</div>
              <div class="number baoe">
                ￥{{ preserv_amount_count }}
              </div>
            </div>
            <img src="../../static/img/baoe.png" alt="图标" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{padding:'10px'}">
          <div class="databoard">
            <div class="datatext">
              <div class="txt">累积承保总额</div>
              <div class="number zonge">￥{{ underwriting_amount_count }}</div>
            </div>
            <img src="../../static/img/zonge.png" alt="图标" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover" :body-style="{padding:'10px'}">
          <div class="databoard">
            <div class="datatext">
              <div class="txt">累积出单保费总额</div>
              <div class="number chudan">￥{{ amount_count }}</div>
            </div>
            <img src="../../static/img/chudan.png" alt="图标" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Commondashboard } from "../api/api";
export default {
  name: "soutable",
  data() {
    return {
      risk_eval_review_count: "",
      icco_count: "",
      lawyer_count: "",
      preserv_amount_count: "",
      underwriting_amount_count: "",
      amount_count: "",
    };
  },
  created() {
    this.dashboardapi();
  },
  methods: {
    // 看板数据api
    // risk_eval_review_count	number	累积评估总量
    // icco_count	number	已合作保险公司数量
    // lawyer_count	number	入驻律师数量
    // preserv_amount_count	number	累积处理保额
    // underwriting_amount_count	number	累积承保总额
    // amount_count	number	累积出单保额
    dashboardapi() {
      Commondashboard().then((res) => {
        console.log("看板", res.data.dashboard);
        this.risk_eval_review_count = res.data.dashboard.risk_eval_review_count;
        this.icco_count = res.data.dashboard.icco_count;
        this.lawyer_count = res.data.dashboard.lawyer_count;
        this.preserv_amount_count = res.data.dashboard.preserv_amount_count;
        this.underwriting_amount_count =
          res.data.dashboard.underwriting_amount_count;
        this.amount_count = res.data.dashboard.amount_count;
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
.elrow{
  margin: 0 0 20px 0;
}
.headedata {
  // border: 1px solid red;
  .headerboke {
    width: 100%;
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
  justify-content: space-evenly;
  .datatext {
    .txt {
      min-width: 108px;
      height: 27px;
      color: #606266;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    .number {
      min-width: 156px;
      height: 29px;
      font-size: 20px;
      font-weight: 600;
      margin-top: 15px;
    }
  }
  img {
    width: 50px;
    height: 50px;
  }
}
</style>