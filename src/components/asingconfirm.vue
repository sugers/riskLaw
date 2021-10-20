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
      <!-- 身份证 -->
      <div class="admreviewerss" v-if="this.insured_type == 1">
        <el-row>
          <el-col :span="12">
            <div class="martexts flexphone">
              <p>姓名：</p>
              <span class="flexphonespan">{{ usernamesfz.name }}</span>
            </div>
            <div class="martexts flexphone">
              <p>性别：</p>
              <span class="flexphonespan">{{ usernamesfz.sex }}</span>
            </div>
            <div class="martexts flexphone">
              <p>出生日期：</p>
              <span class="flexphonespan">{{ usernamesfz.csdate }}</span>
            </div>
            <div class="martexts flexphone">
              <p>身份证号码：</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ usernamesfz.idcard }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>住址：</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ usernamesfz.address }}</span>
              </span>
            </div>
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
                      <div
                        v-if="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path)"
                      >
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
                      <div
                        v-if="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path)"
                      >
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
            <div class="martexts flexphone">
              <p>单位名称:</p>
              <span class="flexphonespan">{{ userblicense.company }}</span>
            </div>
            <div class="martexts flexphone">
              <p>地址:</p>
              <span class="flexphonespan">{{ userblicense.adress }}</span>
            </div>
            <div class="martexts flexphone">
              <p>实收资本:</p>
              <span class="flexphonespan">{{ userblicense.paidup }}</span>
            </div>
            <div class="martexts flexphone">
              <p>成立日期:</p>
              <span class="flexphonespan" >
                <span class="flexphonespan">{{ userblicense.blishment }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>有效期:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ userblicense.validity }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>法人:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ userblicense.legal }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>注册资本:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ userblicense.register }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>登记机关:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ userblicense.authority }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>社会信用代码:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ userblicense.credit }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>税务登记号:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ userblicense.taxregis }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>类型:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ userblicense.deltype }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>组成形式:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ userblicense.sistion }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>经营范围:</p>
              <span class="textsollc flexphonespan">
                <span class="flexphonespan">{{ userblicense.business }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>证件编号:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ userblicense.ficate }}</span>
              </span>
            </div>
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
              <div v-for="(item, inde) in blisrced" :key="inde">
                <div class="tyetext" v-if="boolblisrcs">
                  <div class="textwen">
                    <p
                      class="ptextleis"
                      :title="item.file_name"
                      @click="onPreview(inde)"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div
                        v-if="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path)"
                      >
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
                      <div
                        v-if="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path)"
                      >
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
            <div class="martexts flexphone">
              <p>原告姓名:</p>
              <span class="flexphonespan">{{ complaint.plaintiff }}</span>
            </div>
            <!-- <div class="martexts flexphone">
              <p>原告联系电话:</p>
              <span>{{ complaint.iffphone }}</span>
            </div> -->
            <div class="martexts flexphone">
              <p>被告姓名:</p>
              <span class="flexphonespan">{{ complaint.fendant }}</span>
            </div>
            <!-- <div class="martexts flexphone">
              <p>被告联系电话:</p>
              <span>{{ complaint.fendphone }}</span>
            </div> -->
            <div class="martexts flexphone">
              <p>案由类型:</p>
              <span class="flexphonespan">{{ complaint.casetype }}</span>
            </div>
            <div class="martexts flexphone">
              <p>诉讼请求:</p>
              <span class="flexphonespan">{{ complaint.claims }}</span>
            </div>
            <div class="martexts flexphone">
              <p>请求金额:</p>
              <span class="flexphonespan">{{ complaint.amount }}</span>
            </div>
            <div class="martexts flexphone">
              <p>事实简要陈述:</p>
              <span class="flexphonespan">{{ complaint.ocrevidence }}</span>
            </div>
            <!-- <div class="martexts flexphone">
              <p>事实与理由:</p>
              <span>{{ complaint.reason }}</span>
            </div> -->
            <!-- <div class="martexts flexphone">
              <p>诉讼法院:</p>
              <span>{{ complaint.court }}</span>
            </div> -->
            <!-- <div class="martexts flexphone">
              <p>起诉日期:</p>
              <span>{{ complaint.suetime }}</span>
            </div> -->
          </el-col>
          <el-col :span="12">
            <div style="padding-left: 50px">
              <div class="policy">
                <span>起诉状附件:</span>
                <span class="policy_btn" v-if="plaintifftf">
                  <el-button
                    class="policy_bton"
                    type="primary"
                    :loading="qisloading"
                    @click.prevent="alldown(3)"
                    >全部下载</el-button
                  >
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
              <Comimageviewer
                :visible.sync="plaintiffimg"
                :url="plaintiffurl"
              ></Comimageviewer>
              <div v-for="(item, inst) in plaintiffage" :key="inst">
                <div class="tyetext" v-if="lasrc">
                  <div class="textwen">
                    <p
                      class="ptextleis"
                      :title="item.file_name"
                      @click="qisuopenViewer(inst)"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div
                        v-if="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path)"
                      >
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-for="(item, ind) in complatxt" :key="ind">
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
                      <div
                        v-if="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path)"
                      >
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
            <div class="martexts flexphone">
              <p>保全申请人:</p>
              <span class="flexphonespan">{{ preserveForm.preservename }}</span>
            </div>
            <div class="martexts flexphone">
              <p>保全被申请人:</p>
              <span class="flexphonespan">{{ preserveForm.preservebei }}</span>
            </div>
            <!-- <div class="martexts flexphone">
              <p>请求事项:</p>
              <span>{{ preserveForm.presitems }}</span>
            </div> -->
            <div class="martexts flexphone">
              <p>保全金额:</p>

              <span class="flexphonespan">{{ preserveForm.pramount }}</span>
            </div>
            <div class="martexts flexphone">
              <p>保全标的:</p>

              <span class="flexphonespan">{{ preserveForm.presmark }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="padding-left: 50px">
              <div class="policy">
                <span>保全申请书附件:</span>
                <span class="policy_btn" v-if="preservationtf">
                  <el-button
                    class="policy_bton"
                    type="primary"
                    :loading="sqloading"
                    @click.prevent="alldown(4)"
                    >全部下载</el-button
                  >
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

              <Comimageviewer
                :visible.sync="preserimg"
                :url="preserimgurl"
              ></Comimageviewer>
              <div v-for="(item, inds) in preserimgs" :key="inds">
                <div class="tyetext" v-if="baosrc">
                  <div class="textwen">
                    <p
                      class="ptextleis"
                      :title="item.file_name"
                      @click="bqopenViewer(inds)"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div
                        v-if="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path)"
                      >
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
                      <div
                        v-if="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path)"
                      >
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
            <!-- <el-upload
            class="upload-demo"
            name="files"
            :on-success="handlePreview"
            action="https://wx.haobofalv.com/api/v1/file/upload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload> -->
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

                <div class="listqishu" v-if="monyimg">
                  <Comimageviewer
                    :visible.sync="textmonyimg"
                    :url="testmonyurl"
                  ></Comimageviewer>
                  <span
                    class="imgs"
                    v-for="(item, dome) in timonsrc"
                    :key="dome"
                  >
                    <p
                      class="ad_imgs_txts"
                      :title="item.file_name"
                      @click="zjopenmony(dome)"
                    >
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div
                        v-if="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path)"
                      >
                        删除
                      </div>
                    </div>
                  </span>
                </div>

                <div class="listqishu" v-if="monyfile">
                  <span
                    class="imgs"
                    v-for="(item, ins) in timonfile"
                    :key="ins"
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
                      <div
                        v-if="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path)"
                      >
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
              <p>案件证据:</p>
              <span class="flexphonespan">{{ internalForm.evidence }}</span>
            </div>
            <div class="martexts flexphone">
              <p>同意承保法律依据:</p>
              <span class="flexphonespan">{{ internalForm.basis }}</span>
            </div>
            <div class="martexts flexphone">
              <p>备注:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ internalForm.notes }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>保险保额:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ internalForm.coverage | currency }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>拒绝承保原因:</p>
              <span class="flexphonespan">
                <span class="flexphonespan">{{ internalForm.process }}</span>
              </span>
            </div>
            <div class="martexts flexphone">
              <p>附件：</p>
              <el-button type="primary" @click.prevent="falbooks"
                >查看法律意见书</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="fromrevie">
        <el-row>
          <el-col :span="24">
            <div class="grid-content">出单确认信息</div>
          </el-col>
        </el-row>
      </div>
      <div class="admreviewerss">
        <el-row>
          <el-col :span="24">
            <div class="martexts flexphone">
              <p>出单状态：</p>
              <div class="listchuadn">
                <el-radio-group
                  v-if="UserID != 2001"
                  v-model="feedcudan"
                  @change="rouderind"
                >
                  <el-radio :label="1">已出单</el-radio>
                  <el-radio :label="0">未出单</el-radio>
                </el-radio-group>
                <el-radio-group v-else v-model="feedcudan" @change="baoxiangs">
                  <el-radio :label="1">已出单</el-radio>
                  <el-radio :label="0">未出单</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div v-if="feedcudan == 1">
              <div class="martexts flexphone">
                <p>保险金额：</p>
                <span style="width: 800px" v-if="UserID != 2001">
                  <el-input
                    style="width: 200px"
                    v-model="usertiduy.baoxianRMB"
                    @blur="inputMoneyss($event, 'baoxianRMB')"
                    @input="userinputmon"
                    size="medium"
                  ></el-input>
                  元&nbsp;&nbsp;<span style="color: red">{{ usertidrmb }}</span>
                </span>
                <span style="width: 800px" v-else>
                  <el-input
                    style="width: 200px"
                    v-model="usertiduy.baoxianRMB"
                    @blur="inputMoneyedss($event, 'baoxianRMB')"
                    @input="userinputmon"
                    size="medium"
                  ></el-input>
                  元&nbsp;&nbsp;<span style="color: red">{{ usertidrmb }}</span>
                </span>
              </div>
              <div class="marwers_a">
                <p class="marwers_b">保单附件：</p>
                <div>
                  <div class="listqishu">
                    <el-upload
                      style="margin-bottom: 10px"
                      v-if="UserID != 2001"
                      name="files"
                      :show-file-list="false"
                      :on-success="handlePreviewbaox"
                      action="https://wx.haobofalv.com/api/v1/file/upload"
                      class="elupload"
                    >
                      <el-button
                        class="elupload_bton"
                        size="small"
                        type="primary"
                        @click.prevent="btnnumber(6)"
                        >点击上传</el-button
                      >
                    </el-upload>
                    <el-upload
                      v-else
                      style="margin-bottom: 10px"
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
                        >点击上传</el-button
                      >
                    </el-upload>
                  </div>
                  <div class="listqishu" v-if="tranboolesrc">
                    <Comimageviewer
                      :visible.sync="tranconimgs"
                      :url="tranconurl"
                    ></Comimageviewer>
                    <span
                      class="imgs"
                      v-for="(item, insrc) in transrcs"
                      :key="insrc"
                    >
                      <p
                        class="ad_imgs_txts"
                        :title="item.file_name"
                        @click="cdtransrcopen(insrc)"
                      >
                        {{ item.file_name }}
                      </p>
                      <div class="btntext">
                        <a
                          :href="'https://wx.haobofalv.com/' + item.path"
                          :download="item.file_name"
                          >下载</a
                        >
                        <div
                          v-if="shancu"
                          class="shan"
                          @click="deletes(item.id, item.path)"
                        >
                          删除
                        </div>
                      </div>
                    </span>
                  </div>

                  <div class="listqishu" v-if="tranboolefile">
                    <span
                      class="imgs"
                      v-for="(item, ins) in tranfiles"
                      :key="ins"
                    >
                      <p
                        class="ad_imgs_txt"
                        :title="item.file_name"
                        :style="
                          item.path
                            .substring(item.path.lastIndexOf('.') + 1)
                            .toLowerCase() == 'pdf'
                            ? 'color: #5162f8;cursor: pointer;'
                            : 'color:#000'
                        "
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
                        <div
                          v-if="shancu"
                          class="shan"
                          @click="deletes(item.id, item.path)"
                        >
                          删除
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="feedcudan == 0">
              <div class="martexts flexphone" v-if="UserID != 2001">
                <p>未出单原因：</p>
                <span>
                  <el-input
                    style="width: 550px"
                    v-model="nosinglereason"
                    :autosize="{ minRows: 4 }"
                    type="textarea"
                    :rows="3"
                    @blur="singlereason"
                    placeholder="请输入内容"
                    show-word-limit
                  ></el-input>
                </span>
              </div>
              <div class="martexts flexphone" v-else>
                <p>未出单原因：</p>
                <span>
                  <el-input
                    style="width: 550px"
                    v-model="nosinglereason"
                    :autosize="{ minRows: 4 }"
                    type="textarea"
                    :rows="3"
                    @blur="singlereasonbaoxian"
                    placeholder="请输入内容"
                    show-word-limit
                  ></el-input>
                </span>
              </div>
            </div>
            <el-tabs v-if="UserID != 2001" v-model="activeName">
              <el-tab-pane label="流程操作" name="first">
                <div class="tabpane">
                  <div>
                    <div style="margin-bottom: 10px" class="comfirmTitle">出单情况核实</div>
                    <div>
                      <el-radio-group v-model="feedback">
                        <el-radio :label="1">已核实</el-radio>
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
              <el-button
                v-if="UserID != 2001"
                type="primary"
                @click.prevent="through(1)"
                >确定</el-button
              >
              <el-button
                class="shenhebton"
                v-else
                type="primary"
                @click.prevent="through(0)"
                >确定</el-button
              >
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
      >
      </el-dialog>
    </div>
  </el-scrollbar>
