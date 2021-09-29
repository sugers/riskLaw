<template>
    <section>
        <div class="insuranceUser">
            <div class="insuranceTop">

                <div class="otherScreen">
                    <div class="radioStatu onlyClass">
                        <span class="name">角色：</span>
                        <el-radio-group v-model="statuVal" @change="usermanager">
                            <div v-if="radioSatatu==1">

                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="管理员"></el-radio-button>
                                <el-radio-button label="初审人员"></el-radio-button>
                                <el-radio-button label="复审人员"></el-radio-button>
                                <el-radio-button label="财务"></el-radio-button>

                            </div>
                            <div v-else-if="radioSatatu==2">
                                <el-radio-button label="全部"></el-radio-button>
                                <el-radio-button label="管理员"></el-radio-button>
                                <el-radio-button label="财务"></el-radio-button>
                            </div>
                        </el-radio-group>
                    </div>
                    <!-- <div class="keywordSelect onlyClass">
                        <span class="name">关键字：</span>
                        <div class="selectContent">
                            <el-input placeholder="请输入内容" v-model="keyInput" clearable>
                            </el-input>
                        </div>
                    </div> -->
                    <!-- 筛选按钮 -->
                    <!-- <div class="screenBtn">
                        <el-button type="info" icon="el-icon-refresh" @click="refresh">重置</el-button>
                        <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索
                        </el-button>
                    </div> -->
                </div>

            </div>
            <div class="insuranceBottom">
                <div class="bottomBtn">
                    <el-button v-if="currendRole==1001 || currendRole== 2001" type="primary" icon="el-icon-plus"
                        @click="buttonClick('新增')">新增
                    </el-button>
                    <!-- <el-button type="danger" icon="el-icon-delete">删除</el-button> -->
                </div>
                <div class="bottomTable usermanagerFix">
                    <el-table ref="filterTable" :data="tableData" style="width: 100%" stripe highlight-current-row
                        :header-cell-style="{'background':'#F7F7F7','color':'#2F2E2E','font-size':'14px'}">

                        <el-table-column type="selection" width="60">
                        </el-table-column>
                        <el-table-column label="序号" type="index" :index="indexMethod" width="60" align="center">
                        </el-table-column>
                        <el-table-column prop="username" label="用户名" width="100" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="100" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="roleName" label="角色" width="100" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <el-table-column prop="phone" label="联系电话" width="160" align='center' show-overflow-tooltip
                            class-name="grayColor">
                        </el-table-column>
                        <!-- <el-table-column prop="ico_name" label="所属保险公司" width="200" align='center' show-overflow-tooltip
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
                <manageEdit @updateuserData='updateuserData' @canceluser='canceluser' :currentText="currentText"
                    ref="userEdit" />
            </Modal>
            <!-- 新增用户弹窗 -->
            <Modal :footer-hide="true" :mask-closable="false" title="新增用户" :scrollable='true' width="800"
                v-model="increaseModel" @on-visible-change="visible" class-name="vertical-center-modal">
                <manageIncrease @updateuserData='updateuserData' @canceluser='canceluser' ref="userIncrease" />
            </Modal>
        </div>
    </section>
</template>
<script>
    import manageEdit from "./manageEdit/manageEdit.vue";
    import manageIncrease from "./manageIncrease/manageIncrease.vue";
    import {
        getDateString
    } from '../../../static/js/timeFormat'
    // import provinces from "../../../static/js/pca-code.json"
    import {
        Getuser,
        Deleteuser
    } from '../../api/api.js';
    export default {
        components: {
            manageEdit,
            manageIncrease
        },
        data() {
            return {
                currendRole: '',
                radioSatatu: '',
                statuVal: '全部',
                keyInput: '',
                companyVal: '',
                isshow: 0,
                currentText: '',
                isshowindex: false,
                isexpand: false,
                isstripe: true,
                editModel: false,
                increaseModel: false,
                isdone: false,
                tableData: [],
                page: 1,
                limit: 10,
                total: 0,
            }
        },
        mounted() {
            this.isdone = true;
            // 获取角色权限
            let userInfo = JSON.parse(localStorage.getItem('userinfor'));
            this.currendRole = userInfo.roleID
            this.radioSatatu = String(userInfo.roleID).substring(0, 1);
            this.getUserList(0, 0, '', this.currendRole, 1, 10);
        },
        methods: {
            indexMethod(index) {
                return index + 1 + (this.page - 1) * this.limit
            },
            visible(boolean) {
                if (boolean) {
                    this.$refs.userIncrease.initFn()
                }
            },

            updateuserData() {
                this.editModel = false;
                this.increaseModel = false;
                this.getUserList(0, 0, this.statuVal, this.currendRole, this.page, this.limit);
            },
            canceluser() {
                this.editModel = false;
                this.increaseModel = false
            },
            getUserList(icco_id, area_id, role, user_type, page, limit, name) {
                let currentRole = '';
                this.tableData = [];
                this.isdone = true;
                if (String(user_type).substring(0, 1) == 1) {
                    if (role == '管理员') {
                        currentRole = 1001
                    } else if (role == '财务') {
                        currentRole = 1002
                    } else if (role == '初审人员') {
                        currentRole = 1003
                    } else if (role == '复审人员') {
                        currentRole = 1004
                    }
                } else if (String(user_type).substring(0, 1) == 2) {
                    if (role == '管理员') {
                        currentRole = 2001
                    } else if (role == '财务') {
                        currentRole = 2002
                    }
                }

                let data = {
                    icco_id: icco_id,
                    area_id: area_id,
                    role: currentRole,
                    user_type: Number(String(user_type).substring(0, 1)),
                    page: page,
                    limit: limit,
                    name: name
                }
                Getuser(data).then((res) => {
                    this.isdone = false;
                    if (res.code == 200) {
                        if (!res.data.accounts) {
                            this.total = 0;
                            return;
                        }
                        res.data.accounts.map((item) => {
                            item.UpdatedAt = getDateString(item.UpdatedAt)
                            if (item.role == 1001 || item.role == 2001) {
                                item.roleName = '管理员'
                            } else if (item.role == 1002 || item.role == 2002) {
                                item.roleName = '财务'
                            } else if (item.role == 1003) {
                                item.roleName = '初审人员'
                            } else if (item.role == 1004) {
                                item.roleName = '复审人员'
                            }
                        })
                        this.tableData = res.data.accounts;
                        this.total = res.data.total;
                    }else{
                         this.isdone=false;
                    }
                }).catch(()=>{
                     this.isdone=false;
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
                                        this.getUserList(0, 0, this.statuVal, this
                                            .currendRole, this
                                            .page, this.limit);
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
                this.getUserList(0, 0, this.statuVal, this.currendRole, this.page, currentSize);
            },
            current_change(currentPage) {
                this.page = currentPage;
                this.getUserList(0, 0, this.statuVal, this.currendRole, currentPage, this.limit);
            },
            refresh() {
                this.companyVal = '';
                this.statuVal = '全部';
            },
            usermanager() {
                this.getUserList(0, 0, this.statuVal, this.currendRole, this.page, this.limit, this.keyInput);
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