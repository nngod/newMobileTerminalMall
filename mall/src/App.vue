<template>
  <div id="app" @mousewheel.prevent>
    <keep-alive exclude="detail,recommendation,order">
      <router-view></router-view>
    </keep-alive>

    <tab-bar class="tabbar" v-show="isShow">
      <!-- 首页模块 -->
      <tab-bar-item pages="home">
        <template #tabbaritem-img>
          <img src="~assets/img/tabbarimg/home/home.png" alt="" />
        </template>

        <template #tabbaritem-acimg>
          <img src="~assets/img/tabbarimg/home/home01.png" alt="" />
        </template>
        <template v-slot:tabbaritem-text>
          <div>首页</div>
        </template>
      </tab-bar-item>

      <!-- 购物车模块 -->
      <tab-bar-item pages="cart">
        <template #tabbaritem-img>
          <img src="~assets/img/tabbarimg/cart/cart.png" alt="" />
        </template>

        <template #tabbaritem-acimg>
          <img src="~assets/img/tabbarimg/cart/cart01.png" alt="" />
        </template>
        <template v-slot:tabbaritem-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>

      <!-- 用户信息模块 -->
      <tab-bar-item pages="files">
        <template #tabbaritem-img>
          <img src="~assets/img/tabbarimg/files/files.png" alt="" />
        </template>

        <template #tabbaritem-acimg>
          <img src="~assets/img/tabbarimg/files/files01.png" alt="" />
        </template>
        <template v-slot:tabbaritem-text>
          <div>我的</div>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
//导入底部状态栏组件
import tabBar from "components/common/tabbar/tabBar.vue";
import tabBarItem from "components/common/tabbar/tabBarItem.vue";

export default {
  name: "App",
  components: {
    tabBar,
    tabBarItem,
  },
  data() {
    return {
      isShow: true,
    };
  },
  mounted() {
    this.tabbarShow();
  },
  watch: {
    $route(to, from) {
      this.tabbarShow();
    },
  },
  methods: {
    tabbarShow() {
      if (
        this.$route.name == "detail" ||
        this.$route.name == "purchase" ||
        this.$route.name == "addAddress"
      ) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  },
};
</script>

<style>
@import "assets/css/bass.css";
</style>
