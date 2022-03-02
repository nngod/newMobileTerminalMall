<template>
  <div class="info">
    <div class="infoItem">
      <div class="infoHead">
        <span>用户评价</span>
        <a>更多</a>
      </div>
      <hr />
      <div v-if="JSON.stringify(customerInfo) == '{}'" class="empty">
        暂时还没有用户评价喔
      </div>
      <div v-else>
        <div class="infoCentreHead">
          <div class="headPortrait">
            <img :src="user.avatar" alt="" />
          </div>
          <div class="userName">
            <span>{{ user.uname }}</span>
          </div>
        </div>
        <p>
          {{ customerInfo.content }}
        </p>
        <div class="info-other">
          <span class="date">{{ customerInfo.created | formatDate }}</span>
          <span>{{ customerInfo.style }}</span>
        </div>
        <div class="info-imgs">
          <div
            v-for="(imgs, index) in customerInfo.images"
            :key="index"
            class="info-imgs-item"
          >
            <img :src="imgs" alt="" v-lazy="imgs" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "assets/js/date";
export default {
  props: {
    customerInfo: {
      type: Object,
      default() {
        return {};
      },
    },

    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    formatDate(time) {
      var date = new Date(time * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
};
</script>

<style scoped>
.infoItem {
  font-size: 16px;
  margin-left: 2vh;
  margin-right: 2vh;
  margin-bottom: 2vh;
}
.infoHead {
  display: flex;
  height: 5vh;
  line-height: 5vh;
  justify-content: space-between;
}
.infoCentreHead {
  display: flex;
  height: 5vh;
  line-height: 5vh;
  margin-bottom: 1vh;
}
.infoCentreHead img {
  width: 100%;
  height: 100%;
}
.infoCentreHead .userName {
  margin-left: 1.5vh;
  font-size: 15px;
}

.info-other {
  margin-top: 1vh;
  font-size: 14px;
  color: #ccc;
}

.info-other .date {
  margin-right: 2vh;
}
.info-imgs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.info-imgs-item {
  width: 25vh;
  height: 25vh;
  margin-top: 2vh;
}

.info-imgs img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.empty {
  height: 8vh;
  line-height: 8vh;
  text-align: center;
}
</style>
