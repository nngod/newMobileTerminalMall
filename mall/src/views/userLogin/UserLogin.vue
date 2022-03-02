<template>
  <div class="login">
    <van-image
      round
      width="18vh"
      height="18vh"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      class="van-image"
    />

    <!-- <van-notify v-model="show" type="success" class="van-notify">
      <van-icon name="bell" style="margin-right: 4px" />
      <span>{{ message }}</span>
    </van-notify> -->

    <van-form>
      <van-field
        label="账号"
        name="username"
        type="text"
        v-model.trim="username"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        class="van-field"
      />

      <van-field
        type="password"
        v-model.trim="password"
        placeholder="请输入密码"
        label="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        class="van-field"
      />

      <div>
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click.prevent="login"
          >登陆</van-button
        >
      </div>
    </van-form>

    <router-link to="/register" class="text">新用户注册</router-link>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import Vue from "vue";
import { Form } from "vant";
import { Field } from "vant";
import { Dialog } from "vant";

// 全局注册
Vue.use(Dialog);

Vue.use(Form);
Vue.use(Field);
export default {
  name: "UserLogin",
  data() {
    return {
      username: "",
      password: "",
      message: "",
      show: false,
      index: 0,
    };
  },
  methods: {
    login() {
      this.message = "";
      if (!this.checkForm()) {
        return;
      }
      this.axios
        .post("/user/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.data.code === 200) {
            this.saveUser(response.data.data);
            this.username = "";
            this.password = "";
            Dialog.alert({
              message: "登陆成功",
            }).then(() => {
              //如果存在查询参数
              if (this.$route.query.redirect) {
                let redirect = this.$route.query.redirect;
                //跳转至进入登录页前的路由
                this.$router.replace(redirect);
              } else {
                // 否则跳转至首页
                this.$router.replace("/files");
              }
            });

            //原本代码
            //   this.$msgBox.show({
            //     title: "登录成功",
            //     handleOk: () => {
            //       //如果存在查询参数
            //       if (this.$route.query.redirect) {
            //         let redirect = this.$route.query.redirect;
            //         //跳转至进入登录页前的路由
            //         this.$router.replace(redirect);
            //       } else {
            //         // 否则跳转至首页
            //         this.$router.replace("/");
            //       }
            //     },
            //   });
            // }
            //原本代码

            //
          } else if (response.data.code === 500) {
            Dialog.alert({
              title: "警告",
              message: "用户登录失败",
              theme: "round-button",
            }).then(() => {
              // on close
            });
            // this.message = "用户登录失败";
          } else if (response.data.code === 400) {
            Dialog.alert({
              title: "警告",
              message: "用户名或密码错误",
              theme: "round-button",
            }).then(() => {
              // on close
            });
            // this.message = "用户名或密码错误";
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    ...mapMutations("user", ["saveUser"]),
    checkForm() {
      if (!this.username || !this.password) {
        // this.$msgBox.show({ title: "用户名和密码不能为空" });
        Dialog.alert({
          title: "注意",
          message: "用户名和密码不能为空",
        }).then(() => {
          // on close
        });
        return false;
      }
      return true;
    },
    // showNotify() {
    //   if (this.username || this.password) {
    //     this.show = true;
    //     setTimeout(() => {
    //       this.show = false;
    //     }, 2000);
    //   }
    // },
  },
};
</script>
<style scoped>
.login {
  margin-left: 2vh;
  margin-right: 2vh;
}

.van-image {
  left: 50%;
  margin-top: 8vh;
  margin-left: -9vh;
  margin-bottom: 5vh;
}

.van-notify {
  background: red;
}

.van-field {
  margin-bottom: 5vh;
  border-bottom: 1px solid #ccc;
}

.text {
  margin-top: 3vh;
  color: #ccc;
  display: flex;
  justify-content: center;
}
</style>
