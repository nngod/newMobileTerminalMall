<template>
  <div id="detail">
    <!-- <div class="detailNav" ref="detailNav"> -->
    <del-nav @tabClick="tabClick" ref="detailTab" class="detailNav"></del-nav>
    <!-- </div> -->

    <!-- 滚动页面 -->
    <scroll
      class="detailscroll"
      ref="detailScroll"
      :probeType="3"
      @scroll="detailScroll"
    >
      <!-- <p>{{ $store.state.cartList }}</p> -->
      <lun-swiper
        v-if="listImage.length > 1"
        :imgLists="listImage"
        :reRender="reRender"
        class="lunswiper"
      ></lun-swiper>

      <div
        v-else-if="listImage.length == 1"
        v-for="(item, i) in listImage"
        :key="i"
        class="detailSwiper"
      >
        <img :src="item" alt="" />
      </div>

      <iteminfo :item="detailInfo" :itemshop="shop"></iteminfo>

      <div class="clearance"></div>

      <!-- 展示用户评价 -->
      <detail-customer-info
        :customerInfo="customerInfo"
        :user="userInfo"
        ref="customer"
      ></detail-customer-info>

      <div class="clearance"></div>

      <!-- 展示商品详情数据 -->
      <detail-goods-list
        :goodsList="detailList"
        @listImg="listImg"
        ref="detailListImg"
      ></detail-goods-list>

      <div class="recommendList">
        <lists
          v-for="(item, i) in detailRecommend"
          :key="i"
          :listImg="item.image"
          :title="item.title"
          :recommendPrice="item.discountPrice"
          :id="item.shop_id"
          ref="recommendList"
        ></lists>
      </div>
    </scroll>
    <!-- 滚动页面 -->

    <goods-action
      @addToCart="addToCart"
      @addToPurchase="addToPurchase"
      class="goodAction"
    ></goods-action>
  </div>
</template>

<script>
import DelNav from "./child/delnav.vue";
import {
  getDetail,
  detailInfo,
  shop,
  detailList,
  getRecommend,
} from "network/detail";
import lunSwiper from "components/content/swiper/swiper.vue";
import iteminfo from "./child/iteminfo.vue";
import scroll from "components/content/scroll/Scroll.vue";
import detailGoodsList from "./child/detailGoodsList.vue";
import detailCustomer from "./child/detailCustomerInfo";
import DetailCustomerInfo from "./child/detailCustomerInfo.vue";
import GoodsAction from "./child/goodsAction.vue";

import lists from "./child/list.vue";
import utils from "assets/js/utils";
import { EventBus } from "assets/js/event-bus";

import Vue from "vue";
import { Toast } from "vant";

Vue.use(Toast);
export default {
  name: "detail",
  data() {
    return {
      id: 0,
      listImage: [],
      reRender: true,
      detailInfo: {},
      shop: {},
      detailList: {},
      customerInfo: {},
      userInfo: {},
      detailY: [],
      getDetailY: null,

      //detailTab 本身的高度
      detailTabHight: 0,

      detailTabIndex: 0,

      detailRecommend: {},
    };
  },
  components: {
    DelNav,
    lunSwiper,
    iteminfo,
    scroll,
    detailGoodsList,
    detailCustomer,
    DetailCustomerInfo,
    GoodsAction,
    lists,
  },

  created() {
    this.id = this.$route.query.id;

    getDetail(this.id).then((res) => {
      let data = res.data.result;

      this.listImage.push(...res.data.result.itemInfo.topImages);

      this.detailInfo = new detailInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo
      );
      this.shop = new shop(data.shopInfo);

      //展示商品详情数据
      this.detailList = new detailList(
        data.detailInfo,
        data.detailInfo.detailImage
      );

      //取出商品评价信息
      if (data.rate.cRate != 0) {
        this.customerInfo = data.rate.list[0];
        this.userInfo = data.rate.list[0].user;
      }
    });

    //获取推荐数据
    getRecommend().then((res) => {
      this.detailRecommend = res.data.data.list;
    });
  },

  mounted() {
    //采用防抖函数
    const foo = utils.debounce(this.$refs.detailScroll.refreshss);

    //事件总线
    EventBus.$on("detailimgcheng", () => {
      //执行防抖函数
      foo();
    });

    //采用防抖函数给 getDetailY 赋值
    this.$nextTick(() => {
      this.detailTabHight = this.$refs.detailTab.$el.offsetHeight;

      this.getDetailY = utils.debounce(() => {
        //获取不同组件的offsetTop
        this.detailY = [];
        this.detailY.push(0);
        this.detailY.push(
          this.$refs.customer.$el.offsetTop - this.detailTabHight
        );
        this.detailY.push(
          this.$refs.detailListImg.$el.offsetTop - this.detailTabHight
        );
        this.detailY.push(
          this.$refs.recommendList[0].$el.offsetTop - this.detailTabHight
        );
        this.detailY.push(Number.MAX_VALUE);
      });
    });
  },

  methods: {
    tabClick(i) {
      this.$refs.detailScroll.scrollTo(0, -this.detailY[i]);
    },

    listImg() {
      this.getDetailY();
    },

    //监听详情页scroll的滚动
    detailScroll(pos) {
      let y = -pos.y;

      for (let i = 0; i < this.detailY.length - 1; i++) {
        if (
          this.detailTabIndex != i &&
          y >= this.detailY[i] &&
          y <= this.detailY[i + 1]
        ) {
          this.detailTabIndex = i;
          this.$refs.detailTab.index = this.detailTabIndex;
        }
      }
    },

    //监听添加到购物车功能
    addToCart() {
      //获取购物车需要展示的信息
      const product = {};
      product.img = this.listImage[0];
      product.title = this.detailInfo.title;
      product.price = this.detailInfo.realPrice;
      product.Desc = this.detailInfo.discountDesc;
      product.oldPrice = this.detailInfo.oldPrice;
      product.id = this.id;
      product.state = true;
      product.text = "选择";

      Toast("加入购物车成功");

      //将商品信息添加到购物车
      this.$store.commit("addCart", product);
    },

    addToPurchase() {
      //获取购买界面需要展示的信息
      const purchase = {};
      purchase.img = this.listImage[0];
      purchase.title = this.detailInfo.title;
      purchase.price = this.detailInfo.realPrice;
      purchase.Desc = this.detailInfo.discountDesc;
      purchase.oldPrice = this.detailInfo.oldPrice;
      purchase.id = this.id;
      purchase.count = 1;
      // console.log(purchase);

      //将商品信息添加到购买界面
      this.$store.commit("addPurchase", purchase);

      this.$router.push({
        path: "/purchase",
      });
    },
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
}

.detailNav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background: #fff;
}

.detailSwiper {
  height: 50vh;
}

.detailSwiper img {
  width: 100%;
  height: 100%;
}
.lunswiper {
  width: 100%;
  height: 50vh;
}

.detailscroll {
  height: calc(100vh - 8vh);
  overflow: hidden;
}

.goodAction {
  height: 8vh;
}
.clearance {
  height: 1.5vh;
  background: #eee;
}
.recommendList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: #eee;
}
</style>
