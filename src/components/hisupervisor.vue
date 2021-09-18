<template>
  <el-scrollbar
    style="height: 100vh"
    :native="false"
    :noresize="false"
    ref="myscrollbar"
  >
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
              <p>标题：</p>
              <el-input
                style="width: 400px"
                size="medium"
                v-model="usertitle"
                placeholder="请输入内容"
              ></el-input>
            </div>
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
              <span>{{ tltle.intent_rate + "‰" }}</span>
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
      <div class="admreviewerss" v-if="this.insured_type == 1">
        <el-row>
          <el-col :span="12">
            <div class="martexts">
              <el-button
                class="tianbtn"
                type="primary"
                @click.prevent="anniu(-1)"
                >填写核实</el-button
              >
            </div>
            <el-form
              ref="cardForm"
              :model="usernamesfz"
              label-width="auto"
              style="width: 540px"
              size="medium"
            >
              <el-form-item label="姓名：" :required="true">
                <el-input
                  v-model="usernamesfz.name"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别：">
                <el-input
                  v-model="usernamesfz.sex"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="出生日期：">
                <el-input
                  v-model="usernamesfz.csdate"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份证号码：">
                <el-input
                  v-model="usernamesfz.idcard"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="住址：">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  v-model="usernamesfz.address"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div style="padding-left: 50px">
              <div class="policy">
                <span>投保人附件:</span>
                <!-- <span class="policy_btn">
                  <el-button class="policy_bton" type="primary" @click.prevent="alldown(userfilesz)"
                    >全部下载</el-button
                  >
                </span> -->
                <span class="upload_btn">
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
                </span>
              </div>
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
              <Comimageviewer
                :visible.sync="showViewer"
                :url="srcListsurl"
              ></Comimageviewer>
              <div v-for="(item, indt) in usernamesfzimg" :key="indt">
                <div class="tyetext" v-if="usersrces">
                  <div class="textwen">
                    <p
                      class="ptextleis"
                      :title="item.file_name"
                      @click="onopensfz(indt)"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div class="shan" @click="deletes(item.id, item.path)">
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-for="(item, ind) in usercaidfile" :key="ind">
                <div class="tyetext" v-if="filescaid">
                  <div class="textwen">
                    <p
                      class="ptextlei"
                      :style="
                        item.path
                          .substring(item.path.lastIndexOf('.') + 1)
                          .toLowerCase() == 'pdf'
                          ? 'color: #5162f8;cursor: pointer;'
                          : 'color:#000'
                      "
                      @click="btnclicks(item.path)"
                      :title="item.file_name"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
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
      <div class="admreviewerss" v-if="this.insured_type == 2">
        <el-row>
          <el-col :span="12">
            <div class="martexts">
              <el-button
                class="tianbtn"
                type="primary"
                @click.prevent="anniu(0)"
                >填写核实</el-button
              >
            </div>
            <el-form
              ref="userblicense"
              :model="userblicense"
              label-width="auto"
              style="width: 540px"
              size="medium"
            >
              <el-form-item label="单位名称:" :required="true">
                <el-input
                  v-model="userblicense.company"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="地址:">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  v-model="userblicense.adress"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="实收资本:">
                <el-input
                  v-model="userblicense.paidup"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="成立日期:">
                <el-input
                  v-model="userblicense.blishment"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="有效期:">
                <el-input
                  v-model="userblicense.validity"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="法人:">
                <el-input
                  v-model="userblicense.legal"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="注册资本:">
                <el-input
                  v-model="userblicense.register"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="登记机关:">
                <el-input
                  v-model="userblicense.authority"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="社会信用代码:">
                <el-input
                  v-model="userblicense.credit"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="税务登记号:">
                <el-input
                  v-model="userblicense.taxregis"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="类型:">
                <el-input
                  v-model="userblicense.deltype"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="组成形式:">
                <el-input
                  v-model="userblicense.sistion"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="经营范围:">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5 }"
                  v-model="userblicense.business"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="证件编号:">
                <el-input
                  v-model="userblicense.ficate"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div style="padding-left: 50px">
              <div class="policy">
                <span>投保人附件:</span>
                <!-- <span class="policy_btn">
                  <el-button class="policy_bton" type="primary" @click.prevent="alldown(blicense)"
                    >全部下载</el-button
                  >
                </span> -->
                <span class="upload_btn">
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
                </span>
              </div>
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
              <Comimageviewer
                :visible.sync="showViewer"
                :url="srcListsurl"
              ></Comimageviewer>
              <div v-for="(item, index) in blisrced" :key="index">
                <div class="tyetext" v-if="boolblisrcs">
                  <div class="textwen">
                    <p
                      class="ptextleis"
                      :title="item.file_name"
                      @click="onPreview(index)"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div class="shan" @click="deletes(item.id, item.path)">
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-for="(item, ind) in usersfz" :key="ind">
                <div class="tyetext" v-if="boolblidocx">
                  <div class="textwen">
                    <p
                      class="ptextlei"
                      :style="
                        item.path
                          .substring(item.path.lastIndexOf('.') + 1)
                          .toLowerCase() == 'pdf'
                          ? 'color: #5162f8;cursor: pointer;'
                          : 'color:#000'
                      "
                      @click="btnclicks(item.path)"
                      :title="item.file_name"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
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
              <el-button
                class="tianbtn"
                type="primary"
                @click.prevent="anniu(1)"
                >填写核实</el-button
              >
            </div>
            <el-form
              ref="complaint"
              :model="complaint"
              label-width="auto"
              style="width: 540px"
              size="medium"
            >
              <el-form-item label="原告姓名：" :required="true">
                <el-input
                  v-model="complaint.plaintiff"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="原告联系电话：">
                <el-input
                  v-model="complaint.iffphone"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item> -->
              <el-form-item label="被告姓名：" :required="true">
                <el-input
                  @input="mattin"
                  v-model="complaint.fendant"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="被告联系电话：">
                <el-input
                  v-model="complaint.fendphone"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item> -->
              <el-form-item label="案由类型：" :required="true">
                <el-input
                  v-model="complaint.casetype"
                  placeholder="请输入内容"
                ></el-input>
                <!-- <el-select v-model="complaint.casetype" placeholder="请选择">
                  <el-option
                    v-for="item in anyou"
                    :key="item.ID"
                    :label="item.name"
                    :value="item.ID"
                  >
                  </el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="诉讼请求：" :required="true">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5 }"
                  v-model="complaint.claims"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item
                style="width: 800px"
                label="请求金额："
                :required="true"
              >
                <el-input
                  style="width: 200px"
                  v-model="complaint.amount"
                  @blur="inputMoneys($event, 'amount')"
                  @input="userinputmon"
                  placeholder="请输入全额"
                ></el-input>
                元&nbsp;&nbsp;<span style="color: red">{{ plaintrmb }}</span>
              </el-form-item>
              <el-form-item label="事实简要陈述：" :required="true">
                <el-input
                  type="textarea"
                  style="width: 400px"
                  :autosize="{ minRows: 3 }"
                  v-model="complaint.ocrevidence"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="事实与理由：">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5 }"
                  v-model="complaint.reason"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item> -->
              <!-- <el-form-item label="诉讼法院：">
                <el-input
                  v-model="complaint.court"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item> -->
              <!-- <el-form-item label="起诉日期：">
                <el-input
                  v-model="complaint.suetime"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item> -->
            </el-form>
          </el-col>
          <el-col :span="12">
            <div style="padding-left: 50px">
              <div class="policy">
                <span>起诉状附件:</span>
                <span class="policy_btn">
                  <el-button
                    class="policy_bton"
                    type="primary"
                    :loading="qisloading"
                    @click.prevent="alldown(3)"
                    >全部下载</el-button
                  >
                </span>
                <span class="upload_btn">
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
                </span>
              </div>
              <!-- <div class="bgimg" v-if="slasrc">
                <el-image
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
              <!-- 图片 -->
              <Comimageviewer
                :visible.sync="plaintiffimg"
                :url="plaintiffurl"
              ></Comimageviewer>
              <div v-for="(item, ind) in plaintiffage" :key="ind">
                <div class="tyetext" v-if="slasrc">
                  <div class="textwen">
                    <p
                      class="ptextleis"
                      :title="item.file_name"
                      @click="qisuopenViewer(ind)"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div class="shan" @click="deletes(item.id, item.path)">
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-for="(item, index) in complatxt" :key="index">
                <div class="tyetext" v-if="txtplay">
                  <div class="textwen">
                    <p
                      class="ptextlei"
                      :style="
                        item.path
                          .substring(item.path.lastIndexOf('.') + 1)
                          .toLowerCase() == 'pdf'
                          ? 'color: #5162f8;cursor: pointer;'
                          : 'color:#000'
                      "
                      @click="btnclicks(item.path)"
                      :title="item.file_name"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
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
            <div class="grid-content">保全申请书</div>
          </el-col>
        </el-row>
      </div>
      <div class="admreviewerss">
        <el-row>
          <el-col :span="12">
            <div class="martexts">
              <el-button
                class="tianbtn"
                type="primary"
                @click.prevent="anniu(2)"
                >填写核实</el-button
              >
            </div>
            <el-form
              ref="preserveForm"
              :model="preserveForm"
              label-width="auto"
              style="width: 540px"
              size="medium"
            >
              <el-form-item label="保全申请人：" :required="true">
                <el-input
                  v-model="preserveForm.preservename"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="保全被申请人：" :required="true">
                <el-input
                  v-model="preserveForm.preservebei"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>

              <!-- <el-form-item label="请求事项：">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  v-model="preserveForm.presitems"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item> -->
              <el-form-item
                style="width: 800px"
                label="保全金额："
                :required="true"
              >
                <el-input
                  style="width: 200px"
                  v-model="preserveForm.pramount"
                  @blur="inputMoneyss($event, 'pramount')"
                  @input="userinputmon"
                  size="small"
                  placeholder="请输入全额"
                ></el-input>
                元&nbsp;&nbsp;<span style="color: red">{{ pramountrmb }}</span>
              </el-form-item>
              <el-form-item label="保全标的：" :required="true">
                <el-input
                  v-model="preserveForm.presmark"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div style="padding-left: 50px">
              <div class="policy">
                <span>保全申请书附件:</span>
                <span class="policy_btn">
                  <el-button
                    class="policy_bton"
                    type="primary"
                    :loading="sqloading"
                    @click.prevent="alldown(4)"
                    >全部下载</el-button
                  >
                </span>
                <span class="upload_btn">
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
                </span>
              </div>
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
              <!-- 图片 -->

              <Comimageviewer
                :visible.sync="preserimg"
                :url="preserimgurl"
              ></Comimageviewer>
              <div v-for="(item, index) in preserimgs" :key="index">
                <div class="tyetext" v-if="baosrc">
                  <div class="textwen">
                    <p
                      class="ptextleis"
                      :title="item.file_name"
                      @click="bqopenViewer(index)"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div class="shan" @click="deletes(item.id, item.path)">
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-for="(item, ind) in complatexts" :key="ind">
                <div class="tyetext" v-if="btxtop">
                  <div class="textwen">
                    <p
                      class="ptextlei"
                      :style="
                        item.path
                          .substring(item.path.lastIndexOf('.') + 1)
                          .toLowerCase() == 'pdf'
                          ? 'color: #5162f8;cursor: pointer;'
                          : 'color:#000'
                      "
                      @click="btnclicks(item.path)"
                      :title="item.file_name"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
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
            <div class="grid-content">附件材料</div>
          </el-col>
        </el-row>
      </div>
      <div class="admreviewerss">
        <el-row>
          <el-col :span="24">
            <div class="marwers">
              <p class="marwers_p">证据材料：</p>
              <div>
                <div class="policy">
                  <span class="policy_btn">
                    <el-button
                      class="policy_bton"
                      type="primary"
                      :loading="zjloading"
                      @click.prevent="alldown(5)"
                      >全部下载</el-button
                    >
                  </span>
                  <span class="upload_btn">
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
                  </span>
                </div>

                <!-- <div class="listqiimg">
                  <span class="imgs" v-if="monyimg">
                    <div
                      style="padding: 0 10px"
                      v-for="(item, ind) in timonsrc"
                      :key="ind"
                    >
                      <el-image
                        :src="'https://wx.haobofalv.com/' + item.path"
                        fit="contain"
                        style="width: 207px; height: 292px"
                        :preview-src-list="[
                          'https://wx.haobofalv.com/' + item.path,
                        ]"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div class="btntext" style="width: 207px">
                        <a
                          href="javascript:void(0)"
                          @click="btnclicks(item.path)"
                          >下载</a
                        >
                        <div class="shan" @click="deletes(item.id, item.path)">
                          删除
                        </div>
                      </div>
                    </div>
                  </span>
                </div> -->

                <div class="listqishu" v-if="monyimg">
                  <Comimageviewer
                    :visible.sync="textmonyimg"
                    :url="testmonyurl"
                  ></Comimageviewer>
                  <span class="imgs" v-for="(item, ins) in timonsrc" :key="ins">
                    <p
                      class="ad_imgs_txts"
                      :title="item.file_name"
                      @click="zjopenmony(ins)"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div class="shan" @click="deletes(item.id, item.path)">
                        删除
                      </div>
                    </div>
                  </span>
                </div>

                <div class="listqishu" v-if="monyfile">
                  <span
                    class="imgs"
                    v-for="(item, ind) in timonfile"
                    :key="ind"
                  >
                    <p
                      class="ad_imgs_txt"
                      :style="
                        item.path
                          .substring(item.path.lastIndexOf('.') + 1)
                          .toLowerCase() == 'pdf'
                          ? 'color: #5162f8;cursor: pointer;'
                          : 'color:#000'
                      "
                      @click="btnclicks(item.path)"
                      :title="item.file_name"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
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
            <el-form
              ref="internalForm"
              :model="internalForm"
              label-width="auto"
              style="width: 540px"
              size="medium"
            >
              <el-form-item label="案件证据：" :required="true">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  v-model="internalForm.evidence"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>

              <el-form-item label="同意承保法律依据：" :required="true">
                <el-input
                  v-model="internalForm.basis"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item label="同意承保备注：" :required="true">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  v-model="internalForm.notes"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
              <el-form-item
                style="width: 800px"
                label="保险金额："
                :required="true"
              >
                <el-input
                  style="width: 200px"
                  v-model="internalForm.coverage"
                  @blur="inputMoney($event, 'coverage')"
                  @input="userinputmon"
                  size="small"
                  placeholder="请输入全额"
                ></el-input>
                元&nbsp;&nbsp;<span style="color: red">{{ fromrmb }}</span>
              </el-form-item>
              <el-form-item label="拒绝承保原因：" :required="true">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  v-model="internalForm.process"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="admreviewerss">
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName">
              <el-tab-pane label="流程操作" name="first">
                <div class="tabpane">
                  <div>
                    <div style="margin-bottom: 10px">选择下一步</div>
                    <div>
                      <el-radio-group v-model="feedback" @change="userediochan">
                        <el-radio v-if="radioff" :label="1"
                          >生成法律意见书</el-radio
                        >
                        <el-radio v-if="radionn" :label="2"
                          >提交上级复核</el-radio
                        >
                      </el-radio-group>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <!-- <el-tab-pane label="流程日志" name="second"
                >暂无</el-tab-pane
              > -->
            </el-tabs>
            <!-- 审核按钮 -->
            <div class="shenhe">
              <el-button type="primary" @click.prevent="through(1)"
                >确定</el-button
              >
              <!-- <el-button
                type="primary"
                @click.prevent="through(0)"
                style="background-color: #bbbbbb"
                >取消</el-button
              > -->
            </div>
          </el-col>
        </el-row>
      </div>

      <el-dialog
        width="90%"
        center
        :visible.sync="dialogff"
        :before-close="handle"
        :append-to-body="true"
        class="eldisalog"
      >
        <div>
          <div class="fromrevie">
            <el-row>
              <el-col :span="24">
                <div class="gir-text">
                  <div class="grid-content" v-show="filesusers">身份证</div>
                  <div class="grid-content" v-show="filesstore">营业执照</div>
                  <div class="grid-content" v-show="filesocruse">起诉状</div>
                  <div class="grid-content" v-show="filesparese">
                    保全申请书
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="admreviewerss" v-show="filesocruse">
            <el-row>
              <el-col :span="14">
                <el-tabs
                  style="width: 587px; margin: 0 auto"
                  v-model="activepane"
                >
                  <el-tab-pane label="文本信息" name="textocr">
                    <el-carousel
                      :autoplay="false"
                      height="650px"
                      style="margin: 0 auto"
                    >
                      <el-carousel-item v-for="item in jpgocr" :key="item.id">
                        <div style="width: 470px" v-html="item"></div>
                      </el-carousel-item>
                    </el-carousel>
                  </el-tab-pane>

                  <el-tab-pane label="图片" name="paneimg">
                    <el-carousel
                      :autoplay="false"
                      height="650px"
                      style="margin: 0 auto"
                    >
                      <el-carousel-item>
                        <div
                          style="width: 470px"
                          v-for="(item, ind) in lasrcs"
                          :key="ind"
                        >
                          <el-image :src="item"></el-image>
                        </div>
                      </el-carousel-item>
                    </el-carousel>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
              <el-col :span="10">
                <div class="ttadminiewrss">
                  <el-form
                    ref="complaint"
                    :model="complaint"
                    label-width="auto"
                    style="width: 400px"
                    size="medium"
                  >
                    <el-form-item label="原告姓名：" :required="true">
                      <el-input
                        v-model="complaint.plaintiff"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="原告联系电话：">
                      <el-input
                        v-model="complaint.iffphone"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item> -->
                    <el-form-item label="被告姓名：" :required="true">
                      <el-input
                        v-model="complaint.fendant"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="被告联系电话：">
                      <el-input
                        v-model="complaint.fendphone"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item> -->
                    <el-form-item label="案由类型：" :required="true">
                      <el-input
                        v-model="complaint.casetype"
                        placeholder="请输入内容"
                      ></el-input>
                      <!-- <el-select
                        v-model="complaint.casetype"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in anyou"
                          :key="item.ID"
                          :label="item.name"
                          :value="item.ID"
                        >
                        </el-option>
                      </el-select> -->
                    </el-form-item>
                    <el-form-item label="诉讼请求：" :required="true">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3 }"
                        v-model="complaint.claims"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="请求金额：" :required="true">
                      <el-input
                        style="width: 200px"
                        v-model="complaint.amount"
                        @blur="inputMoneys($event, 'amount')"
                        size="small"
                        placeholder="请输入全额"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="事实简要陈述：" :required="true">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3 }"
                        v-model="complaint.ocrevidence"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="事实与理由：">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3 }"
                        v-model="complaint.reason"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="诉讼法院：">
                      <el-input
                        v-model="complaint.court"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="起诉日期：">
                      <el-input
                        v-model="complaint.suetime"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item> -->
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="admreviewerss" v-show="filesparese">
            <el-row>
              <el-col :span="14">
                <el-tabs
                  style="width: 587px; margin: 0 auto"
                  v-model="activepane"
                >
                  <el-tab-pane label="文本信息" name="textocr">
                    <el-carousel
                      :autoplay="false"
                      height="350px"
                      style="margin: 0 auto"
                    >
                      <el-carousel-item
                        v-for="(item, ind) in ocrprease"
                        :key="ind"
                      >
                        <div v-html="item"></div>
                      </el-carousel-item>
                    </el-carousel>
                  </el-tab-pane>

                  <el-tab-pane label="图片" name="paneimg">
                    <el-carousel
                      :autoplay="false"
                      height="350px"
                      style="margin: 0 auto"
                    >
                      <el-carousel-item>
                        <div v-for="(item, index) in baosrcs" :key="index">
                          <el-image :src="item"></el-image>
                        </div>
                      </el-carousel-item>
                    </el-carousel>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
              <el-col :span="10">
                <div class="ttadminiewrss">
                  <el-form
                    ref="preserveForm"
                    :model="preserveForm"
                    label-width="auto"
                    size="medium"
                  >
                    <el-form-item label="保全申请人：" :required="true">
                      <el-input
                        v-model="preserveForm.preservename"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="保全被申请人：" :required="true">
                      <el-input
                        v-model="preserveForm.preservebei"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>

                    <!-- <el-form-item label="请求事项：">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3 }"
                        v-model="preserveForm.presitems"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item> -->
                    <el-form-item label="保全金额：" :required="true">
                      <el-input
                        style="width: 200px"
                        v-model="preserveForm.pramount"
                        @blur="inputMoneyss($event, 'pramount')"
                        size="small"
                        placeholder="请输入全额"
                      ></el-input>
                      元
                    </el-form-item>
                    <el-form-item label="保全标的：" :required="true">
                      <el-input
                        v-model="preserveForm.presmark"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 身份证 -->
          <div class="admreviewerss" v-show="filesusers">
            <el-row>
              <el-col :span="14">
                <el-tabs style="margin: 0 auto" v-model="activepane">
                  <el-tab-pane label="文本信息" name="textocr">
                    <el-carousel :autoplay="false" height="360px">
                      <el-carousel-item>
                        <div
                          style="width: 470px"
                          v-for="(item, inx) in usernamesfz"
                          :key="inx"
                        >
                          {{ item }}<br />
                        </div>
                      </el-carousel-item>
                    </el-carousel>
                  </el-tab-pane>
                  <el-tab-pane label="图片" name="paneimg">
                    <el-image
                      fit="contain"
                      style="width: 400px; height: 220px"
                      :src="srcs"
                      :preview-src-list="srcLists"
                    ></el-image>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
              <el-col :span="10">
                <div class="adminiewrss">
                  <el-form
                    ref="cardForm"
                    :model="usernamesfz"
                    label-width="auto"
                    style="width: 400px"
                    size="medium"
                  >
                    <el-form-item label="姓名：" :required="true">
                      <el-input
                        v-model="usernamesfz.name"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="性别：">
                      <el-input
                        v-model="usernamesfz.sex"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期：">
                      <el-input
                        v-model="usernamesfz.csdate"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号码：">
                      <el-input
                        v-model="usernamesfz.idcard"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="住址：">
                      <el-input
                        v-model="usernamesfz.address"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 营业执照 -->
          <div class="admreviewerss" v-show="filesstore">
            <el-row>
              <el-col :span="14">
                <el-tabs style="margin: 0 auto" v-model="activepane">
                  <el-tab-pane label="文本信息" name="textocr">
                    <el-carousel
                      :autoplay="false"
                      height="460px"
                      style="margin: 0 auto"
                    >
                      <el-carousel-item>
                        <div
                          style="width: 470px"
                          fit="contain"
                          v-for="(item, ind) in userblicense"
                          :key="ind"
                        >
                          {{ item }}<br />
                        </div>
                      </el-carousel-item>
                    </el-carousel>
                  </el-tab-pane>

                  <el-tab-pane label="图片" name="paneimg">
                    <el-image
                      fit="contain"
                      style="width: 400px; height: 220px"
                      :src="srcs"
                      :preview-src-list="srcLists"
                    ></el-image>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
              <el-col :span="10">
                <div class="adminiewrss">
                  <el-form
                    ref="userblicense"
                    :model="userblicense"
                    label-width="auto"
                    style="width: 400px"
                    size="medium"
                  >
                    <el-form-item label="单位名称:" :required="true">
                      <el-input
                        v-model="userblicense.company"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="地址:">
                      <el-input
                        v-model="userblicense.adress"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="实收资本:">
                      <el-input
                        v-model="userblicense.paidup"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="成立日期:">
                      <el-input
                        v-model="userblicense.blishment"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="有效期:">
                      <el-input
                        v-model="userblicense.validity"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="法人:">
                      <el-input
                        v-model="userblicense.legal"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="注册资本:">
                      <el-input
                        v-model="userblicense.register"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="登记机关:">
                      <el-input
                        v-model="userblicense.authority"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="社会信用代码:">
                      <el-input
                        v-model="userblicense.credit"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="税务登记号:">
                      <el-input
                        v-model="userblicense.taxregis"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="类型:">
                      <el-input
                        v-model="userblicense.deltype"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="组成形式:">
                      <el-input
                        v-model="userblicense.sistion"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="经营范围:">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3 }"
                        v-model="userblicense.business"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="证件编号:">
                      <el-input
                        v-model="userblicense.ficate"
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
  </el-scrollbar>
