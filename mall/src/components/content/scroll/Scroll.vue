<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    pullUpload: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      scroll: null,
    };
  },

  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },

  methods: {
    _initScroll() {
      // better-scroll的初始化
      this.scroll = new BetterScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        observeDOM: true,
        bounce: false,
        pullUpLoad: this.pullUpload,
        observeImage: true, // 开启 observe-image 插件
        mouseWheel: true, //开启鼠标滚轮
        disableMouse: false, //启用鼠标拖动
        disableTouch: false, //启用手指触摸
      });

      //监听滚动
      if (this.probeType == 2 || this.probeType == 3) {
        this.scroll.on("scroll", (pos) => {
          this.$emit("scroll", pos);
        });
      }

      //上拉加载更多
      if (this.pullUpload == true) {
        this.scroll.on("pullingUp", () => {
          this.scroll.finishPullUp(); //可以多次执行上拉刷新
          this.$emit("pullingup");
        });
      }
    },

    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },

    refreshss() {
      this.scroll.refresh();
    },
  },
};
</script>
