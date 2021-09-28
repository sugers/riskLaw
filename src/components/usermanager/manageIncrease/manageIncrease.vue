<template>
    <section>
        <div class="increaseUser">
            <!-- <div class="return">
                <el-page-header @back="goBack" content="编辑用户">
                </el-page-header>
            </div> -->

            <div class="editList">
                <div class="listLeft Required">
                    <span>用户名：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="userName" placeholder="请输入用户名"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>角色：</span>
                </div>
                <div class="listRight" v-if="radioSatatu==1">
                    <el-radio-group v-model="roleradio">
                        <el-radio :label="1001">管理员</el-radio>
                        <el-radio :label="1003">初审人员</el-radio>
                        <el-radio :label="1004">复审人员</el-radio>
                        <el-radio :label="1002">财务</el-radio>
                    </el-radio-group>
                </div>
                <div class="listRight" v-else-if="radioSatatu==2">
                    <el-radio-group v-model="roleradio">
                        <el-radio :label="2001">管理员</el-radio>
                        <el-radio :label="2002">财务</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>密码：</span>
                </div>
                <div class="listRight">
                    <el-input type="password" v-model="passwordval" placeholder="请输入密码"></el-input>
                </div>
            </div>
            <!-- <div class="editList">
                <div class="listLeft Required">
                    <span>确认密码：</span>
                </div>
                <div class="listRight">
                    <el-input type="password" v-model="comfirmdval" placeholder="请输入密码"></el-input>
                </div>
            </div> -->

            <div class="editList" v-if="currendRole==2001">
                <div class="listLeft Required">
                    <span>所属保险公司：</span>
                </div>
                <div class="listRight">
                    <el-select v-model="BelongInsurance" slot="prepend" placeholder="请选择" @change="insuranceSelect">
                        <el-option v-for="(item,index) in insuranceData" :key="index" :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="editList" v-if="currendRole==2001">
                <div class="listLeft">
                    <span>省份：</span>
                </div>
                <div class="listRight">
                    <el-select v-model="areaVal" slot="prepend" placeholder="请选择">
                        <el-option v-for="(item,index) in areaData" :key="index" :label="item.name" :value="item.code">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <!-- <div class="editList">
                <div class="listLeft Required">
                    <span>账号状态：</span>
                </div>
                <div class="listRight">
                    <el-radio-group v-model="staturadio">
                        <el-radio :label="0">启用</el-radio>
                        <el-radio :label="1">禁用</el-radio>
                    </el-radio-group>
                </div>
            </div> -->
            <div class="editList">
                <div class="listLeft Required">
                    <span>姓名：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="fullName" placeholder="请输入姓名"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>联系电话：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="contactPhonde" placeholder="请输入联系电话"></el-input>
                </div>
            </div>
            <div class="operatBtn">
                <el-button type="primary" @click="increaseClick">新增</el-button>
                <el-button type="info" @click="canceluser">取消</el-button>
            </div>
        </div>
    </section>
