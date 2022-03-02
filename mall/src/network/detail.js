import { request } from "@/network/request.js";

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid,
    },
  });
}

export function getRecommend() {
  return request({
    url: "/recommend",
  });
}

export class detailInfo {
  constructor(itemInfo, columns, shopInfo) {
    this.title = itemInfo.title;
    this.oldPrice = itemInfo.oldPrice;
    this.newPrice = itemInfo.price;
    this.realPrice = itemInfo.lowNowPrice;
    this.discountBgColor = itemInfo.discountBgColor;
    this.discountDesc = itemInfo.discountDesc;
    this.service = shopInfo.services[0].name;
    this.quantity = columns[0];
    this.collect = columns[1];
    this.icon = shopInfo.services[1].icon;
    this.service1 = shopInfo.services[1].name;
    this.service2 = shopInfo.services[2].name;
    if (shopInfo.services[3]) {
      this.service3 = shopInfo.services[3].name;
    }
  }
}

export class shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.sells = shopInfo.cSells;
    this.goods = shopInfo.cGoods;
    this.describe1 = shopInfo.score[0].name;
    this.describe2 = shopInfo.score[1].name;
    this.describe3 = shopInfo.score[2].name;
    this.score1 = shopInfo.score[0].score;
    this.score2 = shopInfo.score[1].score;
    this.score3 = shopInfo.score[2].score;
    this.describeColor1 = shopInfo.score[0].isBetter;
    this.describeColor2 = shopInfo.score[1].isBetter;
    this.describeColor3 = shopInfo.score[2].isBetter;
  }
}

//详情数据
export class detailList {
  constructor(detailInfo, detailImage) {
    if (detailInfo.desc) {
      this.desc = detailInfo.desc;
    }
    if (detailImage[0].key) {
      this.key = detailImage[0].key;
    }
    this.list = detailImage[0].list;
  }
}
