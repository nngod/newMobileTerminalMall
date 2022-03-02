<template>
  <div>
    <h4 class="title">{{ item.title }}</h4>
    <!-- 价格展示 -->
    <div class="price">
      <span class="newprice" v-show="item.newPrice">
        {{ item.newPrice }}
      </span>

      <span class="oldprice" v-show="item.oldPrice">
        {{ item.oldPrice }}
      </span>
      <span class="detaillabel" v-show="item.discountDesc">
        {{ item.discountDesc }}
      </span>
    </div>
    <!-- 销量展示 -->
    <div class="massage">
      <span>{{ item.quantity }}</span>
      <span>{{ item.collect }}</span>
      <span>{{ item.service }}</span>
    </div>
    <!-- 服务展示 -->
    <div class="services">
      <div class="servicesitem">
        <label class="icon">
          <img :src="item.icon" alt="" />
        </label>
        <span>{{ item.service1 }}</span>
      </div>

      <div class="servicesitem">
        <label class="icon">
          <img :src="item.icon" alt="" />
        </label>
        <span>{{ item.service2 }}</span>
      </div>

      <div class="servicesitem" v-show="item.service3">
        <label class="icon">
          <img :src="item.icon" alt="" />
        </label>
        <span>{{ item.service3 }}</span>
      </div>
    </div>

    <div class="hhhh"></div>
    <!-- 商家信息 -->
    <div class="shop">
      <div class="logo">
        <img :src="itemshop.logo" alt="" />
        <span class="text">{{ itemshop.name }}</span>
      </div>
    </div>

    <div class="shopinfo">
      <div class="goodsinfo">
        <div class="info">
          <span class="infonum">{{ itemshop.sells }}</span>
          <h6>总销量</h6>
        </div>
        <div class="info">
          <span class="infonum">{{ itemshop.goods }}</span>
          <h6>全部宝贝</h6>
        </div>
      </div>
      <div class="goodscore">
        <div class="goodscoreitem">
          <span>{{ itemshop.describe1 }}</span>
          <span>{{ itemshop.score1 }}</span>
          <span
            :class="[
              itemshop.describeColor1 ? 'describeColor2' : 'describeColor1',
            ]"
            class="lspan"
          >
            {{ text1 }}
          </span>
        </div>

        <div class="goodscoreitem">
          <span>{{ itemshop.describe2 }}</span>
          <span>{{ itemshop.score2 }}</span>
          <span
            :class="[
              itemshop.describeColor2 ? 'describeColor2' : 'describeColor1',
            ]"
            class="lspan"
          >
            {{ text2 }}
          </span>
        </div>

        <div class="goodscoreitem">
          <span>{{ itemshop.describe3 }}</span>
          <span>{{ itemshop.score3 }}</span>
          <span
            :class="[
              itemshop.describeColor3 ? 'describeColor2' : 'describeColor1',
            ]"
            class="lspan"
          >
            {{ text3 }}
          </span>
        </div>
      </div>
    </div>

    <div class="headbtn">
      <button
        @touchstart="moveStart"
        @touchend="moveEnd"
        :class="[isLeftActiveColor ? 'activeColor' : '']"
      >
        精选商品
      </button>
      <button
        @touchstart="moveRghtStart"
        @touchend="moveRghtEnd"
        :class="[isRightActiveColor ? 'activeColor' : '']"
      >
        进店逛逛
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "iteminfo",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },

    itemshop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    text1() {
      return this.itemshop.describeColor1 ? "高" : "低";
    },
    text2() {
      return this.itemshop.describeColor2 ? "高" : "低";
    },
    text3() {
      return this.itemshop.describeColor3 ? "高" : "低";
    },
  },
  data() {
    return {
      isLeftActiveColor: false,
      isRightActiveColor: false,
    };
  },
  methods: {
    moveStart() {
      this.isLeftActiveColor = !this.isLeftActiveColor;
    },
    moveEnd() {
      this.isLeftActiveColor = !this.isLeftActiveColor;
    },
    moveRghtStart() {
      this.isRightActiveColor = !this.isRightActiveColor;
    },
    moveRghtEnd() {
      this.isRightActiveColor = !this.isRightActiveColor;
    },
  },
};
</script>

<style scoped>
.title {
  margin: 2vh 2vh;
  font-weight: 600;
}

.price {
  height: 5vh;
}

.price .newprice {
  display: inline-block;
  position: relative;
  bottom: 0;
  left: 0;
  margin-left: 2vh;
  font-size: 25px;
  color: #e01222;
}
.price .oldprice {
  display: inline-block;
  position: relative;
  bottom: 0;
  left: 0;
  margin-left: 1vh;
  font-size: 14px;
  color: #999999;
  text-decoration: line-through;
}

.price .detaillabel {
  position: relative;
  bottom: 0.5vh;
  left: 0;
  display: inline-block;
  font-size: 14px;
  font-weight: 800;
  margin-left: 1vh;
  padding: 0.5vh 2vh;
  color: white;
  border-radius: 0.5vh;
  background: #ff0088;
}

.massage {
  margin-top: 1vh;
  color: #999999;
  display: flex;
  justify-content: space-between;
  margin-left: 2vh;
  margin-right: 2vh;
  font-size: 14px;
}
.massage span {
  text-align: center;
}

.services {
  margin: 1vh;
  display: flex;
  justify-content: space-between;
  color: #999999;
}

.icon img {
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
}

.hhhh {
  border-bottom: 1vh solid #eee;
}

.shop {
  margin-top: 2vh;
  margin-left: 2vh;
}

.shop .logo img {
  width: 6vh;
  height: 6vh;
  vertical-align: middle;
}

.text {
  margin-left: 1vh;
  font-size: 16px;
  font-weight: 600;
}

.shopinfo {
  display: flex;
}

.goodsinfo,
.goodscore {
  flex: 1;
  display: flex;
}

.goodsinfo {
  margin-left: 2vh;
  border-right: 2px solid #ccc;
}

.infonum {
  display: block;
  margin-top: 3vh;
  margin-bottom: 2vh;
  text-align: center;
}

.goodsinfo .info {
  flex: 1;
  text-align: center;
}

.describeColor1 {
  background: green;
}

.describeColor2 {
  background: red;
}

.goodscore {
  margin-right: 2vh;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}

.goodscore .goodscoreitem {
  margin-left: 2vh;
  display: flex;
  justify-content: space-between;
}

.goodscore .goodscoreitem span {
  margin-bottom: 1vh;
}

.lspan {
  display: inline-block;
  width: 3vh;
  height: 3vh;
  line-height: 3vh;
  color: white;
}

.headbtn {
  margin-top: 2vh;
  text-align: center;
  margin-bottom: 2vh;
}

.headbtn button {
  border-radius: 10px;
  border: 1px solid #000;
  background: #fff;
  width: 15vh;
  height: 4vh;
  line-height: 3vh;
  text-align: center;
  margin-right: 2vh;
  box-sizing: border-box;
}

.headbtn .activeColor {
  background: #ccc;
}
</style>
