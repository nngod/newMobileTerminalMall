<template>
  <div class="tabBar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabBar",
};
</script>
<style>
.tabBar {
  display: flex;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 8vh;
  background: #fff;
  box-shadow: 0px -0.5px #ccc;
  border-top: 0.5px solid #ccc;
  box-sizing: border-box;
  z-index: 50;
}
</style>
