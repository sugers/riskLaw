<template>
    <section>
        <div class="InsuranceCompany">
            <div class="insuranceTop">
                <div class="otherScreen">
                    <div class="timeSelect onlyClass">
                        <span class="name">日期：</span>
                        <div class="selectContent">
                            <!-- <el-date-picker v-model="timeVal" format="yyyy 年 MM 月" value-format="yyyy-MM-dd HH:hh:mm"
                                type="month" placeholder="选择月" @change="selectDate">
                            </el-date-picker> -->
                            <el-date-picker v-model="timeVal" type="daterange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期">
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
                            <el-select v-model="fieldVal" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item,index) in insuranceDta" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="companySelect onlyClass">
                        <span class="name">业务员：</span>
                        <div class="selectContent">
                            <el-select v-model="salesmanVal" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item,index) in salesmanDta" :key="index" :label="item.name"
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
                    <!-- <el-button type="primary" icon="el-icon-document" @click="getexport">导出
                    </el-button> -->
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
                        <el-table-column prop="application_time" label="姓名" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <!-- <el-table-column prop="application_time" label="日期" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column> -->
                        <el-table-column prop="application_time" label="提交量" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="application_time" label="通过量" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="application_time" label="拒绝量" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="application_time" label="出单量" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="application_time" label="保险金额" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="application_time" label="保费金额" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>

                    </el-table>
                </div>
                <div class="pageDiv">
                    <el-pagination background layout="total,sizes,prev, pager, next" :total="10" :page-size="10"
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
    export default {
        data() {
            return {
                timeVal: '',
                fieldVal: '',
                salesmanVal:"",
                salesmanDta:'',
                tableData: [],
                insuranceDta: []
            }
        },
        mounted() {},
        methods: {

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
        justify-content: space-evenly;
        width: 100%;
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