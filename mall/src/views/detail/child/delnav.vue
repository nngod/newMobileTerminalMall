<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="delnavimg" @click="backClick">
          <img src="../img/img01.png" alt="" />
        </div>
      </template>
      <div class="delnav" slot="centre">
        <a
          v-for="(item, i) in itemlist"
          :key="i"
          class="delnavitem"
          @click="detailClick(i)"
          :class="{ activeColor: i === index }"
        >
          {{ item }}
        </a>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar.vue";
export default {
  name: "DelNav",
  data() {
    return {
      itemlist: ["商品", "评价", "详情", "推荐"],
      index: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    detailClick(i) {
      this.index = i;
      this.$emit("tabClick", i);
    },
    backClick() {
      // this.$router.go(-1);
      // this.$router.go(0);
      this.$router.replace("/home");
    },
  },
  computed: {},
};
</script>

<style scoped>
.delnav a {
  font-size: 16px;
  display: inline-block;
}
.delnav {
  display: flex;
}
.delnavitem {
  flex: 1;
}

.activeColor {
  color: red;
}

.delnavimg {
  height: 100%;
  text-align: center;
}

.delnavimg img {
  height: 60%;
  margin-bottom: 20%;
}
</style>
