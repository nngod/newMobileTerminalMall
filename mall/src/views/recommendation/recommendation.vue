<template>
  <div class="new">
    <!-- 顶部搜索框 -->
    <van-search
      shape="round"
      background="#eee"
      placeholder="请输入搜索关键词"
      class="reSearch"
      ref="vanSearch"
      v-model="value"
      @focus="onfocus"
      show-action
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <!-- end -->

    <scroll class="recommendScroll" v-if="displayData.length != 0">
      <div v-for="(item, i) in displayData" :key="i">
        <van-card
          :price="item.price"
          :origin-price="item.discountPrice"
          desc="推荐好物"
          :title="item.title"
          :thumb="item.image"
        />
      </div>
    </scroll>
    <van-empty v-else image="search" :description="text" />
  </div>
</template>

<script>
import { getRecommend } from "network/detail";
import scroll from "components/content/scroll/Scroll.vue";

export default {
  name: "recommendation",
  data() {
    return {
      message: [],
      value: "",
      displayData: [],
      text: "",
    };
  },

  components: {
    scroll,
  },
  //获取推荐数据
  created() {
    getRecommend().then((res) => {
      this.message.push(...res.data.data.list);
    });
  },

  methods: {
    onSearch() {
      if (this.value) {
        this.displayData.splice(0, this.displayData.length);
        this.displayData.push(...this.fSearch);
        if (this.displayData.length == 0) {
          this.text = "在推荐商品中没有找到";
        }
      }
    },
    onfocus() {
      this.text = "";
      this.displayData.splice(0, this.displayData.length);
    },
  },

  computed: {
    fSearch() {
      if (this.value) {
        //用计算属性来模糊查询，并通过改动排序属性来排序
        const arr = this.message.filter((p) => {
          //filter过滤的意思，这个是过滤函数，将每一项符合结果的值返回到arr
          return p.title.indexOf(this.value) != -1;
        });
        return arr;
      }
    },
  },
};
</script>

<style scoped>
.new {
  height: 100vh;
  position: relative;
}

.reSearch {
  width: 100%;
  height: 7vh;
  background: #eee;
}

.recommendScroll {
  height: calc(100vh - 17vh);
  overflow: hidden;
}
</style>
