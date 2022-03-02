<template>
  <div class="cart">
    <!-- 导航栏 -->
    <van-nav-bar
      left-text="返回"
      title="购物车"
      class="van-nav-bar"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <!-- 滚动区域 -->
    <scroll
      class="cartScroll"
      ref="cartScroll"
      v-if="list.length != 0"
      :probeType="3"
    >
      <van-swipe-cell v-for="item in list" :key="item.id">
        <template #left>
          <van-button
            square
            type="primary"
            :text="item.text"
            :class="[item.state ? 'optbuttontrue' : 'optbuttonfalse']"
            @click="opt(item.id)"
          />
        </template>
        <van-card
          :num="item.count"
          :price="item.price"
          :origin-price="item.oldPrice"
          :title="item.title"
          class="goods-card"
          :thumb="item.img"
        >
          <!-- 标签 -->
          <template #tags>
            <van-tag type="danger">{{ item.Desc }}</van-tag>
          </template>

          <!-- 按钮 -->
          <template #footer>
            <van-button
              size="small"
              color="#4e6ef2"
              class="addorsub-button"
              @click="add(item.id)"
              >+</van-button
            >
            <van-button
              size="small"
              color="#4e6ef2"
              class="addorsub-button"
              @click="sub(item.id)"
              >-</van-button
            >
          </template>
        </van-card>

        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="deleteList(item.id)"
          />
        </template>
      </van-swipe-cell>
    </scroll>
    <van-empty v-else description="购物车空空如也" />

    <!--底部区域-->
    <van-submit-bar :price="fullprice" :button-text="all" @submit="buy">
      <van-checkbox v-show="list.length != 0" @click="check" v-model="fullState"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script>
import scroll from "components/content/scroll/Scroll.vue";

export default {
  name: "Cart",
  components: {
    scroll,
  },

  data() {
    return {
      list: this.$store.state.cartList,
      checked: false,
    };
  },

  methods: {
    onClickLeft() {
      this.$router.replace("/home");
    },

    //修改购物车中商品的信息
    add(id) {
      this.$store.commit("addCount", id);
    },

    sub(id) {
      this.$store.commit("subCount", id);
    },

    deleteList(id) {
      this.$store.commit("delCartList", id);
    },

    //处理购物车商品的状态
    opt(id) {
      this.$store.commit("changState", id);
    },

    check() {
      this.$store.commit("fullChange", this.checked);
    },

    buy() {
      this.$store.commit("toPurchase", this.fullList);
      this.$router.push({
        path: "/purchase",
      });
    },
  },
  computed: {
    //已经选择物品
    fullList() {
      return this.list.filter((item) => item.state);
    },

    //已经选择物品的价格
    fullprice() {
      return this.list
        .filter((item) => item.state)
        .reduce((total, item) => (total += item.count * item.price * 100), 0);
    },

    fullState: {
      get: function () {
        return this.list.every((item) => item.state);
      },
      set: function (value) {
        this.checked = value;
      },
    },

    allCount() {
      return this.list
        .filter((item) => item.state)
        .reduce((total, item) => (total += item.count), 0);
    },

    all() {
      return "提交订单(" + this.allCount + ")";
    },
  },
};
</script>

<style>
/* 总体高度 */
.cart {
  height: 100vh;
  position: relative;
  background: #eee;
}
/* 头部区域 */
.van-nav-bar {
  background: pink;
}
.van-nav-bar__title {
  color: white;
}
.van-nav-bar__content {
  height: 7vh;
}

/* 滚动区域 */
.cartScroll {
  height: calc(100vh - 24vh);
  overflow: hidden;
}
.goods-card {
  margin: 0;
}
.van-card__header {
  height: 100px;
  font-size: 14px;
}

.van-card__thumb {
  width: 100px;
  height: 100px;
}
.van-card__num {
  color: #000;
}
.van-tag {
  margin-top: 7px;
}
.addorsub-button {
  width: 32px;
}
.delete-button {
  height: 100%;
}

.optbuttontrue {
  height: 100%;
}

.optbuttonfalse {
  height: 100%;
  background: #fff;
  border: #fff;
  color: #000;
}

/* 底部区域 */
.van-submit-bar {
  height: 8vh;
  position: fixed;
  bottom: 8vh;
  left: 0;
  z-index: 100;
  width: 100%;
}
</style>
