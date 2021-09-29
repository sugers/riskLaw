<template>
    <section>
        <div class="InsuranceCompany">
            <div class="insuranceTop">
                <!-- <div class="radioStatu onlyClass">
                    <span class="name">状态：</span>
                    <div>
                        <el-radio-group v-model="statuVal">
                            <el-radio-button label="全部"></el-radio-button>
                            <el-radio-button label="待审核"></el-radio-button>
                            <el-radio-button label="已审核"></el-radio-button>
                        </el-radio-group>
                    </div>
                </div> -->
                <div class="otherScreen">
                    <div class="timeSelect onlyClass">
                        <span class="name">日期：</span>
                        <div class="selectContent">
                            <el-date-picker v-model="timeVal" type="daterange" format="yyyy 年 MM 月 dd 日"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="companySelect onlyClass">
                        <span class="name">擅长领域：</span>
                        <div class="selectContent">
                            <el-select v-model="fieldVal" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item,index) in fieldData" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="keywordSelect onlyClass">
                        <span class="name">关键字：</span>
                        <div class="selectContent">
                            <el-input placeholder="请输入内容" v-model="keyInput" clearable>
                            </el-input>
                        </div>
                    </div>
                    <!-- 筛选按钮 -->
                    <div class="screenBtn">
                        <el-button type="info" icon="el-icon-refresh" @click="refresh">重置</el-button>
                        <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索
                        </el-button>
                    </div>
                </div>

            </div>
            <div class="insuranceBottom">
                <div class="bottomBtn">
                    <!-- <el-button type="primary" icon="el-icon-plus" @click="buttonClick('批量通过')">批量通过
                    </el-button>
                    <el-button type="warning" icon="el-icon-plus" @click="buttonClick('批量拒绝')">批量拒绝
                    </el-button> -->
                    <!-- <el-button type="danger" icon="el-icon-delete" class="deleteBtn">删除</el-button> -->
                </div>
                <div class="bottomTable">
                    <el-table ref="filterTable" :data="tableData" style="width: 100%" stripe highlight-current-row
                        :header-cell-style="{'background':'#F7F7F7','color':'#2F2E2E','font-size':'14px'}">

                        <el-table-column type="selection" width="60">
                        </el-table-column>
                        <el-table-column label="序号" type="index" :index="indexMethod" width="60" align="center">
                        </el-table-column>
                        <el-table-column prop="law_firm" label="所在律所" width="200" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="100" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="phone" label="手机号" width="160" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="exp_years" label="从业年限" width="100" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="addName" label="城市" width="160" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column label="擅长领域" width="200" align='center' show-overflow-tooltip
                            class-name="grayColor">
                            <template slot-scope="scope">
                                <span v-for="(item,index) in scope.row.field_expertises"
                                    :key='index'>{{item.Name}}、</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="200" align='center'>
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="buttonClick('编辑',scope.row.ID)">编辑
                                </el-button>
                                <!-- <el-button type="danger" size="small" @click="buttonClick('删除',scope.row.ID)">删除
                                </el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pageDiv">
                    <el-pagination background layout="total,sizes,prev, pager, next" :total="total" :page-size="10"
                        :page-sizes="[10, 20, 30, 40,50]" @size-change="SizeChange" @current-change="current_change">
                    </el-pagination>
                </div>
                <Spin fix v-show="isdone">
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
            </div>

            <!-- 编辑律师弹窗 -->
            <Modal :footer-hide="true" title="编辑律师" :mask-closable="false" :scrollable='true' width="800"
                @on-visible-change="visible" v-model="editModel">
                <laywerEdit ref="editLawer" :laywerId="laywerId" @refresData='refresData'
                    @cancelLawyer="cancelLawyer" />
            </Modal>
            <!-- 审核律师弹窗 -->
            <Modal :footer-hide="true" title="审核律师" :scrollable='true' width="800" v-model="examineModel"
                @on-visible-change="visible" class-name="vertical-center-modal">
                <laywerExamine />
            </Modal>
        </div>
    </section>