</template>

<script>
// 引入js
import { getInputValue } from "../../static/js/amountFormat.js";
import usersteps from "../components/usersteps.vue";
import "../../static/css/disaoerss.less";
import "../../static/css/file_policy_style.less";
import "../../static/css/el_dising.less";
import Comimageviewer from "../components/ComImageviewer.vue";
// 图片查看器
// import ElImageviewer from "element-ui/packages/image/src/image-viewer";
import axios from "axios";

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

import {
  Reviewcase,
  Casetype,
  // 删除文件
  Casefile,
  // 上传文件
  Upsecase, //起诉状.3 保全申请.4 证据材料.5
  // 初审填写法律意见书、承保保全金额，复审修改
  Caseinfo,
  // 生成法律意见书
  Lawopinion,
  // 提交上级复核
  Subreview,
} from "../api/api";

export default {
  name: "hisupervisor",
  components: {
    usersteps,
    // ElImageviewer,
    Comimageviewer,
  },
  data() {
    return {
      insured_type: "",
      number: "",
      // 风险评估id
      evalid: "",
      // 标题
      usertitle: "",
      // 身份证信息
      usernamesfz: {
        name: null,
        sex: null,
        csdate: null,
        idcard: null,
        address: null,
      },
      // 营业执照信息
      userblicense: {
        company: null,
        adress: null,
        paidup: null,
        blishment: null,
        validity: null,
        legal: null,
        register: null,
        authority: null,
        credit: null,
        taxregis: null,
        deltype: null,
        sistion: null,
        business: null,
        ficate: null,
      },
      // 起诉状信息
      complaint: {
        plaintiff: "",
        // iffphone: "",
        fendant: "",
        // fendphone: "",
        casetype: "",
        claims: "",
        amount: "",
        // reason: "",
        ocrevidence: "",
        // court: "",
        // suetime: "",
      },
      // 起诉状图片
      lainsrc: "",
      lasrcs: [],
      plaintiffimgpage: "",
      slasrc: false,
      plaintiffage: [],
      plaintiffurl: [],
      plaintiffimg: false,
      // pdf文件
      complatxt: [],
      txtplay: true,
      // 保全申请书
      preserveForm: {
        preservename: "",
        preservebei: "",
        // presitems: "",
        pramount: "",
        presmark: "" || "账户、房产、汽车、第三方债权及其他等值财产",
      },
      // 保全图片
      baoinsrc: "",
      baosrcs: [],
      baosrc: false,
      // 保全文件
      complatexts: [],
      preserimgs: [],
      btxtop: true,
      preserimgurl: [],
      preserimg: false,
      // 法律意见书信息
      internalForm: {
        evidence: "",
        basis: "",
        basisnumber: "",
        notes: "",
        coverage: "",
        process: "" || "无",
      },
      revname: "",
      dialogff: false,
      divtaus: false,
      // 身份证
      userfilesz: "",
      usercaidfile: "",
      usernamesfzimg: "",
      filescaid: true,
      usersrces: true,
      srcListsurl: [],
      showViewer: false,
      srcListurl: [],
      // 营业执照
      blicense: "",
      srcs: "",
      srcLists: [],
      usersfz: "",
      boolblidocx: true,
      boolblisrcs: true,
      blisrcsurl: [],
      blisrced: "",

      tltle: "",
      case_type: "",
      company: "",
      // 起诉状
      plaintiff: [],
      // 保全申请书
      preservation: [],
      // 证据材料
      testimony: [],
      timonsrc: "",
      timonfile: "",
      monyimg: false,
      monyfile: true,
      testmonyimage: [],
      testmonyurl: [],
      textmonyimg: false,

      // 标签页
      activeName: "first",
      // 填写信息
      feedback: 1,
      radioff: true,
      radionn: true,
      // 补充内容
      textarea: "",
      // 案件类型
      casetype: "",
      visible: false,
      valid: "",
      datpath: "",
      // ocr
      jpgocr: [],
      ocrprease: [],
      ocridcard: "",
      filesusers: false,
      filesstore: false,
      filesocruse: false,
      filesparese: false,
      // 所有的按由类型
      anyou: "",
      csteps: "",
      cstext: "",
      activepane: "textocr",
      cty: "",
      // 文件上传
      btnnum: "",
      // 人民币大写
      fromrmb: "",
      pramountrmb: "",
      plaintrmb: "",
      // 地址
      https: "",
      // loading
      qisloading: false,
      sqloading: false,
      zjloading: false,
      // 角色id
      roleID: "",
    };
  },
  destroyed() {
    window.removeEventListener("beforeunload", (e) => {
      this.beforeClosepage(e);
    });
  },
  created() {
    // 权限
    var userinfor = JSON.parse(localStorage.getItem("userinfor"));
    this.roleID = userinfor.roleID;

    this.$nextTick(() => {
      this.$refs["myscrollbar"].wrap.scrollTop = document.body.scrollTop = 0;
      // this.$refs["myscrollbar"].wrap.scrollHeight;
    });
    this.reviewapi();
  },
  mounted() {
    window.addEventListener("beforeunload", (e) => {
      this.beforeClosepage(e);
    });
  },
  methods: {
    beforeClosepage() {
      window.opener.postData();
    },
    mattin() {
      // console.log("ming");
      this.preserveForm.preservebei = this.complaint.fendant;
    },
    // 任务池查看api
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
          this.cstext = "填写详细信息";
          this.number = res.data.number;

          Casetype().then((res) => {
            // console.log("案由", res.data);

            this.anyou = res.data;
            for (let i = 0; i < res.data.length; i++) {
              if (this.cty == res.data[i].ID) {
                this.case_type = res.data[i].name;
                this.complaint.casetype = res.data[i].name;
                if (!this.complaint.ocrevidence) {
                  this.complaint.ocrevidence = res.data[i].statement;
                }
                if (!this.complaint.claims) {
                  this.complaint.claims = res.data[i].expt_res;
                }
                if (!this.internalForm.evidence) {
                  this.internalForm.evidence = res.data[i].case_evidence;
                }
                if (!this.internalForm.basis) {
                  this.internalForm.basis = res.data[i].legal_terms;
                }
              }
            }
          });
        }
      });
    },
    taskview(dat) {
      this.internalForm.coverage = dat.preserv_amount;
      this.preserveForm.preservename = dat.insured;
      this.complaint.plaintiff = dat.insured;
      if (dat.stage == 2 && dat.review_result == 0) {
        this.feedback = 2;

        this.radioff = false;
        this.radionn = true;
      } else {
        this.radioff = true;
        this.radionn = true;
      }

      this.cty = dat.case_type;

      // this.complaint.casetype = dat.case_type;
      // 标题
      this.usertitle = dat.title;
      // 风险评估id
      this.evalid = dat.id;
      console.log("评估id", dat);
      this.revname = dat.reviewer;
      this.insured_type = dat.insured_type;
      // 传过来的数据
      // console.log("dat", dat);

      let htts = process.env.VUE_APP_API_URL;
      this.https = htts;

      this.tltle = dat;
      // 身份证
      this.userfilesz = dat.files.id_card;
      if (this.userfilesz != null) {
        let caidfile = [];
        let caidsrcs = [];
        for (var t = 0; t < this.userfilesz.length; t++) {
          let caid = this.userfilesz[t];
          let cafi = caid.path.substring(caid.path.lastIndexOf(".") + 1);
          if (
            cafi.toLowerCase() == "jpg" ||
            cafi.toLowerCase() == "jpeg" ||
            cafi.toLowerCase() == "png"
          ) {
            caidsrcs.push(caid);
            this.srcListurl.push(htts + "/" + caidsrcs[t].path);
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
          this.usernamesfzimg = caidsrcs;
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

          if (
            bugt.toLowerCase() == "jpg" ||
            bugt.toLowerCase() == "jpeg" ||
            bugt.toLowerCase() == "png"
          ) {
            blisrcs.push(use);
            this.blisrcsurl.push(htts + "/" + blisrcs[h].path);
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
          this.blisrced = blisrcs;
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
      // 起诉状
      this.plaintiff = dat.files.indictment;
      if (this.plaintiff != null) {
        var k = [];
        var z = [];
        for (let p = 0; p < this.plaintiff.length; p++) {
          var s = this.plaintiff[p];
          this.jpgocr.push(s.ocr);
          var na = s.path.substring(s.path.lastIndexOf(".") + 1);

          if (
            na.toLowerCase() == "jpg" ||
            na.toLowerCase() == "jpeg" ||
            na.toLowerCase() == "png"
          ) {
            k.push(htts + "/" + s.path);
            this.plaintiffage.push(s);
          } else {
            z.push(s);
          }
        }

        if (k.length != 0) {
          this.lainsrc = k[0];
          this.lasrcs = k;
          this.plaintiffimgpage = k.length;
          this.slasrc = true;
        } else {
          this.slasrc = false;
        }
        if (z.length != 0) {
          this.complatxt = z;
          this.txtplay = true;
        } else {
          this.txtplay = false;
        }
      }

      this.preservation = dat.files.preservation;
      if (this.preservation != null) {
        var bo = [];
        var u = [];
        for (let e = 0; e < this.preservation.length; e++) {
          var st = this.preservation[e];
          this.ocrprease.push(st.ocr);
          var ns = st.path.substring(st.path.lastIndexOf(".") + 1);
          if (
            ns.toLowerCase() == "jpg" ||
            ns.toLowerCase() == "jpeg" ||
            ns.toLowerCase() == "png"
          ) {
            bo.push(htts + "/" + st.path);
            this.preserimgs.push(st);
          } else {
            u.push(st);
          }
        }

        if (bo.length != 0) {
          this.baoinsrc = bo[0];
          this.baosrcs = bo;
          this.baosrc = true;
        } else {
          this.baosrc = false;
        }
        if (u.length != 0) {
          this.complatexts = u;
          this.btxtop = true;
        } else {
          this.btxtop = false;
        }
      }

      this.testimony = dat.files.testimony;
      if (this.testimony != null) {
        var tiomonimg = [];
        var tiomonfile = [];
        for (let f = 0; f < this.testimony.length; f++) {
          var hfle = this.testimony[f];
          var fs = hfle.path.substring(hfle.path.lastIndexOf(".") + 1);
          if (
            fs.toLowerCase() == "jpg" ||
            fs.toLowerCase() == "jpeg" ||
            fs.toLowerCase() == "png"
          ) {
            tiomonimg.push(hfle);
            this.testmonyimage.push(htts + "/" + hfle.path);
          } else {
            tiomonfile.push(hfle);
          }
        }
        if (tiomonimg.length != 0) {
          this.timonsrc = tiomonimg;
          this.monyimg = true;
        } else {
          this.monyimg = false;
        }
        if (tiomonfile.length != 0) {
          this.timonfile = tiomonfile;
          this.monyfile = true;
        } else {
          this.monyfile = false;
        }
      }

      let valinfo = dat.eval_info_json;
      if (valinfo.usernamesfz) {
        this.usernamesfz = valinfo.usernamesfz;
      }
      if (valinfo.userblicense) {
        this.userblicense = valinfo.userblicense;
      }
      if (valinfo.amount) {
        this.complaint.amount = valinfo.amount;
        this.preserveForm.pramount = valinfo.amount;
      }
      if (valinfo.textarea) {
        this.internalForm.notes = valinfo.textarea;
      }
    },

    onopensfz(ind) {
      this.srcListsurl = [...this.srcListurl, ind];
      this.showViewer = true;
    },
    onPreview(ind) {
      this.srcListsurl = [...this.blisrcsurl, ind];
      this.showViewer = true;
    },
    qisuopenViewer(ind) {
      this.plaintiffurl = [...this.lasrcs, ind];
      this.plaintiffimg = true;
    },
    bqopenViewer(ind) {
      this.preserimgurl = [...this.baosrcs, ind];
      this.preserimg = true;
    },
    zjopenmony(ins) {
      this.testmonyurl = [...this.testmonyimage, ins];
      this.textmonyimg = true;
    },
    closeViewer() {
      this.showViewer = false;
      this.plaintiffimg = false;
      this.preserimg = false;
      this.textmonyimg = false;
    },

    anniu(dat) {
      this.dialogff = true;
      if (dat == -1) {
        this.filesusers = true;

        this.filesstore = false;
        this.filesparese = false;
        this.filesocruse = false;
      }

      if (dat == 0) {
        this.filesstore = true;
        this.filesusers = false;
        this.filesparese = false;
        this.filesocruse = false;
      }

      if (dat == 1) {
        this.filesocruse = true;
        this.filesparese = false;
        this.filesstore = false;
        this.filesusers = false;
      }
      if (dat == 2) {
        this.filesparese = true;
        this.filesocruse = false;
        this.filesstore = false;
        this.filesusers = false;
      }
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
    // 删除文件接口
    userdeletes() {
      var data = {
        risk_eval_file_id: this.valid,
        path: this.datpath,
      };
      Casefile(data)
        .then((res) => {
          if (res.code == 200) {
            this.usernamesfzimg = "";
            this.usercaidfile = "";
            this.blisrced = "";
            this.usersfz = "";
            this.plaintiffage = [];
            this.complatxt = [];
            this.preserimgs = [];
            this.complatexts = [];
            this.timonsrc = "";
            this.timonfile = "";
            this.reviewapi();
            // this.taskview();
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
          }
          // console.log(res);
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: "删除失败",
            type: "error",
          });
        });
      this.divtaus = false;
    },
    // 删除按钮
    deletes(val, dat) {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 输入失去聚焦给千分位
    inputMoney(el, name) {
      this.internalForm[name] = getInputValue(el);
    },
    inputMoneys(el, name) {
      this.complaint[name] = getInputValue(el);
    },
    inputMoneyss(el, name) {
      this.preserveForm[name] = getInputValue(el);
    },
    userinputmon() {
      if (this.internalForm.coverage) {
        let rmbs = Number(moneyDelete(this.internalForm.coverage));
        this.fromrmb = this.formatRMB(rmbs, "￥").value;
      } else {
        this.fromrmb = "";
      }
      if (this.preserveForm.pramount) {
        let presermb = Number(moneyDelete(this.preserveForm.pramount));

        this.pramountrmb = this.formatRMB(presermb, "￥").value;
      } else {
        this.pramountrmb = "";
      }
      if (this.complaint.amount) {
        let plainrmb = Number(moneyDelete(this.complaint.amount));

        this.plaintrmb = this.formatRMB(plainrmb, "￥").value;
      } else {
        this.plaintrmb = "";
      }
    },
    // 快速反馈按钮
    through(a) {
      if (a == 1) {
        if (this.userfilesz != null) {
          if (this.usernamesfz.name == "") {
            this.$message({
              showClose: true,
              message: "请检查投保人姓名",
              type: "error",
            });
            return;
          }
        }
        if (this.blicense != null) {
          if (this.userblicense.company == "") {
            this.$message({
              showClose: true,
              message: "请检查投保人单位名称",
              type: "error",
            });
            return;
          }
        }
        if (
          this.complaint.plaintiff != "" &&
          this.complaint.fendant != "" &&
          this.complaint.casetype != "" &&
          this.complaint.claims != "" &&
          this.complaint.amount != "" &&
          this.complaint.ocrevidence != "" &&
          this.preserveForm.preservename != "" &&
          this.preserveForm.preservebei != "" &&
          this.preserveForm.pramount != "" &&
          this.preserveForm.presmark != "" &&
          // this.internalForm.ocrevidence != "" &&
          this.internalForm.evidence != "" &&
          this.internalForm.basis != "" &&
          this.internalForm.notes != "" &&
          this.internalForm.coverage != ""
        ) {
          var dats = {
            usernamesfz: this.usernamesfz,
            userblicense: this.userblicense,
            complaint: this.complaint,
            preserveForm: this.preserveForm,
            internalForm: this.internalForm,
          };
          var data = {
            risk_eval_id: this.evalid,
            title: this.usertitle,
            preserv_amount: Number(moneyDelete(this.internalForm.coverage)),
            insured: this.usernamesfz.name || this.userblicense.company,
            plaintiff: this.complaint.plaintiff,
            defendant: this.complaint.fendant,
            statement: this.complaint.ocrevidence,
            expt_res: this.complaint.claims,
            amount_req: Number(moneyDelete(this.complaint.amount)),
            case_evidence: this.internalForm.evidence,
            preserv_appl: this.preserveForm.preservename,
            preserv_resp: this.preserveForm.preservebei,
            expt_preserv_amount: Number(
              moneyDelete(this.preserveForm.pramount)
            ),
            preserv_obj: this.preserveForm.presmark,
            law: this.internalForm.basis,
            sug_preserv_amount: Number(moneyDelete(this.internalForm.coverage)),
            eval_info_json: JSON.stringify(dats),
            remark: this.internalForm.notes,
            process: this.internalForm.process,
            case_type: this.complaint.casetype,
          };
          // console.log("参数", data);

          Caseinfo(data).then((res) => {
            // console.log(res);
            if (res.code == 200) {
              if (this.feedback == 1) {
                let data = {
                  risk_eval_id: this.evalid,
                };
                Lawopinion(data)
                  .then(() => {})
                  .catch(() => {
                    this.$message({
                      showClose: true,
                      message: "生成失败",
                      type: "error",
                    });
                  });
                this.$message({
                  showClose: true,
                  message: "提交成功",
                  type: "success",
                });
                // 出单核实
                if (this.roleID != 1003) {
                  // this.$router.push({
                  //   path: "/usertable/asingconfirm",
                  //   query: {
                  //     data: this.evalid,
                  //   },
                  // });
                  this.$router.push({
                    path: "/usertable/adminfiedlook",
                    query: {
                      data: this.evalid,
                    },
                  });
                  
                } else {
                  this.$router.push({
                    path: "/usertable/adminfiedlook",
                    query: {
                      data: this.evalid,
                    },
                  });
                }
              } else if (this.feedback == 2) {
                let data = {
                  risk_eval_id: this.evalid,
                };
                Subreview(data).then((res) => {
                  if (res.code == 200) {
                    this.$message({
                      showClose: true,
                      message: "提交成功",
                      type: "success",
                    });
                    // 上级复审
                    if (this.roleID != 1003) {
                      this.$router.push({
                        path: "/usertable/hisupervisores",
                        query: {
                          data: this.evalid,
                        },
                      });
                    } else {
                      this.$router.push({
                        path: "/usertable/adminfiedlook",
                        query: {
                          data: this.evalid,
                        },
                      });
                    }
                  }
                });
              }
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "请检查必填字段是否填完整",
            type: "error",
          });
        }
      }
      // else if (a == 0) {
      //   this.$router.push({
      //     path: "/usertable",
      //   });
      // }
    },
    alldown(dat) {
      if (dat == 3) {
        this.qisloading = true;
      }
      if (dat == 4) {
        this.sqloading = true;
      }
      if (dat == 5) {
        this.zjloading = true;
      }
      // console.log('data',data);
      // 3.起诉状；4.保全申请书；5.证据材料
      let url = this.https + "/api/v1/admin/review/case/download";
      let data = {
        risk_eval_id: this.evalid,
        type: dat,
      };
      axios(url, {
        params: { ...data },
        responseType: "blob",
      })
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.qisloading = false;
            this.sqloading = false;
            this.zjloading = false;
          }
          let url = URL.createObjectURL(new Blob([res.data]));
          let filename = window.decodeURI(
            res.headers["content-disposition"].split("=")[1],
            "UTF-8"
          );
          let filenames = filename.replace('"', "").replace('"', "");
          let files = document.createElement("a");
          files.href = url;
          files.download = filenames;
          files.click();
        })
        .catch(() => {
          this.qisloading = false;
          this.sqloading = false;
          this.zjloading = false;
        });
    },
    btnclicks(dat) {
      var tempwindow = window.open("_blank"); // 先打开页面
      tempwindow.location = "https://wx.haobofalv.com/" + dat;
    },
    btnnumber(ind) {
      // console.log(ind);
      this.btnnum = ind;
    },
    // 文件上传
    handlePreview(response) {
      if (response.code == 200) {
        var data = {
          risk_eval_id: this.evalid,
          type: this.btnnum,
          file: response.data[0],
        };
        Upsecase(data).then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.plaintiffage = [];
            this.complatxt = [];
            this.preserimgs = [];
            this.complatexts = [];
            this.reviewapi();
            this.$message({
              showClose: true,
              message: "上传成功",
              type: "success",
            });
          }
        });
      }
    },
    // 起诉状上传
    // handlePrev(response){

    // }
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
  .fromrevie {
    margin-top: 20px;
    .grid-content {
      background-color: #d1e2f8;
      padding: 5px;
      font-size: 18px;
      font-weight: 600;
      color: #000;
    }
  }

  .admreviewerss {
    .scolles {
      // width: 500px;
      height: 600px;
      white-space: normal;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    .ttadminiewrss {
      display: flex;
      justify-content: center;
      // align-items: center;
    }
    margin-top: 10px;
    .tianbtn {
      padding: 9px 15px;
    }
    .el-row {
      padding-left: 20px;
      padding-right: 20px;
      .el-tabs {
        min-height: 200px;
      }
      .shenhe {
        // text-align: center;
        padding-bottom: 30px;
        margin-left: 20px;
        .el-button {
          border: 0;
          margin: 10px 30px;
          padding: 9px 20px;
        }
      }
    }
    .adminiewrss {
      display: flex;
      justify-content: center;
    }

    .martexts {
      display: flex;
      p {
        min-height: 25px;
        line-height: 36px;
        margin: 0;
        min-width: 107px;
        font-size: 15px;
        // color: #606266;
      }
      span {
        width: 350px;
        line-height: 36px;
        color: #606266;
        padding-left: 16px;
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
      }
    }
    .marwers {
      display: flex;
      .marwers_p {
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
            max-width: 300px;
            margin: 0;
            color: #000;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .ad_imgs_txts {
            cursor: pointer;
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
      .listqiimg {
        display: flex;
        margin-bottom: 20px;
        .imgs {
          display: flex;
          width: 74vw;
          flex-wrap: wrap;
          .el-image {
            display: flex;
            background-color: #bbbbbb;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .bgimg {
      display: flex;
      justify-content: center;
      margin: 0 0 15px 0;
      .el-image {
        display: flex;
        background-color: #bbbbbb;
        align-items: center;
        justify-content: center;
      }
    }
    .imgpage {
      color: #606266;
    }
    .tyetext {
      display: flex;
      .textwen {
        display: flex;
        // width: 200px;
        align-items: center;
        margin-bottom: 20px;
        .ptextlei {
          max-width: 300px;
          margin: 0;
          color: #000;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .ptextleis {
          cursor: pointer;
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
    .el-carousel {
      width: 500px;
      min-height: 530px !important;
      .el-carousel__container {
        // height: 630px !important;
        .el-carousel__item,
        .el-carousel__mask {
          height: initial;
        }
      }
    }
  }
}
</style>
