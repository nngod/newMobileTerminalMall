import Vue from "vue";
import App from "./App.vue";

//导入路由
import router from "./router/index.js";

// 在入口文件中引入(暂时不支持单组件引入的方式):
import wcSwiper from "wc-swiper";
import "wc-swiper/style.css";
Vue.use(wcSwiper);

//导入并使用 Vant 组件
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

//图片懒加载
import { Lazyload } from "vant";
Vue.use(Lazyload);

import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios); //安装插件
axios.defaults.baseURL = "/api";

import msgBox from "./plugin/vue-msgbox";
Vue.use(msgBox);

Vue.config.productionTip = false;

Vue.prototype.$EventBus = new Vue();

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
