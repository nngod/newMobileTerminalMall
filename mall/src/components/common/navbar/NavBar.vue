<template>
  <div class="nav">
    <!-- 左边插槽 -->
    <div class="left">
      <slot name="left"></slot>
    </div>

    <!-- 中间插槽 -->
    <div class="centre">
      <slot name="centre"></slot>
    </div>

    <!-- 右边插槽 -->
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.nav {
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 18px;
  text-align: center;
  display: flex;
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0; */
  position: relative;
  z-index: 9;
  box-shadow: 0px 0.5px #ccc;
  border-bottom: 0.5px solid #ccc;
  box-sizing: border-box;
}

.left,
.right {
  width: 15%;
}

.centre {
  flex: 1;
}
</style>
