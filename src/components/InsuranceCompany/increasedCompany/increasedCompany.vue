<template>
    <section>
        <div class="companyEdit">
            <!-- <div class="return">
                <el-page-header @back="goBack" content="新增公司">
                </el-page-header>
            </div> -->
            <div class="editList">
                <div class="listLeft Required">
                    <span>公司名称：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="companyName" placeholder="请输入公司名称"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>联系人：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="contacts" placeholder="请输入联系人"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>联系电话：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="contactPhonde" placeholder="请输入联系电话"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>状态：</span>
                </div>
                <div class="listRight">
                    <el-radio-group v-model="staturadio">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="0">禁用</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <!-- <div class="editList">
                <div class="listLeft Required">
                    <span>开通区域：</span>
                </div>
                <div class="listRight">
                    <el-select v-model="areaVal" slot="prepend" placeholder="请选择">
                        <el-option v-for="(item,index) in provinceData" :key="index" :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </div>
            </div> -->
            <div class="editList">
                <div class="listLeft Required">
                    <span>提成比例：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="commission" placeholder="请输入提成比例"></el-input>
                </div>
            </div>
            <!-- <div class="editList">
                <div class="listLeft">
                    <span>官网：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="officialWebsite" placeholder="请输入官网地址"></el-input>
                </div>
            </div> -->


            <!-- <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>营业执照：</span>
                </div>
                <div class="listRight">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" :limit="1">
                        <div class="uploadBtn">
                            <i class="el-icon-upload"></i>
                            <span>上传</span>
                        </div>
                    </el-upload>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>公司标识：</span>
                </div>
                <div class="listRight">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" :limit="1">
                        <div class="uploadBtn">
                            <i class="el-icon-upload"></i>
                            <span>上传</span>
                        </div>
                    </el-upload>
                </div>
            </div> -->
            <!-- <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>公司简介：</span>
                </div>
                <div class="listRight">
                    <el-input type="textarea" resize='none' :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入公司简介"
                        v-model="companyIntroduce">
                    </el-input>
                </div>
            </div> -->
            <div class="operatBtn">
                <el-button type="primary" @click="increaseClick">提交</el-button>
                <el-button type="info" @click="cancel">取消</el-button>
            </div>
        </div>
    </section>
</template>
<script>
    import {
        IncreaseInsurance,
    } from '../../../api/api.js';
    import provinces from "../../../../static/js/pca-code.json"
    export default {
        data() {
            return {
                companyName: '',
                contacts: '',
                staturadio: 1,
                contactPhonde: '',
                officialWebsite: '',
                areaVal: '',
                companyIntroduce: '',
                provinceData: [],
                commission: 1
            }
        },
        mounted() {

            provinces.forEach((item) => {
                this.provinceData.push({
                    'name': item.name,
                    "code": item.code
                })
            })
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            increaseClick() {
                let data = {
                    status: Number(this.staturadio),
                    name: this.companyName,
                    contact: this.contacts,
                    contact_tel: this.contactPhonde,
                    proportion: Number(this.commission)
                }
                if (!data['name']) {
                    this.$Message.warning('请填写公司名称');
                    return;
                } else if (!data['contact']) {
                    this.$Message.warning('请填写联系人');
                    return;
                } else if (!data['contact_tel']) {
                    this.$Message.warning('请填写联系电话');
                    return;
                } else if (!data['proportion']) {
                    this.$Message.warning('请填写提成比例');
                    return;
                }
                IncreaseInsurance(data).then((res) => {
                    if (res.code == 200) {
                        this.$Message.success('已新增成功');
                        this.$emit('updateData');
                        this.companyName = '';
                        this.contacts = '';
                        this.staturadio = 1;
                        this.contactPhonde = '';
                        this.officialWebsite = '';
                        this.areaVal = '';
                        this.companyIntroduce = '';
                        this.provinceData = [];
                        this.commission = 1
                    }
                })
            },
            cancel() {
                this.$emit('cancelModel')
            }
        }
    }
</script>
<style scoped>
    .companyEdit {
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
        width: 100px;
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

    .uploadBtn {
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-items: center;
        padding: 5px 10px;
        border-radius: 8px;
        border: 1px solid #DCDFE6;
        color: #409EFF;
    }

    .uploadBtn i {
        font-size: 18px;
        color: #409EFF;
        margin-right: 5px;
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