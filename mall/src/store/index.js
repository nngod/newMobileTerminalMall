import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //购物车展示的数据
    cartList: [],

    //购买展示的数据
    purchase: [],

    //地址数据
    addressList: {
      name: "",
      tel: "",
      province: "",
      city: "",
      county: "",
      addressDetail: "",
    },

    //显示用户购买的订单
    userOrder: [],
  },
  mutations: {
    addCart(state, message) {
      let product = state.cartList.find((item) => item.id == message.id);
      if (product) {
        product.count += 1;
      } else {
        message.count = 1;
        state.cartList.push(message);
      }
    },

    //通过 cart 界面修改 cartList 信息
    addCount(state, id) {
      let product = state.cartList.find((item) => item.id == id);
      product.count += 1;
    },

    subCount(state, id) {
      let product = state.cartList.find((item) => item.id == id);
      if (product.count > 1) {
        product.count -= 1;
      } else {
        product.count = 1;
      }
    },

    //处理购物车状态
    changState(state, id) {
      let product = state.cartList.find((item) => item.id == id);
      product.state = !product.state;
      // if (product.state) {
      //   product.text = "选择";
      // } else {
      //   product.text = "未选";
      // }
    },

    delCartList(state, id) {
      let i = state.cartList.findIndex((item) => item.id == id);
      state.cartList.splice(i, 1);
    },

    //在购物车界面跳转到购买界面
    toPurchase(state, message) {
      if (state.purchase.length != 0) {
        state.purchase.splice(0, state.purchase.length);
        state.purchase.push(...message);
      }
    },

    //
    //购物操作
    addPurchase(state, message) {
      state.purchase.splice(0, state.purchase.length);
      state.purchase.push(message);
    },

    //通过 purchase 界面修改 purchase信息
    addPurchaseCount(state, id) {
      let product = state.purchase.find((item) => item.id == id);
      product.count += 1;
    },

    subPurchaseCount(state, id) {
      let product = state.purchase.find((item) => item.id == id);
      if (product.count > 1) {
        product.count -= 1;
      } else {
        product.count = 1;
      }
    },

    //修改地址数据
    changAddress(state, address) {
      state.addressList.name = address.name;
      state.addressList.tel = address.tel;
      state.addressList.province = address.province;
      state.addressList.city = address.city;
      state.addressList.county = address.county;
      state.addressList.addressDetail = address.addressDetail;
    },

    //监听购物车全选操作
    fullChange(state, val) {
      state.cartList.forEach((item) => {
        item.state = val;
      });
    },

    //添加到我的订单操作
    addUserOrder(state, val) {
      let userOrd = state.userOrder.find((item) => item.name == val.name);
      if (userOrd) {
        userOrd.list.push(...val.list);
        // let product =  userOrd.list.find((item) => item.id == ...val.list.id);
        // if (product) {
        //   product.count += 1;
        // } else {
        //   message.count = 1;
        //   state.cartList.push(message);
        // }
      } else {
        state.userOrder.push(val);
      }
    },

    //删除我的订单的操作
    delUserOrder(state, val) {
      let i = state.userOrder.find((item) => item.name == val.name);
      i.list.splice(val.index, 1);
    },
  },

  getters: {
    toUserOrder: (state) => {
      if (state.userOrder.length != 0) {
        const arr = state.userOrder.find(
          (item) => item.name == state.user.user.username
        );
        if (typeof arr != "undefined") {
          return arr.list;
        }
      }
    },
  },
  actions: {},
  modules: {
    user,
  },
  plugins: [createPersistedState()],
});
