<template>
  <div class="admin-login">
    <div class="login">
      <div class="logo">
        <div style="margin-top: 36px;">
        <div class="logo_img">
          <img src="../../static/img/logo2x.png" alt="">
        </div>
        <div class="logo_box">
          <p>诉法律风险评估平台</p>
        </div>
        <div class="logo_flex">
          <img src="../../static/img/rectan.png" alt="">
          <span class="logo_span">简单快捷&nbsp;响应迅速</span>
        </div>
        <div class="logo_flex">
          <img src="../../static/img/rectan.png" alt="">
          <span class="logo_span">全面覆盖&nbsp;移动互联</span>
        </div>
        <div class="logo_flex">
          <img src="../../static/img/rectan.png" alt="">
          <span class="logo_span">深度应用&nbsp;提高效率</span>
        </div>
        <div class="logo_flex">
          <img src="../../static/img/rectan.png" alt="">
          <span class="logo_span">安全可控&nbsp;严格把关</span>
        </div>
        </div>
      </div>
      <div class="gin-from">
        <div class="loging">
          <div class="from-text">
            <p class="texth">Hello！</p>
            <div class="logimg_txt">
              <p class="texts">欢迎您</p>
              <p class="textz">登录</p>
              <p class="texts">诉法律风险评估平台</p>
            </div>
          </div>
          <div class="login-from">
            <el-form label-position="left" label-width="80px">
              <el-form-item label="账号:">
                <el-input
                  placeholder="请输入账号"
                  type="text"
                  v-model="userinfrom"
                  size="medium"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  placeholder="请输入密码"
                  type="password"
                  v-model="password"
                  show-password
                  size="medium"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="remember">
              <el-row>
                <el-col :span="12">
                  <el-checkbox v-model="checked">记住密码</el-checkbox>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="remember">
            <el-button type="primary" @click="login">立即登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../api/api";

export default {
  data() {
    return {
      userinfrom: "",
      password: "",
      checked: false,
    };
  },
  created() {
    this.mounted();
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
          console.log("resgggg", res);
          if (res.code == 200) {
            // 保存token在本地
            window.localStorage.setItem("access_token", res.data.access_token);
            window.localStorage.setItem(
              "refresh_token",
              res.data.refresh_token
            );
            // 登录的用户信息
            let username = {
              roleID: res.data.profile.role,
              ID: res.data.profile.ID,
              icco_id: res.data.profile.icco_id,
              name: res.data.profile.name,
              phone: res.data.profile.phone,
            };
            var userinfor = JSON.stringify(username);
            window.localStorage.setItem("userinfor", userinfor);
            // 路由跳转
            this.$router.push("/insurancetable");
            // 提示
            this.$message({
              showClose: true,
              message: "登录成功",
              type: "success",
            });
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
// .admin-login {
//   width: 100%;
//   height: 100vh;
//   // background-color: #d9e6fc;
//   background: url(../../static/img/backimg.png) no-repeat;
//   background-size: cover;
//   .login {
//     display: flex;
//     justify-content: center;
//     position: relative;
//     top: 24.5%;
//     .logo {
//       width: 26.5625rem;
//       height: 27.25rem;
//       // border: 1px solid red;
//       .logo_img{
//         width: 16.25rem !important;
//         margin-left: 60px;
//         img{
//           width: 10.3125rem;
//           height: 2.25rem;
//         }
//       }
//       .logo_box{
//         width: 16.25rem;
//         margin: 46px 0 52px 60px;
//         p{
//           font-size: 1.7rem;
//           color: #FFFFFF;
//           font-weight: 600;
//         }
//       }
//       .logo_flex{
//         width: 16.25rem;
//         margin-left: 60px;
//         display: flex;
//         margin-bottom: 1.3125rem;
//         img{
//           width: 1.25rem;
//           height: 1.25rem;
//           margin-right: 1.75rem;
//         }
//         .logo_span{
//           font-size: 1rem;
//           color: #57ACFF;
//         }
//       }
//       // background-size: 390px 485px;
//     }
//     .gin-from {
//       width: 26.5rem;
//       height: 27.25rem;
//       // border: 1px solid red;
//       // background-color: #fff;
//       display: flex;
//       justify-content: center;
//       .loging {
//         width: 18rem;
//         margin-top: 40px;
//         // height: 330px;
//         // border: 1px solid red;
//         .from-text {
//           display: flex;
//           flex-direction: column;
//           .texth {
//             margin: 0;
//             font-size: 1.425rem;
//             font-weight: 600;
//             margin-bottom: 5px;
//           }
//           .logimg_txt {
//             display: flex;
//             margin-bottom: 5px;
//             .texts {
//               font-size: 1.125rem;
//               color: #9ea2ad;
//               margin: 12px 0 27px 0;
//             }
//             .textz {
//               font-size: 1rem;
//               color: #395bb2;
//               padding: 0 5px;
//               margin: 12px 0 27px 0;
//             }
//           }
//         }
//         .login-from {
//           .el-form {
//             .el-form-item {
//               margin-bottom: 24px;
//               .el-form-item__label {
//                 width: 40px !important;
//                 padding: 0;
//               }
//               .el-form-item__content {
//                 margin-left: 40px !important;
//                 .el-input {
//                   .el-input__inner {
//                     border-radius: 5px;
//                     // height: 30px;
//                   }
//                 }
//               }
//             }
//           }
          
//         }
//         .remember {
//           .el-button {
//             margin-top: 28px;
//             margin-bottom: 5px;
//             width: 100%;
//             background-color: #395bb2;
//           }
//           .el-row {
//             margin-top: 12px;
//             font-size: 12px;
//             .forget {
//               display: flex;
//               justify-content: flex-end;
//               color: #606266;
//               cursor: pointer;
//             }
//           }
//         }
//       }
//     }
//   }
// }
// .bg-purple-left {
//   .bg-img {
//     img {
//       width: 289px;
//     }
//   }
// }
</style>