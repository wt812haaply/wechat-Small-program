
var root = getApp()
Page({
  data: {
    timeLine: root.globalData.timeline.data,
    imgUrls: [
      '../../images/3.jpg',
      '../../images/3.jpg',
      '../../images/3.jpg',
      '../../images/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },
  onLoad : function(){
    var newsData = root.globalData.timeline.data; 
    // console.log(newsData);
  }
})