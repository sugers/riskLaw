<template>
    <section>
        <div class="insuranceUser">
            <div class="insuranceTop">
                <div class="otherScreen">
                    <div class="companySelect onlyClass">
                        <span class="name">保险公司：</span>
                        <div class="selectContent">
                            <el-select v-model="fieldVal" slot="prepend" placeholder="请选择" @change="insuranceSelect">
                                <el-option v-for="(item,index) in insuranceDta" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="companySelect onlyClass">
                        <span class="name">省份：</span>
                        <div class="selectContent">
                            <el-select v-model="areaVal" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item, index) in areaData" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="timeSelect onlyClass">
                        <span class="name">月份：</span>
                        <div class="selectContent">
                            <el-date-picker v-model="monthVal" type="month" placeholder="选择月" @change="monthChange">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="timeSelect onlyClass">
                        <span class="name">年份：</span>
                        <div class="selectContent">
                            <el-date-picker v-model="yearVal" type="year" placeholder="选择年" @change="yearChange">
                            </el-date-picker>
                        </div>
                    </div>
                    <!-- 筛选按钮 -->
                    <div class="screenBtn">
                        <el-button type="info" icon="el-icon-refresh" @click="refresh">重置</el-button>
                        <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索
                        </el-button>
                        <!-- <el-button type="primary" icon="el-icon-document" @click="getexport">导出
                    </el-button> -->
                    </div>
                </div>
            </div>
            <div class="insuranceBottom statistic">
                <div class="bottomTable usermanagerFix" style="position: relative">
                    <el-table ref="filterTable" show-summary :summary-method="getSummaries" :data="tableData" stripe
                        highlight-current-row
                        :header-cell-style="{'background':'#F7F7F7','color':'#2F2E2E','font-size':'14px'}"
                        style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="60" align="center">
                        </el-table-column>
                        <el-table-column label="序号" type="index" :index="indexMethod" width="40" align="center"
                            class-name="grayColor">
                        </el-table-column>

                        <el-table-column prop="adName" label="省份" width="80" align="center" show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <!-- <el-table-column prop="application_time" label="日期" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column> -->
                        <el-table-column prop="submit" label="提交量" width="80" align="center" show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="pass" label="通过量" width="80" align="center" show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="reject" label="拒绝量" width="80" align="center" show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="trade" label="出单量" width="80" align="center" show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="preserv_amount" label="出单保险金额" width="140" align="center"
                            show-overflow-tooltip class-name="grayColor">
                            <template slot-scope="scope">
                                <span>{{scope.row.preserv_amount | currency}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="amount" label="出单保费金额" width="140" align="center" show-overflow-tooltip
                            class-name="grayColor">
                            <template slot-scope="scope">
                                <span>{{scope.row.amount | currency}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pageDiv">
                    <el-pagination background layout="total,sizes,prev, pager, next" :total="total" :page-size="30"
                        :page-sizes="[30, 40, 50]" @current-change="current_change" @size-change="SizeChange"
                        :current-page.sync="currentPage">
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
    import {
        GetinsuranceAreaList,
        GetinsuranceList,
        GetOverviewTable,
        GetOverviewTablePlateForm
    } from "../../api/api.js";
    import {
        toThousandFilterZero
    } from '../../../static/js/formatAmount';
    import provinces from "../../../static/js/pca-code.json";
    import {
        getDateString
    } from '../../../static/js/timeFormat'
    export default {
        data() {
            return {
                isdone: false,
                timeVal: "",
                currendRole: '',
                yearVal: '',
                monthVal: '',
                fieldVal: '',
                areaVal: '',
                areaData: [],
                tableData: [],
                insuranceDta: [],
                total: 0,
                page: 1,
                currentPage: 1,
                limit: 30,
            };
        },
        mounted() {
            let getDate = new Date();
            this.isdone = true;
            let userInfo = JSON.parse(localStorage.getItem('userinfor'));
            this.currendRole = userInfo.roleID;
            this.monthVal =
                `${getDate.getFullYear()}-${Number(getDate.getMonth())+1>9?Number(getDate.getMonth())+1:'0'+(Number(getDate.getMonth())+1)}-${Number(getDate.getDay())+1>9?Number(getDate.getDay())+1:'0'+(Number(getDate.getDay())+1)}`
            this.GetInsurance();

        },
        methods: {
            indexMethod(index) {
                return index + 1 + (this.page - 1) * this.limit
            },
            yearChange() {
                this.monthVal = '';
            },
            monthChange() {
                let getDate = new Date();
                let day = getDate.getDay();
                let hours = getDate.getHours();
                let minutes = getDate.getMinutes();
                let seconds = getDate.getSeconds();
                let monthValYear = new Date(this.monthVal).getFullYear();
                let monthValMonth = new Date(this.monthVal).getMonth();
                let monthVal =
                    `${monthValYear}-${Number(monthValMonth)+1>9?Number(monthValMonth)+1:'0'+(Number(monthValMonth)+1)}-${Number(day)+1>9?Number(day)+1:'0'+(Number(day)+1)}`
                let timeval =
                    `${monthVal} ${hours>9?hours:'0'+hours}:${minutes>9?minutes:'0'+minutes}:${seconds>9?seconds:'0'+seconds}`
                this.monthVal = monthVal
                if (this.yearVal) {
                    this.yearVal = timeval;
                }

            },
            GetInsurance() {
                let that = this;
                let data = {
                    status: -1,
                    keyword: '',
                }
                GetinsuranceList(data).then((res) => {
                    if (res.code == 200) {
                        res.data.list.map((item) => {
                            this.insuranceDta.push({
                                'name': item.name,
                                'code': item.ID
                            })
                        })

                        setTimeout(() => {
                            that.fieldVal = that.insuranceDta[0].code;
                            that.fieldValName = that.insuranceDta[0].name;
                            that.insuranceSelect(that.insuranceDta[0].code, 1)
                        }, 200)
                    }

                })
            },
            insuranceSelect(e, num) {
                let that=this;
                this.areaVal = ''
                this.areaData = [];
                let data = {
                    icco_id: e
                }
                this.insuranceDta.map((item) => {
                    if (item.code == e) {
                        this.fieldValName = item.name
                    }
                })
                GetinsuranceAreaList(data).then(res => {
                    if (res.code == 200) {
                        res.data.list.map((childitem) => {
                            provinces.forEach((areaitem) => {
                                if (childitem.adcode == areaitem.code) {
                                    if (this.currendRole == '1001' || this.currendRole ==
                                        '1002') {
                                        this.areaData.push({
                                            name: areaitem.name,
                                            code: childitem.ID
                                        });
                                    } else {
                                        this.areaData.push({
                                            name: areaitem.name,
                                            code: childitem.adcode
                                        });
                                    }


                                }
                            })
                        });
                        setTimeout(() => {
                            if (that.insuranceDta.length == 1) {
                                that.areaVal = that.areaData[0].code;
                                that.areaValName = that.areaData[0].name;
                            }

                            if (num == 1) {
                                that.getListFn();
                            }

                        }, 500)
                    }


                });

            },
            getSummaries(param) {
                const {
                    columns,
                    data
                } = param;
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

                sums.splice(7, 8, toThousandFilterZero(sums[7]), toThousandFilterZero(sums[8]))

                return sums;
            },
            getStatistics(month, year, icco_id, adcode, page, limit) {
                this.isdone = true;
                let data = {
                    month: month,
                    year: year,
                    adcode: adcode,
                    page: page,
                    limit: limit,
                };
                if (this.currendRole == '1001' || this.currendRole == '1002') {
                    let data = {
                        month: month,
                        year: year,
                        icco_id: icco_id,
                        area_id: adcode,
                        page: page,
                        limit: limit,
                    };
                    GetOverviewTablePlateForm(data).then((res) => {
                        if (res.code == 200) {
                            this.isdone = false;
                            res.data.list.map((item) => {
                                item.month = getDateString(item.month)
                                provinces.forEach((provinceItem) => {
                                    if (item.adcode == provinceItem.code) {
                                        item.adName = provinceItem.name
                                    }
                                })
                            })
                            this.tableData = res.data.list;
                            this.total = res.data.total;
                        } else {
                            this.isdone = false;
                        }
                    }).catch(() => {
                        this.isdone = false;
                    });
                    return
                }
                GetOverviewTable(data).then((res) => {
                    if (res.code == 200) {
                        this.isdone = false;
                        res.data.list.map((item) => {
                            item.month = getDateString(item.month)
                            provinces.forEach((provinceItem) => {
                                if (item.adcode == provinceItem.code) {
                                    item.adName = provinceItem.name
                                }
                            })
                        })
                        this.tableData = res.data.list;
                        this.total = res.data.total;
                    } else {
                        this.isdone = false;
                    }
                }).catch(() => {
                    this.isdone = false;
                });
            },
            getListFn() {
                let timeVal = null;
                let getDate = new Date();
                let month = getDate.getMonth();
                let day = getDate.getDay();
                let hours = getDate.getHours();
                let minutes = getDate.getMinutes();
                let seconds = getDate.getSeconds();
                let monthValYear = new Date(this.monthVal).getFullYear();
                let monthValMonth = new Date(this.monthVal).getMonth();
                if (!this.yearVal) {
                    timeVal =
                        `${monthValYear}-${Number(monthValMonth)+1>9?Number(monthValMonth)+1:'0'+(Number(monthValMonth)+1)}-${Number(day)+1>9?Number(day)+1:'0'+(Number(day)+1)} ${hours>9?hours:'0'+hours}:${minutes>9?minutes:'0'+minutes}:${seconds>9?seconds:'0'+seconds}`

                } else if (this.yearVal && this.monthVal) {
                    this.yearVal = monthValYear;
                    timeVal =
                        `${monthValYear}-${Number(monthValMonth)+1>9?Number(monthValMonth)+1:'0'+(Number(monthValMonth)+1)}-${Number(day)+1>9?Number(day)+1:'0'+(Number(day)+1)} ${hours>9?hours:'0'+hours}:${minutes>9?minutes:'0'+minutes}:${seconds>9?seconds:'0'+seconds}`
                    this.yearVal = timeVal
                } else if (this.yearVal && !this.monthVal) {
                    this.yearVal = new Date(this.yearVal).getFullYear()
                    this.monthVal = ''
                    timeVal
                        =
                        `${this.yearVal}-${Number(month)+1>9?Number(month)+1:'0'+(Number(month)+1)}-${Number(day)+1>9?Number(day)+1:'0'+(Number(day)+1)} ${hours>9?hours:'0'+hours}:${minutes>9?minutes:'0'+minutes}:${seconds>9?seconds:'0'+seconds}`
                    this.yearVal = timeVal
                }
                if (this.yearVal) {
                    this.getStatistics('', this.yearVal, this.fieldVal, this.areaVal, this.page, this.limit)
                } else {
                    this.getStatistics(timeVal, '', this.fieldVal, this.areaVal, this.page, this.limit)
                }

            },
            SizeChange(currentSize) {
                this.limit = currentSize;
                this.getListFn()
            },
            current_change(currentPage) {
                this.page = currentPage;
                this.getListFn()
            },
            refresh() {
                this.page = 1;
                this.limit = 30;
                let getDate = new Date();
                this.timeVal = getDate;
                this.areaVal = '';
            },
            searchClick() {
                this.page = 1;
                this.currentPage = 1;
                this.getListFn()
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

    .screenBtn button+button {
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
        justify-content: flex-start;
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
        width: 66px;
        height: 30px;
        border-radius: 4px;
        background-color: #409EFF;
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

    .bottomBtn button+button {
        background-color: #F56C6C;
        margin: 0;
    }
</style>