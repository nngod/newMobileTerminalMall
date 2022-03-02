<template>
  <div class="goodListItem" @click="itemClick">
    <div class="goodListItemImg">
      <img
        :src="goodsItem.show.img"
        alt=""
        @load="imgcheng"
        v-lazy="goodsItem.show.img"
      />
    </div>
    <div class="goodListItemtext">
      <p>{{ goodsItem.title }}</p>
      <h3>{{ price }}</h3>
    </div>
  </div>
</template>

<script>
import { EventBus } from "assets/js/event-bus";
export default {
  name: "goodListItem",
  props: {
    goodsItem: {},
  },
  computed: {
    price() {
      return "￥" + this.goodsItem.price;
    },
  },
  methods: {
    imgcheng() {
      EventBus.$emit("imgcheng");
    },

    itemClick() {
      this.$router.push({
        path: "/detail",
        query: {
          id: this.goodsItem.iid,
        },
      });
    },
  },
};
</script>

<style>
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
