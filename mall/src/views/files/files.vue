<template>
  <div>
    <scroll>
      <div class="user-container">
        <!-- 用户基本信息面板 -->
        <div class="user-card">
          <!-- 用户头像、姓名 -->
          <van-cell>
            <template #icon>
              <van-image
                round
                v-if="!user"
                width="60"
                height="60"
                :src="require('../../assets/logo.png')"
                fit="contain"
                class="avatar"
              />
              <van-image
                round
                v-else
                width="60"
                height="60"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
                fit="cover"
                class="avatar"
              />
            </template>
            <template #title>
              <div>
                <span v-if="!user" class="username"
                  >你好，请<router-link to="/login"> 登录</router-link>
                  <br />
                  免费<router-link to="/register"> 注册</router-link></span
                >
                <span v-else>欢迎您，{{ user.username }} </span>
              </div>
            </template>
            <template #label>
              <van-tag v-show="user" color="red" text-color="#fff"
                >VIP大客户</van-tag
              >
            </template>
          </van-cell>
          <!-- 动态、关注、粉丝 -->
          <div class="user-data">
            <div class="user-data-item">
              <span v-if="!user">0</span>
              <span v-else>99</span>
              <span>商品收藏</span>
            </div>
            <div class="user-data-item">
              <span v-if="!user">0</span>
              <span v-else>99</span>
              <span>店铺关注</span>
            </div>
            <div class="user-data-item">
              <span v-if="!user">0</span>
              <span v-else>99</span>
              <span>浏览记录</span>
            </div>
          </div>
        </div>

        <!-- 操作面板 -->
        <van-cell-group class="action-card">
          <van-cell
            icon="edit"
            title="编辑地址"
            @click="chengAddress"
            is-link
          />
          <van-cell icon="chat-o" title="我的订单" @click="aiout" is-link />
          <van-cell icon="warning-o" title="退出登录" @click="logout" is-link />
        </van-cell-group>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import scroll from "../../components/content/scroll/Scroll.vue";

import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);

export default {
  name: "User",
  computed: {
    // user模块带有命名空间
    ...mapState("user", [
      // 将this.user 映射为 this.$store.state.user.user
      "user",
    ]),
  },
  methods: {
    logout() {
      if (this.$store.state.user.user != null) {
        this.deleteUser();
        Toast.success("成功退出登陆");
      }
    },
    // user模块带有命名空间
    ...mapMutations("user", [
      // 将this.deleteUser 映射为 this.$store.commit('user/deleteUser')
      "deleteUser",
    ]),
    chengAddress() {
      this.$router.push("/address");
    },

    aiout() {
      if (this.$store.state.user.user) {
        this.$router.push("/order");
      }
    },
  },
  components: {
    scroll,
  },
};
</script>

<style lang="less" scoped>
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      display: flex;
      align-items: center; /* 垂直居中 */
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
