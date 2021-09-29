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
                      <div v-show="shancu" class="shan" @click="deletes(item.id, item.path)">
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-for="item in usercaidfile" :key="item.id">
                <div class="tyetext" v-if="filescaid">
                  <div class="textwen">
                    <p class="ptextlei" 
                      :style="item.path.substring(item.path.lastIndexOf('.') + 1).toLowerCase() == 'pdf' ?  'color: #5162f8;cursor: pointer;' : 'color:#000'"
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
                      <div v-show="shancu" class="shan" @click="deletes(item.id, item.path)">
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
              <span class="textsollc">
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
                      <div v-show="shancu" class="shan" @click="deletes(item.id, item.path)">
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-for="item in usersfz" :key="item.id">
                <div class="tyetext">
                  <div class="textwen">
                    <p class="ptextlei" 
                      :style="item.path.substring(item.path.lastIndexOf('.') + 1).toLowerCase() == 'pdf' ?  'color: #5162f8;cursor: pointer;' : 'color:#000'"
                      @click="btnclicks(item.path)"
                      :title="item.file_name">
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div v-show="shancu" class="shan" @click="deletes(item.id, item.path)">
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
                <span>{{ complaint.casetype }}</span>
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
                <span class="policy_btn" v-if="plaintifftf">
                  <el-button
                    class="policy_bton"
                    type="primary"
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
                      <div v-show="shancu" class="shan" @click="deletes(item.id, item.path)">
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-for="(item, ind) in complatxt" :key="ind">
                <div class="tyetext" v-if="txtplay">
                  <div class="textwen">
                    <p class="ptextlei" 
                      :style="item.path.substring(item.path.lastIndexOf('.') + 1).toLowerCase() == 'pdf' ?  'color: #5162f8;cursor: pointer;' : 'color:#000'"
                      @click="btnclicks(item.path)"
                      :title="item.file_name">
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div
                        v-show="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path, ind)"
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
                <span class="policy_btn" v-if="preservationtf">
                  <el-button
                    class="policy_bton"
                    type="primary"
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
                      <div v-show="shancu" class="shan" @click="deletes(item.id, item.path)">
                        删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-for="(item, ind) in complatexts" :key="ind">
                <div class="tyetext" v-if="btxtop">
                  <div class="textwen">
                    <p class="ptextlei"
                      :style="item.path.substring(item.path.lastIndexOf('.') + 1).toLowerCase() == 'pdf' ?  'color: #5162f8;cursor: pointer;' : 'color:#000'"
                      @click="btnclicks(item.path)" 
                      :title="item.file_name">
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div
                        v-show="shancu"
                        class="shan"
                        @click="deletes(item.id, item.path, ind)"
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
            <div class="marwers">
              <p class="marwers_p">证据材料：</p>
              <div>
                <div class="policy">
                  <span class="policy_btn" v-if="testimonytf">
                    <el-button
                      class="policy_bton"
                      type="primary"
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
                    <p class="ad_imgs_txts" :title="item.file_name" @click="zjopenmony(dome)">
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div v-show="shancu" class="shan" @click="deletes(item.id, item.path)">
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
                    <p class="ad_imgs_txt" 
                      :style="item.path.substring(item.path.lastIndexOf('.') + 1).toLowerCase() == 'pdf' ?  'color: #5162f8;cursor: pointer;' : 'color:#000'"
                      @click="btnclicks(item.path)"
                      :title="item.file_name">
                      {{ item.file_name }}
                    </p>
                    <div class="btntext">
                      <a
                        :href="'https://wx.haobofalv.com/' + item.path"
                        :download="item.file_name"
                        >下载</a
                      >
                      <div v-show="shancu" class="shan" @click="deletes(item.id, item.path)">
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
              <p>同意承保法律依据:</p>
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
            <div class="martexts" v-if="law_opinion_path != ''">
              <p>附件：</p>
              <el-button type="primary" @click.prevent="falbookes"
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
            <div class="sinstate">
              <p>出单状态：</p>
              <div class="tag_tag">
                <!-- <el-radio-group v-model="feedcudan">
                  <el-radio :label="1">已出单</el-radio>
                  <el-radio :label="0">未出单</el-radio>
                </el-radio-group> -->
                <el-tag type="danger" v-if="feedcudan == 0">未出单</el-tag>
                <el-tag type="success" v-if="feedcudan == 1">已出单</el-tag>
                
              </div>
            </div>
            <div class="martexts">
              <p>保险金额：</p>
              <span>
                <span>{{usertiduy.baoxianRMB | currency}}</span>
              </span>
            </div>
            <div class="marwers">
              <p class="marwers_p">保单附件：</p>
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
                  <p class="ad_imgs_txts" :title="item.file_name" @click="cdtransrcopen(insrc)">
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
              <div class="listqishu" v-if="tranboolefile">
                <span
                  class="imgs"
                  v-for="(item, ins) in tranfiles"
                  :key="ins"
                >
                  <p class="ad_imgs_txt" 
                    :title="item.file_name"
                    :style="item.path.substring(item.path.lastIndexOf('.') + 1).toLowerCase() == 'pdf' ?  'color: #5162f8;cursor: pointer;' : 'color:#000'"
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
            
          </el-col>
        </el-row>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
