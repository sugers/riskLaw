<template>
    <el-scrollbar style="height: 100vh" :native="false" :noresize="false" ref="myscrollbar">
        <div class="aunif">
            <usersteps :csteps="csteps" :cstext="cstext" :number="number" />
            <div class="fromrevie">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">申请人基本信息</div>
                    </el-col>
                </el-row>
            </div>
            <div class="admreviewerss">
                <el-row>
                    <el-col :span="24">
                        <div class="martexts">
                            <p>申请人：</p>
                            <span>{{ tltle.salesman ? tltle.salesman : "" }}</span>
                        </div>
                        <div class="martexts">
                            <p>联系电话：</p>
                            <span>{{ tltle.phone ? tltle.phone : "" }}</span>
                        </div>
                        <div class="martexts">
                            <p>案由类型：</p>
                            <span>{{ case_type }}</span>
                        </div>
                        <div class="martexts">
                            <p>保险总公司：</p>
                            <span>{{ tltle.icco_name }}</span>
                        </div>
                        <div class="martexts">
                            <p>意向费率：</p>
                            <span>{{ tltle.intent_rate + "%" }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="fromrevie">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">投保人信息</div>
                    </el-col>
                </el-row>
            </div>
            <!-- 身份证 -->
            <div class="admreviewerss" v-if="this.userfilesz != null">
                <el-row>
                    <el-col :span="12">
                        <div class="martexts">
                            <p>姓名：</p>
                            <span>{{ usernamesfz.name }}</span>
                        </div>
                        <div class="martexts">
                            <p>性别：</p>
                            <span>{{ usernamesfz.sex }}</span>
                        </div>
                        <div class="martexts">
                            <p>出生日期：</p>
                            <span>{{ usernamesfz.csdate }}</span>
                        </div>
                        <div class="martexts">
                            <p>身份证号码：</p>
                            <span>
                                <span>{{ usernamesfz.idcard }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>住址：</p>
                            <span>
                                <span>{{ usernamesfz.address }}</span>
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <!-- <div class="bgimg" v-if="usersrces">
            <el-image
              :src="srcs"
              fit="contain"
              style="width: 207px; height: 292px"
              :preview-src-list="srcLists"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div> -->
                        <div style="padding-left: 50px">
                            <div class="policy">
                                <span>投保人附件:</span>
                                <!-- <span class="policy_btn">
                  <el-button class="policy_bton" type="primary" @click.prevent="alldown(userfilesz)"
                    >全部下载</el-button
                  >
                </span> -->
                                <!-- <span class="upload_btn">
                  <el-upload
                    name="files"
                    :show-file-list="false"
                    :on-success="handlePreview"
                    action="https://wx.haobofalv.com/api/v1/file/upload"
                    class="elupload"
                  >
                    <el-button
                      class="elupload_bton"
                      size="small"
                      type="primary"
                      @click.prevent="btnnumber(1)"
                      >点击上传</el-button
                    >
                  </el-upload>
                </span> -->
                            </div>
                            <div v-for="(item, ind) in userfilesz" :key="ind">
                                <div class="tyetext">
                                    <div class="textwen">
                                        <p class="ptextlei" :title="item.file_name">
                                            {{ item.file_name }}
                                        </p>
                                        <div class="btntext">
                                            <a :href="'https://wx.haobofalv.com/' + item.path"
                                                :download="item.file_name">下载</a>
                                            <div class="shan" @click="deletes(item.id, item.path)">
                                                删除
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <!-- 营业执照 -->
            <div class="admreviewerss" v-if="this.blicense != null">
                <el-row>
                    <el-col :span="12">
                        <div class="martexts">
                            <p>单位名称:</p>
                            <span>{{ userblicense.company }}</span>
                        </div>
                        <div class="martexts">
                            <p>地址:</p>
                            <span>{{ userblicense.adress }}</span>
                        </div>
                        <div class="martexts">
                            <p>实收资本:</p>
                            <span>{{ userblicense.paidup }}</span>
                        </div>
                        <div class="martexts">
                            <p>成立日期:</p>
                            <span>
                                <span>{{ userblicense.blishment }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>有效期:</p>
                            <span>
                                <span>{{ userblicense.validity }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>法人:</p>
                            <span>
                                <span>{{ userblicense.legal }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>注册资本:</p>
                            <span>
                                <span>{{ userblicense.register }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>登记机关:</p>
                            <span>
                                <span>{{ userblicense.authority }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>社会信用代码:</p>
                            <span>
                                <span>{{ userblicense.credit }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>税务登记号:</p>
                            <span>
                                <span>{{ userblicense.taxregis }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>类型:</p>
                            <span>
                                <span>{{ userblicense.deltype }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>组成形式:</p>
                            <span>
                                <span>{{ userblicense.sistion }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>经营范围:</p>
                            <span>
                                <span>{{ userblicense.business }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>证件编号:</p>
                            <span>
                                <span>{{ userblicense.ficate }}</span>
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <!-- <div class="bgimg" v-if="boolblisrcs">
              <el-image
                :src="srcs"
                fit="contain"
                style="width: 207px; height: 292px"
                :preview-src-list="srcLists"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div> -->
                        <div style="padding-left: 50px">
                            <div class="policy">
                                <span>投保人附件:</span>
                                <!-- <span class="policy_btn">
                  <el-button class="policy_bton" type="primary" @click.prevent="alldown(blicense)"
                    >全部下载</el-button
                  >
                </span> -->
                                <!-- <span class="upload_btn">
                  <el-upload
                    name="files"
                    :show-file-list="false"
                    :on-success="handlePreview"
                    action="https://wx.haobofalv.com/api/v1/file/upload"
                    class="elupload"
                  >
                    <el-button
                      class="elupload_bton"
                      size="small"
                      type="primary"
                      @click.prevent="btnnumber(2)"
                      >点击上传</el-button
                    >
                  </el-upload>
                </span> -->
                            </div>
                            <div v-for="(item, ind) in blicense" :key="ind">
                                <div class="tyetext">
                                    <div class="textwen">
                                        <p class="ptextlei" :title="item.file_name">
                                            {{ item.file_name }}
                                        </p>
                                        <div class="btntext">
                                            <a :href="'https://wx.haobofalv.com/' + item.path"
                                                :download="item.file_name">下载</a>
                                            <div class="shan" @click="deletes(item.id, item.path)">
                                                删除
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="fromrevie">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">起诉状信息</div>
                    </el-col>
                </el-row>
            </div>
            <div class="admreviewerss">
                <el-row>
                    <el-col :span="12">
                        <div class="martexts">
                            <p>原告姓名:</p>
                            <span>{{ complaint.plaintiff }}</span>
                        </div>
                        <!-- <div class="martexts">
              <p>原告联系电话:</p>
              <span>{{ complaint.iffphone }}</span>
            </div> -->
                        <div class="martexts">
                            <p>被告姓名:</p>
                            <span>{{ complaint.fendant }}</span>
                        </div>
                        <!-- <div class="martexts">
              <p>被告联系电话:</p>
              <span>
                <span>{{ complaint.fendphone }}</span>
              </span>
            </div> -->
                        <div class="martexts">
                            <p>案由类型:</p>
                            <span>
                                <span>{{ case_type }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>诉讼请求:</p>
                            <span>
                                <span>{{ complaint.claims }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>请求金额:</p>
                            <span>
                                <span>{{ complaint.amount }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>事实简要陈述:</p>
                            <span>{{ complaint.ocrevidence }}</span>
                        </div>

                        <!-- <div class="martexts">
              <p>事实与理由:</p>
              <span>
                <span>{{ complaint.reason }}</span>
              </span>
            </div>
            <div class="martexts">
              <p>诉讼法院:</p>
              <span>
                <span>{{ complaint.court }}</span>
              </span>
            </div>
            <div class="martexts">
              <p>起诉日期:</p>
              <span>
                <span>{{ complaint.suetime }}</span>
              </span>
            </div> -->
                    </el-col>
                    <el-col :span="12">
                        <!-- <div class="bgimg">
              <el-image
                v-if="lasrc"
                :src="lainsrc"
                fit="contain"
                style="width: 207px; height: 292px"
                :preview-src-list="lasrcs"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div> -->
                        <div style="padding-left: 50px">
                            <div class="policy">
                                <span>起诉状附件:</span>
                                <span class="policy_btn">
                                    <el-button class="policy_bton" type="primary" @click.prevent="alldown(3)">全部下载
                                    </el-button>
                                </span>
                                <!-- <span class="upload_btn">
                  <el-upload
                    name="files"
                    :show-file-list="false"
                    :on-success="handlePreview"
                    action="https://wx.haobofalv.com/api/v1/file/upload"
                    class="elupload"
                  >
                    <el-button
                      class="elupload_bton"
                      size="small"
                      type="primary"
                      @click.prevent="btnnumber(3)"
                      >点击上传</el-button
                    >
                  </el-upload>
                </span> -->
                            </div>
                            <div v-for="(item, ind) in plaintiff" :key="ind">
                                <div class="tyetext" v-if="txtplay">
                                    <div class="textwen">
                                        <p class="ptextlei" :title="item.file_name">
                                            {{ item.file_name }}
                                        </p>
                                        <div class="btntext">
                                            <a :href="'https://wx.haobofalv.com/' + item.path"
                                                :download="item.file_name">下载</a>
                                            <div class="shan" @click="deletes(item.id, item.path, ind)">
                                                删除
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="fromrevie">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">保全申请书</div>
                    </el-col>
                </el-row>
            </div>
            <div class="admreviewerss">
                <el-row>
                    <el-col :span="12">
                        <div class="martexts">
                            <p>保全申请书:</p>
                            <span>{{ preserveForm.preservename }}</span>
                        </div>
                        <div class="martexts">
                            <p>保全被申请书:</p>
                            <span>{{ preserveForm.preservebei }}</span>
                        </div>
                        <!-- <div class="martexts">
              <p>请求事项:</p>
              <span>{{ preserveForm.presitems }}</span>
            </div> -->
                        <div class="martexts">
                            <p>保全金额:</p>
                            <span>
                                <span>{{ preserveForm.pramount }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>保全标的:</p>
                            <span>
                                <span>{{ preserveForm.presmark }}</span>
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <!-- <div class="bgimg">
              <el-image
                v-if="baosrc"
                :src="baoinsrc"
                fit="contain"
                style="width: 207px; height: 292px"
                :preview-src-list="baosrcs"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div> -->
                        <div style="padding-left: 50px">
                            <div class="policy">
                                <span>保全申请书附件:</span>
                                <span class="policy_btn">
                                    <el-button class="policy_bton" type="primary" @click.prevent="alldown(4)">全部下载
                                    </el-button>
                                </span>
                                <!-- <span class="upload_btn">
                  <el-upload
                    name="files"
                    :show-file-list="false"
                    :on-success="handlePreview"
                    action="https://wx.haobofalv.com/api/v1/file/upload"
                    class="elupload"
                  >
                    <el-button
                      class="elupload_bton"
                      size="small"
                      type="primary"
                      @click.prevent="btnnumber(4)"
                      >点击上传</el-button
                    >
                  </el-upload>
                </span> -->
                            </div>
                            <div v-for="(item, ind) in preservation" :key="ind">
                                <div class="tyetext">
                                    <div class="textwen">
                                        <p class="ptextlei" :title="item.file_name">
                                            {{ item.file_name }}
                                        </p>
                                        <div class="btntext">
                                            <a :href="'https://wx.haobofalv.com/' + item.path"
                                                :download="item.file_name">下载</a>
                                            <div class="shan" @click="deletes(item.id, item.path, ind)">
                                                删除
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="fromrevie">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">附件材料</div>
                    </el-col>
                </el-row>
            </div>
            <div class="admreviewerss">
                <el-row>
                    <el-col :span="24">
                        <div class="marwers">
                            <p>证据材料：</p>
                            <div>
                                <div class="policy">
                                    <span class="policy_btn">
                                        <el-button class="policy_bton" type="primary" @click.prevent="alldown(5)">全部下载
                                        </el-button>
                                    </span>
                                    <!-- <span class="upload_btn">
                    <el-upload
                      name="files"  
                      :show-file-list="false"
                      :on-success="handlePreview"
                      action="https://wx.haobofalv.com/api/v1/file/upload"
                      class="elupload"
                    >
                      <el-button
                        class="elupload_bton"
                        size="small"
                        type="primary"
                        @click.prevent="btnnumber(5)"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </span> -->
                                </div>
                                <div class="listqishu">
                                    <span class="imgs" v-for="(item, ins) in testimony" :key="ins">
                                        <p class="ad_imgs_txt" :title="item.file_name">
                                            {{ item.file_name }}
                                        </p>
                                        <div class="btntext">
                                            <a :href="'https://wx.haobofalv.com/' + item.path"
                                                :download="item.file_name">下载</a>
                                            <div class="shan" @click="deletes(item.id, item.path)">
                                                删除
                                            </div>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="fromrevie">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content">法律意见书信息</div>
                    </el-col>
                </el-row>
            </div>
            <div class="admreviewerss">
                <el-row>
                    <el-col :span="24">
                        <div class="martexts">
                            <p>案件证据:</p>
                            <span>{{ internalForm.evidence }}</span>
                        </div>
                        <div class="martexts">
                            <p>法律依据:</p>
                            <span>{{ internalForm.basis }}</span>
                        </div>
                        <div class="martexts">
                            <p>备注:</p>
                            <span>
                                <span>{{ internalForm.notes }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>保险保额:</p>
                            <span>
                                <span>{{ internalForm.coverage }}</span>
                            </span>
                        </div>
                        <div class="martexts">
                            <p>拒绝承保原因:</p>
                            <span>
                                <span>{{ internalForm.process }}</span>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-scrollbar>
</template>

<script>
    // 引入js
    import {
        getInputValue
    } from "../../static/js/amountFormat.js";
    // 步骤条
    import usersteps from "../components/usersteps.vue";
    import "../../static/css/file_policy_style.less";
    import axios from 'axios';

    function csdatesr(res) {
        let date = res.substring(0, 4);
        let yant = res.substring(4, 6);
        let da = res.substring(6);
        res = date + "年" + yant + "月" + da + "日";
        return res;
    }

    function moneyDelete(num) {
        if (num && num != undefined && num != null) {
            let _num = num;
            _num = _num.toString();
            _num = _num.replace(/,/gi, "");
            return _num;
        } else {
            return num;
        }
    }
    // 引入api
    import {
        Casefile,
        Feedback,
        Reviewcase,
        Casetype
    } from "../api/api";
    export default {
        name: "adminfiedlook",
        components: {
            usersteps,
        },
        data() {
            return {
                number: "",
                divtaus: false,
                // 风险评估id
                evalid: "",
                // 身份证信息
                usernamesfz: {
                    name: "",
                    sex: "",
                    csdate: "",
                    idcard: "",
                    address: "",
                },
                // 营业执照信息
                userblicense: {
                    company: "",
                    adress: "",
                    paidup: "",
                    blishment: "",
                    validity: "",
                    legal: "",
                    register: "",
                    authority: "",
                    credit: "",
                    taxregis: "",
                    deltype: "",
                    sistion: "",
                    business: "",
                    ficate: "",
                },
                // 起诉状
                complaint: {
                    plaintiff: "",
                    // iffphone: "",
                    fendant: "",
                    // fendphone: "",
                    casetype: "",
                    claims: "",
                    amount: "",
                    ocrevidence: "",
                    // reason: "",
                    // court: "",
                    // suetime: "",
                },
                // 起诉状图片
                lainsrc: "",
                lasrcs: [],
                lasrc: true,
                // pdf文件
                complatxt: [],
                txtplay: true,
                // 保全申请书
                preserveForm: {
                    preservename: "",
                    preservebei: "",
                    presitems: "",
                    pramount: "",
                    presmark: "",
                },
                // 保全图片
                baoinsrc: "",
                baosrcs: [],
                baosrc: true,
                // 保全文件
                complatexts: [],
                btxtop: true,
                // 法律意见书
                internalForm: {
                    ocrevidence: "",
                    evidence: "",
                    basis: "",
                    notes: "",
                    coverage: "",
                    process: "",
                },
                dialogff: false,
                // 身份证
                userfilesz: "",
                usercaidfile: "",
                filescaid: true,
                usersrces: true,
                // 营业执照
                blicense: "",
                srcs: "",
                srcLists: [],
                usersfz: "",
                boolblidocx: true,
                boolblisrcs: true,

                tltle: "",
                case_type: "",
                company: "",
                // 起诉状
                plaintiff: [],
                // 保全申请书
                preservation: [],
                // 证据材料
                testimony: [],
                // 保全金额（重点）
                from: {
                    input: "",
                },
                // 标签页
                activeName: "first",
                // 快速反馈
                feedback: 1,
                // 小于500万显示
                lessthan: true,
                // 大于500万显示
                greaterthan: false,
                // 补充内容
                textarea: "",
                csteps: "",
                cstext: "",
                cty: "",
                https: "",
            };
        },
        created() {
            this.$nextTick(() => {
                this.$refs["myscrollbar"].wrap.scrollTop = document.body.scrollTop = 0;
            });
            this.reviewapi();

        },
        watch: {},
        methods: {
            // 任务查看api
            reviewapi() {
                var data = {
                    risk_eval_id: this.$route.query.data,
                };
                Reviewcase(data).then((res) => {
                    // console.log('oo',res.data);
                    if (res.code == 200) {
                        // this.dat = res.data
                        this.taskview(res.data);
                        this.csteps = res.data.review_records;
                        this.cstext = "查看";
                        this.number = res.data.number;

                        Casetype().then((res) => {
                            // console.log("案由", res.data);

                            // this.anyou = res.data;
                            for (let i = 0; i < res.data.length; i++) {
                                if (this.cty == res.data[i].ID) {
                                    this.case_type = res.data[i].name;
                                    // console.log("类型", this.case_type);
                                }
                            }
                        });
                    }
                });
            },
            taskview(dat) {
                // 风险评估id
                this.evalid = dat.id;
                this.cty = dat.case_type;

                console.log("dat", dat);
                this.csteps = dat.review_records;
                this.cteus = "0";

                let htts = process.env.VUE_APP_API_URL;
                this.https = htts
                console.log(htts);
                this.tltle = dat;
                // 身份证
                this.userfilesz = dat.files.id_card;
                // usernamesfz
                if (this.userfilesz != null) {
                    let caidfile = [];
                    let caidsrcs = [];
                    for (var t = 0; t < this.userfilesz.length; t++) {
                        let caid = this.userfilesz[t];
                        let cafi = caid.path.substring(caid.path.lastIndexOf(".") + 1);
                        if (cafi == "jpg" || cafi == "jpeg" || cafi == "png") {
                            caidsrcs.push(caid);
                        } else {
                            caidfile.push(caid);
                        }
                    }
                    if (caidfile.length != 0) {
                        this.usercaidfile = caidfile;
                        this.filescaid = true;
                    } else {
                        this.filescaid = false;
                    }
                    if (caidsrcs.length != 0) {
                        this.srcs = htts + "/" + caidsrcs[0].path;
                        this.srcLists.push(htts + "/" + caidsrcs[0].path);
                        this.usersrces = true;
                    } else {
                        this.usersrces = false;
                    }

                    this.usernamesfz.name = this.userfilesz[0].ocr.words_result.姓名.words;
                    this.usernamesfz.sex = this.userfilesz[0].ocr.words_result.性别.words;
                    this.usernamesfz.csdate = csdatesr(
                        this.userfilesz[0].ocr.words_result.出生.words
                    );
                    this.usernamesfz.idcard =
                        this.userfilesz[0].ocr.words_result.公民身份号码.words;
                    this.usernamesfz.address =
                        this.userfilesz[0].ocr.words_result.住址.words;
                }
                // 营业执照
                this.blicense = dat.files.business_license;
                if (this.blicense != null) {
                    let blidocx = [];
                    let blisrcs = [];
                    for (var h = 0; h < this.blicense.length; h++) {
                        let use = this.blicense[h];
                        let bugt = use.path.substring(use.path.lastIndexOf(".") + 1);
                        // console.log('bus',bugt);
                        if (bugt == "jpg" || bugt == "jpeg" || bugt == "png") {
                            blisrcs.push(use);
                        } else {
                            blidocx.push(use);
                        }
                    }

                    if (blidocx.length != 0) {
                        this.usersfz = blidocx;
                        this.boolblidocx = true;
                    } else {
                        this.boolblidocx = false;
                    }
                    if (blisrcs.length != 0) {
                        this.srcs = htts + "/" + blisrcs[0].path;
                        this.srcLists.push(htts + "/" + blisrcs[0].path);
                        this.boolblisrcs = true;
                    } else {
                        this.boolblisrcs = false;
                    }
                    // 单位名称: 地址: 实收资本: 成立日期: 有效期: 法人: 注册资本:
                    // 登记机关: 社会信用代码: 税务登记号: 类型: 组成形式:
                    // 经营范围: 证件编号:

                    this.userblicense.company =
                        this.blicense[0].ocr.words_result.单位名称.words;
                    this.userblicense.adress = this.blicense[0].ocr.words_result.地址.words;
                    this.userblicense.paidup =
                        this.blicense[0].ocr.words_result.实收资本.words;
                    this.userblicense.blishment =
                        this.blicense[0].ocr.words_result.成立日期.words;
                    this.userblicense.validity =
                        this.blicense[0].ocr.words_result.有效期.words;
                    this.userblicense.legal = this.blicense[0].ocr.words_result.法人.words;
                    this.userblicense.register =
                        this.blicense[0].ocr.words_result.注册资本.words;
                    this.userblicense.authority =
                        this.blicense[0].ocr.words_result.登记机关.words;
                    this.userblicense.credit =
                        this.blicense[0].ocr.words_result.社会信用代码.words;
                    this.userblicense.taxregis =
                        this.blicense[0].ocr.words_result.税务登记号.words;
                    this.userblicense.deltype =
                        this.blicense[0].ocr.words_result.类型.words;
                    this.userblicense.sistion =
                        this.blicense[0].ocr.words_result.组成形式.words;
                    this.userblicense.business =
                        this.blicense[0].ocr.words_result.经营范围.words;
                    this.userblicense.ficate =
                        this.blicense[0].ocr.words_result.证件编号.words;
                }
                // 起诉状图片
                if (dat.files.indictment) {
                    this.plaintiff = dat.files.indictment;
                }
                if (this.plaintiff != null) {
                    var k = [];
                    var z = [];
                    for (let p = 0; p < this.plaintiff.length; p++) {
                        console.log("path", this.plaintiff[p].path);
                        var s = this.plaintiff[p];
                        var na = s.path.substring(s.path.lastIndexOf(".") + 1);
                        if (na == "jpg" || na == "jpeg" || na == "png") {
                            k.push(htts + "/" + s.path);
                        } else {
                            z.push(s);
                        }
                    }
                    if (k.length != 0) {
                        this.lainsrc = k[0];
                        this.lasrcs = k;
                    } else {
                        this.lasrc = false;
                    }
                    if (z.length != 0) {
                        this.complatxt = z;
                    } else {
                        this.txtplay = false;
                    }
                }

                if (dat.files.preservation) {
                    this.preservation = dat.files.preservation;
                }
                if (this.preservation != null) {
                    var bo = [];
                    var u = [];
                    for (let e = 0; e < this.preservation.length; e++) {
                        console.log("path", this.preservation[e].path);
                        var st = this.preservation[e];
                        var ns = st.path.substring(st.path.lastIndexOf(".") + 1);
                        if (ns == "jpg" || ns == "jpeg" || ns == "png") {
                            bo.push(htts + "/" + st.path);
                        } else {
                            u.push(st);
                        }
                    }
                    if (bo.length != 0) {
                        this.baoinsrc = bo[0];
                        this.baosrcs = bo;
                    } else {
                        this.baosrc = false;
                    }
                    if (u.length != 0) {
                        this.complatexts = u;
                    } else {
                        this.btxtop = false;
                    }
                }
                this.testimony = dat.files.testimony;
                // 上一步得数据
                let valinfo = dat.eval_info_json;
                if (valinfo.preserveForm) {
                    this.preserveForm = valinfo.preserveForm;
                }
                if (valinfo.complaint) {
                    this.complaint = valinfo.complaint;
                }
                if (valinfo.internalForm) {
                    this.internalForm = valinfo.internalForm;
                }
            },
            userdeletes() {
                var data = {
                    risk_eval_file_id: this.valid,
                    path: this.datpath,
                };
                Casefile(data)
                    .then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                showClose: true,
                                message: "删除成功",
                                type: "success",
                            });
                        }
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$message({
                            showClose: true,
                            message: "删除失败",
                            type: "error",
                        });
                    });
                this.divtaus = false;
                this.$emit("funcs");
            },
            anniu() {
                this.dialogff = true;
            },
            handle() {
                this.divtaus = false;
                this.dialogff = false;
            },
            // 快速反馈
            userediochan(data) {
                if (data != 3) {
                    this.textarea = "";
                }
            },
            // 删除按钮
            deletes(val, dat) {
                // console.log(val, dat);
                this.divtaus = true;
                this.valid = val;
                this.datpath = dat;
                this.$confirm("确定删除吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        this.userdeletes();
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                    })
                    .catch(() => {
                        console.log("否");
                        this.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            },
            // 输入失去聚焦给千分位
            inputMoney(el, name) {
                // console.log(this.from.input);
                this.from[name] = getInputValue(el);
            },
            userinputmon() {
                var timer = setTimeout(() => {
                    let ind = Number(moneyDelete(this.from.input));
                    console.log(ind);
                    if (ind >= 5000000) {
                        console.log("大于500万");
                        this.greaterthan = true;
                        this.lessthan = false;
                        this.feedback = 4;
                    } else if (ind < 5000000) {
                        console.log("小于500万");
                        this.lessthan = true;
                        this.greaterthan = false;
                        this.feedback = 1;
                    }

                    clearInterval(timer);
                }, 500);
            },
            // 快速反馈按钮
            through(a) {
                if (a == 1) {
                    if (this.from.input) {
                        var data = {
                            risk_eval_id: this.evalid,
                            stage: this.feedback,
                            amount: Number(moneyDelete(this.from.input)),
                            opinion: this.textarea,
                        };
                        console.log("拿到的数据", data);
                        // 调用接口
                        Feedback(data)
                            .then((res) => {
                                if (res.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: "提交成功",
                                        type: "success",
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                this.$message({
                                    showClose: true,
                                    message: "提交失败",
                                    type: "error",
                                });
                            });
                    } else {
                        this.$message({
                            showClose: true,
                            message: "保险金额不能为空",
                            type: "error",
                        });
                    }
                    this.$emit("kuai");
                    this.$emit("func");
                } else if (a == 0) {
                    this.$emit("func");
                }
            },
            alldown(dat) {
                // console.log('data',data);
                // 3.起诉状；4.保全申请书；5.证据材料
                let url = this.https + '/api/v1/admin/review/case/download'
                let data = {
                    risk_eval_id: this.evalid,
                    type: dat
                }
                axios(
                    url, {
                        params: {
                            ...data
                        },
                        responseType: 'blob'
                    },
                ).then(res => {
                    // console.log(res);
                    let url = URL.createObjectURL(new Blob([res.data]));
                    let filename = window.decodeURI(res.headers['content-disposition'].split('=')[1], "UTF-8");
                    let filenames = filename.replace("\"", "").replace("\"", "");
                    let files = document.createElement('a');
                    files.href = url
                    files.download = filenames
                    files.click()
                })
            },
            // btnclicks(dat) {
            //   var tempwindow = window.open("_blank"); // 先打开页面
            //   tempwindow.location = "https://wx.haobofalv.com/" + dat;
            // },
        },
    };
</script>

<style lang="less" scoped>
    .aunif {
        width: 1200px;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 40px;
        box-shadow: 2px 1px 5px #d1d1d1 !important;

        .fromrevie {
            margin-top: 20px;

            .grid-content {
                background-color: #d1e2f8;
                padding: 5px;
                font-size: 18px;
                font-weight: 600;
            }
        }

        .admreviewerss {
            margin-top: 10px;

            .el-row {
                padding-left: 20px;
                padding-right: 20px;

                .el-tabs {
                    height: 200px;
                }

                .shenhe {
                    // text-align: center;
                    margin-left: 20px;

                    .el-button {
                        border: 0;
                        margin: 10px 30px;
                        padding: 9px 20px;
                    }
                }
            }

            .martexts {
                display: flex;

                p {
                    min-height: 25px;
                    line-height: 36px;
                    margin: 0;
                    min-width: 140px;
                    font-size: 15px;
                    // color: #606266;
                }

                span {
                    width: 300px;
                    line-height: 36px;
                    font-size: 16px;
                    color: #606266;
                }

                .imgs {
                    display: flex;
                    align-items: center;
                    margin-bottom: 15px;

                    .el-image {
                        display: flex;
                        background-color: #bbbbbb;
                        align-items: center;
                        justify-content: center;
                    }

                    .ad_imgs_txt {
                        width: 200px;
                        margin: 0;
                        color: #5162f8;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .btntext {
                        display: flex;
                        justify-content: space-evenly;
                        width: 150px;

                        a:link,
                        a:visited,
                        a:hover,
                        a:active {
                            text-decoration: none;
                            color: #5162f8;
                        }

                        .shan {
                            cursor: pointer;
                            color: #f03333;
                        }
                    }
                }

                .listqishu {
                    display: flex;
                    flex-direction: column;
                }
            }

            .marwers {
                display: flex;

                p {
                    width: 115px;
                    margin: 0;
                    // margin-right: 35px;
                }

                .listqishu {
                    display: flex;
                    flex-direction: column;
                    padding: 0 10px;

                    .imgs {
                        display: flex;
                        width: 800px;
                        margin-bottom: 20px;

                        .ad_imgs_txt {
                            width: 360px;
                            margin: 0;
                            color: #5162f8;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        .btntext {
                            display: flex;
                            justify-content: space-evenly;
                            width: 150px;

                            a:link,
                            a:visited,
                            a:hover,
                            a:active {
                                text-decoration: none;
                                color: #5162f8;
                            }

                            .shan {
                                cursor: pointer;
                                color: #f03333;
                            }
                        }
                    }
                }
            }

            .bgimg {
                display: flex;
                justify-content: flex-end;

                .el-image {
                    display: flex;
                    background-color: #bbbbbb;
                    align-items: center;
                    justify-content: center;
                }
            }

            .tabpane {
                display: flex;

                .radiogroup {
                    margin-left: 20vw;
                    margin-top: 29px;

                    .textinput {
                        display: flex;
                        align-items: center;
                    }
                }
            }

            .tyetext {
                display: flex;

                // justify-content: flex-end;
                .textwen {
                    display: flex;
                    // width: 200px;
                    align-items: center;
                    margin-bottom: 20px;

                    .ptextlei {
                        max-width: 300px;
                        margin: 0;
                        color: #5162f8;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .btntext {
                        display: flex;
                        justify-content: space-evenly;
                        width: 150px;

                        a:link,
                        a:visited,
                        a:hover,
                        a:active {
                            text-decoration: none;
                            color: #5162f8;
                        }

                        .shan {
                            cursor: pointer;
                            color: #f03333;
                        }
                    }
                }
            }
        }
    }
</style>