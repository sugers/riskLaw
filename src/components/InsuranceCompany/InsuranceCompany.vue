<template>
    <section>
        <div class="InsuranceCompany">
            <div class="insuranceTop">
                <div class="otherScreen">
                    <div class="radioStatu onlyClass">
                        <span class="name">状态：</span>
                        <div>
                            <el-radio-group v-model="statuVal">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="启用"></el-radio-button>
                                <el-radio-button label="禁用"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                    <!-- <div class="companySelect onlyClass">
                        <span class="name">保险公司：</span>
                        <div class="selectContent">
                            <el-select v-model="companyVal" slot="prepend" placeholder="请选择">
                                <el-option label="餐厅名" value="1"></el-option>
                                <el-option label="订单号" value="2"></el-option>
                                <el-option label="用户电话" value="3"></el-option>
                            </el-select>
                        </div>
                    </div> -->
                    <!-- <div class="areaSelect onlyClass">
                        <span class="name">开通区域：</span>
                        <div class="selectContent">
                            <el-select v-model="areaVal" slot="prepend" placeholder="请选择">
                                <el-option label="餐厅名" value="1"></el-option>
                                <el-option label="订单号" value="2"></el-option>
                                <el-option label="用户电话" value="3"></el-option>
                            </el-select>
                        </div>
                    </div> -->
                    <!-- <div class="timeSelect onlyClass">
                        <span class="name">创建时间：</span>
                        <div class="selectContent">
                            <el-date-picker v-model="timeVal" type="daterange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </div> -->
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
                        <el-button type="primary" icon="el-icon-search" @click="searchClick">筛选</el-button>
                    </div>
                </div>


            </div>
            <div class="insuranceBottom">
                <div class="bottomBtn">
                    <el-button v-if="currendRole==1001" type="primary" icon="el-icon-plus" @click="buttonClick('新增公司')">
                        新增公司
                    </el-button>
                    <!-- <el-button type="danger" icon="el-icon-delete">删除</el-button> -->
                </div>
                <div class="bottomTable">
                    <el-table ref="filterTable" :data="tableData" style="width: 100%" stripe highlight-current-row lazy
                        :tree-props="{children: 'children'}" @selection-change="handleSelectionChange"
                        @expand-change="handledetail" :row-class-name="tableRowClassName"
                        :header-cell-style="{'background':'#F7F7F7','color':'#2F2E2E','font-size':'14px'}">

                        <el-table-column type="selection" width="60">
                        </el-table-column>

                        <el-table-column type="expand" style="position:relative;">
                            <template slot-scope="props">
                                <div class="childTable" style="position:relative;">
                                    <el-table ref="childTable" :show-header="false" :data="props.row.children"
                                        style="width: 100%">
                                        <el-table-column width="60" align='center'>
                                        </el-table-column>
                                        <el-table-column width="108" align='center'>
                                        </el-table-column>
                                        <el-table-column prop="name" width="220" align='center' show-overflow-tooltip
                                            class-name="grayColor">
                                        </el-table-column>
                                        <el-table-column width="60">
                                            <template slot-scope="scope">
                                                <!-- <div :class="scope.row.status ===1?'BoldColor':'diabledColor'">
                                                    {{scope.row.status ===1?'启用':'禁用'}}</div> -->
                                                <el-tooltip :content="scope.row.status ===1?'启用':'禁用'" placement="top">
                                                    <el-switch v-model="scope.row.status" active-color="#13ce66"
                                                        inactive-color="#ff4949" :active-value="1" :inactive-value="0"
                                                        @change="changeStatus($event,scope.row)">
                                                    </el-switch>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="contact" width="140" align='center' show-overflow-tooltip
                                            class-name="grayColor">
                                        </el-table-column>
                                        <el-table-column prop="contact_tel" width="140" align='center'
                                            show-overflow-tooltip class-name="grayColor">
                                        </el-table-column>
                                        <el-table-column prop="area" width="100" align='center' show-overflow-tooltip
                                            class-name="grayColor">
                                        </el-table-column>
                                        <el-table-column prop="CreatedAt" width="200" align='center'
                                            show-overflow-tooltip class-name="grayColor">
                                        </el-table-column>
                                        <el-table-column fixed="right" label="操作" width="220" align='center'>
                                            <template slot-scope="scope">
                                                <div>
                                                    <!-- <el-button type="primary" size="mini"
                                                        @click="areaClick('编辑',scope.row.ID,scope.row)">
                                                        编辑
                                                    </el-button> -->

                                                    <el-button type="danger" size="mini"
                                                        @click="areaClick('删除',scope.row.ID)">
                                                        删除
                                                    </el-button>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <Spin fix v-show="ischildshow&&props.row.row_index==currentIndex">
                                        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                        <div>Loading</div>
                                    </Spin>
                                </div>
                            </template>

                        </el-table-column>
                        <el-table-column label="序号" type="index" width="60" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="公司名称" width="220" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot="header">
                                状态
                            </template>
                            <template slot-scope="scope">
                                <div :class="scope.row.status ===1?'BoldColor':'diabledColor'">
                                    {{scope.row.status ===1?'启用':'禁用'}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="contact" label="联系人" width="140" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="contact_tel" label="联系电话" width="140" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="area" label="开通区域" width="100" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <!-- <el-table-column prop="website" label="官网" width="200" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column> -->
                        <el-table-column prop="CreatedAt" label="创建时间" width="200" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="220" align='center'>
                            <template slot-scope="scope">
                                <div>
                                    <el-button type="primary" size="mini"
                                        @click="buttonClick('编辑',scope.row.ID,scope.row)">
                                        编辑
                                    </el-button>
                                    <el-button type="primary" size="mini" v-if="currendRole==1001"
                                        @click="buttonClick('新增区域',scope.row.ID,scope.row)">
                                        新增区域
                                    </el-button>
                                    <el-button type="danger" size="mini" @click="buttonClick('删除',scope.row.ID)">
                                        删除
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <zk-table ref="table" :data="tableData" :columns="columns" :expand-type="isexpand"
                        :stripe='isstripe' selection-type :show-index='isshowindex'>
                        <template slot="statuShow" slot-scope="scope">
                            <div v-if="scope.row.status=='1'">
                                <el-link type="primary">启用</el-link>
                            </div>
                            <div v-else>
                                <el-link type="danger">禁用</el-link>
                            </div>
                        </template>
                        <template slot="operateBtn" slot-scope="scope">
                            <div v-for="(item,index) in scope.row.operate" :key="index">
                                <el-button :type="item.type" @click="buttonClick(item.name)">{{item.name}}</el-button>
                            </div>
                        </template>
                    </zk-table> -->
                    <!-- <Table ref="selection" :columns="columns" :data="tableData" >
                         <template slot-scope="scope" slot="status">
                              <div v-if="scope.row.status=='1'">
                                  <span style="color:#409EFF;">启用</span>
                              </div>
                              <div v-else>
                                  <span style="color:#F56C6C;">禁用</span>
                              </div>
                         </template>
                          <template slot="operate">
                            <el-button type="primary" @click="buttonClick('编辑')">编辑</el-button>
                            <el-button type="danger" @click="buttonClick('删除')">删除</el-button>
                          </template>
                    </Table> -->
                </div>
                <div class="pageDiv">
                    <el-pagination background layout="total,sizes,prev, pager, next" :page-sizes="[10, 20, 30, 40,50]"
                        :page-size="10" :total="total" @current-change="current_change" @size-change="SizeChange">
                    </el-pagination>
                </div>

                <Spin fix v-show="isdone">
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
            </div>
            <!-- 编辑对话框 -->
            <Modal :mask-closable="false" :footer-hide="true" title="编辑公司" :scrollable='true' width="800"
                v-model="editModel" class-name="vertical-center-modal">
                <companyEdit @updateData="updateData" @cancelModel='cancelModel' :currentText="currentText" />
            </Modal>
            <Modal :mask-closable="false" :footer-hide="true" title="编辑区域" :scrollable='true' width="800"
                v-model="editAreaModel" class-name="vertical-center-modal">
                <editArea @updateData="updateData" @cancelModel='cancelModel' :currenrAreaText="currenrAreaText" />
            </Modal>
            <!-- 新增对话框 -->
            <Modal :mask-closable="false" :footer-hide="true" title="新增区域" :scrollable='true' width="800"
                v-model="addModel" class-name="vertical-center-modal">
                <increaseArea @updateData="updateData" @cancelModel='cancelModel' :increaseID="increaseID"
                    :increaseText="increaseText" />
            </Modal>
            <Modal :mask-closable="false" :footer-hide="true" title="新增公司" :scrollable='true' width="800"
                v-model="addCompanyModel" class-name="vertical-center-modal">
                <increasedCompany @updateData="updateData" @cancelModel='cancelModel' />
            </Modal>
        </div>
    </section>
</template>
<script>
    import companyEdit from "./companyEdit/companyEdit.vue";
    import increasedCompany from "./increasedCompany/increasedCompany.vue"
    import increaseArea from "./increaseArea/increaseArea.vue"
    import editArea from "./editArea/editArea.vue"
    import {
        getDateString
    } from '../../../static/js/timeFormat'
    import {
        GetinsuranceList,
        GetinsuranceAreaList,
        DeleteInsurance,
        DeleteArea,
        EditArea
    } from '../../api/api.js';
    import provinces from "../../../static/js/pca-code.json"
    export default {
        components: {
            companyEdit,
            increasedCompany,
            increaseArea,
            editArea
        },
        data() {
            return {
                currendRole: '',
                fullHeight: 0,
                currentIndex: 0,
                statuVal: '全部',
                keyInput: '',
                timeVal: [],
                areaVal: '',
                companyVal: '',
                checkedparent: false,
                checkedchild: false,
                isshowindex: false,
                isexpand: false,
                isstripe: true,
                editModel: false,
                addModel: false,
                addCompanyModel: false,
                editAreaModel: false,
                isdone: true,
                ischildshow: true,
                page: 1,
                limit: 10,
                total: 0,
                tableData: [],
                multipleSelection: [],
                currentText: '',
                increaseID: '',
                increaseText: '',
                currenrAreaText: '',
            }
        },
        mounted() {
            // 获取角色权限
            let userInfo = JSON.parse(localStorage.getItem('userinfor'));
            this.currendRole = userInfo.roleID;
            this.getinsurance(this.statuVal, this.keyInput, this.page, this.limit, this.currendRole);
        },
        methods: {
            cancelModel() {
                let that = this;
                that.editModel = false;
                that.addModel = false;
                that.editAreaModel = false;
                this.addCompanyModel = false;
            },
            updateData() {
                let that = this;
                that.editModel = false;
                that.addModel = false;
                that.editAreaModel = false;
                this.addCompanyModel = false;
                that.getinsurance('全部', '', 1, 10, this.currendRole);
            },
            tableRowClassName({
                row,
                rowIndex
            }) {
                row.row_index = rowIndex;
            },
            handledetail(row, expandedRows) {
                let rowID = row.ID;
                this.currentIndex = row.row_index
                this.ischildshow = true;
                if (expandedRows.length > 0) {
                    this.tableData.map((item) => {

                        if (item.ID == rowID) {
                            item.children = [];
                            let data = {
                                icco_id: item.ID
                            }
                            GetinsuranceAreaList(data).then(res => {
                                this.ischildshow = false
                                res.data.list.map((childitem) => {
                                    childitem.CreatedAt = getDateString(childitem.CreatedAt)
                                    provinces.forEach((areaitem) => {
                                        if (childitem.adcode == areaitem.code) {
                                            Object.assign(childitem, {
                                                'area': areaitem.name,
                                                'name': item.name,
                                                'CreatedAt': childitem
                                                    .CreatedAt,
                                                'DeletedAt': childitem
                                                    .DeletedAt,
                                                'ID': childitem.ID,
                                                'UpdatedAt': childitem
                                                    .UpdatedAt,
                                                'adcode': childitem
                                                    .adcode,
                                                'icco_id': childitem
                                                    .icco_id,
                                                'status': childitem
                                                    .status,
                                                'contact': childitem
                                                    .contact,
                                                'contact_tel': childitem
                                                    .contact_tel,
                                            })
                                        }
                                    })
                                    item.children.push(childitem)
                                })

                            })
                        }
                    });
                }
            },
            changeStatus(e, row) {
                let currentStatu = Number(e);
                let data = {
                    area_id: Number(row.ID),
                    status: currentStatu
                }
                EditArea(data).then((res) => {
                    if (res.code == 200) {
                        if (currentStatu == 1) {
                            this.$Message.success('已启用');
                        } else if (currentStatu == 0) {
                            this.$Message.warning('已禁用');
                        }
                    }
                })
            },
            getinsurance(statu, keywords, page, limit, statusNum) {
                let that = this;
                let currentstatus;
                if (statu == '全部') {
                    currentstatus = -1
                } else if (statu == '禁用') {
                    currentstatus = 0
                } else if (statu == '启用') {
                    currentstatus = 1
                }
                let data = {
                    status: statusNum == 2001 ? -1 : Number(currentstatus),
                    keyword: keywords,
                    page: page,
                    limit: limit
                }
                that.isdone = true;
                GetinsuranceList(data).then((res) => {
                    if (res.code == 200) {
                        let result = res.data.list
                        this.total = res.data.total
                        result.map((item) => {
                            item.CreatedAt = getDateString(item.CreatedAt)
                            item.area = '';
                        })
                        setTimeout(() => {
                            that.isdone = false;
                            that.tableData = result;
                        }, 1000)
                    }

                })
            },
            areaClick(name, id, data) {
                switch (name) {
                    case '编辑':
                        this.editAreaModel = true;
                        this.currenrAreaText = JSON.stringify(data)
                        return
                    case '删除':
                        this.$Modal.confirm({
                            title: '删除',
                            content: '确定删除？',
                            onOk: () => {
                                let data = {
                                    area_id: Number(id)
                                }
                                DeleteArea(data).then((res) => {
                                    if (res.code == 200) {
                                        this.$Message.success('删除成功');
                                        this.getinsurance(this.statuVal, this.keyInput, this.page,
                                            this.limit, this.currendRole);
                                    }
                                })
                            },
                            onCancel: () => {

                            }
                        });
                        return;
                }
            },
            buttonClick(name, id, data) {
                switch (name) {
                    case '编辑':
                        this.currentText = JSON.stringify(data)
                        this.editModel = true;
                        return
                    case '新增区域':
                        this.increaseID = id;
                        this.increaseText = JSON.stringify(data)
                        this.addModel = true;
                        return;
                    case '新增公司':
                        this.addCompanyModel = true;
                        return;
                    case '删除':
                        this.$Modal.confirm({
                            title: '删除',
                            content: '确定删除此公司？',
                            onOk: () => {
                                let data = {
                                    icco_id: Number(id)
                                }
                                DeleteInsurance(data).then((res) => {
                                    if (res.code == 200) {
                                        this.$Message.success('删除成功');
                                        this.getinsurance(this.statuVal, this.keyInput, this.page,
                                            this.limit, this.currendRole);
                                    }
                                })
                            },
                            onCancel: () => {

                            }
                        });
                        return;
                }


            },
            SizeChange(currentSize) {
                this.limit = currentSize;
                this.getinsurance(this.statuVal, this.keyInput, this.page, currentSize, this.currendRole);
            },
            current_change(currentPage) {
                this.page = currentPage;
                this.getinsurance(this.statuVal, this.keyInput, currentPage, this.limit, this.currendRole);
            },
            handleSelectionChange(val) {
                // multipleSelection
                console.log(val)
            },
            searchClick() {
                this.page = 1;
                this.limit = 10;
                this.getinsurance(this.statuVal, this.keyInput, 1, 10);
            },
            refresh() {
                this.page = 1;
                this.limit = 10;
                this.keyInput = '';
                this.statuVal = '全部';

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
        height: 30px;
        border: none;
        outline: none;
        padding: 0 8px;
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
        padding: 0;
        width: 66px;

        background-color: #F56C6C;
        margin: 0;
    }
</style>