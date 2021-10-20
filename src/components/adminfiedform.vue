<template>
  <el-scrollbar
    style="height: 100vh"
    :native="false"
    :noresize="false"
    ref="myscrollbar"
  >
    <div class="aunif">
      <div></div>
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
            <div class="martexts flexphone">
              <p>标题：</p>
              <span class="flexphonespan">{{ tltle.title }}</span>
            </div>
            <div class="martexts flexphone">
              <p>申请人：</p>
              <span class="flexphonespan">{{ tltle.salesman ? tltle.salesman : "" }}</span>
            </div>
            <div class="martexts flexphone">
              <p>联系电话：</p>
              <span class="flexphonespan">{{ tltle.phone ? tltle.phone : "" }}</span>
            </div>
            <div class="martexts flexphone">
              <p>案由类型：</p>
              <span class="flexphonespan">{{ case_type }}</span>
            </div>
            <div class="martexts flexphone">
              <p>保险总公司：</p>
              <span class="flexphonespan">{{ tltle.icco_name }}</span>
            </div>
            <div class="martexts flexphone">
              <p>意向费率：</p>
              <span class="flexphonespan">{{ tltle.intent_rate + "‰" }}</span>
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
      <div class="admreviewerss">
        <el-row>
          <el-col :span="24">
            <div class="martexts flexphone">
              <!-- 1.自然人 2.企业 -->
              <p>类型：</p>
              <div class="listchuadn">
                <el-radio-group v-model="insuredtypeid" @change="insuredid">
                  <el-radio :label="1">自然人</el-radio>
                  <el-radio :label="2">企业</el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 身份证 -->
      <div class="admreviewerss" v-show="this.insuredtypeid == 1">
        <el-row>
          <el-col :span="12">
            <div class="martexts flexphone">
              <el-button
                class="tianbtn"
                type="primary"
                @click.prevent="anniu(1)"
                >填写核实</el-button
              >
            </div>
            <el-form
              ref="cardForm"
              :model="usernamesfz"
              
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
                <span class="policy_btn">
                  <!-- <el-button class="policy_bton" type="primary" @click.prevent="alldown(userfilesz)"
                    >全部下载</el-button
                  > -->
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
              <!-- 图片 -->
              <!-- <el-image-viewer
                v-if="showViewer"
                :on-close="closeViewer"
                :url-list="srcLists"
              /> -->
              <Comimageviewer
                :visible.sync="showViewer"
                :url="srcListsurl"
              ></Comimageviewer>
              <div v-for="(item, ind) in usernamesfzimg" :key="ind">
                <div class="tyetext" v-if="usersrces">
                  <div class="textwen">
                    <p
                      class="ptextleis"
                      :title="item.file_name"
                      @click="onopensfz(ind)"
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
              <div v-for="(item, index) in usercaidfile" :key="index">
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
                      :title="item.file_name"
                      @click="btnclicks(item.path)"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div class="shan" @click="deletes(item.id, item.path, 1)">
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
      <div class="admreviewerss" v-show="this.insuredtypeid == 2">
        <el-row>
          <el-col :span="12">
            <div class="martexts flexphone">
              <el-button
                class="tianbtn"
                type="primary"
                @click.prevent="anniu(2)"
                >填写核实</el-button
              >
            </div>

            <el-form
              ref="userblicense"
              :model="userblicense"
              
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
          </el-col>
          <el-col :span="12">
            <div style="padding-left: 50px">
              <div class="policy">
                <span>投保人附件:</span>
                <span class="policy_btn">
                  <!-- <el-button class="policy_bton" type="primary" @click.prevent="alldown(blicense)"
                    >全部下载</el-button
                  > -->
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
              <div v-for="(item, ind) in blicenseimg" :key="ind">
                <div class="tyetext" v-if="boolblisrcs">
                  <div class="textwen">
                    <!-- <el-image-viewer
                      v-if="showViewer"
                      :on-close="closeViewer"
                      :url-list="srcLists"
                    /> -->
                    <p
                      class="ptextleis"
                      :title="item.file_name"
                      @click="onPreview(ind)"
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
              <div v-for="(item, index) in usersfz" :key="index">
                <div class="tyetext">
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
                      :title="item.file_name"
                      @click="btnclicks(item.path)"
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
          <el-col :span="24">
            <div class="marwers">
              <p class="marwers_p">起诉状附件：</p>

              <div>
                <div class="policy">
                  <span class="policy_btn" v-if="plaintifftf">
                    <el-button
                      class="policy_bton"
                      :loading="qisloading"
                      type="primary"
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
                <!-- <div class="listqiimg">
                  <span class="imgs" v-if="lasrc">
                    <div
                      style="padding: 0 10px"
                      v-for="(item, index) in lasrcs"
                      :key="index"
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
                <Comimageviewer
                  :visible.sync="plaintiffimg"
                  :url="plaintiffurl"
                ></Comimageviewer>
                <div v-for="(item, ind) in lasrcs" :key="ind">
                  <div class="tyetext" style="padding: 0 10px" v-if="lasrc">
                    <div class="textwen">
                      <!-- <el-image-viewer
                        v-if="plaintiffimg"
                        :on-close="closeViewer"
                        :url-list="plainimage"
                      /> -->
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

                <div v-for="(item, ind) in complatxt" :key="ind">
                  <div class="tyetext" style="padding: 0 10px" v-if="txtplay">
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
                        :title="item.file_name"
                        @click="btnclicks(item.path)"
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
          <el-col :span="24">
            <div class="marwers">
              <p class="marwers_p">保全申请附件：</p>

              <div>
                <div class="policy">
                  <span class="policy_btn" v-if="preservationtf">
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
                <!-- <div class="listqiimg">
                  <span class="imgs" v-if="baosrc">
                    <div
                      style="padding: 0 10px"
                      v-for="(item, ind) in baosrcs"
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
                <Comimageviewer
                  :visible.sync="preserimg"
                  :url="preserimgurl"
                ></Comimageviewer>
                <div v-for="(item, ind) in baosrcs" :key="ind">
                  <div class="tyetext" style="padding: 0 10px" v-if="baosrc">
                    <div class="textwen">
                      <p
                        class="ptextleis"
                        :title="item.file_name"
                        @click="bqopenViewer(ind)"
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
                  <div class="tyetext" style="padding: 0 10px" v-if="btxtop">
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
                        :title="item.file_name"
                        @click="btnclicks(item.path)"
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
                  <span class="policy_btn" v-if="testimonytf">
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
                    v-for="(item, inf) in timonfile"
                    :key="inf"
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
                      :title="item.file_name"
                      @click="btnclicks(item.path)"
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
            <div class="martexts flexphone">
              <el-form
                ref="userblicense"
                :model="userblicense"
                
                style="width: 800px"
                size="medium"
              >
                <el-form-item label="保险金额：" :required="true">
                  <el-input
                    style="width: 200px"
                    v-model="from.input"
                    @blur="inputMoney($event, 'input')"
                    @input="userinputmon"
                    size="medium"
                    placeholder="请输入全额"
                  ></el-input
                  >元&nbsp;&nbsp;<span style="color: red">{{ fromrmb }}</span>
                </el-form-item>
              </el-form>

              <!-- <span style="width: 600px">
              </span> -->
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="admreviewerss recommonedBottom">
        <el-row>
          <el-col :span="24">
            <el-tabs v-model="activeName">
              <el-tab-pane label="流程操作" name="first">
                <div class="tabpane">
                  <div>
                    <div style="margin-bottom: 10px">快速反馈</div>
                    <div>
                      <el-radio-group v-model="feedback" @change="numfeedback">
                        <el-radio :label="1">同意承保</el-radio>
                        <el-radio :label="2">拒绝承保</el-radio>
                        <el-radio :label="3">补充材料</el-radio>
                      </el-radio-group>
                    </div>
                  </div>
                  <div class="radiogroup">
                    <div class="textinput">
                      <div>备注：</div>
                      <el-input
                        style="width: 550px"
                        :autosize="{ minRows: 4 }"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="textarea"
                        maxlength="20"
                        show-word-limit
                        resize="none"
                      >
                      </el-input>
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
        <div class="fromrevie">
          <el-row>
            <el-col :span="24">
              <div class="gir-text">
                <div class="grid-content" v-show="filesauth">身份证</div>
                <div class="grid-content" v-show="filescate">营业执照</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="admreviewerss" v-if="filesauth">
          <el-row class="flexphoneshow">
            <el-col :span="14">
              <el-tabs
                style="width: 587px; margin: 0 auto"
                v-model="activepane"
              >
                <el-tab-pane label="文本信息" name="textocr">
                  <el-carousel
                    :autoplay="false"
                    height="460px"
                    style="margin: 0 auto"
                  >
                    <el-carousel-item>
                      <div
                      class="carouselDiv"
                        style="width: 470px"
                        v-for="(item, inx) in indeusername"
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
                      type="textarea"
                      :autosize="{ minRows: 3 }"
                      v-model="usernamesfz.address"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="admreviewerss" v-if="filescate">
          <el-row class="flexphoneshow">
            <el-col :span="14">
              <el-tabs
                style="width: 587px; margin: 0 auto"
                v-model="activepane"
              >
                <el-tab-pane label="文本信息" name="textocr">
                  <el-carousel
                    :autoplay="false"
                    height="460px"
                    style="margin: 0 auto"
                  >
                    <el-carousel-item>
                      <div
                      class="carouselDiv"
                        style="width: 470px"
                        v-for="(item, ind) in indeuserblic"
                        :key="ind"
                      >
                        {{ item }}<br />
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                </el-tab-pane>

                <el-tab-pane label="图片" name="paneimg">
                  <el-carousel :autoplay="false" style="margin: 0 auto">
                    <el-carousel-item>
                      <div style="width: 470px" class="carouselDiv">
                        <el-image
                          :src="srcs"
                          :preview-src-list="srcLists"
                        ></el-image>
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                </el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="10">
              <div class="adminiewrss">
                <el-form
                  ref="userblicense"
                  :model="userblicense"
                  
                  style="width: 400px"
                  size="medium"
                >
                  <el-form-item label="单位名称:" :required="true">
                    <el-input
                      v-model="userblicense.company"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="地址:" :required="true">
                    <el-input
                      v-model="userblicense.adress"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="实收资本:" :required="true">
                    <el-input
                      v-model="userblicense.paidup"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="成立日期:" :required="true">
                    <el-input
                      v-model="userblicense.blishment"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="有效期:" :required="true">
                    <el-input
                      v-model="userblicense.validity"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="法人:" :required="true">
                    <el-input
                      v-model="userblicense.legal"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="注册资本:" :required="true">
                    <el-input
                      v-model="userblicense.register"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="登记机关:" :required="true">
                    <el-input
                      v-model="userblicense.authority"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="社会信用代码:" :required="true">
                    <el-input
                      v-model="userblicense.credit"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="税务登记号:" :required="true">
                    <el-input
                      v-model="userblicense.taxregis"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="类型:" :required="true">
                    <el-input
                      v-model="userblicense.deltype"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="组成形式:" :required="true">
                    <el-input
                      v-model="userblicense.sistion"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="经营范围:" :required="true">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 3 }"
                      v-model="userblicense.business"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="证件编号:" :required="true">
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
      </el-dialog>
    </div>
  </el-scrollbar>
