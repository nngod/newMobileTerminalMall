<template>
  <div class="order">
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="orderNav"
    >
    </van-nav-bar>

    <scroll class="orderScroll">
      <van-swipe-cell v-for="(item, i) in getData" :key="i">
        <van-card
          :num="item.count"
          :price="item.price"
          :title="item.title"
          :thumb="item.img"
          class="goods-card"
        >
          <template #tags>
            <van-tag plain type="danger">已完成</van-tag>
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="orderDel(i)"
          />
        </template>
      </van-swipe-cell>
    </scroll>
  </div>
</template>

<script>
import scroll from "components/content/scroll/Scroll.vue";

export default {
  name: "order",
  data() {
    return {};
  },
  components: { scroll },
  methods: {
    onClickLeft() {
      this.$router.push("/files");
    },
    orderDel(i) {
      const obj = {};
      obj.index = i;
      obj.name = this.$store.state.user.user.username;
      this.$store.commit("delUserOrder", obj);
    },
  },
  computed: {
    // ordData() {
    //   if (this.$store.state.userOrder.length != 0) {
    //     const arr = this.$store.state.userOrder.find(
    //       (item) => item.name == this.$store.state.user.user.username
    //     );
    //     if (typeof arr != "undefined") {
    //       return arr.list;
    //     }
    //   }
    // },
    isShow() {
      if (this.orderData) {
        return true;
      }
    },
    //这里需要把store 动态的数据放到computed里面才会同步更新 视图
    getData() {
      return this.$store.getters.toUserOrder;
    },
  },
};
</script>

<style>
.order {
  height: 100vh;
  position: relative;
  background: #eee;
}
.van-nav-bar__content {
  height: 7vh;
}
.orderScroll {
  height: calc(100vh - 7vh);
  overflow: hidden;
}

.goods-card {
  margin: 0;
}

.delete-button {
  height: 100%;
}
</style>
