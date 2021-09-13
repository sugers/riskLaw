<template>
    <section>
        <div class="companyEdit">
            <!-- <div class="return">
                <el-page-header @back="goBack" content="编辑公司">
                </el-page-header>
          </div>
            <div class="editList">
                <div class="listLeft">
                    <span>公司标识：</span>
                </div>
                <div class="listRight">
                    <img class="companyLogo" src="../../../../static/img/logo.png" alt="">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" :limit="1">
                        <el-button size="small" type="primary">重新上传</el-button>
                    </el-upload>
                </div>
            </div> -->
            <div class="editList">
                <div class="listLeft Required">
                    <span>公司名称：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="dataObj.companyName" placeholder="请输入公司名称"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>联系人：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="dataObj.contacts" placeholder="请输入联系人"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>状态：</span>
                </div>
                <div class="listRight">
                    <el-radio-group v-model="dataObj.staturadio">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="0">禁用</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>联系电话：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="dataObj.contactPhonde" placeholder="请输入联系电话"></el-input>
                </div>
            </div>
             <div class="editList">
                 <div class="listLeft Required">
                     <span>提成比例：</span>
                 </div>
                 <div class="listRight">
                     <el-input v-model="dataObj.commission" placeholder="请输入提成比例"></el-input>
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
            <!-- <div class="editList">
                <div class="listLeft Required">
                    <span>开通区域：</span>
                </div>
                <div class="listRight">
                    <el-select v-model="areaVal" slot="prepend" placeholder="请选择">
                        <el-option label="餐厅名" value="1"></el-option>
                        <el-option label="订单号" value="2"></el-option>
                        <el-option label="用户电话" value="3"></el-option>
                    </el-select>
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
            <!-- <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>营业执照：</span>
                </div>
                <div class="listRight">
                    <img class="license" src="../../../../static/img/logo.png" alt="">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" :limit="1">
                        <el-button size="small" type="primary">重新上传</el-button>
                    </el-upload>
                </div>
            </div> -->
            <div class="operatBtn">
                <el-button type="primary" @click="saveClick">保存</el-button>
                <el-button type="info" @click="cancel">取消</el-button>
            </div>
        </div>
    </section>
</template>
<script>
     import {EditInsurance} from '../../../api/api.js';
    export default {
        props: ['currentText'],
        data() {
            return {
                dataObj:{
                    id:'',
                    companyName: '',
                    contacts: '',
                    staturadio: 1,
                    contactPhonde: '',
                    officialWebsite: '',
                    areaVal: '',
                    companyIntroduce: '',
                    commission:1
                }
            }
        },
        mounted() {
            
        },
        methods: {
            saveClick(){
                let data={
                    icco_id:Number(this.dataObj.id),
                    name:this.dataObj.companyName,
                    status:Number(this.dataObj.staturadio),
                    contact:this.dataObj.contacts,
                    contact_tel:this.dataObj.contactPhonde,
                    proportion:Number(this.dataObj.commission)
                }
                EditInsurance(data).then((res)=>{
                    if(res.code==200){
                        this.$Message.success('信息已更新');
                        this.$emit('updateData')
                    }
                })
            },
            cancel(){
                 this.$emit('cancelModel')
            }

        },
        watch: {
            currentText(newVal) {
                let currentData = JSON.parse(newVal);
                Object.assign(this.dataObj,{
                     id:currentData.ID,
                     companyName:currentData.name,
                     contacts: currentData.contact,
                     staturadio: currentData.status,
                     contactPhonde: currentData.contact_tel,
                     commission:currentData.proportion,
                     officialWebsite: '',
                     areaVal: '',
                     companyIntroduce: ''
                })
            }
        },
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