</template>
<script>
    import {
        GetinsuranceAreaList,
        GetinsuranceList,
        Increaseuser,
    } from '../../../api/api.js';
    import provinces from "../../../../static/js/pca-code.json"
    export default {
        props: ['isshow'],
        data() {
            return {
                areaVal: '',
                currendRole: '',
                currendAreaId: '',
                radioSatatu: '',
                fullName: '',
                userName: '',
                roleradio: '',
                staturadio: 0,
                passwordval: '',
                comfirmdval: '',
                BelongInsurance: '',
                contactPhonde: '',
                insuranceData: [],
                areaData: []
            }
        },
        mounted() {
            this.initFn();
            // 获取角色权限
            let userInfo = JSON.parse(localStorage.getItem('userinfor'));
            this.currendRole = userInfo.roleID;
            this.currendAreaId = userInfo.area_id;
            this.radioSatatu = String(userInfo.roleID).substring(0, 1)
            if (String(userInfo.roleID).substring(0, 1) == 1) {
                this.roleradio = 1001;
            } else if (String(userInfo.roleID).substring(0, 1) == 2) {
                this.roleradio = 2001;
            }
            this.getInsurance()
        },
        methods: {
            initFn() {
                this.areaVal = '';
                this.fullName = '';
                this.userName = '';
                this.roleradio = String(this.currendRole).substring(0, 1) == 1 ? 1001 : 2001;
                this.staturadio = 0;
                this.passwordval = '';
                this.comfirmdval = '';
                this.BelongInsurance = '';
                this.contactPhonde = '';
                this.provinceData = [];
            },
            getInsurance() {
                let data = {
                    status: String(this.currendRole).substring(0, 1) ? -1 : -1,
                    keyword: '',
                }
                GetinsuranceList(data).then((res) => {
                    if (res.code == 200) {
                        let result = res.data.list
                        result.map((item) => {
                            this.insuranceData.push({
                                name: item.name,
                                code: item.ID
                            })
                        })
                    }

                })
            },
            insuranceSelect(e) {
                this.areaVal = ''
                this.areaData = [];
                let data = {
                    icco_id: String(this.currendRole).substring(0, 1) == 2 ? '' : e
                }
                GetinsuranceAreaList(data).then(res => {
                    res.data.list.map((childitem) => {
                        provinces.forEach((areaitem) => {
                            if (childitem.adcode == areaitem.code) {
                                this.areaData.push({
                                    name: areaitem.name,
                                    code: childitem.ID
                                })
                            }
                        })
                    })

                })
            },
            increaseClick() {
                let data = {
                    name: this.fullName,
                    username: this.userName,
                    phone: this.contactPhonde,
                    password: this.passwordval,
                    icco_id: this.BelongInsurance ? this.BelongInsurance : 0,
                    area_id: this.areaVal ? Number(this.areaVal) :
                    0,
                    role: Number(this.roleradio)
                }
                if (!data['username']) {
                    this.$Message.warning('请填写用户名');
                    return;
                } else if (!data['password']) {
                    this.$Message.warning('请填写密码');
                    return;
                } else if (!data['name']) {
                    this.$Message.warning('请填写姓名');
                    return;
                } else if (!data['icco_id'] && String(this.currendRole).substring(0, 1) == 2) {
                    this.$Message.warning('请选择所属公司');
                    return;
                }
                Increaseuser(data).then((res) => {
                    if (res.code == 200) {
                        this.$Message.success('已新增成功');
                        this.$emit('updateuserData');
                        this.initFn();
                    }
                })
            },
            canceluser() {
                this.$emit('canceluser')
            }
        }
    }
</script>
<style scoped>
    .increaseUser {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .return {
        width: 100%;
        padding-bottom: 20px;
    }

    .editList {
        display: flex;
        align-items: center;
        width: 500px;
        margin-bottom: 18px;
    }

    .listLeft {
        width: 110px;
        font-size: 13px;
        font-weight: 600;
    }

    .Required {
        position: relative;
        padding-left: 10px;
        box-sizing: border-box;
    }

    .Required::before {
        content: '*';
        position: absolute;
        font-size: 14px;
        left: 0;
        top: 4px;
        color: #ff4040;
    }

    .listRight {
        display: flex;
        align-items: center;
        flex: 1;
    }

    .listRight input {
        width: 100% !important;
    }

    .listRight button {
        padding: 8px 10px;
        font-size: 10px;
    }

    .companyLogo {
        width: 206px;
        height: 58px;
        margin-right: 20px;
    }

    .license {
        width: 206px;
        height: 103px;
        margin-right: 20px;
    }

    .operatBtn {
        display: flex;
        align-items: center;
        margin-top: 160px;
    }

    .operatBtn button {
        padding: 8px 30px;
        font-size: 13px;
    }

    .operatBtn button+button {
        margin-left: 30px;
    }
</style>