// 步骤条
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

// 引入api
import { 
  Casefile, 
  // Lawopinion, 
  Reviewcase, 
  Casetype,
  Caserepeat,
} from "../api/api";
export default {
  name: "adminfiedlook",
  components: {
    usersteps,
    Comimageviewer,
  },
  data() {
    return {
      insured_type: "",
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
      plaintiffage: [],
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
      blisrced: "",
      blisrcsurl: [],

      tltle: "",
      case_type: "",
      company: "",
      // 起诉状
      plaintiff: [],
      plaintiffurl: [],
      plaintiffimg: false,
      // 保全申请书
      preservation: [],
      preserimgs: [],
      preserimgurl: [],
      preserimg: false,
      // 证据材料
      testimony: [],
      timonsrc: "",
      monyimg: true,
      timonfile: "",
      monyfile: true,
      testmonyimage:[],
      testmonyurl: [],
      textmonyimg: false,
      // 保单附件
      transaction: [],
      transrcs: [],
      tranfiles: [],
      tranboolesrc: false,
      tranboolefile: false,
      tranimggevie: [],
      tranconurl: [],
      tranconimgs: false,
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
      // 出单情况
      feedtrade: null,
      shancu: true,
      // 法律意见书
      law_opinion_path: "",
      // 出单情况
      feedcudan: null,
      // 保险金额
      usertiduy: {
        baoxianRMB: "",
      },

      plaintifftf: false,
      preservationtf: false,
      testimonytf: false,
    };
  },
  destroyed(){
    window.removeEventListener('beforeunload',e=>{
      this.beforeClosepage(e)
    })
  },
  created() {
    this.$nextTick(() => {
      this.$refs["myscrollbar"].wrap.scrollTop = document.body.scrollTop = 0;
    });
    this.reviewapi();
  },
  mounted(){
    window.addEventListener('beforeunload',e=>{
      this.beforeClosepage(e)
    });
    var userinfor = JSON.parse(localStorage.getItem("userinfor"));
    if (userinfor.roleID == 2001) {
      this.shancu = false
    }
    this.caserepeatapi()
  },
  methods: {
    // 相同案件提示
    caserepeatapi(){
      let data = {
        risk_eval_id: this.$route.query.data
      }
      Caserepeat(data).then(res=>{
        if (res.data != null) {
          console.log(res.data);
          let tmp = ''
          res.data.forEach(element => {
            tmp+=`<span><a href='/#/usertable/adminfiedlook?data=`+element.id+`' target='_blank'>`+element.number+`</a></span><br>`
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
    beforeClosepage(){
      window.opener.postData()
    },
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
          this.cstext = "订单详情";
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
      // console.log('dat',dat);
      this.feedcudan = dat.trade;
      // 风险评估id
      this.evalid = dat.id;
      this.cty = dat.case_type;
      // 出单情况
      this.feedtrade = dat.stage;
      this.insured_type = dat.insured_type;
      this.usertiduy.baoxianRMB = dat.amount;

      console.log("dat", dat);

      this.law_opinion_path = dat.law_opinion_path;
      this.csteps = dat.review_records;
      this.cteus = "0";

      let htts = process.env.VUE_APP_API_URL;
      this.https = htts;
      // console.log(htts);
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
      // 起诉状图片
      if (dat.files.indictment) {
        this.plaintiff = dat.files.indictment;
        this.plaintifftf = true;
      }
      if (this.plaintiff != null) {
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
            k.push(htts + "/" + s.path);
            this.plaintiffage.push(s);
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
        this.preservationtf = true
      }
      if (this.preservation != null) {
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
        } else {
          this.baosrc = false;
        }
        if (u.length != 0) {
          this.complatexts = u;
        } else {
          this.btxtop = false;
        }
      }

      if(dat.files.testimony){
        this.testimony = dat.files.testimony;
        this.testimonytf = true;
      }
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
          // console.log('yy',this.timonsrc);
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
      if(this.transaction != null){
        let trantimg = []
        let trantfile = []
        for (let r = 0; r < this.transaction.length; r++) {
          let filcanion = this.transaction[r];
          let ffix = filcanion.path.substring(filcanion.path.lastIndexOf(".") + 1);
          if(
            ffix.toLowerCase() == "jpg" ||
            ffix.toLowerCase() == "jpeg" ||
            ffix.toLowerCase() == "png" 
          ){
            trantimg.push(filcanion)
            this.tranimggevie.push(htts + "/" + filcanion.path)
          }else{
            trantfile.push(filcanion)
          }
        }
        if (trantimg.length != 0) {
          this.transrcs = trantimg
          this.tranboolesrc = true;
        }else{
          this.tranboolesrc = false;
        }
        if (trantfile.length != 0) {
          this.tranfiles = trantfile
          this.tranboolefile = true;
        }else{
          this.tranboolefile = false;
        }
      }
      // 上一步得数据
      let valinfo = dat.eval_info_json;
      if(valinfo.usernamesfz){
        this.usernamesfz = valinfo.usernamesfz;
      }
      if(valinfo.userblicense){
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
    // 出单查看法律意见书
    falbookes() {

      this.btnclicks(this.law_opinion_path);
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
    cdtransrcopen(ind){
      this.tranconurl = [...this.tranimggevie,ind];
      this.tranconimgs = true;
    },
    closeViewer() {
      this.showViewer = false;
      this.plaintiffimg = false;
      this.preserimg = false;
      this.textmonyimg = false;
      this.tranconimgs = false;
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
            this.plaintiffage = []
            this.complatxt = []
            this.preserimgs = []
            this.complatexts = []
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
      }).then((res) => {
        // console.log(res);
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
      });
    },
    btnclicks(dat) {
      var tempwindow = window.open("_blank"); // 先打开页面
      tempwindow.location = "https://wx.haobofalv.com/" + dat;
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
  padding-bottom: 20px;
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
      .textsollc{
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
      .listqishu {
        display: flex;
        flex-direction: column;
      }
    }
    .sinstate{
        display: flex;
        p {
          min-height: 25px;
          line-height: 36px;
          margin: 0;
          min-width: 140px;
          font-size: 15px;
        }
        .tag_tag{
          display: flex;
          align-items: center;
        }
      }
    .marwers {
      display: flex;
      .marwers_p {
        width: 150px;
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
  }
}
</style>
