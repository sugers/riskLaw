<template>
    <section>
        <div class="InsuranceCompany">
            <div class="insuranceTop">
                <div class="otherScreen">
                    <div class="timeSelect onlyClass">
                        <span class="name">日期：</span>
                        <div class="selectContent">
                            <el-date-picker v-model="timeVal" format="yyyy 年 MM 月" value-format="yyyy-MM-dd HH:hh:mm"
                                type="month" placeholder="选择月">
                            </el-date-picker>
                            <!-- <el-date-picker v-model="timeVal" type="monthrange" range-separator="至"
                                format="yyyy 年 MM 月" start-placeholder="开始日期" end-placeholder="结束日期"
                                @change="selectDate">
                            </el-date-picker> -->
                        </div>
                    </div>
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
                        <span class="name">开通区域：</span>
                        <div class="selectContent">
                            <el-select v-model="areaVal" slot="prepend" placeholder="请选择" @change="areaSelect">
                                <el-option v-for="(item,index) in areaData" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <!-- 筛选按钮 -->
                <div class="screenBtn">
                    <el-button type="info" icon="el-icon-refresh" @click="refresh">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
                    <el-button type="primary" icon="el-icon-document" @click="getexport">导出
                    </el-button>
                </div>
            </div>
            <div class="insuranceBottom">
                <div class="bottomTable" style="position:relative;">
                    <el-table ref="filterTable" :data="tableData" style="width: 100%" stripe highlight-current-row
                        @selection-change="handleSelectionChange"
                        :header-cell-style="{'background':'#F7F7F7','color':'#2F2E2E','font-size':'14px'}">
                        <el-table-column type="selection" width="60" align="center" fixed="left">
                        </el-table-column>
                        <el-table-column label="序号" type="index" width="60" align="center">
                        </el-table-column>
                        <el-table-column prop="number" label="编号" width="140" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="application_time" label="申请日期" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <!-- <el-table-column prop="icco_name" label="保险公司" width="200" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="addName" label="省份" width="100" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column> -->
                        <el-table-column prop="salesman" label="业务员" width="120" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="preserv_appl" label="保全申请人" width="120" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="preserv_resp" label="保全被申请人" width="120" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="review_result" label="评审结果" width="100" align='center'
                            show-overflow-tooltip class-name="grayColor">
                            <template slot-scope="scope">
                                <div>
                                    <span v-if="scope.row.review_result==0">审核中</span>
                                    <span v-else-if="scope.row.review_result==1">通过</span>
                                    <span v-else>拒绝</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="preserv_amount" label="保险金额" width="100" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="trade" label="是否出单" width="100" align='center' show-overflow-tooltip
                            class-name="grayColor">
                            <template slot-scope="scope">
                                <div>
                                    <span v-if="scope.row.trade==1">是</span>
                                    <span v-else>否</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="amount" label="保费金额" width="100" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <!-- <el-table-column prop="statement" label="事实简要陈述" width="200" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="remark" label="法律意见" width="200" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column> -->

                    </el-table>
                </div>
                <div class="pageDiv">
                    <el-pagination background layout="total,sizes,prev, pager, next" :total="total" :page-size="10"
                        :page-sizes="[10, 20, 30, 40,50]" @current-change="current_change" @size-change="SizeChange">
                    </el-pagination>
                </div>
                <Spin fix v-show="isdone">
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
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
        Reconcilia,
        Exportreconcilia
    } from '../../api/api.js';
    import provinces from "../../../static/js/pca-code.json";
    import {
        getDateString
    } from '../../../static/js/timeFormat'
    export default {
        data() {
            return {
                currendRole: '',
                statuVal: '',
                keyInput: '',
                areaVal: '',
                areaValName: '',
                fieldVal: '',
                fieldValName: '',
                timeVal: '',
                isdone: false,
                isshowindex: false,
                isexpand: false,
                isstripe: true,
                editModel: false,
                examineModel: false,
                tableData: [],
                insuranceDta: [],
                areaData: [],
                total: 0,
                page: 1,
                limit: 10
            }
        },
        mounted() {
            this.timeVal = ''
            // 获取角色权限
            let userInfo = JSON.parse(localStorage.getItem('userinfor'));
            this.currendRole = userInfo.roleID;
            let getDate = new Date();
            this.timeVal = getDate;
            this.GetInsurance()

        },
        methods: {
            GetInsurance() {
                let that=this;
                let data = {
                    status: this.currendRole == 2001 ? -1 : -1,
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
                            if (res.data.list.length == 1) {
                                that.fieldVal = that.insuranceDta[0].code;
                                that.fieldValName = that.insuranceDta[0].name;
                                that.insuranceSelect(that.insuranceDta[0].code, 1)
                            }

                        }, 200)
                    }

                })
            },
            GetReconcilia(month, area_id, icco_name, area_name, id, page, limit) {
                this.isdone = true;
                let data = {
                    month: month,
                    area_id: Number(area_id),
                    icco_name: icco_name,
                    area_name: area_name,
                    icco_id: Number(id),
                    page: page,
                    limit: limit
                }
                Reconcilia(data).then((res) => {
                    if (res.code == 200) {
                        this.isdone = false;
                        if (res.data.list) {
                            res.data.list.forEach((item) => {
                                item.application_time = getDateString(item.application_time)
                                provinces.map((provinItem) => {
                                    if (item.adcode == provinItem.code) {
                                        item.addName = provinItem.name;
                                    }
                                })
                            })
                            this.total = res.data.total
                            this.tableData = res.data.list
                            console.log(res)
                        } else {
                            this.tableData = []
                        }

                    }
                })
            },
            insuranceSelect(e, num) {
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
                    res.data.list.map((childitem) => {
                        provinces.forEach((areaitem) => {
                            if (childitem.adcode == areaitem.code) {
                                this.areaData.push({
                                    name: areaitem.name,
                                    code: childitem.ID
                                });

                            }
                        })
                    })

                });
                setTimeout(() => {
                    this.areaVal = this.areaData[0].code;
                    this.areaValName = this.areaData[0].name;
                    if (num == 1) {
                        this.GetReconcilia(this.timeVal, this.areaVal, this.fieldValName, this.areaValName,
                            this.fieldVal,
                            this.page, this.limit);
                    }

                }, 200)
            },
            areaSelect(e) {
                this.areaData.map((item) => {
                    if (item.code == e) {
                        this.areaValName = item.name
                    }
                })
            },
            getexport() {
                let data = {
                    month: this.timeVal,
                    icco_id: Number(this.fieldVal),
                    icco_name: this.fieldValName,
                    area_id: this.areaVal,
                    area_name: this.areaValName
                }
                Exportreconcilia(data).then((res) => {
                    let blob = new
                    Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    });
                    let objectUrl = URL.createObjectURL(blob);
                    var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
                    var contentDisposition = decodeURI(res.headers['content-disposition'])
                    var result = patt.exec(contentDisposition)
                    var fileName = result[1];
                    const elink = document.createElement("a");
                    elink.download = fileName;
                    elink.style.display = "none";
                    elink.href = objectUrl;
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href);
                    document.body.removeChild(elink);
                })
            },
            SizeChange(currentSize) {
                this.limit = currentSize;
                this.GetReconcilia(this.timeVal, this.areaVal, this.areaValName, this.fieldValName, this.fieldVal,
                    this.page, currentSize)
            },
            current_change(currentPage) {
                this.page = currentPage;
                this.GetReconcilia(this.timeVal, this.areaVal, this.areaValName, this.fieldValName, this.fieldVal,
                    currentPage,
                    this.limit)
            },
            handleSelectionChange() {},
            refresh() {
                this.page = 1;
                this.limit = 10;
                this.fieldVal = '';
                let getDate = new Date();
                this.timeVal = getDate;
                this.areaVal = '';
                // this.GetReconcilia(start, end, this.fieldVal, this.page, this.limit)
            },
            searchClick() {
                this.isdone = true;
                this.GetReconcilia(this.timeVal, this.areaVal, this.areaValName, this.fieldValName, this.fieldVal,
                    this.page, this.limit)
            }
        },
    }
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
        width: 100%;
        justify-content: space-evenly;
    }

    .onlyClass {
        display: flex;
        align-items: center;
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

    .bottomBtn button+button {
        margin-left: 0;
    }

    .bottomBtn .deleteBtn {
        width: 66px;
        background-color: #F56C6C;
        margin: 0;
    }
</style>