<template>
  <div id="home">
    <!-- 导航栏 -->
    <van-nav-bar
      title="购物商城"
      ref="vanSearch"
      class="homeNav"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" color="#fff" />
      </template>
    </van-nav-bar>

    <!-- 组件控制栏 -->
    <tab-control
      :title="titles"
      @tabClick="tabClick"
      ref="homeTabControl1"
      v-show="isshowtabControlTop"
      class="tabcontrol1"
    ></tab-control>

    <scroll
      class="homeScroll"
      ref="homescroll"
      :probeType="3"
      @scroll="scroll"
      :pullUpload="true"
      @pullingup="pullingup"
    >
      <lun-swiper
        :imgLists="img"
        ref="lun"
        :reRender="reRender"
        class="swiper"
      ></lun-swiper>

      <recommend :recommend="recommends" @recom="recom"></recommend>

      <!-- 组件控制栏 -->
      <tab-control
        :title="titles"
        @tabClick="tabClick"
        ref="homeTabControl2"
        v-show="isshowtabControlTop2"
      ></tab-control>

      <!-- 首页显示中心 -->
      <good-lists :goods="HomeType"></good-lists>
    </scroll>

    <!-- 返回顶部按钮 -->
    <backup @click.native="backclick" v-show="isbackupshow"></backup>
  </div>
</template>

<script>
//导入导航栏组件
import NavBar from "components/common/navbar/NavBar.vue";

//导入推荐组件
import Recommend from "./child/recommend/Recommend.vue";

//首页商品信息
import goodLists from "components/content/goods/goodLists.vue";

//轮播图组件
import lunSwiper from "components/content/swiper/swiper.vue";

import { getHomeMultidata, getHomeGoods } from "../../network/home";
import TabControl from "../../components/content/tabcontrol/tabControl.vue";

//引入返回顶部组件
import backup from "components/content/backup/backup.vue";

//引入滚动插件
import scroll from "../../components/content/scroll/Scroll.vue";
import Backup from "../../components/content/backup/backup.vue";

//引入防抖动函数

import utils from "assets/js/utils";
import { EventBus } from "assets/js/event-bus";

export default {
  name: "Home",
  components: {
    NavBar,
    Recommend,
    TabControl,
    goodLists,
    scroll,
    backup,
    Backup,
    lunSwiper,
  },

  data() {
    return {
      img: [
        require("./img/img01.jpg"),
        require("./img/img02.jpg"),
        require("./img/img06.jpg"),
        require("./img/img04.jpg"),
      ],

      banners: [],

      recommends: [],

      titles: ["当季热卖", "新品推荐", "时尚套装"],

      goods: {
        pop: { page: 0, list: [] },
        sell: { page: 0, list: [] },
        new: { page: 0, list: [] },
      },

      homeType: "pop",

      isbackupshow: false,

      tabControlTop: 0,

      isshowtabControlTop: false,

      isshowtabControlTop2: true,

      homescrollY: 0,

      //保存路由状态
      homeY: 0,

      reRender: true,
    };
  },

  computed: {
    HomeType() {
      return this.goods[this.homeType].list;
    },
  },

  created() {
    //拿到首页数据
    this.HomeMultidata();

    //拿到首页分类数据
    this.HomeGoods("pop");
    this.HomeGoods("sell");
    this.HomeGoods("new");
  },

  mounted() {
    //采用防抖函数
    const foo1 = utils.debounce(this.$refs.homescroll.refreshss);

    //事件总线
    EventBus.$on("imgcheng", () => {
      //执行防抖函数
      foo1();
    });
  },

  //首页路由跳转函数
  activated() {
    this.reRender = false;

    if (this.homeY != 0) {
      this.$refs.homescroll.scroll.refresh();
      this.$refs.homescroll.scroll.scrollTo(0, this.homeY);
    }
    setTimeout(() => {
      this.reRender = true;
    }, 0);
  },

  deactivated() {
    this.homeY = -this.homescrollY;
  },

  methods: {
    // 网络请求模块
    HomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;

        this.recommends = res.data.data.recommend.list;
      });
    },

    HomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);

        this.goods[type].page++;
      });
    },

    onClickRight() {
      this.$router.push("/recommendation");
    },

    // 点击跳转模块
    tabClick(i) {
      this.index = i;
      //同步两个控制栏显示
      this.$refs.homeTabControl1.controlIndex = i;
      this.$refs.homeTabControl2.controlIndex = i;

      //根据控制栏传过来的值决定展示的数据
      switch (i) {
        case 0:
          this.homeType = "pop";
          break;
        case 1:
          this.homeType = "new";
          break;
        case 2:
          this.homeType = "sell";
          break;
      }
    },

    // 返回顶部图标的显示和隐藏
    scroll(pos) {
      //保存路由滚动位置
      this.homescrollY = -pos.y;

      this.isbackupshow = this.homescrollY > 650;

      if (-pos.y > this.tabControlTop) {
        this.isshowtabControlTop = true;
        this.isshowtabControlTop2 = false;
      } else {
        this.isshowtabControlTop = false;
        this.isshowtabControlTop2 = true;
      }
    },

    //点击回到顶部
    backclick() {
      this.$refs.homescroll.scrollTo(0, 0);
    },

    //下拉刷新
    pullingup() {
      this.HomeGoods(this.homeType);
    },

    //控制栏的吸顶效果
    recom() {
      //-44是为了减去导航栏的高度
      this.tabControlTop =
        this.$refs.homeTabControl2.$el.offsetTop -
        this.$refs.vanSearch.$el.offsetHeight;
    },
  },
};
</script>

<style>
#home {
  height: 100vh;
}

.homeNav {
  background: pink;
  width: 100%;
  height: 7vh;
}

.tabcontrol1 {
  position: relative;
  z-index: 8;
}

.homeScroll {
  height: calc(100% - 15vh);
  overflow: hidden;
}

.swiper {
  height: 30vh;
}

.swiper img {
  width: 100%;
  height: 100%;
}
</style>
