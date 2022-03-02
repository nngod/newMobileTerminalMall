import { request } from "@/network/request.js";

export function getHomeMultidata() {
  return request(
    {
      url: "/home/multidata",
    }
    // (r) => {
    //   console.log(r);
    // }
  );
}

export function getHomeGoods(type, page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page,
    },
  });
}
