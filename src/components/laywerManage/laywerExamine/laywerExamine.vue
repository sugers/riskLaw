<template>
    <section>
        <div class="laywerEdit">
            <div class="editList">
                <div class="listLeft">
                    <span>头像：</span>
                </div>
                <div class="listRight">

                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>姓名：</span>
                </div>
                <div class="listRight">
                    <span>李大宝</span>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>手机号码：</span>
                </div>
                <div class="listRight">
                    <span>18816780798</span>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>从业年限</span>
                </div>
                <div class="listRight">
                    <span>4</span>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>工作城市：</span>
                </div>
                <div class="listRight">
                    <span>广州</span>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>职业证号：</span>
                </div>
                <div class="listRight">
                    <span>AZ58623355</span>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>擅长领域：</span>
                </div>
                <div class="listRight">
                    <div class="fieldDiv">
                        <span>抚养类</span>
                        <span>抚养类</span>
                        <span>抚养类</span>

                        <span>抚养类</span>
                        <span>抚养类抚养类抚养类抚养类抚养类</span>
                        <span>抚养类</span>
                        <span>车险</span>
                    </div>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>任职律所</span>
                </div>
                <div class="listRight">
                    <span>浩博律师事务所</span>
                </div>
            </div>
            <div class="editList" style="align-items: flex-start;">
                <div class="listLeft">
                    <span>个人简介：</span>
                </div>
                <div class="listRight">
                    <span>5562hhddgbdxxxnncjj</span>
                </div>
            </div>
            <div class="editList">
                <div class="listLeft">
                    <span>律师证：</span>
                </div>
                <div class="listRight">

                </div>
            </div>
            <div class="editList">
                <div class="listLeft Required">
                    <span>审批意见：</span>
                </div>
                <div class="listRight">
                    <el-input type="textarea" resize='none' :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入社会职务"
                        v-model="opinion">
                    </el-input>
                </div>
            </div>
            <div class="operatBtn">
                <el-button type="primary">通过</el-button>
                <el-button type="danger">拒绝</el-button>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                opinion: ''
            }
        },
        methods: {

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
        align-items: flex-start;
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

    .listRight .fieldDiv {
        display: flex;
        align-items: center;

        width: 100%;
        flex-wrap: wrap;
    }

    .listRight .fieldDiv span {
        min-width: 40px;
        padding: 0 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        height: 20px;
        color: #409eff;
        background: #ecf5ff;
        border: 1px solid #b3d8ff;
        border-radius: 4px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
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