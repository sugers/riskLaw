<template>
    <section>
        <div class="insuranceUser">
            <div class="insuranceTop">
                <div class="otherScreen">
                    <div class="companySelect onlyClass">
                        <span class="name">保险公司：</span>
                        <div class="selectContent">
                            <el-select v-model="fieldVal" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item,index) in insuranceData" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="companySelect onlyClass">
                        <span class="name">评估结果：</span>
                        <div class="selectContent">
                            <el-select v-model="statuVal" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item, index) in statuData" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="timeSelect onlyClass">
                        <span class="name">评估时间：</span>
                        <div class="selectContent">
                            <el-date-picker v-model="monthVal" type="month" placeholder="选择评估时间">
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
            <div class="insuranceBottom">
                <Spin fix v-show="isdone">
                    <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
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
                isdone: false,
                monthVal: '',
                fieldVal:'',
                statuVal:'',
                statuData:[],
                insuranceData:[]
            };
        },
        mounted() {
            // this.isdone = true;

        },
        methods: {
            indexMethod(index) {
                return index + 1 + (this.page - 1) * this.limit
            },
            refresh() {
                this.page = 1;
                this.limit = 10;
                let getDate = new Date();
                this.monthVal = getDate;
                this.salesmanVal = "";
                this.areaidVal = "";
                this.yearVal = ''
            },
            searchClick() {},
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