<template>
  <swiper
    class="box-container"
    :options="swiperOption"
    ref="mySwiper"
    v-if="reRender"
  >
    <swiper-slide
      v-for="(item, index) in imgLists"
      :key="index"
      @touchmove.native="stopPlay"
      @touchend.native="play"
    >
      <img class="swiper-image" :src="item" alt="" @load="lunImg" />
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>

    <div class="swiper-scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css"; //注意这里
export default {
  name: "lunSwiper",
  props: {
    imgLists: [],
    reRender: {
      type: Boolean,
      defaule() {
        return false;
      },
    },
  },
  data() {
    return {
      swiperOption: {
        notNextTick: true,
        autoplay: {
          // 自动播放
          delay: 4000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        loop: true, // 循环
        directionType: "horizontal", // 方向
        pagination: {
          // 分页器
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
        navigation: {
          // 左右按钮
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        observer: true, // 启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
        observeParents: true, // 将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
        setWrapperSize: true, // Swiper使用flexbox布局(display: flex)，
        // 开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
      },
    };
  },
  computed: {
    mySwiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    stopPlay() {
      this.mySwiper.autoplay.stop(); // 当手指触摸时停止自动播放
    },
    play() {
      this.mySwiper.autoplay.start(); // 当手指离开时开始自动播放
    },
    lunImg() {
      this.$emit("lunImg");
    },
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>

<style scoped>
.swiper-box a {
  display: block;
}
.box-container {
  width: 100%;
}
.swiper-image {
  width: 100%;
  height: 100%;
}
.swiper-scrollbar {
  height: 0px;
}
</style>
