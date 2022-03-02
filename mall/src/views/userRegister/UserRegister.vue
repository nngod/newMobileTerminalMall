<template>
  <div class="register">
    <van-image
      round
      width="18vh"
      height="18vh"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
      class="van-image"
    />

    <label class="error">{{ message }}</label>

    <van-form>
      <van-field
        label="用户名"
        name="username"
        type="text"
        v-model.trim="username"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        class="van-field"
      />

      <van-field
        name="密码"
        label="密码"
        type="password"
        v-model.trim="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field
        name="密码"
        label="确认密码"
        type="password"
        v-model.trim="password2"
        placeholder="请输入确认密码"
        :rules="[{ required: true, message: '请填写确认密码' }]"
      />

      <van-field
        label="手机号"
        type="tel"
        v-model.trim="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
        class="van-field"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click.prevent="register"
          >注册</van-button
        >
      </div>

      <router-link to="/login" class="text">已有账号，直接登陆</router-link>
    </van-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import Vue from "vue";
import { Dialog } from "vant";

// 全局注册
Vue.use(Dialog);

export default {
  name: "UserRegister",
  props: [""],
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      mobile: "",
      message: "",
    };
  },

  watch: {
    username(newVal) {
      // 取消上一次请求
      if (newVal) {
        this.cancelRequest();
        this.axios
          .get("/user/" + newVal, {
            cancelToken: new this.axios.CancelToken(
              (cancel) => (this.cancel = cancel)
            ),
          })
          .then((response) => {
            if (response.data.code == 200) {
              let isExist = response.data.data;
              if (isExist) {
                this.message = "该用户名已经存在";
              } else {
                this.message = "";
              }
            }
          })
          .catch((error) => {
            if (this.axios.isCancel(error)) {
              //如果是请求被取消产生的错误，输出取消请求的原因
              console.log("请求取消：", error.message);
              //alert(error.message);
              //throw new Error("请求取消：" + error.message)
            } else {
              //处理错误
              console.log(error);
              //throw new Error(error.message)
            }
          });
      }
    },
  },
  methods: {
    register() {
      this.message = "";
      if (!this.checkForm()) {
        return;
      }
      this.axios
        .post("/user/register", {
          username: this.username,
          password: this.password,
          mobile: this.mobile,
        })
        .then((response) => {
          if (response.data.code === 200) {
            this.saveUser(response.data.data);
            this.username = "";
            this.password = "";
            this.password2 = "";
            this.mobile = "";
            Dialog.alert({
              title: "通知",
              message: "注册成功，请登陆",
            }).then(() => {
              // on close
            });
            this.$router.push("/login");
          } else if (response.data.code === 500) {
            this.message = "用户注册失败";
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    cancelRequest() {
      if (typeof this.cancel === "function") {
        this.cancel("终止请求");
      }
    },
    checkForm() {
      if (!this.username || !this.password || !this.password2 || !this.mobile) {
        Dialog.alert({
          title: "警告",
          message: "所有字段不能为空",
        }).then(() => {
          // on close
        });
        // this.$msgBox.show({ title: "所有字段不能为空" });
        return false;
      }
      if (this.password !== this.password2) {
        Dialog.alert({
          title: "警告",
          message: "密码和确认密码必须相同",
        }).then(() => {
          // on close
        });
        // this.$msgBox.show({ title: "密码和确认密码必须相同" });
        return false;
      }
      return true;
    },
    ...mapMutations("user", ["saveUser"]),
  },
};
</script>
<style scoped>
.register {
  margin-left: 2vh;
  margin-right: 2vh;
}

.van-image {
  left: 50%;
  margin-top: 5vh;
  margin-left: -9vh;
  margin-bottom: 5vh;
}

.van-field {
  margin-bottom: 5vh;
  border-bottom: 1px solid #ccc;
}

.register .error {
  color: red;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: center;
  margin-bottom: 2vh;
}

.text {
  margin-top: 3vh;
  color: #ccc;
  display: flex;
  justify-content: center;
}
</style>
