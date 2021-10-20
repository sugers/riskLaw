<template>
    <div class="admin-login">
        <div class="login">
            <div class="logo">
                <div>
                    <div class="logo_img">
                        <img src="../../static/img/logo2x.png" alt="" />
                    </div>
                    <div class="logo_box">
                        <p class="logo_p">法律风险评估平台</p>
                    </div>
                    <div class="logo_flex">
                        <img src="../../static/img/rectan.png" alt="" />
                        <span class="logo_span">简单快捷&nbsp;响应迅速</span>
                    </div>
                    <div class="logo_flex">
                        <img src="../../static/img/rectan.png" alt="" />
                        <span class="logo_span">全面覆盖&nbsp;移动互联</span>
                    </div>
                    <div class="logo_flex">
                        <img src="../../static/img/rectan.png" alt="" />
                        <span class="logo_span">深度应用&nbsp;提高效率</span>
                    </div>
                    <div class="logo_flex">
                        <img src="../../static/img/rectan.png" alt="" />
                        <span class="logo_span">安全可控&nbsp;严格把关</span>
                    </div>
                </div>
            </div>
            <div class="gin-from">
                <div class="loging">
                    <div>
                        <div class="from-text">
                            <p class="texth">Hello！</p>
                            <div class="logimg_txt">
                                <p class="texts">欢迎您</p>
                                <p class="textz">登录</p>
                                <p class="texts">法律风险评估平台</p>
                            </div>
                        </div>
                        <div class="login-from">
                            <div class="loginind">
                                <div class="login-input">
                                    <el-input placeholder="请输入账号" type="text" v-model="userinfrom"
                                        prefix-icon="el-icon-user-solid" size="medium"></el-input>
                                </div>
                                <div class="login-input">
                                    <el-input placeholder="请输入密码" type="password" v-model="password" show-password
                                        size="medium" prefix-icon="el-icon-key" @keyup.enter.native="login"></el-input>
                                </div>
                            </div>

                            <div class="remember">
                                <el-row>
                                    <el-col :span="12">
                                        <el-checkbox v-model="checked">记住密码</el-checkbox>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="remembers">
                                <el-button type="primary" @click="login">登录</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        login
    } from "../api/api";
    // import insurancetableVue from './insurancetable.vue';
    // import "../../static/js/pxinrem";

    export default {
        data() {
            return {
                userinfrom: "",
                password: "",
                checked: false,
                isphone: false
            };
        },
        created() {
            var ua = window.navigator.userAgent,
                agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod', 'iPad'],
                isPC = true;
            for (var i = 0, len = agents.length; i < len; i++) {
                if (ua.indexOf(agents[i]) > 0) {
                    isPC = false;
                    break;
                }
            }
            if (!isPC) {
                this.isphone = true
            }
            this.mounted();

            // document.onkeydown = function () {
            //   // console.log('11');
            //   var key = window.event.keyCode;
            //   if (key == 13 || key == 100) {
            //     this.login();
            //   }
            // };
        },
        methods: {
            // 登录
            login() {
                // 点击登录判断是否需要记住账号密码
                if (this.checked) {
                    localStorage.setItem("userinfrom", this.userinfrom);
                    localStorage.setItem("password", this.password);
                } else {
                    localStorage.removeItem("userinfrom");
                    localStorage.removeItem("password");
                }
                var data = {
                    username: this.userinfrom,
                    password: this.password,
                };
                if (this.userinfrom != "" && this.password != "") {
                    login(data).then((res) => {
                        // console.log("resgggg", res);
                        if (res.code == 200) {
                            // 保存token在本地
                            window.localStorage.setItem("access_token", res.data.access_token);
                            window.localStorage.setItem(
                                "refresh_token",
                                res.data.refresh_token
                            );
                            window.localStorage.setItem("expires_in", res.data.expires_in);
                            // 登录的用户信息
                            let username = {
                                roleID: res.data.profile.role,
                                ID: res.data.profile.ID,
                                icco_id: res.data.profile.icco_id,
                                name: res.data.profile.name,
                                phone: res.data.profile.phone,
                                area_id: res.data.profile.area_id,
                            };
                            var userinfor = JSON.stringify(username);
                            window.localStorage.setItem("userinfor", userinfor);
                            // 路由跳转
                            if (this.isphone) {
                                this.$router.push("/usertable");
                            } else {
                                this.$router.push("/soutable");
                            }

                            // 提示
                            this.$message({
                                showClose: true,
                                message: "登录成功",
                                type: "success",
                            });
                            this.$root.$emit("websock");
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: "error",
                            });
                        }
                    });
                } else {
                    if (this.userinfrom == "") {
                        this.$message({
                            showClose: true,
                            message: "用户名不能为空",
                            type: "error",
                        });
                    } else if (this.password == "") {
                        this.$message({
                            showClose: true,
                            message: "密码不能为空",
                            type: "error",
                        });
                    }
                }
            },
            mounted() {
                let strname = localStorage.getItem("userinfrom");
                let strpass = localStorage.getItem("password");
                if (strname) {
                    this.userinfrom = strname;
                    this.checked = true;
                }
                if (strpass) {
                    this.password = strpass;
                    this.checked = true;
                }
            },
        },
    };