</template>
<script>
    import laywerEdit from "./laywerEdit/laywerEdit.vue";
    import laywerExamine from "./laywerExamine/laywerExamine.vue";
    import {
        GetfieldList,
        GetlawyerList
    } from '../../api/api.js';
    import provinces from "../../../static/js/pca-code.json";
    export default {
        components: {
            laywerEdit,
            laywerExamine
        },
        data() {
            return {
                statuVal: '',
                keyInput: '',
                fieldVal: '',
                timeVal: '',
                isdone: false,
                isshowindex: false,
                isexpand: false,
                isstripe: true,
                editModel: false,
                examineModel: false,
                tableData: [],
                fieldData: [],
                laywerId: '',
                page: 1,
                limit: 10,
                total: 0
            }
        },
        mounted() {
            this.getField()
            this.getlaywer(this.fieldVal, this.keyInput, this.timeVal[0], this.timeVal[1], this.page, this.limit);
        },
        methods: {
             indexMethod(index) {
             return index + 1 + (this.page - 1) * this.limit
             },
            visible(boolean) {
                if (boolean) {
                    this.$nextTick(() => {
                        this.$refs.editLawer.init();
                        this.$refs.editLawer.getEditInfo();
                    })
                }

            },
            refresData() {
                this.editModel = false;
                this.getlaywer(this.fieldVal, this.keyInput, this.timeVal[0], this.timeVal[1], this.page, this.limit);
            },
            cancelLawyer() {
                this.editModel = false;
            },
            getField() {
                GetfieldList().then((res) => {
                    if (res.code == 200) {
                        res.data.list.map((item) => {
                            this.fieldData.push({
                                name: item.Name,
                                code: item.ID
                            })
                        })
                        this.fieldData.reverse()
                    }
                })
            },
            getlaywer(field_id, keyword, start, end, page, limit) {
                this.isdone = true;
                let data = {
                    field_id: field_id,
                    keyword: keyword,
                    start: start,
                    end: end,
                    page: page,
                    limit: limit
                }
                GetlawyerList(data).then((res) => {
                    if (res.code == 200) {

                        if (res.data.list) {
                            res.data.list.forEach((item) => {
                                provinces.map((provinItem) => {
                                    if (provinItem.children) {
                                        provinItem.children.forEach((childrem) => {
                                            if (item.adcode == childrem.code) {
                                                item.addName = provinItem.name +
                                                    childrem.name
                                            }
                                        })
                                    }

                                })
                            })
                        }
                        setTimeout(() => {
                            this.isdone = false;
                            this.tableData = res.data.list;
                            this.total = res.data.total;
                        }, 1000)
                    }else{
                         this.isdone=false;
                    }
                }).catch(()=>{
                     this.isdone=false;
                })
            },

            buttonClick(name, id) {
                switch (name) {
                    case '编辑':
                        this.laywerId = id
                        this.editModel = true;
                        return;
                    case '删除':
                        this.$Modal.confirm({
                            title: '删除',
                            content: '确定删除此用户？',
                            onOk: () => {
                                this.$Message.info('Clicked ok');
                            },
                            onCancel: () => {
                                this.$Message.info('Clicked cancel');
                            }
                        });
                        return;
                }


            },
            refresh() {
                this.fieldVal = '';
                this.keyInput = '';
                this.timeVal = '';
                this.page = 1;
                this.limit = 10;
            },
            searchClick() {
                this.getlaywer(this.fieldVal, this.keyInput, this.timeVal[0], this.timeVal[1], 1, this.limit);
            },
            SizeChange(currentSize) {
                this.limit = currentSize;
                this.getlaywer(this.fieldVal, this.keyInput, this.timeVal[0], this.timeVal[1], this.page,
                    currentSize);
            },
            current_change(currentPage) {
                this.page = currentPage;
                this.getlaywer(this.fieldVal, this.keyInput, this.timeVal[0], this.timeVal[1], currentPage, this.limit);
            },
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
        width: 860px;
        justify-content: flex-start;
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
        padding: 20px 0;
        position: relative;
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