</template>

<script>
// 引入js
import { getInputValue } from "../../static/js/amountFormat.js";
import usersteps from "../components/usersteps.vue";
import "../../static/css/file_policy_style.less";
import Comimageviewer from "../components/ComImageviewer.vue";
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
  // 上传文件
  Upsecase,
  // 删除文件
  Casefile,
  // 核实
  Tradeverify,
  // 修改出单
  Modifytrade,
  // 生成意见书
  Lawopinion,
  Caserepeat,
  // 保险费出单修改
  Evaltrade,
} from "../api/api";

export default {
  name: "asingconfirm",
  components: {
    usersteps,
    Comimageviewer,
  },
  data() {
    return {
      UserID: "",
      insured_type: "",
      number: "",
      // 风险评估id
      evalid: "",
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
        ocrevidence: "",
        // reason: "",
        // court: "",
        // suetime: "",
      },
      // 起诉状图片
      lainsrc: "",
      lasrcs: [],
      lasrc: true,
      plaintiffage: [],
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
      baosrc: true,
      // 保全文件
      complatexts: [],
      btxtop: true,
      // 法律意见书信息
      internalForm: {
        evidence: "",
        basis: "",
        notes: "",
        coverage: "",
        process: "",
      },
      revname: "",
      dialogff: false,
      divtaus: false,
      // 身份证
      userfilesz: "",
      usercaidfile: "",
      filescaid: true,
      usersrces: true,
      usernamesfzimg: "",
      srcListurl: [],
      srcListsurl: [],
      showViewer: false,
      // 营业执照
      blicense: "",
      srcs: "",
      srcLists: [],
      usersfz: "",
      boolblidocx: true,
      boolblisrcs: true,
      blisrcsurl: [],
      preserimgurl: [],
      preserimg: false,

      tltle: "",
      case_type: "",
      company: "",
      // 起诉状
      plaintiff: [],
      blisrced: "",
      plaintiffurl: [],
      plaintiffimg: false,
      // 保全申请书
      preservation: [],
      preserimgs: [],
      testmonyurl: [],
      testmonyimage: [],
      textmonyimg: false,
      // 证据材料
      testimony: [],
      timonsrc: "",
      monyimg: true,
      timonfile: "",
      monyfile: true,
      // 保单附件
      transaction: [],
      transrcs: [],
      tranfiles: [],
      tranboolesrc: false,
      tranboolefile: false,
      tranimggevie: [],
      tranconurl: [],
      tranconimgs: false,
      // 标签页
      activeName: "first",
      // 填写信息
      feedback: 1,
      // 出单情况
      feedcudan: null,
      // 补充内容
      textareas: "",
      // 案件类型
      casetype: "",
      visible: false,
      valid: "",
      datpath: "",
      // ocr
      jpgocr: "",
      ocrprease: "",
      filesocruse: false,
      filesparese: false,
      usertiduy: {
        baoxianRMB: "",
      },
      // 所有的按由类型
      // anyou: "",
      csteps: "",
      cstext: "",
      cty: "",
      btnnum: "",
      https: "",
      usertidrmb: "",
      // loading
      qisloading: false,
      sqloading: false,
      zjloading: false,

      plaintifftf: false,
      preservationtf: false,
      testimonytf: false,
      // 未出单原因
      nosinglereason: "",
      shancu: true,
      // 保单路径
      thepath: [],
      codeid: "",
      filtesd: [],
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
      // this.$refs["myscrollbar"].wrap.scrollHeight;
    });

    this.reviewapi();
  },
  mounted() {
    window.addEventListener("beforeunload", (e) => {
      this.beforeClosepage(e);
    });
    var userinfor = JSON.parse(localStorage.getItem("userinfor"));
    this.UserID = userinfor.roleID;
    if (userinfor.roleID == 2001) {
      this.shancu = false;
    }
    if (
      userinfor.roleID == 1001 ||
      userinfor.roleID == 1003 ||
      userinfor.roleID == 1004
    ) {
      this.caserepeatapi();
    }
  },
  methods: {
    // 相同案件提示
    caserepeatapi() {
      let data = {
        risk_eval_id: this.$route.query.data,
      };
      Caserepeat(data).then((res) => {
        if (res.data != null) {
          console.log(res.data);
          let tmp = "";
          res.data.forEach((element) => {
            tmp +=
              `<span><a href='/admin/index.html#/usertable/adminfiedlook?data=` +
              element.id +
              `' target='_blank'>` +
              element.number +
              `</a></span><br>`;
          });
          this.$notify.close();

          this.$notify({
            title: "案件相同提醒",
            dangerouslyUseHTMLString: true,
            message: tmp,
            duration: 0,
            offset: 100,
            type: "warning",
          });
        }
      });
    },
    beforeClosepage() {
      window.opener.postData();
    },
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
          this.cstext = "出单核实";
          this.number = res.data.number;

          Casetype().then((res) => {
            // console.log('案由',res.data);
            if (res.code == 200) {
              for (let i = 0; i < res.data.length; i++) {
                if (this.cty == res.data[i].ID) {
                  this.case_type = res.data[i].name;
                  // console.log("类型", this.case_type);
                }
              }
            }
          });
        }
      });
    },
    taskview(dat) {
      this.feedcudan = dat.trade;
      // 风险评估id
      this.evalid = dat.id;
      this.revname = dat.reviewer;
      this.usertiduy.baoxianRMB = dat.amount;
      this.cty = dat.case_type;
      this.insured_type = dat.insured_type;
      // 传过来的数据
      console.log("dat", dat);
      // for (let i = 0; i < this.anyou.length; i++) {
      //   if (dat.case_type == this.anyou[i].ID) {
      //     this.case_type = this.anyou[i].name;
      //   }
      // }
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
          this.srcs = htts + "/" + caidsrcs[0].path;
          this.srcLists.push(htts + "/" + caidsrcs[0].path);
          this.usernamesfzimg = caidsrcs;
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
        this.plaintifftf = true;

        var k = [];
        var z = [];
        for (let p = 0; p < this.plaintiff.length; p++) {
          var s = this.plaintiff[p];
          var na = s.path.substring(s.path.lastIndexOf(".") + 1);
          if (na == "jpg" || na == "jpeg" || na == "png") {
            k.push(htts + "/" + s.path);
            this.plaintiffage.push(s);
          } else {
            z.push(s);
          }
        }
        if (k.length != 0) {
          this.lainsrc = k[0];
          this.lasrcs = k;
          this.lasrc = true;
        } else {
          this.lasrc = false;
        }
        if (z.length != 0) {
          this.complatxt = z;
          this.txtplay = true;
        } else {
          this.txtplay = false;
        }
        // console.log("k", k);
        this.jpgocr = k;
        // console.log(this.jpgocr);
      }
      // if(this.plaintiff){}
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
        this.ocrprease = bo;
      }

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

      this.transaction = dat.files.transaction;
      if (this.transaction != null) {
        this.thepath.push(dat.files.transaction[0].path);
        let trantimg = [];
        let trantfile = [];
        for (let r = 0; r < this.transaction.length; r++) {
          let filcanion = this.transaction[r];
          let ffix = filcanion.path.substring(
            filcanion.path.lastIndexOf(".") + 1
          );
          if (
            ffix.toLowerCase() == "jpg" ||
            ffix.toLowerCase() == "jpeg" ||
            ffix.toLowerCase() == "png"
          ) {
            trantimg.push(filcanion);
            this.tranimggevie.push(htts + "/" + filcanion.path);
          } else {
            trantfile.push(filcanion);
          }
        }
        if (trantimg.length != 0) {
          this.transrcs = trantimg;
          this.tranboolesrc = true;
        } else {
          this.tranboolesrc = false;
        }
        if (trantfile.length != 0) {
          this.tranfiles = trantfile;
          this.tranboolefile = true;
        } else {
          this.tranboolefile = false;
        }
      }

      // 上一步得数据
      let valinfo = dat.eval_info_json;
      if (valinfo.usernamesfz) {
        this.usernamesfz = valinfo.usernamesfz;
      }
      if (valinfo.userblicense) {
        this.userblicense = valinfo.userblicense;
      }

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

    onopensfz(ind) {
      this.srcListsurl = [...this.srcListurl, ind];
      // console.log(this.srcListsurl);
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
    cdtransrcopen(ind) {
      this.tranconurl = [...this.tranimggevie, ind];
      this.tranconimgs = true;
    },
    closeViewer() {
      this.showViewer = false;
      this.plaintiffimg = false;
      this.preserimg = false;
      this.textmonyimg = false;
      this.tranconimgs = false;
    },

    anniu(dat) {
      if (dat == 1) {
        this.filesocruse = true;

        this.filesparese = false;
      } else if (dat == 2) {
        this.filesparese = true;
        this.filesocruse = false;
      }
      this.dialogff = true;
    },
    handle() {
      this.divtaus = false;
      this.dialogff = false;
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
            this.transrcs = [];
            this.tranfiles = [];
            this.reviewapi();
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
          }
          // console.log(res);
        })
        .catch(() => {
          // console.log(err);
          this.$message({
            showClose: true,
            message: "删除失败",
            type: "error",
          });
        });
      this.divtaus = false;
      // this.$emit("sfun");
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
          // console.log("否");
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
    // 金额大写
    userinputmon() {
      if (this.usertiduy.baoxianRMB) {
        let rmbs = Number(moneyDelete(this.usertiduy.baoxianRMB));
        // console.log("中文数字", this.formatRMB(rmbs, "￥").value);
        this.usertidrmb = this.formatRMB(rmbs, "￥").value;
      } else {
        this.usertidrmb = "";
      }
    },
    // 输入失去聚焦给千分位
    inputMoney(el, name) {
      // console.log(this.from.input);
      this.internalForm[name] = getInputValue(el);
    },
    inputMoneys(el, name) {
      this.complaint[name] = getInputValue(el);
    },
    inputMoneyss(el, name) {
      this.usertiduy[name] = getInputValue(el);
      var dat = {
        risk_eval_id: this.evalid,
        trade: this.feedcudan,
        amount: Number(moneyDelete(this.usertiduy.baoxianRMB)),
        untrade_res: this.nosinglereason,
      };
      Modifytrade(dat).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
        }
      });
    },
    inputMoneyedss(el, name) {
      this.usertiduy[name] = getInputValue(el);
      // this.evaltradeapi(
      //   this.evalid,
      //   this.feedcudan,
      //   this.filtes,
      //   Number(moneyDelete(this.usertiduy.baoxianRMB)),
      //   this.nosinglereason
      // );
    },
    singlereason() {
      var dat = {
        risk_eval_id: this.evalid,
        trade: this.feedcudan,
        amount: Number(moneyDelete(this.usertiduy.baoxianRMB)),
        untrade_res: this.nosinglereason,
      };
      Modifytrade(dat).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
        }
      });
    },
    singlereasonbaoxian() {
      // this.evaltradeapi(
      //   this.evalid,
      //   this.feedcudan,
      //   this.filtes,
      //   Number(moneyDelete(this.usertiduy.baoxianRMB)),
      //   this.nosinglereason
      // );
    },
    rouderind() {
      // 修改出单
      var dat = {
        risk_eval_id: this.evalid,
        trade: this.feedcudan,
        amount: Number(moneyDelete(this.usertiduy.baoxianRMB)),
        untrade_res: this.nosinglereason,
      };
      Modifytrade(dat).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
        }
      });
    },
    baoxiangs() {
      // this.evaltradeapi(
      //   this.evalid,
      //   this.feedcudan,
      //   this.filtes,
      //   Number(moneyDelete(this.usertiduy.baoxianRMB)),
      //   this.nosinglereason
      // );
    },
    // 快速反馈按钮
    through(a) {
      if (a == 1) {
        // 修改出单
        var dat = {
          risk_eval_id: this.evalid,
          trade: this.feedcudan,
          amount: Number(moneyDelete(this.usertiduy.baoxianRMB)),
          untrade_res: this.nosinglereason,
        };
        Modifytrade(dat).then(() => {
          // console.log(res);
        });

        var das = {
          risk_eval_id: this.evalid,
        };
        Tradeverify(das).then((res) => {
          // console.log(res);
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "已核实",
              type: "success",
            });
            this.$router.push({
              path: "/usertable/adminfiedlook",
              query: {
                data: this.evalid,
              },
            });
          }
        });
      } else if (a == 0) {
        if (this.feedcudan == 1) {
          let sumnew = Number(moneyDelete(this.usertiduy.baoxianRMB))
          if (sumnew != 0) {
            if (this.filtesd.length != 0) {
              this.evaltradeapi(
                this.evalid,
                this.feedcudan,
                this.filtesd,
                Number(moneyDelete(this.usertiduy.baoxianRMB)),
                this.nosinglereason
              );
            }else{
              this.$message({
                showClose: true,
                message: "请上传保单附件",
                type: "error",
              });
            }
            
          } else {
            this.$message({
              showClose: true,
              message: "请填写保险金额",
              type: "error",
            });
          }
        } else if (this.feedcudan == 0) {
          if (this.nosinglereason) {
            this.evaltradeapi(
              this.evalid,
              this.feedcudan,
              this.filtesd,
              Number(moneyDelete(this.usertiduy.baoxianRMB)),
              this.nosinglereason
            );

            // this.$router.push({
            //   path: "/usertable/adminfiedlook",
            //   query: {
            //     data: this.evalid,
            //   },
            // });
          } else {
            this.$message({
              showClose: true,
              message: "请填写未出单原因",
              type: "error",
            });
          }
        }
        // risk_eval_id	是	number	评估申请id
        // trade	是	number	0:未出单 1:已出单
        // files	是	array	出单文件,当trade=1时,必填
        // amount	否	number	保费金额,当trade=1时,必填
        // untrade_res	否	number	未出单原因,当trade=0时必填
        // Evaltrade(data).then(res=>{})
      }
    },
    // 修改出单api
    evaltradeapi(riskid, trade, files, amount, untraderes) {
      let data = {
        risk_eval_id: riskid,
        trade: trade,
        files: files,
        amount: amount,
        untrade_res: untraderes,
      };
      // console.log("yyy", data);
      Evaltrade(data).then((res) => {
        // console.log('yyy',res);
        this.codeid = res.code;
        if (res.code == 200) {
          this.reviewapi();
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          this.$router.push({
            path: "/usertable/adminfiedlook",
            query: {
              data: this.evalid,
            },
          });
        }
      });
    },
    falbooks() {
      var data = {
        risk_eval_id: this.evalid,
      };
      Lawopinion(data).then((res) => {
        // console.log(res);
        if (res.data) {
          this.btnclicks(res.data);
        }
      });
    },
    btnclicks(dat) {
      var tempwindow = window.open("_blank"); // 先打开页面
      tempwindow.location = "https://wx.haobofalv.com/" + dat;
    },
    // 平台方保单附件上传
    btnnumber(ind) {
      this.btnnum = ind;
    },
    handlePreviewbaox(response) {
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
            // this.$message({
            //   showClose: true,
            //   message: "上传成功",
            //   type: "success",
            // });
          }
        });
      }
    },
    // 保险费方保单附件上传
    handlePreview(response) {
      this.filtesd = response.data;
      let filtes = response.data[0];
      // console.log(this.filtes);
      let imgname = filtes.substring(filtes.lastIndexOf("/") + 1);
      let imgsuffix = filtes.substring(filtes.lastIndexOf(".") + 1);
      // console.log(imgname);
      // console.log(imgsuffix);
      let htts = process.env.VUE_APP_API_URL;
      let filesimg = {
        file_name: imgname,
        path: filtes,
      }
      if (
        imgsuffix.toLowerCase() == "jpg" ||
        imgsuffix.toLowerCase() == "jpeg" ||
        imgsuffix.toLowerCase() == "png"
      ) {
        this.transrcs.push(filesimg)
        this.tranboolesrc = true;
        this.tranimggevie.push(htts + "/" + filtes);
      }else{
        this.tranfiles.push(filesimg)
        this.tranboolefile = true;
      }
      // let fileimages = {
      //   name: imgname,
      //   path:
      // }
      // this.evaltradeapi(
      //   this.evalid,
      //   this.feedcudan,
      //   this.filtes,
      //   Number(moneyDelete(this.usertiduy.baoxianRMB)),
      //   this.nosinglereason
      // );
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
    margin-top: 10px;
    .el-row {
      padding-left: 20px;
      padding-right: 20px;
      .el-tabs {
        height: 200px;
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
        .shenhebton {
          border: 0;
          margin: 25px 0 10px 140px;
          padding: 9px 20px;
        }
      }
    }
    .adminiewrss {
      display: flex;
      justify-content: flex-end;
    }
    .martexts flexphone {
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
        width: 350px;
        line-height: 36px;
        font-size: 16px;
        color: #606266;
      }
      .textsollc {
        width: 400px;
        height: 250px;
        font-size: 16px;
        color: #606266;
        overflow: auto;
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
      .listchuadn {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .listqishu {
        display: flex;
        flex-direction: column;
      }
    }
    .marwers {
      display: flex;
      .marwers_p {
        width: 150px;
        margin: 0;
        // margin-right: 35px;
      }
      .marwers_b {
        width: 150px;
        margin: 0;
        display: flex;
        align-items: center;
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
    .marwers_a {
      display: flex;
      margin: 15px 0 0 0;
      .marwers_b {
        width: 150px;
        margin: 0;
        display: flex;
        // align-items: center;
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
    .tyetext {
      display: flex;
      // justify-content: flex-end;
      .textwen {
        display: flex;
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
      height: 430px !important;
      .el-carousel__container {
        .el-carousel__item {
          overflow: scroll;
        }
      }
    }
  }
}
</style>
