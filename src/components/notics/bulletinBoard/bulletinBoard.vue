<template>
    <section>
        <div class="bulletinBoard">
            <div class="nav">
                <Breadcrumb>
                    <BreadcrumbItem to="/notics">公告栏</BreadcrumbItem>
                    <BreadcrumbItem>发公告</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="ContentExhibition">
                <div class="editList">
                    <div class="listLeft Required">
                        <span>标题：</span>
                    </div>
                    <div class="listRight">
                        <el-input v-model="titleVal" placeholder="请输入标题"></el-input>
                    </div>
                </div>
                <div class="editList">
                    <div class="listLeft Required">
                        <span>分类：</span>
                    </div>
                    <div class="listRight">
                        <el-select v-model="calssfyVal" slot="prepend" placeholder="请选择">
                            <el-option label="餐厅名" value="1"></el-option>
                            <el-option label="订单号" value="2"></el-option>
                            <el-option label="用户电话" value="3"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="editList" style="width:700px; align-items: flex-start;">
                    <div class="listLeft Required">
                        <span>内容：</span>
                    </div>
                    <div class="listRight">
                        <div id="textArea"></div>
                        <!-- <input style="display:none;" multiple accept="image/gif,image/jpeg,image/jpg,image/png"
                            type="file" ref="upInput" id="upInput">
                        <textarea id="simplemde"></textarea> -->
                        <!-- <vue-simplemde v-model="content" preview-class="markdown-body" ref="markdownEditor" /> -->
                    </div>
                </div>
                <div class="editList">
                    <div class="listLeft">
                        <span>附件：</span>
                    </div>
                    <div class="listRight">
                        <el-upload action="https://jsonplaceholder.typicode.com/posts/" :limit="1">
                            <div class="uploadBtn">
                                <i class="el-icon-upload"></i>
                                <span>上传</span>
                            </div>
                        </el-upload>
                    </div>
                </div>
                <div class="editList">
                    <div class="listLeft Required">
                        <span>接收者：</span>
                    </div>
                    <div class="listRight">
                        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchVal">
                        </el-input>
                    </div>
                </div>
                <div class="operateBtn">
                    <el-button type="primary">发布</el-button>
                    <el-button type="info">取消</el-button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import E from 'wangeditor'
    export default {
        data() {
            return {
                titleVal: '',
                calssfyVal: '',
                content: '',
                searchVal: ''
            }
        },
        mounted() {
            let that = this;
            const editor = new E('#textArea')
            editor.config.height = 230
            editor.config.customUploadImg = function (resultFiles, insertImgFn) {
                // resultFiles 是 input 中选中的文件列表
                resultFiles.forEach((item) => {
                    var formData = new window.FormData()
                    formData.append("files", item);
                    that.$http.post('https://wx.haobofalv.com/api/v1/file/upload', formData).then((res) => {
                        let result = res.data.data;
                        insertImgFn(`https://wx.haobofalv.com/${result[0]}`)
                    })
                })
            }
            editor.create()

        },
        methods: {}
    }
</script>

<style scoped>
    .ContentExhibition {
        display: flex;
        width: 55%;
        margin: 0 auto;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        margin-top: 20px;
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

    .CodeMirror,
    .CodeMirror-scroll {
        min-height: 230px;
    }

    .operateBtn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }

    .operateBtn button {

        padding: 8px 30px;
        font-size: 13px;
    }

    .operateBtn button+button {
        margin-left: 20px;
    }
</style>