</script>

<style lang="less">
    .admin-login {
        width: 100%;
        height: 100vh;
        // background-color: #d9e6fc;
        background: url(../../static/img/backimg.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;

        .login {
            // width: 12.26rem;
            // height: 7.12rem;
            width: 54.26rem;
            height: 37.5rem;
            display: flex;
            justify-content: center;
            align-items: center;

            .logo {
                width: 22.25rem;
                height: 37.5rem;
                display: flex;
                align-items: center;

                // border: 1px solid red;
                .logo_img {
                    width: 12.65rem;
                    height: 2.73rem;

                    // margin-left: 0.6rem;
                    img {
                        width: 12.65rem;
                        height: 2.73rem;
                    }
                }

                .logo_box {
                    min-width: 16.25rem;
                    margin: 40px 0 40px 0;

                    .logo_p {
                        width: 17.22rem;
                        height: 3.34rem;
                        font-size: 1.74rem;
                        color: #ffffff;
                        font-weight: 600;
                        line-height: 3.34rem;
                        margin: 0;
                    }
                }

                .logo_flex {
                    width: 16.25rem;
                    // margin-left: 60px;
                    display: flex;
                    margin-bottom: 1.3125rem;

                    img {
                        width: 1.5rem;
                        height: 1.5rem;
                        margin-right: 1.5rem;
                    }

                    .logo_span {
                        min-width: 7.5rem;
                        height: 1.5rem;
                        font-size: 0.98rem;
                        font-weight: 400;
                        color: #57acff;
                        line-height: 1.5rem;
                    }
                }
            }

            .gin-from {
                min-width: 22.25rem;
                height: 37.5rem;
                display: flex;
                align-items: center;

                .loging {
                    width: 21.08rem;
                    height: 21.36rem;
                    // margin-top: 0.4rem;
                    background-color: #fff;
                    padding: 20px 40px;
                    border-radius: 10px;

                    .from-text {
                        display: flex;
                        flex-direction: column;

                        .texth {
                            margin: 0;
                            font-size: 1.5rem;
                            font-weight: 600;
                            margin-bottom: 5px;
                        }

                        .logimg_txt {
                            display: flex;
                            margin-bottom: 5px;

                            .texts {
                                font-size: 0.98rem;
                                color: #9ea2ad;
                            }

                            .textz {
                                font-size: 0.98rem;
                                color: #395bb2;
                                padding: 0 5px;
                            }
                        }
                    }

                    .login-from {
                        .loginind {
                            width: 100%;

                            // padding: 15px 20px;
                            .login-input {
                                margin-bottom: 15px;
                            }
                        }
                    }

                    .remember {
                        margin-bottom: 32px;

                        .el-row {
                            margin-top: 0.12rem;
                            font-size: 0.12rem;

                            .forget {
                                display: flex;
                                justify-content: flex-end;
                                color: #606266;
                                cursor: pointer;
                            }
                        }
                    }

                    .remembers {
                        .el-button {
                            width: 100%;
                            height: 2.46rem;
                            background-color: #395bb2;
                        }
                    }
                }
            }
        }
    }

    .bg-purple-left {
        .bg-img {
            img {
                width: 289px;
            }
        }
    }
</style>