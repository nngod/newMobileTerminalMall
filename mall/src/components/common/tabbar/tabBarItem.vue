<template>
  <div class="tabBarItem" @click="skip">
    <div v-show="!active">
      <slot name="tabbaritem-img"></slot>
    </div>

    <div v-show="active">
      <slot name="tabbaritem-acimg"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="tabbaritem-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabBarItem",
  props: {
    pages: {
      type: String,
    },
    activeColor: {
      type: String,
      default: "red",
    },
  },

  methods: {
    skip() {
      this.$router.replace(this.pages);
    },
  },

  computed: {
    active() {
      // this.$route.path 即是 当前路由路径
      // 判断 当前路由路径是否包含有父组件传过来的 this.pages
      //indexOf() 方法对大小写敏感！ 如果要检索的字符串值没有出现，则该方法返回 -1。
      return this.$route.path.indexOf(this.pages) != -1;
    },

    activeStyle() {
      return this.active ? { color: this.activeColor } : {};
    },
  },
};
</script>

<style>
.tabBarItem {
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.tabBarItem img {
  margin-top: 3px;
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
/* 
.active {
  color: deeppink;
} */
</style>
