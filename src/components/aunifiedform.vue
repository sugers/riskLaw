<template>
  <div class="aunif">
    <div class="fromrevie">
      <el-row>
        <el-col :span="24">
          <div class="grid-content">申请人基本信息</div>
        </el-col>
      </el-row>
    </div>
    <div class="reviewerss">
      <el-row>
        <el-col :span="24">
          <div class="martext">
            <p>申请人：</p>
            <span>{{}}</span>
          </div>
          <div class="martext">
            <p>联系电话：</p>
            <span>{{}}</span>
          </div>
          <div class="martext">
            <p>案由类型：</p>
            <span>{{}}</span>
          </div>
          <div class="martext">
            <p>保险总公司：</p>
            <span>
              <i>{{}}</i>
            </span>
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
    <div class="reviewerss">
      <el-row>
        <el-col :span="24">
          <div class="martext">
            <p>类型：</p>
            <span>{{}}</span>
          </div>
          <div class="martext">
            <p>性名：</p>
            <span>{{}}</span>
          </div>
          <div class="martext">
            <p>性别：</p>
            <span>{{}}</span>
          </div>
          <div class="martext">
            <p>出生日期：</p>
            <span>
              <i>{{}}</i>
            </span>
          </div>
          <div class="martext">
            <p>证件类型：</p>
            <span>
              <i>{{}}</i>
            </span>
          </div>
          <div class="martext">
            <p>证件号码：</p>
            <span>
              <i>{{}}</i>
            </span>
          </div>
          <div class="martext">
            <p>住址：</p>
            <span>
              <i>{{}}</i>
            </span>
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
    <div class="reviewerss">
      <el-row>
        <el-col :span="24">
          <div class="martext">
            <p>原告姓名：</p>
            <span>{{}}</span>
          </div>
          <div class="martext">
            <p>性名：</p>
            <span>{{}}</span>
          </div>
          <div class="martext">
            <p>性别：</p>
            <span>{{}}</span>
          </div>
          <div class="martext">
            <p>出生日期：</p>
            <span>
              <i>{{}}</i>
            </span>
          </div>
          <div class="martext">
            <p>证件类型：</p>
            <span>
              <i>{{}}</i>
            </span>
          </div>
          <div class="martext">
            <p>证件号码：</p>
            <span>
              <i>{{}}</i>
            </span>
          </div>
          <div class="martext">
            <p>住址：</p>
            <span>
              <i>{{}}</i>
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "aunifiedform",
};
</script>

<style lang="less" scoped>
.aunif {
  .fromrevie {
    margin-top: 35px;
    .grid-content {
      background-color: #d1e2f8;
      padding: 5px;
    }
  }
  .reviewerss {
    .el-row {
      padding-left: 20px;
    }
    .martexts {
      display: flex;
      p {
        min-height: 25px;
        line-height: 25px;
        margin: 0;
        width: 140px;
      }
      .radiospan {
        display: flex;
        // align-items: center;
      }
    }
  }
}
</style>
