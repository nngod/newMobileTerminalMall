<template>
  <div>
    <div class="information">
      <p v-if="goodsList.desc">{{ goodsList.desc }}</p>
      <p v-else>新款推荐！！！</p>
    </div>

    <div class="modification"></div>

    <div class="goodslist">
      <img
        v-for="(item, i) in goodsList.list"
        :key="i"
        :src="item"
        alt=""
        @load="listImg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "detailGoodsLists",
  props: {
    goodsList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    listImg() {
      this.$emit("listImg");
    },
  },
};
</script>

<style scoped>
.information {
  margin-top: 1vh;
  margin-right: 2vh;
  margin-left: 2vh;
  margin-bottom: 2vh;
  display: flex;
  border-top: dotted #ccc;
  border-bottom: dotted #ccc;
  justify-content: center;
  flex-direction: column;
}

.information p {
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.modification {
  height: 1.5vh;
  background: #eee;
}

.goodslist img {
  width: 100%;
  height: 100%;
}
</style>
