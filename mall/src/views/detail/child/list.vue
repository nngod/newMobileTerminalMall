<template>
  <div class="goodListItem">
    <div class="goodListItemImg">
      <img :src="listImg" alt="" @load="imgcheng" v-lazy="listImg" />
    </div>
    <div class="goodListItemtext">
      <p>{{ title }}</p>
      <h3>{{ price }}</h3>
    </div>
  </div>
</template>

<script>
import { EventBus } from "assets/js/event-bus";
export default {
  props: {
    listImg: {
      default: "",
    },
    title: {
      default: "",
    },

    recommendPrice: {
      default: "",
    },
    id: {
      default: "",
    },
  },
  computed: {
    price() {
      return "￥" + this.recommendPrice;
    },
  },
  methods: {
    imgcheng() {
      EventBus.$emit("detailimgcheng");
    },
  },
};
</script>

<style scoped>
.goodListItem {
  width: 45%;
  border-radius: 10px;
  background: white;
  margin-bottom: 10px;
}

.goodListItem img {
  width: 100%;
  height: 200px;
  font-size: 15px;
  border-radius: 10px 10px 0px 0px; /* 分别对应左上角，右上角，左下角， 右下角 */
}

.goodListItem .goodListItemtext p {
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 10px 0px;
}

.goodListItem .goodListItemtext h3 {
  font-weight: 800;
  color: red;
  padding-bottom: 10px;
}
</style>