</template>

<script>
// 引入js
import { getInputValue } from "../../static/js/amountFormat.js";
// 步骤条
import usersteps from "../components/usersteps.vue";
import "../../static/css/disaoerss.less";
import "../../static/css/file_policy_style.less";
import "../../static/css/el_form.less";
import "../../static/css/el_dising.less";
// import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import Comimageviewer from "../components/ComImageviewer.vue";

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
  Reviewcase,
  Casetype,
  Feedback,
  Upsecase,
  // Casedownload,
  Insuredtype,
  Caserepeat,
} from "../api/api";
import axios from "axios";

export default {
  name: "adminfiedform",
  components: {
    usersteps,
    // ElImageViewer,
    Comimageviewer,
  },
  // props: ["taskview", "anyou"],
  data() {
    return {
      insured_type: "",
      number: "",
      dat: "",
      divtaus: false,
      // 风险评估id
      evalid: "",
      // 类型
      insuredtypeid: "",
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
      dialogff: false,
      // 身份证
      userfilesz: "",
      usercaidfile: "",
      usernamesfzimg: "",
      filescaid: true,
      usersrces: true,
      indeusername: "",
      srcListurl: [],
      // 营业执照
      blicense: "",
      srcs: "",
      blicenseimg: "",
      srcLists: [],
      usersfz: "",
      boolblidocx: true,
      boolblisrcs: true,
      indeuserblic: "",
      showViewer: false, // 显示查看器
      srcListsurl: [],
      tltle: "",
      case_type: "",
      company: "",
      // 起诉状
      plaintiff: [],
      // 保全申请书
      preservation: [],
      preserimgurl: [],
      // 证据材料
      testimony: [],
      timonsrc: "",
      timonfile: "",
      monyimg: true,
      monyfile: true, // 保全金额（重点
      testmonyimage: [],
      textmonyimg: false,
      testmonyurl: [],
      index: "",

      from: {
        input: "",
      },
      // 标签页
      activeName: "first",
      // 快速反馈
      feedback: 1,
      // 补充内容
      textarea: "" || "无",
      // 地址
      https: "",
      // 起诉状文件/图片
      lasrcs: "",
      lasrc: true,
      complatxt: "",
      txtplay: true,
      plaintiffimg: false, //显示器
      plainimage: [],
      plaintiffurl: [],
      // 保全申请书/图片
      baosrcs: "",
      baosrc: true,
      complatexts: "",
      btxtop: true,
      preserimages: [],
      preserimg: false,
      // 所有的按由类型
      // anyou: "",
      // 处理步骤
      csteps: "",
      cstext: "",
      ocrprease: [],
      ocrpreaseimg: [],
      activepane: "textocr",
      filesauth: false,
      filescate: false,
      xiazbtn: false,
      fromheight: 500,
      cty: "",
      fus: "",
      btnnum: "",
      // 人民币大写
      fromrmb: "",
      // loading
      qisloading: false,
      sqloading: false,
      zjloading: false,

      // upzjloading: false,

      dioat: "",

      plaintifftf: false,
      preservationtf: false,
      testimonytf: false,
      arrat: [],
      insuredt: "",
    };
  },
  destroyed() {
    window.removeEventListener("beforeunload", (e) => {
      this.beforeClosepage(e);
    });
  },
  created() {
    this.$nextTick(() => {
      this.$refs["myscrollbar"].wrap.scrollTop = document.body.scrollTop = 0;
    });

    this.reviewapi();
  },
  mounted() {
    this.$nextTick(function () {
      this.fromheight = window.innerHeight - 20;
    });
    window.addEventListener("beforeunload", (e) => {
      this.beforeClosepage(e);
    });
    this.caserepeatapi();
  },
  methods: {
    beforeClosepage() {
      window.opener.postData();
    },
    // 相同案件提示
    caserepeatapi(){
      let data = {
        risk_eval_id: this.$route.query.data
      }
      Caserepeat(data).then(res=>{
        if (res.data != null) {
          // const h = this.$createElement;
          let tmp = ''
          res.data.forEach(element => {
            tmp+=`<span><a href='/admin/index.html#/usertable/adminfiedlook?data=`+element.id+`' target='_blank'>`+element.number+`</a></span><br>`
            // tmp = h('div',{},[
            //   h('span',{
            //     on:{
            //       click:this.tocreate
            //     }
            //   },`案件编号:`+element.number+``)
            // ])
          });
          this.$notify.close();
          
          this.$notify({
              title: '案件相同提醒',
              dangerouslyUseHTMLString: true,
              message: tmp,
              duration: 0,
              offset: 100,
              type: 'warning'
          })
          
        }
      })
    },

    insuredid(){
      let dats = {
        insured_type: this.insuredtypeid,
        risk_eval_id: this.evalid,
      }
      if(this.insuredtypeid == 1){
        this.insuredt = `<span>已修改至自然人</span>`;
      }else if(this.insuredtypeid == 2){
        this.insuredt = `<span>已修改至企业</span>`;
      }
      Insuredtype(dats).then((res)=>{
        if(res.code == 200){
          this.reviewapi()
          this.$message({
              showClose: true,
              dangerouslyUseHTMLString: true,
              message: this.insuredt,
              type: "success",
            });
        }
      })
    },
    // 任务查看api
    reviewapi() {
      var data = {
        risk_eval_id: this.$route.query.data,
      };
      Reviewcase(data).then((res) => {
        if (res.code == 200) {
          this.taskview(res.data);
          this.csteps = res.data.review_records;
          this.cstext = "快速反馈";
          this.number = res.data.number;

          Casetype().then((res) => {
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
      this.insured_type = dat.insured_type;
      this.insuredtypeid = dat.insured_type;
      // console.log('2222',dat.insured_type);

      if (dat.preserv_amount) {
        this.from.input = dat.preserv_amount;
      }

      let htts = process.env.VUE_APP_API_URL;
      this.https = htts;
      // console.log(htts);
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
            this.srcListurl.push(htts + "/" + caid.path);
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

        let indexrte = { ...this.usernamesfz };
        this.indeusername = indexrte;
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
          if (
            bugt.toLowerCase() == "jpg" ||
            bugt.toLowerCase() == "jpeg" ||
            bugt.toLowerCase() == "png"
          ) {
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
          this.blicenseimg = blisrcs;
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

        let indesbli = { ...this.userblicense };
        this.indeuserblic = indesbli;
      }
      // 起诉状图片
      this.plaintiff = dat.files.indictment;
      if (this.plaintiff != null) {
        this.plaintifftf = true;
        var k = [];
        var z = [];
        for (let p = 0; p < this.plaintiff.length; p++) {
          var s = this.plaintiff[p];
          var na = s.path.substring(s.path.lastIndexOf(".") + 1);

          if (
            na.toLowerCase() == "jpg" ||
            na.toLowerCase() == "jpeg" ||
            na.toLowerCase() == "png"
          ) {
            k.push(s);
            this.plainimage.push(htts + "/" + s.path);
          } else {
            z.push(s);
          }
        }

        if (k.length != 0) {
          this.lasrcs = k;
          // console.log("k", this.lasrcs);
          this.lasrc = true;
        } else {
          this.lasrc = false;
        }
        if (z.length != 0) {
          this.complatxt = z;
          // console.log("z", this.complatxt);
          this.txtplay = true;
        } else {
          this.txtplay = false;
        }
      }

      this.preservation = dat.files.preservation;
      if (this.preservation != null) {
        this.preservationtf = true;
        var bo = [];
        var u = [];
        for (let e = 0; e < this.preservation.length; e++) {
          var st = this.preservation[e];

          var ns = st.path.substring(st.path.lastIndexOf(".") + 1);
          if (
            ns.toLowerCase() == "jpg" ||
            ns.toLowerCase() == "jpeg" ||
            ns.toLowerCase() == "png"
          ) {
            bo.push(st);
            this.preserimages.push(htts + "/" + st.path);
          } else {
            u.push(st);
          }
        }
        if (bo.length != 0) {
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
      // 证据材料
      this.testimony = dat.files.testimony;
      if (this.testimony != null) {
        this.testimonytf = true;
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
        } else {
          this.monyimg = false;
        }
        if (tiomonfile.length != 0) {
          this.timonfile = tiomonfile;
        } else {
          this.monyfile = false;
        }
      }
    },
    onopensfz(ind) {
      this.srcListsurl = [...this.srcListurl, ind];
      this.showViewer = true;
    },
    onPreview(ind) {
      this.srcListsurl = [...this.srcLists, ind];
      this.showViewer = true;
    },
    qisuopenViewer(ind) {
      this.plaintiffurl = [...this.plainimage, ind];
      this.plaintiffimg = true;
    },
    bqopenViewer(ind) {
      this.preserimgurl = [...this.preserimages, ind];
      this.preserimg = true;
    },
    zjopenmony(ins) {
      this.testmonyurl = [...this.testmonyimage, ins];
      this.textmonyimg = true;
    },
    // 关闭查看器
    closeViewer() {
      this.showViewer = false;
      this.plaintiffimg = false;
      this.preserimg = false;
      this.textmonyimg = false;
    },

    listimg() {
      this.xiazbtn = true;
    },
    youlistimg() {
      this.xiazbtn = false;
    },
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
            this.lasrcs = "";
            this.complatxt = "";
            this.baosrcs = "";
            this.complatexts = "";
            this.timonsrc = "";
            this.timonfile = "";
            this.reviewapi();
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
          }
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: "删除失败",
            type: "error",
          });
        });
      this.divtaus = false;
      this.$emit("funcs");
    },
    anniu(dat) {
      if (dat == 1) {
        this.dialogff = true;
        this.filesauth = true;

        this.filescate = false;
      } else if (dat == 2) {
        this.dialogff = true;
        this.filescate = true;

        this.filesauth = false;
      }
    },
    handle() {
      this.divtaus = false;
      this.dialogff = false;
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
        })
        .catch(() => {
          // console.log("否");
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
    numfeedback(ind) {
      this.dioat = ind;
    },
    userinputmon() {
      // var timer = setTimeout(() => {
      //   clearInterval(timer);
      // }, 500);
      if (this.from.input) {
        let rmbs = Number(moneyDelete(this.from.input));
        this.fromrmb = this.formatRMB(rmbs, "￥").value;
      } else {
        this.fromrmb = "";
      }
    },
    btnnumber(ind) {
      // console.log(ind);
      this.btnnum = ind;
      // switch(ind){
      //   case 5:
      //     this.upzjloading = true;
      //     return;
      // }
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
            this.reviewapi();
            // this.upzjloading = false;
            this.$message({
              showClose: true,
              message: "上传成功",
              type: "success",
            });
          }
        });
      }
    },
    // 快速反馈按钮
    through(a) {
      if (a == 1) {
        if (this.insured_type == 1) {
          if (this.usernamesfz.name != "") {
            if (this.feedback == 1 || this.feedback == 2) {
              if (!this.from.input || this.from.input != 0) {
                this.apidiledfrom();
              } else {
                this.$message({
                  showClose: true,
                  message: "保险金额不能为空或者0",
                  type: "error",
                });
              }
            } else if (this.feedback == 3) {
              this.apidiledfrom();
            }
          } else {
            this.$message({
              showClose: true,
              message: "请检查投保人姓名",
              type: "error",
            });
          }
        } else if (this.insured_type == 2) {
          if (this.userblicense.company != "") {
            if (this.feedback == 1 || this.feedback == 2) {
              if (this.from.input) {
                this.apidiledfrom();
              } else {
                this.$message({
                  showClose: true,
                  message: "保险金额不能为空",
                  type: "error",
                });
              }
            } else if (this.feedback == 3) {
              this.apidiledfrom();
            }
          } else {
            this.$message({
              showClose: true,
              message: "请检查投保人单位名称",
              type: "error",
            });
          }
        }
      }
      // else if (a == 0) {
      //   this.$router.push({
      //     path: "/usertable",
      //   });
      // }
    },
    alldown(dat) {
      // qisloading: false,
      // sqloading: false,
      // zjloading: false,
      if (dat == 3) {
        this.qisloading = true;
      }
      if (dat == 4) {
        this.sqloading = true;
      }
      if (dat == 5) {
        this.zjloading = true;
      }

      // 3.起诉状；4.保全申请书；5.证据材料
      // axios.Headers.add="Access-Control-Expose-Headers";
      let url = this.https + "/api/v1/admin/review/case/download";
      let data = {
        risk_eval_id: this.evalid,
        type: dat,
      };

      axios
        .get(url, {
          params: { ...data },
          responseType: "blob",
        })
        .then((res) => {
          if (res.status == 200) {
            this.qisloading = false;
            this.sqloading = false;
            this.zjloading = false;
          }
          let url = window.URL.createObjectURL(
            new Blob([res.data], { type: "application/zip" })
          );
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
      // console.log(dat,name);
      var tempwindow = window.open("_blank"); // 先打开页面
      tempwindow.location = "https://wx.haobofalv.com/" + dat;
    },
    apidiledfrom() {
      let numind = Number(moneyDelete(this.from.input));
      if (numind >= 5000000 && this.feedback == 1) {
        this.fus = 4;
      } else {
        this.fus = "";
      }
      
      var das = {
        usernamesfz: this.usernamesfz,
        userblicense: this.userblicense,
        amount: this.from.input,
        textarea: this.textarea,
      };
      var data = {
        risk_eval_id: this.evalid,
        insured: this.usernamesfz.name || this.userblicense.company,
        stage: this.fus == 4 ? this.fus : this.feedback,
        amount: Number(moneyDelete(this.from.input)),
        eval_info_json: JSON.stringify(das),
        opinion: this.textarea,
      };
      Feedback(data)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "提交成功",
              type: "success",
            });
            if (this.feedback == 1 || this.feedback == 2) {
              // 填写信息
              this.$router.push({
                path: "/usertable/hisupervisor",
                query: {
                  data: this.evalid,
                },
              });
            } else if (this.feedback == 3) {
              this.$router.push({
                path: "/usertable/adminfiedlook",
                query: {
                  data: this.evalid,
                },
              });
            }
          }
        })
        .catch(() => {
          // console.log(err);
          this.$message({
            showClose: true,
            message: "提交失败,请刷新页面",
            type: "error",
          });
          // this.$router.push({
          //   path: "/usertable",
          // });
        });
    },
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
    // margin-bottom: 10px;
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
    // margin-left: 300px;
    // margin-right: 300px;
    .grid-content {
      padding: 5px;
      font-size: 18px;
      font-weight: 600;
      color: #000;
    }
  }
  .admreviewerss {
    margin-top: 10px;
    .el-row {
      padding-left: 20px;
      padding-right: 20px;
      .el-tabs {
        height: 238px;
      }
      .shenhe {
        // text-align: center;
        padding-bottom: 30px;
        margin-left: 20px;
        .el-button {
          border: 0;
          margin: 6px 30px;
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
        min-width: 160px;
        font-size: 15px;
        // color: #606266;
      }
      span {
        width: 400px;
        line-height: 36px;
        font-size: 16px;
        color: #606266;
      }
      .imgs {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        flex-wrap: wrap;
        .el-image {
          display: flex;
          background-color: #bbbbbb;
          align-items: center;
          justify-content: center;
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

      .listqiimg {
        display: flex;
        .imgs {
          width: 74vw;
          margin-bottom: 20px;
        }
      }

      .tianbtn {
        margin-bottom: 10px;
        margin-left: 160px;
        padding: 9px 15px;
      }
      .listchuadn{
        display: flex;
        align-items: center;
      }
    }
    .marwers {
      display: flex;
      .marwers_p {
        width: 150px;
        margin: 0;
        font-size: 15px;
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
    .tyetext {
      display: flex;
      // justify-content: center;

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
    .bgimg {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      .el-image {
        display: flex;
        background-color: #bbbbbb;
        align-items: center;
        justify-content: center;
      }
    }
    .tabpane {
      // display: flex;
      .radiogroup {
        // margin-left: 20vw;
        margin-top: 12px;
        .textinput {
          display: flex;
          align-items: center;
        }
      }
    }
    // .el-carousel {
    //   width: 500px;
    //   height: 630px !important;
    //   .el-carousel__container {
    //     height: 630px !important;
    //     .el-carousel__item,
    //     .el-carousel__mask {
    //       height: initial;
    //     }
    //   }
    // }
    .adminiewrss {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
