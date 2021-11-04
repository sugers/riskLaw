<template>
  <div class="usertable">
    <div class="headeraudio">
      <div class="radios">
        <span class="radios_sapn">状态：</span>
        <el-radio-group v-model="radiocyt" @change="changeradio">
          <el-radio-button label="-1">全部</el-radio-button>
          <el-radio-button label="1">启用</el-radio-button>
          <el-radio-button label="0">禁用</el-radio-button>
        </el-radio-group>
      </div>
      <div class="radios">
        <div class="radios_sapn">名称：</div>
        <div class="boxxinput">
          <el-input placeholder="请输入内容" v-model="keyword" clearable>
          </el-input>
        </div>
      </div>
      <div class="scrbtnb">
        <el-button
          type="info"
          @click.prevent="auditdelclick"
          icon="el-icon-refresh"
        >
          重置
        </el-button>
        <el-button
          type="primary"
          @click.prevent="auditdataclick"
          icon="el-icon-search"
        >
          搜索
        </el-button>
      </div>
    </div>

    <div class="asiostable">
      <div class="audibtnes">
        <el-button
          v-if="this.radiocyt != 0"
          type="text"
          size="small"
          style="background-color: #409eff"
          icon="el-icon-plus"
          @click.prevent="createCase"
        >
          创建案由类型
        </el-button>
      </div>
      <el-table
        ref="autotable"
        :header-cell-style="headertextAlgin"
        :cell-style="celltextAlgin"
        :data="tableData"
        style="width: 100%"
        :row-class-name="tablerowclassname"
        class="eltables"
      >
        <el-table-column type="selection" min-width="35"> </el-table-column>
        <el-table-column
          type="index"
          :index="indexMethos"
          width="60"
          label="序号"
        >
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="名称" min-width="150">
        </el-table-column>
        <el-table-column prop="is_enable" label="状态" min-width="100">
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.is_enable === 1 ? '启用' : '禁用'"
              placement="top"
            >
              <el-switch
                v-model="scope.row.is_enable"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                @change="changeStatus($event, scope.row)"
              >
              </el-switch>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="statement"
          label="事实简要陈述"
          min-width="180"
        >
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          prop="expt_res"
          label="诉讼请求"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="case_evidence"
          label="案件证据"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          prop="legal_terms"
          label="法律依据"
          width="200"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button
              @click.prevent="deleteRows(scope.row)"
              type="text"
              size="small"
              style="background-color: #409eff"
            >
              查看
            </el-button>
            <el-button
              @click.prevent="audiostat(scope.row)"
              type="text"
              size="small"
              style="background-color: #f56c6c"
            >
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Spin fix v-show="isdone">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>

    <div class="paginat">
      <el-pagination
        class="paginastyes"
        ref="paginatref"
        background
        layout="total,sizes,prev, pager, next"
        @size-change="handsizetext"
        @current-change="handsizepage"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pagesize"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog
      width="40%"
      center
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      class="casedialog"
    >
      <div class="gir-text">
        <div class="grid-content">修改</div>
      </div>
      <div class="caseless">
        <el-form ref="form" :model="casetypeform" label-width="120px">
          <el-form-item label="名称">
            <div>{{ casetypeform.name }}</div>
          </el-form-item>
          <el-form-item label="诉讼请求">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3 }"
              v-model="casetypeform.expt_res"
            ></el-input>
          </el-form-item>
          <el-form-item label="案件证据">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3 }"
              v-model="casetypeform.case_evidence"
            ></el-input>
          </el-form-item>
          <el-form-item label="事实简要陈述">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3 }"
              v-model="casetypeform.statement"
            ></el-input>
          </el-form-item>
          <el-form-item label="法律依据">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3 }"
              v-model="casetypeform.legal_terms"
            ></el-input>
          </el-form-item>

          <el-form-item label="是否启用">
            <el-switch
              v-model="casetypeform.is_enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ModifyCasetype">修改</el-button>
            <el-button @click="CasetypeCencel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog
      width="40%"
      center
      :visible.sync="createdialog"
      :before-close="handleClose"
      class="casedialog"
    >
      <div class="gir-text">
        <div class="grid-content">新建</div>
      </div>
      <div class="caseless">
        <el-form ref="form" :model="createCasetype" label-width="120px">
          <el-form-item label="名称" :required="true">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3 }"
              v-model="createCasetype.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="诉讼请求">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3 }"
              v-model="createCasetype.expt_res"
            ></el-input>
          </el-form-item>
          <el-form-item label="案件证据">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3 }"
              v-model="createCasetype.case_evidence"
            ></el-input>
          </el-form-item>
          <el-form-item label="事实简要陈述">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3 }"
              v-model="createCasetype.statement"
            ></el-input>
          </el-form-item>
          <el-form-item label="法律依据">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3 }"
              v-model="createCasetype.legal_terms"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item label="是否启用">
            <el-switch
              v-model="createCasetype.is_enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="Create">新建</el-button>
            <el-button @click="CaseCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog
      width="40%"
      center
      :visible.sync="createdialoglook"
      :before-close="handleClose"
      class="casedialogLook"
    >
      <div class="gir-text">
        <div class="grid-content">详情</div>
      </div>
      <div class="caselessLook">
        <el-form ref="form" :model="LookCasetype" label-width="120px">
          <el-form-item label="名称">
            <div>{{LookCasetype.name}}</div>
          </el-form-item>
          <el-form-item label="诉讼请求">
            <div>{{LookCasetype.expt_res}}</div>
          </el-form-item>
          <el-form-item label="案件证据">
            <div>{{LookCasetype.case_evidence}}</div>
          </el-form-item>
          <el-form-item label="事实简要陈述">
            <div>{{LookCasetype.statement}}</div>
          </el-form-item>
          <el-form-item label="法律依据">
            <div>{{LookCasetype.legal_terms}}</div>
          </el-form-item>
          <el-form-item label="状态">
            <el-tag size="medium" type="danger" v-if="LookCasetype.is_enable == 0"
                >已禁用</el-tag
              >
            <el-tag size="medium" v-if="LookCasetype.is_enable == 1"
                >已启用</el-tag
              >
          </el-form-item>
          
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { Admincasetypes, Admintypeput, Admincasetypepost } from "../api/api";
import "../../static/css/casetype.less";
export default {
  data() {
    return {
      dialogVisible: false,
      createdialog: false,
      createdialoglook: false,
      isdone: false, // loading
      total: 0, //总条数
      pagesize: 10, //每页的个数
      currentPage: 1, //当前页数
      radiocyt: -1,
      keyword: "" || null, //名称
      tableData: [], //表格数据
      casetypeform: {
        ID: "",
        name: "",
        statement: "",
        expt_res: "",
        case_evidence: "",
        legal_terms: "",
        is_enable: "",
      },
      createCasetype: {
        name: "",
        statement: "",
        expt_res: "",
        case_evidence: "",
        legal_terms: "",
        // is_enable: "",
      },
      LookCasetype: {
        name: "",
        statement: "",
        expt_res: "",
        case_evidence: "",
        legal_terms: "",
        is_enable: "",
      },
    };
  },
  mounted() {
      this.casetypeAPI(
        this.keyword,
        this.radiocyt,
        this.currentPage,
        this.pagesize
      );
  },
  methods: {
    // 表格
    headertextAlgin() {
      return "text-align: center; background: #f7f7f7; color:#2F2E2E; font-size:14px;";
    },
    // 表格内容
    celltextAlgin({ columnIndex }) {
      if (columnIndex != 12) {
        return "text-align: center;";
      }
    },
    // 表格斑马纹
    tablerowclassname({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    // 分页
    handsizetext(size) {
      this.pagesize = size;
      this.casetypeAPI(
        this.keyword,
        this.radiocyt,
        this.currentPage,
        this.pagesize
      );
    },
    handsizepage(cur) {
      this.currentPage = cur;
      // console.log("cur", cur);
      this.casetypeAPI(
        this.keyword,
        this.radiocyt,
        this.currentPage,
        this.pagesize
      );
    },
    // 表格序号
    indexMethos(index) {
      return index + 1 + (this.currentPage - 1) * this.pagesize;
    },
    // 重置
    auditdelclick() {
      this.keyword = "";
      this.currentPage = 1
      this.casetypeAPI(
        null,
        this.radiocyt,
        this.currentPage,
        this.pagesize
      );
    },
    // 搜索
    auditdataclick() {
      if (this.keyword) {
        this.casetypeAPI(this.keyword,this.radiocyt,null,null);
      }
    },
    // 弹窗
    handleClose() {
      this.dialogVisible = false;
      this.createdialog = false;
      this.createdialoglook = false;
    },
    createCase() {
      this.createdialog = true;
    },
    CaseCancel() {
      this.createdialog = false;
    },
    //
    //
    // 选择状态
    changeradio() {
      let pagee = 1;
      this.currentPage = pagee;
      this.casetypeAPI(null, this.radiocyt, this.currentPage, this.pagesize);
    },
    // 表格数据api
    casetypeAPI(name, enable, page, limit) {
      this.isdone = true;
      let data = {
        name: name,
        enable: enable,
        page: page,
        limit: limit,
      };
      Admincasetypes(data).then((res) => {
        if (res.code == 200) {
          this.isdone = false;
        }
        if (res.data.list) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        } else {
          this.tableData = [];
        }
      });
    },
    // 修改案由类型api
    Admintypeputs(
      is_enable,
      statement,
      expt_res,
      case_evidence,
      legal_terms,
      id
    ) {
      let data = {
        is_enable: is_enable,
        statement: statement,
        expt_res: expt_res,
        case_evidence: case_evidence,
        legal_terms: legal_terms,
        id: id,
      };
      Admintypeput(data).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
          this.casetypeAPI(
            null,
            this.radiocyt,
            this.currentPage,
            this.pagesize
          );
        }
      });
    },
    // 快速启用案由
    changeStatus(event, row) {
      this.Admintypeputs(event, null, null, null, null, row.ID);
    },
    // 修改案由类型
    ModifyCasetype() {
      // console.log('form',this.casetypeform);
      this.Admintypeputs(
        this.casetypeform.is_enable,
        this.casetypeform.statement,
        this.casetypeform.expt_res,
        this.casetypeform.case_evidence,
        this.casetypeform.legal_terms,
        this.casetypeform.ID
      );
    },
    // 创建案由类型
    Create() {
      // console.log("1", this.createCasetype);
      let data = {
        name: this.createCasetype.name,
        statement: this.createCasetype.statement,
        expt_res: this.createCasetype.expt_res,
        case_evidence: this.createCasetype.case_evidence,
        legal_terms: this.createCasetype.legal_terms,
      };
      Admincasetypepost(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "创建成功",
            type: "success",
          });
          this.casetypeAPI(
            null,
            this.radiocyt,
            this.currentPage,
            this.pagesize
          );
          this.createdialog = false;
        }
      });
    },
    // 查看
    deleteRows(ind) {
      this.LookCasetype = ind
      this.createdialoglook = true;
    },
    // 修改
    audiostat(ind) {
      this.casetypeform = ind;
      this.dialogVisible = true;
    },
    CasetypeCencel() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
</style>