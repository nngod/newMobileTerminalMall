export default {
  //防抖动函数
  debounce(fn, delay = 300) {
    //默认300毫秒
    var timer;
    return function() {
      var args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, args); // this 指向vue
      }, delay);
    };
  },
};
