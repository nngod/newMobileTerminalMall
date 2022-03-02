<template>
  <div class="goodList">
    <good-list-item
      v-for="(item, i) in goods"
      :key="i"
      :goodsItem="item"
    ></good-list-item>
  </div>
</template>

<script>
import goodListItem from "./goodListItem.vue";
export default {
  name: "goodLists",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  components: {
    goodListItem,
  },
};
</script>

<style>
.goodList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  background: #eee;
}
</style>
