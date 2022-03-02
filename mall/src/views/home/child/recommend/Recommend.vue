<template>
  <div class="recommend">
    <div v-for="(item, i) in recommend" :key="i" class="item">
      <img :src="item.image" alt="" @load="recommendimg" />
      <div class="item-text">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommend: {
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      isRefresh: false,
    };
  },
  methods: {
    recommendimg() {
      if (!this.isRefresh) {
        this.$emit("recom");
        this.isRefresh = true;
      }
    },
  },
};
</script>

<style>
.recommend a {
  display: block;
  text-decoration: none;
}

.recommend {
  width: 100%;
  height: 15vh;
  display: flex;
  font-size: 14px;
  justify-content: space-around;
  padding-top: 2vh;
  padding-bottom: 3vh;
  border-bottom: 1.2vh solid #eee;
}

.item {
  width: 20%;
  flex: 1;
  text-align: center;
}

.item img {
  width: 90%;
}

.item .item-text {
  margin-top: 1vh;
  color: rgba(0, 0, 0, 0.6);
}
</style>
