<template>
  <section>
    <div class="InsuranceCompany">
      <div class="insuranceTop">
        <div class="otherScreen">
          <div class="timeSelect onlyClass">
            <span class="name">日期：</span>
            <div class="selectContent">
              <el-date-picker
                v-model="timeVal"
                format="yyyy 年 MM 月"
                value-format="yyyy-MM-dd HH:hh:mm"
                type="month"
                placeholder="选择月"
              >
              </el-date-picker>
              <!-- <el-date-picker v-model="timeVal" type="daterange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker> -->
              <!-- <el-date-picker v-model="timeVal" type="monthrange" range-separator="至"
                                format="yyyy 年 MM 月" start-placeholder="开始日期" end-placeholder="结束日期"
                                @change="selectDate">
                            </el-date-picker> -->
            </div>
          </div>
          <!-- <div class="companySelect onlyClass">
                        <span class="name">保险公司：</span>
                        <div class="selectContent">
                            <el-select v-model="fieldVal" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item,index) in insuranceDta" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div> -->
          <div class="companySelect onlyClass">
            <span class="name">业务员：</span>
            <!-- <div class="selectContent">
                            <el-select v-model="salesmanVal" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item,index) in salesmanDta" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div> -->
            <div class="selectContent">
              <el-input
                placeholder="请输入业务员名字"
                v-model="salesmanVal"
                clearable
              >
              </el-input>
            </div>
          </div>
          <!-- 筛选按钮 -->
          <div class="screenBtn">
            <el-button type="info" icon="el-icon-refresh" @click="refresh"
              >重置</el-button
            >
            <el-button type="primary" icon="el-icon-search" @click="searchClick"
              >搜索
            </el-button>
            <!-- <el-button type="primary" icon="el-icon-document" @click="getexport">导出
                    </el-button> -->
          </div>
        </div>
      </div>
      <div class="insuranceBottom">
        <div class="bottomTable statisticsBottom" style="position: relative">
          <el-table
            ref="filterTable"
            show-summary
            :summary-method="getSummaries"
            :data="tableData"
            style="width: 100%"
            stripe
            highlight-current-row
            @selection-change="handleSelectionChange"
            :header-cell-style="{
              background: '#F7F7F7',
              color: '#2F2E2E',
              'font-size': '14px',
            }"
          >
            <el-table-column
              type="selection"
              width="60"
              align="center"
              fixed="left"
            >
            </el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="40"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="80"
              align="center"
              show-overflow-tooltip
              class-name="grayColor"
            >
            </el-table-column>
            <!-- <el-table-column prop="application_time" label="日期" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column> -->
            <el-table-column
              prop="submit"
              label="提交量"
              width="80"
              align="center"
              show-overflow-tooltip
              class-name="grayColor"
            >
            </el-table-column>
            <el-table-column
              prop="pass"
              label="通过量"
              width="80"
              align="center"
              show-overflow-tooltip
              class-name="grayColor"
            >
            </el-table-column>
            <el-table-column
              prop="reject"
              label="拒绝量"
              width="80"
              align="center"
              show-overflow-tooltip
              class-name="grayColor"
            >
            </el-table-column>
            <el-table-column
              prop="trade"
              label="出单量"
              width="80"
              align="center"
              show-overflow-tooltip
              class-name="grayColor"
            >
            </el-table-column>
            <el-table-column
              prop="preserv_amount"
              label="出单保险金额"
              width="140"
              align="center"
              show-overflow-tooltip
              class-name="grayColor"
            >
                <template slot-scope="scope">
                    <span>{{scope.row.preserv_amount | currency}}</span>
                </template>
            </el-table-column>
            <el-table-column
              prop="amount"
              label="出单保费金额"
              width="140"
              align="center"
              show-overflow-tooltip
              class-name="grayColor"
            >
                <template slot-scope="scope">
                    <span>{{scope.row.amount | currency}}</span>
                </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pageDiv">
          <el-pagination
            background
            layout="total,sizes,prev, pager, next"
            :total="total"
            :page-size="10"
            :page-sizes="[10, 20, 30, 40, 50]"
            @current-change="current_change"
            @size-change="SizeChange"
          >
          </el-pagination>
        </div>
        <Spin fix v-show="isdone">
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
    </div>
  </section>
</template>
<script>
import { Getstatics } from "../../api/api.js";
import {toThousandFilterZero} from '../../../static/js/formatAmount'
export default {
  data() {
    return {
      isdone: false,
      timeVal: "",
      fieldVal: "",
      salesmanVal: "",
      salesmanDta: "",
      tableData: [],
      insuranceDta: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  },
  mounted() {
    let getDate = new Date();
    this.timeVal = getDate;
    this.getStatistics(getDate, this.salesmanVal, this.page, this.limit);
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        } else if (index === 1) {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
                
              return prev + curr;
             
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });
      
    sums.splice(7,8,toThousandFilterZero(sums[7]),toThousandFilterZero(sums[8]))

      return sums;
    },
    getStatistics(month, name, page, limit) {
      this.isdone = true;
      let data = {
        month: month,
        name: name,
        page: page,
        limit: limit,
      };
      Getstatics(data).then((res) => {
        if (res.code == 200) {
          this.isdone = false;
          this.tableData = res.data.list;
          this.total = res.data.total;
          console.log(res);
        }
      });
    },
    SizeChange(currentSize) {
      this.limit = currentSize;
      this.getStatistics(
        this.timeVal,
        this.salesmanVal,
        this.page,
        currentSize
      );
    },
    current_change(currentPage) {
      this.page = currentPage;
      this.getStatistics(
        this.timeVal,
        this.salesmanVal,
        currentPage,
        this.limit
      );
    },
    refresh() {
      this.page = 1;
      this.limit = 10;
      let getDate = new Date();
      this.timeVal = getDate;
      this.salesmanVal = "";
    },
    searchClick() {
      this.getStatistics(this.timeVal, this.salesmanVal, this.page, this.limit);
    },
    handleSelectionChange() {},
  },
};
</script>
<style scoped>
.screenBtn {
  margin-left: 30px;
}

.screenBtn button {
  padding: 0;
  font-size: 13px;
  width: 66px;
  height: 30px;
}

.screenBtn button + button {
  margin-left: 20px;
}

.radioStatu {
  display: flex;
  align-items: center;
  margin-left: 30px;
}

.otherScreen {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
  width: 100%;
}

.onlyClass {
  display: flex;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 20px;
}

.onlyClass span {
  width: 90px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
}

.insuranceBottom {
  position: relative;
  padding: 20px 0;
}

.bottomBtn {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 30px;
}

.bottomBtn button {
  padding: 0;
  border: none;
  outline: none;
  width: 100px;
  height: 30px;
  border-radius: 4px;
  color: #fff;
  margin-right: 20px;
  font-size: 13px;
}

.bottomBtn button span {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottomBtn button + button {
  margin-left: 0;
}

.bottomBtn .deleteBtn {
  width: 66px;
  background-color: #f56c6c;
  margin: 0;
}
</style>