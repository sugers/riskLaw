<template>
    <!-- <el-scrollbar style="height:81px;width:1200px"> -->
    <div class="stepxy">
        <div class="uesestepa">
            <div class="uesrone">
                <div class="usetxt">{{cstext}}</div>
                <div class="usenumber">编号：{{number}}</div>
            </div>
            <template v-if="elsteps">
                <div class="usersteps" v-for="(item, index) in butiao" :key="index">
                    <div class="steps">
                        <span :class="index + 1 <= numbersteap ? 'steps_num' : 'steps_ber'">{{ index + 1 }}</span>
                        <span class="steps_txt">{{ item.stage }}</span>
                        <span :class="index + 1 <= numbersteap ? 'steps_border' : 'steps_der'"></span>
                    </div>
                    <div class="steps_box">
                        <span class="step_txt">{{ item.username }}</span>
                        <span class="step_txt">{{ item.operation }}</span>
                        <span class="step_date">{{ item.created_at }}</span>
                    </div>
                </div>
            </template>

            <template v-if="elstpen">
                    <div class="usersteps" v-for="(item, ind) in butiao" :key="ind">
                        <div class="steps">
                            <span :class="ind + 1 <= numbersteap ? 'steps_num' : 'steps_ber'">{{
              ind + 1
            }}</span>
                            <span class="steps_txt">{{ item.stage }}</span>
                            <span :class="ind + 1 <= numbersteap ? 'steps_border' : 'steps_der'"></span>
                        </div>
                        <div class="steps_box">
                            <span class="step_txt">{{ item.username }}</span>
                            <span class="step_txt">{{ item.operation }}</span>
                            <span class="step_date">{{ item.created_at }}</span>
                        </div>
                    </div>
            </template>
        </div>
    </div>
    <!-- </el-scrollbar> -->
</template>

<script>
    export default {
        name: "usersteps",
        props: ["csteps", "cstext", "number"],
        data() {
            return {
                buzou: "",
                // 步骤次数
                numbersteap: "",
                butiao: [],
                elsteps: false,
                elstpen: false,
            };
        },
        created() {},
        watch: {
            csteps(val) {
                // this.buzou = dats.reverse()

                this.buzou = val;
                // console.log('步骤',val);
                let butiao = [];
                for (let i = 0; i < this.buzou.length; i++) {
                    butiao.push(this.buzou[i]);
                }
                // console.log('k',this.cstext);
                if (this.cstext == "快速反馈") {
                    this.elstpen = false;
                    this.elsteps = true;
                    butiao.push({
                        username: "",
                        stage: this.cstext,
                        created_at: "",
                    }, {
                        username: "",
                        stage: "填写详细信息",
                        created_at: "",
                    }, {
                        username: "",
                        stage: "出单核实",
                        created_at: "",
                    });
                }
                if (this.cstext == "填写详细信息") {
                    this.elstpen = false;
                    this.elsteps = true;
                    butiao.push({
                        username: "",
                        stage: this.cstext,
                        created_at: "",
                    }, {
                        username: "",
                        stage: "出单核实",
                        created_at: "",
                    });
                }
                if (this.cstext == "上级复审") {
                    this.elstpen = false;
                    this.elsteps = true;
                    butiao.push({
                        username: "",
                        stage: this.cstext,
                        created_at: "",
                    }, {
                        username: "",
                        stage: "出单核实",
                        created_at: "",
                    });
                }
                if (this.cstext == "出单核实") {
                    this.elstpen = false;
                    this.elsteps = true;
                    butiao.push({
                        username: "",
                        stage: this.cstext,
                        created_at: "",
                    });
                }

                if (this.cstext == "查看") {
                    this.elstpen = true;
                    this.elsteps = false;
                }
                this.butiao = butiao;
                this.numbersteap = this.buzou.length;

                if (this.cteus == "0") {
                    this.elsteps = true;
                    this.elstpen = false;
                } else if (this.cteus == undefined) {
                    this.elsteps = false;
                    this.elstpen = true;
                }
                // console.log('lll',this.cteus);
            },
        },
        methods: {

        },
    };
</script>

<style lang="less">
    .stepxy {
        width: 1200px;
        white-space: normal;
        overflow-y: hidden;
        overflow-x: scroll;
        // margin-top: 15px;
        margin: 0 auto;
    }

    .btn {
        color: rgb(0, 0, 0, 0.1);
    }

    .utn {
        background-color: rgb(0, 0, 0, 0.1);
    }

    .uesestepa {
        // width: 1200px;
        display: flex;
        align-items: baseline;
        justify-content: flex-start;
        padding: 10px 14px;
        .uesrone {
            min-width: 130px;
            height: 90px;
            font-size: 18px;
            font-weight: 600;
            margin-right: 10px;
            border-right: 2px solid #606266;
            padding-right: 10px;

            // display: flex;
            // flex-direction: column;
            // justify-content: space-between;
            .usenumber {
                font-size: 14px;
                // font-weight: 500;
                color: red;
            }
        }
    }

    .usersteps {
        min-width: 233px;
    }

    .usersteps:last-child .steps_der {
        width: 0 !important;
        border: none !important;
    }

    .usersteps:last-child .steps_border {
        width: 0 !important;
        border: none !important;
    }

    .steps {
        min-width: max-content;
        display: flex;
        align-items: center;

        .steps_num {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #409eff;
            color: #fff;
            background-color: #409eff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
        }

        .steps_ber {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 1px solid #969696;
            color: #fff;
            background-color: #969696;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
        }

        .steps_txt {
            // color: #969696;
            margin-right: 4px;
            font-size: 14px;
            word-wrap: break-word;
        }

        .steps_border {
            width: 130px;
            border: 1px solid #409eff;
            margin-right: 5px;
        }

        .steps_der {
            width: 130px;
            border: 1px solid #969696;
            margin-right: 5px;
        }
    }

    .steps_box {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        // justify-content: flex-start;
        padding: 0 32px;

        span {
            margin-top: 2px;
            font-size: 12px;
            color: rgb(0, 0, 0, 0.1);
        }
    }
</style>