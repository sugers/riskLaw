<template>
    <section>
        <div class="laywerEdit">
            <div class="editList">
                <div class="listLeft Required">
                    <span>头像：</span>
                </div>
                <div class="listRight">
                    <div class="imageList avatarImg" v-for="(item,index) in avatarUrl" :key="index">
                        <i class="el-icon-circle-close" @click="deleteImg(avatarUrl,index)"></i>
                        <img :src="`${Ip}/${item}`" alt="">
                    </div>
                    <el-upload name="files" :action="`${Ip}/api/v1/file/upload`" :show-file-list="false" :limit="1"
                        :on-success="fileSuccess">
                        <div class="uploadBtn">
                            <i class="el-icon-upload"></i>
                            <span>上传</span>
                        </div>
                    </el-upload>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>姓名：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="dataObj.fullName" placeholder="请输入姓名"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>手机号码：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="dataObj.phonenumber" placeholder="请输入手机号码"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>邮箱地址：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="dataObj.email" placeholder="请输入邮箱地址"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>从业年限</span>
                </div>
                <div class="listRight">
                    <el-input v-model="dataObj.year" placeholder="请输入从业年限"></el-input>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>工作城市：</span>
                </div>
                <div class="listRight" style="flex-wrap:nowrap;">
                    <el-select v-model="dataObj.workProvince" slot="prepend" placeholder="请选择" @change="provinceClick">
                        <div v-for="(item,index) in provinceData" :key="index">
                            <el-option v-if="item.name!='总公司'" :label="item.name" :value="item.code">
                            </el-option>
                        </div>
                    </el-select>
                    <el-select v-model="dataObj.workCity" slot="prepend" placeholder="请选择">
                        <div v-for="(item,index) in cityData" :key="index">
                            <el-option :label="item.name" :value="item.code">
                            </el-option>
                        </div>
                    </el-select>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>职业证号：</span>
                </div>
                <div class="listRight">
                    <el-input v-model="dataObj.certCard" placeholder="请输入职业证号"></el-input>
                </div>
            </div>
            <div class="editList" style="align-items: flex-start;">
                <div class="listLeft Required">
                    <span>擅长领域：</span>
                </div>
                <div class="listRight fieldList">
                    <Select v-model="dataObj.fieldVal" multiple style="width:100%">
                        <Option v-for="item in fieldData" :value="item.code" :key="item.code">{{ item.name }}
                        </Option>
                    </Select>
                    <!-- <el-select v-model="dataObj.fieldVal" slot="prepend" multiple placeholder="请选择">
                        <el-option v-for="(item,index) in fieldData" :key="index" :label="item.name" :value="item.code">
                        </el-option>
                    </el-select> -->
                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>任职律所</span>
                </div>
                <div class="listRight">
                    <el-input v-model="dataObj.workCompany" placeholder="请输入任职律所"></el-input>
                </div>
            </div>
            <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>律师证：</span>
                </div>
                <div class="listRight">
                    <div class="imageList" v-for="(item,index) in lawyerCard" :key="index">
                        <i class="el-icon-circle-close" @click="deleteImg(lawyerCard,index)"></i>
                        <el-image style="width: 100px; height: 100px" :src="`${Ip}/${item}`"
                            :preview-src-list="srcList">
                        </el-image>
                    </div>
                    <el-upload name="files" :action="`${Ip}/api/v1/file/upload`" multiple :show-file-list="false"
                        :on-success="laywerSuccess">
                        <div class="uploadBtn">
                            <i class="el-icon-upload"></i>
                            <span>上传</span>
                        </div>
                    </el-upload>
                </div>
            </div>
            <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>个人简介：</span>
                </div>
                <div class="listRight">
                    <el-input type="textarea" resize='none' :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入个人简介"
                        v-model="dataObj.personalIntroduce">
                    </el-input>
                </div>
            </div>
            <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>曾经合作的客户：</span>
                </div>
                <div class="listRight">
                    <el-input type="textarea" resize='none' :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入客户"
                        v-model="dataObj.cooperative">
                    </el-input>
                </div>
            </div>
            <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>教育背景</span>
                </div>
                <div class="listRight">
                    <el-input type="textarea" resize='none' :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入教育背景"
                        v-model="dataObj.educationBg">
                    </el-input>
                </div>
            </div>
            <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>工作经历：</span>
                </div>
                <div class="listRight">
                    <el-input type="textarea" resize='none' :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入工作经历"
                        v-model="dataObj.workExperience">
                    </el-input>
                </div>
            </div>
            <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>文章著作：</span>
                </div>
                <div class="listRight">
                    <el-input type="textarea" resize='none' :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入作品"
                        v-model="dataObj.article">
                    </el-input>
                </div>
            </div>
            <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>社会职务：</span>
                </div>
                <div class="listRight">
                    <el-input type="textarea" resize='none' :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入社会职务"
                        v-model="dataObj.social">
                    </el-input>
                </div>
            </div>
            <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>兴趣爱好：</span>
                </div>
                <div class="listRight">
                    <el-input type="textarea" resize='none' :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入兴趣爱好"
                        v-model="dataObj.hobbie">
                    </el-input>
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
    import {
        GetfieldList,
        GetlawyerDetail,
        Editlawyer
    } from '../../../api/api.js';
    import provinces from "../../../../static/js/pca-code.json";
    export default {
        props: ['laywerId'],
        data() {
            return {
                Ip: '',
                currentId: '',
                fieldData: [],
                provinceData: [],
                cityData: [],
                avatarUrl: [],
                lawyerCard: [],
                srcList: [],
                dataObj: {
                    fullName: '',
                    phonenumber: '',
                    email: '',
                    year: '',
                    workProvince: '',
                    workCity: '',
                    certCard: '',
                    fieldVal: [],
                    workCompany: '',
                    personalIntroduce: '',
                    cooperative: '',
                    educationBg: '',
                    workExperience: '',
                    article: '',
                    social: '',
                    hobbie: ''
                }
            }
        },
        mounted() {
            this.Ip = this.$ip;
            this.init();
            this.getField();

        },
        methods: {
            init() {
                this.srcList = [];
                this.avatarUrl = [];
                this.lawyerCard = [];
                Object.assign(this.dataObj, {
                    fullName: '',
                    phonenumber: '',
                    email: '',
                    year: '',
                    workProvince: '',
                    workCity: '',
                    certCard: '',
                    fieldVal: [],
                    workCompany: '',
                    personalIntroduce: '',
                    cooperative: '',
                    educationBg: '',
                    workExperience: '',
                    article: '',
                    social: ''
                })
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
            provinceClick(e) {
                this.cityData = [];
                provinces.map((item) => {
                    if (item.code == e) {
                        this.dataObj.workCity = item.children[0].code
                        item.children.map((childitem) => {
                            this.cityData.push({
                                name: childitem.name,
                                code: childitem.code
                            });

                        })

                    }
                })

            },
            fileSuccess(res) {
                this.avatarUrl = [`${res.data[0]}`]
            },
            laywerSuccess(res) {
                this.lawyerCard.push(`${res.data[0]}`)
            },
            deleteImg(arr, index) {
                arr.splice(index, 1);
            },
            saveClick() {

                let data = {
                    id: this.laywerId,
                    name: this.dataObj.fullName,
                    phone: this.dataObj.phonenumber,
                    email: this.dataObj.email,
                    exp_years: Number(this.dataObj.year),
                    cert_number: this.dataObj.certCard,
                    adcode: Number(this.dataObj.workCity),
                    law_firm: this.dataObj.workCompany,
                    profile: this.dataObj.personalIntroduce,
                    customer: this.dataObj.cooperative,
                    edu_background: this.dataObj.educationBg,
                    work_exp: this.dataObj.workExperience,
                    article: this.dataObj.article,
                    social_duties: this.dataObj.social,
                    hobbies: this.hobbie,
                    avatar: this.avatarUrl ? this.avatarUrl[0] : `static/default.png`,
                    lawyer_card: this.lawyerCard,
                    field_expertises: this.dataObj.fieldVal
                }
                if (!data['name']) {
                    this.$Message.warning('请填写姓名');
                    return;
                } else if (!data['phone']) {
                    this.$Message.warning('请填写手机号');
                    return;
                } else if (!data['email']) {
                    this.$Message.warning('请填写邮箱地址');
                    return;
                } else if (!data['exp_years']) {
                    this.$Message.warning('请填写从业年限');
                    return;
                } else if (!data['adcode']) {
                    this.$Message.warning('请选择工作城市');
                    return;
                } else if (!data['cert_number']) {
                    this.$Message.warning('请填写执业证号');
                    return;
                } else if (!data['field_expertises']) {
                    this.$Message.warning('请选择擅长领域');
                    return;
                } else if (!data['law_firm']) {
                    this.$Message.warning('请填写任职律所');
                    return;
                }
                Editlawyer(data).then((res) => {
                    if (res.code == 200) {
                        this.$Message.success('编辑成功');
                        this.$emit('refresData');
                        this.init();
                    } else {
                        this.$Message.error(res.mag);
                        this.init();
                    }
                });

            },
            cancel() {
                this.$emit('cancelLawyer');
                this.init();
            },
            getEditInfo() {
                this.init()
                this.currentId = this.laywerId;
                let data = {
                    id: this.laywerId
                }
                GetlawyerDetail(data).then((res) => {
                    if (res.code == 200) {
                        let result = res.data;
                        let imagList = result.lawyer_card.split(',');
                        this.avatarUrl = [`${result.avatar}`];
                        this.lawyerCard = imagList;
                        let fieldArr = [];
                        imagList.forEach((item) => {
                            this.srcList.push(`${this.Ip}/${item}`)
                        })
                        result.field_expertises.forEach((item) => {
                            fieldArr.push(item.ID)
                        })
                        provinces.forEach((provinceitem) => {
                            this.provinceData.push({
                                name: provinceitem.name,
                                code: provinceitem.code
                            })
                            if (String(result.adcode).substring(0, 2) == provinceitem.code) {
                                provinceitem.children.map((item) => {
                                    this.cityData.push({
                                        name: item.name,
                                        code: item.code
                                    })
                                    if (item.code == result.adcode) {
                                        result.CityName = item.code
                                    }
                                })
                                result.ProvinName = provinceitem.code

                            }
                        })
                        Object.assign(this.dataObj, {
                            fullName: result.name,
                            phonenumber: result.phone,
                            email: result.email,
                            year: result.exp_years,
                            workProvince: result.ProvinName,
                            workCity: result.CityName,
                            certCard: result.cert_number,
                            fieldVal: fieldArr,
                            workCompany: result.law_firm,
                            personalIntroduce: result.profile,
                            cooperative: result.customer,
                            educationBg: result.edu_background,
                            workExperience: result.work_exp,
                            article: result.article,
                            social: result.social_duties,
                            hobbie: result.hobbies
                        })
                    }
                })
            },
        },
        watch: {

        }
    }
</script>
<style scoped>
    .laywerEdit {
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
        flex-wrap: wrap;
    }

    .listRight .imageList {
        display: flex;
        align-items: center;
        position: relative;
        margin-right: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
        box-shadow: 0px 0px 0px 1px #e5e5e5;
    }

    .listRight .avatarImg {
        margin-bottom: 0;
    }

    .listRight .imageList i {
        position: absolute;
        right: 4px;
        top: 4px;
        color: #F56C6C;
        font-size: 18px;
        z-index: 2;
        cursor: pointer;
    }

    .listRight .imageList img {
        width: 60px;
        height: 60px;
        border-radius: 4px;

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
    }

    .operatBtn button {
        padding: 8px 30px;
        font-size: 13px;
    }

    .operatBtn button+button {
        margin-left: 30px;
    }
</style>