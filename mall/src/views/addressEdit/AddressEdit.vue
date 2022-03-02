<template>
  <div>
    <van-nav-bar title="地址编辑" left-arrow @click-left="onClickLeft" />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>
<script>
import Vue from "vue";
import { AddressEdit } from "vant";
import { areaList } from "@vant/area-data";

Vue.use(AddressEdit);
import { Toast } from "vant";

export default {
  data() {
    return { areaList, searchResult: [] };
  },
  methods: {
    onSave(content) {
      Toast("保存成功");
      this.$store.commit("changAddress", content);
      this.$router.go(-1);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
