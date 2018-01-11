//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["首页", "任务", "成员"],
    currentNavtab: "0",
    haveTeam:'false'
  },
  onLoad: function () {

  },
  switchTab: function(e){
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },
  createTeam: function(){
    console.log('创建team');
    var crtData=this.data;
    crtData.navTab.push('创建');
    crtData.currentNavtab="3";
    this.setData(crtData);
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    wx.showToast({
    title: '申请创建成功',
    icon: 'success',
    duration: 2000
    })
 
    var crtData=this.data;
    crtData.navTab.pop();
    crtData.currentNavtab="0";
    crtData.haveTeam='wait';
    this.setData(crtData);
  },
  formReset: function() {
    console.log('form发生了reset事件')
  }
})
