//index.js
//获取应用实例
var app = getApp();
var data = [
  [
    { nama: "111" },
    { nama: "111" },
    { nama: "111" },
    { nama: "111" },
    { nama: "111" },
  ],
  [
    { nama: "22" },
    { nama: "22" },
    { nama: "22" },
    { nama: "22" },
    { nama: "22" },
    { nama: "22" },
    { nama: "22" },
  ],
  [
    { nama: "333" },
    { nama: "333" },
    { nama: "333" },
    { nama: "333" },
    { nama: "333" },
    { nama: "333" },
  ],
  [
    { nama: "44" },
    { nama: "44" },
    { nama: "44" },
    { nama: "44" },
    { nama: "44" },
  ],
  [
    { nama: "55" },
    { nama: "55" },
    { nama: "55" },
  ],
  [
    { nama: "66" },
    { nama: "66" },
    { nama: "66" },
  ],
  [
    { nama: "77" },
    { nama: "77" },
    { nama: "77" },
    { nama: "77" },
  ],
  [
    { nama: "888" },
  ],
  [
    { nama: "999" },
    { nama: "999" },
  ],
  [
    { nama: "0000" },
    { nama: "0000" },
    { nama: "0000" },
    { nama: "0000" },
  ],
  [
    { nama: "100" },
    { nama: "100" },
    { nama: "100" },
    { nama: "100" },
    { nama: "100" },
  ],
  [
    { nama: "1222" },
    { nama: "1222" },
  ],
  [
    { nama: "1333" },
  ],

];
// 用来存储高度的数组
var dataheith = [0];
// 左侧id
var linheightid = 0;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    leftdata: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 12, 13],
    scroll: "scroll"
  },
  onLoad: function () {

    this.setData({
      rightdata: data,
      linheightid: linheightid
    });
    // 计算每个分类开始的高度
    var indexheight = 0
    for (var i = 0; i < data.length; i++) {
      indexheight += data[i].length * 75;
      // console.log("每类的长度", data[i].length);
      dataheith.push(indexheight);
      // console.log("高度数组", dataheith)
    }

  },
  // 左侧点击事件
  clickbtn: function (e) {
    var that = this;
    // console.log("你点击的ID为：", e.target.id);
    linheightid = e.target.id;
    // console.log(typeof id)
    this.setData({
      intoid: "id" + linheightid,
      linheightid: linheightid,
      scroll: ""
    });
    // 阻止scroll冒泡
    setTimeout(function () {
      that.setData({
        scroll: "scroll"
      });
    }, 500)
  },
  // 滚动触发
  scroll: function (e) {
    // console.log(e);
    var scrolltop = e.detail.scrollTop;
    var scrollbotton = e.detail.scrollTop
    for (var i = 0; i < dataheith.length; i++) {
      if (scrolltop <= dataheith[i - 1]) {
        // console.log(i);
        // console.log(scrolltop)
        if (linheightid != i) {
          linheightid = i - 2
          this.setData({
            linheightid: linheightid
          })
        }
        break
      }
    }

  }
})
