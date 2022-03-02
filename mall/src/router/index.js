import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

// 解决vue-router 3.1.0及之后版本，
// 在路由跳转时浏览器控制台报“Uncaught (in promise)”的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/home.vue"),
  },

  {
    path: "/cart",
    component: () => import("../views/cart/cart.vue"),
  },

  {
    path: "/files",
    component: () => import("../views/files/files.vue"),
  },

  {
    path: "/detail",
    name: "detail",
    component: () => import("../views/detail/detail.vue"),
  },

  {
    path: "",
    redirect: "/home",
  },

  //注册路由
  {
    path: "/register",
    name: "register",
    component: () => import("../views/userRegister/UserRegister.vue"),
  },

  //登陆路由
  {
    path: "/login",
    name: "login",
    component: () => import("../views/userLogin/UserLogin.vue"),
  },

  //购买界面路由
  {
    path: "/purchase",
    name: "purchase",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/purchase/purchase.vue"),
  },

  //地址路由
  {
    path: "/address",
    name: "address",
    component: () => import("../views/addressEdit/AddressEdit.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/recommendation",
    name: "recommendation",
    component: () => import("../views/recommendation/recommendation.vue"),
  },

  {
    path: "/order",
    name: "order",
    component: () => import("../views/order/order.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 路由需要验证，判断用户是否已经登录
    if (store.state.user.user) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  } else next();
});

export default router;
