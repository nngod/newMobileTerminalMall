<template>
  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服" />
    <van-goods-action-icon
      icon="cart-o"
      text="购物车"
      :badge="this.$store.state.cartList.length"
      @click="toCart"
    />
    <van-goods-action-icon icon="shop-o" text="店铺" />
    <van-goods-action-button
      type="warning"
      text="加入购物车"
      @click="addtoCart"
    />
    <van-goods-action-button
      type="danger"
      text="立即购买"
      @click="addtoPurchase"
    />
  </van-goods-action>
</template>

<script>
export default {
  methods: {
    addtoCart() {
      this.$emit("addToCart");
    },
    addtoPurchase() {
      this.$emit("addToPurchase");
    },
    toCart() {
      this.$router.replace("/cart");
    },
  },
};
</script>
