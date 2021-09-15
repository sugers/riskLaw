<template>
    <section>
        <div class="insuranceUser">
            <div class="insuranceTop">

                <div class="otherScreen">
                    <div class="radioStatu onlyClass">
                        <span class="name">角色：</span>
                        <div>
                            <el-radio-group v-model="statuVal">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="管理员"></el-radio-button>
                                <el-radio-button label="财务"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="companySelect onlyClass">
                        <span class="name">保险公司：</span>
                        <div class="selectContent">
                            <el-select v-model="companyVal" slot="prepend" placeholder="请选择" @change="insuranceSelect">
                                <el-option v-for="(item,index) in insuranceDta" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="companySelect onlyClass">
                        <span class="name">开通区域：</span>
                        <div class="selectContent">
                            <el-select v-model="areaVal" slot="prepend" placeholder="请选择">
                                <el-option v-for="(item,index) in areaData" :key="index" :label="item.name"
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
                    <el-button type="primary" icon="el-icon-plus" @click="buttonClick('新增')">新增
                    </el-button>
                    <!-- <el-button type="danger" icon="el-icon-delete">删除</el-button> -->
                </div>
                <div class="bottomTable">
                    <el-table ref="filterTable" :data="tableData" style="width: 100%" stripe highlight-current-row
                        :header-cell-style="{'background':'#F7F7F7','color':'#2F2E2E','font-size':'14px'}">

                        <el-table-column type="selection" width="60">
                        </el-table-column>
                        <el-table-column label="序号" type="index" width="60" align="center">
                        </el-table-column>
                        <el-table-column prop="username" label="用户名" width="140" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="140" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="roleName" label="角色" width="140" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="phone" label="联系电话" width="200" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <!-- <el-table-column prop="icco_name" label="所属保险公司" width="200" align='center'
                            show-overflow-tooltip class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="areaName" label="开通区域" width="200" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column> -->
                        <el-table-column width="60">
                            <template slot="header">
                                状态
                            </template>
                            <template slot-scope="scope">
                                <div :class="scope.row.status ===1?'BoldColor':'diabledColor'">
                                    {{scope.row.status ===1?'启用':'禁用'}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="UpdatedAt" label="修改时间" width="200" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="200" align='center'>
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="buttonClick('编辑',scope.row)">编辑
                                </el-button>
                                <el-button type="danger" size="small" @click="buttonClick('删除',scope.row)">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <zk-table ref="table" :data="tableData" :columns="columns" :expand-type="isexpand" selection-type
                        :stripe="isstripe"
                        :show-index='isshowindex'>
                        <template slot="statuShow" slot-scope="scope">
                            <div v-if="scope.row.statu=='启用'">
                                <el-link type="primary">{{scope.row.statu}}</el-link>
                            </div>
                            <div v-else>
                                <el-link type="danger">{{scope.row.statu}}</el-link>
                            </div>
                        </template>
                        <template slot="operateBtn" slot-scope="scope">
                            <div v-for="(item,index) in scope.row.operate" :key="index">
                                <el-button :type="item.type" @click="buttonClick(item.name)">{{item.name}}</el-button>
                            </div>
                        </template>
                    </zk-table> -->
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

            <!-- 编辑用户弹窗 -->
            <Modal :footer-hide="true" :mask-closable="false" title="编辑用户" :scrollable='true' width="800"
                v-model="editModel" @on-visible-change="visible" class-name="vertical-center-modal">
                <userEdit @updateuserData='updateuserData' @canceluser='canceluser' :currentText="currentText"
                    ref="userEdit" />
            </Modal>
            <!-- 新增用户弹窗 -->
            <Modal :footer-hide="true" :mask-closable="false" title="新增用户" :scrollable='true' width="800"
                v-model="increaseModel" @on-visible-change="visible" class-name="vertical-center-modal">
                <increaseUser @updateuserData='updateuserData' @canceluser='canceluser' ref="userIncrease" />
            </Modal>
        </div>
    </section>
</template>
<script>
    import userEdit from "./userEdit/userEdit.vue";
    import increaseUser from "./increaseUser/increaseUser.vue";
    import {
        getDateString,
    } from '../../../static/js/timeFormat'
    import provinces from "../../../static/js/pca-code.json"
    import {
        Getuser,
        GetinsuranceList,
        Deleteuser,
        GetinsuranceAreaList
    } from '../../api/api.js';
    export default {
        components: {
            userEdit,
            increaseUser
        },
        data() {
            return {
                currenduserRole: '',
                statuVal: '全部',
                keyInput: '',
                companyVal: '',
                areaVal: '',
                isshow: 0,
                currentText: '',
                isshowindex: false,
                isexpand: false,
                isstripe: true,
                editModel: false,
                increaseModel: false,
                isdone: false,
                tableData: [],
                insuranceDta: [],
                areaData: [],
                page: 1,
                limit: 10,
                total: 0,
            }
        },
        mounted() {
            this.isdone = true;
            this.total = this.tableData.length;
            this.GetInsurance();
            setTimeout(() => {
                this.getUserList('', '', 2, 1, 10, '');
            }, 1000)
            let userInfo = JSON.parse(localStorage.getItem('userinfor'));
            this.currenduserRole = userInfo.roleID;
        },
        methods: {

            visible(boolean) {
                if (boolean) {
                    this.$refs.userIncrease.initFn()
                }
            },

            updateuserData() {
                this.editModel = false;
                this.increaseModel = false;
                this.getUserList(this.companyVal, this.statuVal, 2, this.page, this.limit, this.areaVal);
            },
            canceluser() {
                this.editModel = false;
                this.increaseModel = false
            },
            GetInsurance() {
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
                        });
                        if (res.data.list.length == 1) {
                            this.companyVal = this.insuranceDta[0].code;
                            this.insuranceSelect(this.insuranceDta[0].code)
                        }

                    }

                })
            },
            insuranceSelect(e) {
                this.areaVal = ''
                this.areaData = [];
                let data = {
                    icco_id: e
                }
                GetinsuranceAreaList(data).then(res => {
                    if (res.code == 200) {
                        res.data.list.map((childitem) => {
                            provinces.forEach((areaitem) => {
                                if (childitem.adcode == areaitem.code) {
                                    this.areaData.push({
                                        name: areaitem.name,
                                        code: childitem.ID
                                    })
                                }
                            })
                        });
                        if(this.areaData.length==0){
                            this.areaVal = this.areaData[0].code
                        }
                        
                    }


                })
            },
            getUserList(icco_id, role, user_type, page, limit, name, area_id) {
                let currentRole = '';
                this.isdone = true;
                if (role == '管理员') {
                    currentRole = 2001
                } else if (role == '财务') {
                    currentRole = 2002
                }
                let data = {
                    icco_id: icco_id,
                    area_id: area_id,
                    role: currentRole,
                    user_type: user_type,
                    page: page,
                    limit: limit,
                    name: name
                }
                Getuser(data).then((res) => {
                    if (res.code == 200) {

                        res.data.accounts.map((item) => {
                            item.UpdatedAt = getDateString(item.UpdatedAt)
                            if (item.role == 2001) {
                                item.roleName = "管理员"
                            } else if (item.role == 2002) {
                                item.roleName = "财务"
                            }
                            provinces.forEach((areaitem) => {
                                if (item.area_name == areaitem
                                    .code && item.area_name!=0) {
                                    item.areaName = areaitem.name
                                }
                            })

                        })
                        setTimeout(() => {
                            this.isdone = false;
                            this.tableData = res.data.accounts;
                            this.total = res.data.total;
                        }, 1000)

                    }
                })
            },

            buttonClick(name, text) {
                switch (name) {
                    case '编辑':
                        this.currentText = JSON.stringify(text)
                        this.editModel = true;
                        return;
                    case '新增':
                        this.increaseModel = true;
                        return;
                    case '删除':
                        this.$Modal.confirm({
                            title: '删除',
                            content: '确定删除此用户？',
                            onOk: () => {
                                let data = {
                                    id: text.ID
                                }

                                Deleteuser(data).then((res) => {
                                    if (res.code == 200) {
                                        this.$Message.success('已删除');
                                        this.getUserList(this.companyVal, this.statuVal, 2, this
                                            .page, this.limit, this.areaVal);
                                    }
                                })
                            },
                            onCancel: () => {}
                        });
                        return;
                }


            },
            SizeChange(currentSize) {
                this.limit = currentSize;
                this.getUserList(this.companyVal, this.statuVal, 2, this.page, currentSize, this.areaVal);
            },
            current_change(currentPage) {
                this.page = currentPage;
                this.getUserList(this.companyVal, this.statuVal, 2, currentPage, this.limit, this.areaVal);
            },
            refresh() {
                this.companyVal = '';
                this.areaVal = ''
                this.statuVal = '全部';
            },
            searchClick() {
                this.getUserList(this.companyVal, this.statuVal, 2, 1, this.limit, this.keyInput, this.areaVal);
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
    }

    .onlyClass {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        margin-left: 30px;
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