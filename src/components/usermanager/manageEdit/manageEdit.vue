<template>
    <section>
        <div class="userEdit">
            <!-- <div class="return">
                <el-page-header @back="goBack" content="编辑用户">
                </el-page-header>
            </div> -->

            <!-- <div class="editList">
                <div class="listLeft">
                    <span>用户名：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="userName" placeholder="请输入用户名"></el-input>
                </div>
            </div> -->
            <!-- <div class="editList">
                <div class="listLeft">
                    <span>角色：</span>
                </div>
                <div class="listRight">
                    <el-radio-group v-model="roleradio">
                        <el-radio :label="0">管理员</el-radio>
                        <el-radio :label="1">财务</el-radio>
                    </el-radio-group>
                </div>
            </div> -->
            <div class="editList">
                <div class="listLeft">
                    <span>姓名：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="fullName" placeholder="请输入姓名"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>密码：</span>
                </div>
                <div class="listRight">
                    <el-input type="password" v-model="passwordval" placeholder="请输入密码"></el-input>
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

            <!-- <div class="editList">
                <div class="listLeft">
                    <span>确认密码：</span>
                </div>
                <div class="listRight">
                    <el-input type="password" v-model="comfirmdval" placeholder="请输入密码"></el-input>
                </div>
            </div> -->

            <!-- <div class="editList">
                <div class="listLeft">
                    <span>所属保险公司：</span>
                </div>
                <div class="listRight">
                    <el-select v-model="BelongInsurance" slot="prepend" placeholder="请选择">
                        <el-option v-for="(item,index) in insuranceDta" :key="index" :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </div>
            </div> -->
            <div class="editList">
                <div class="listLeft">
                    <span>账号状态：</span>
                </div>
                <div class="listRight">
                    <el-radio-group v-model="staturadio">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="0">禁用</el-radio>
                    </el-radio-group>
                </div>
            </div>

            <div class="operatBtn">
                <el-button type="primary" @click="saveClick">保存</el-button>
                <el-button type="info" @click="cancel">取消</el-button>
            </div>
        </div>
    </section>
</template>
<script>
    // import provinces from "../../../../static/js/pca-code.json"
    import {
        GetinsuranceList,
        Edituser
    } from '../../../api/api.js';
    export default {
        props: ['currentText'],
        data() {
            return {
                userID: '',
                fullName: '',
                userName: '',
                roleradio: 0,
                staturadio: 1,
                passwordval: '',
                comfirmdval: '',
                BelongInsurance: '',
                contactPhonde: '',
                Text: '',
                insuranceDta: []
            }
        },
        mounted() {
            this.GetInsurance();
        },
        methods: {
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
                        })
                    }

                })
            },
            saveClick() {
                let data = {
                    id: this.userID,
                    name: this.fullName,
                    password: this.passwordval,
                    phone: this.contactPhonde,
                    status: Number(this.staturadio)
                }
                Edituser(data).then((res) => {
                    if (res.code == 200) {
                        this.$Message.success('编辑成功');
                        this.$emit('updateuserData');
                    }

                })
                console.log(data)
            },
            cancel() {
                this.$emit('canceluser')
            }
        },
        watch: {
            currentText(newVal) {
                let currentVal = JSON.parse(newVal)
                this.userID = currentVal.ID;
                this.userName = currentVal.username;
                this.passwordval = '';
                this.BelongInsurance = currentVal.icco_id == 0 ? '' : currentVal.icco_id;
                this.staturadio = currentVal.status;
                this.fullName = currentVal.name;
                this.contactPhonde = currentVal.phone
            },
        },
    }
</script>
<style scoped>
    .userEdit {
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