<template>
  <div class="purchase">
    <!-- 导航栏 -->
    <van-nav-bar
      left-text="返回"
      title="填写订单"
      class="vanNavBar"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>

    <!-- 联系人 -->
    <van-contact-card
      type="edit"
      :name="username"
      :tel="ttmessage"
      class="card"
      @click="onEdit"
    />

    <!-- 滚动区域 -->
    <scroll class="purchaseScroll">
      <van-swipe-cell v-for="item in list" :key="item.id">
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
      </van-swipe-cell>
    </scroll>

    <!--底部区域-->
    <van-submit-bar
      :disabled="addressList.name.length == 0"
      :price="fullprice"
      button-text="提交订单"
      @submit="onSubmit"
      class="vanSubmitBar"
    >
      <!-- <van-checkbox v-model="checked">全选</van-checkbox> -->
      <template #tip v-if="addressList.name.length == 0">
        您还没有添加地址喔,
        <span @click="onClickEditAddress" class="editAddress">添加地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import scroll from "components/content/scroll/Scroll.vue";
import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);

export default {
  components: {
    scroll,
  },
  data() {
    return {
      list: this.$store.state.purchase,
      addressList: this.$store.state.addressList,
    };
  },

  computed: {
    fullprice() {
      return (
        this.list
          // .filter((item) => item.goods_state)
          .reduce((total, item) => (total += item.count * item.price * 100), 0)
      );
    },

    username() {
      return this.addressList.name;
    },

    ttmessage() {
      return this.addressList.tel + " \n " + "地址：" + this.address;
    },

    address() {
      return (
        this.addressList.province +
        this.addressList.city +
        this.addressList.county +
        " " +
        this.addressList.addressDetail
      );
    },
  },

  methods: {
    onClickLeft() {
      //跳转至进入购买页前的路由
      this.$router.replace("/home");
    },

    //修改购买界面中商品的信息
    add(id) {
      this.$store.commit("addPurchaseCount", id);
    },

    sub(id) {
      this.$store.commit("subPurchaseCount", id);
    },

    onEdit() {
      this.$router.push("/address");
    },

    onClickEditAddress() {
      this.$router.push("/address");
    },

    onSubmit() {
      Toast("购买成功，看看其他好物吧");
      this.$router.go(-1);
      // console.log(this.$store.state.purchase);

      const toUserOrder = {};
      toUserOrder.name = this.$store.state.user.user.username;
      toUserOrder.list = [];
      toUserOrder.list.push(...this.$store.state.purchase);

      this.$store.commit("addUserOrder", toUserOrder);
    },
  },
};
</script>
<style scoped>
/* 总体高度 */
.purchase {
  height: 100vh;
  position: relative;
  background: #eee;
}

.vanNavBar {
  height: 7vh;
}

.card {
  white-space: pre-wrap;
  height: 12vh;
}

/* 滚动区域 */
.purchaseScroll {
  height: calc(100vh - 31vh);
  overflow: hidden;
}

/* 底部区域 */
.vanSubmitBar {
  height: 12vh;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
}
.editAddress {
  color: #4e6ef2;
}
</style>
