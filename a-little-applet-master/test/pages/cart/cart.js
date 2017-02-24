// pages/cart/cart.js
//获取应用实例
var app = getApp()
Page({
  data:{
    itemList:{
      name:'大碗岛的星期天大碗岛的星期天大碗岛的星期天大碗岛的星期天',
      author:'费巨轮',
      stuff:'布面丙烯',
      size:'68*120cm',
      years:'2015',
      money:'25,000',
      carriage:'0.00',//运费 
      moneyAll:'25,000'  //总费用
    },   
    length:1,
    itemAddress:{
      default:'北京市东城区雍和宫藏经馆胡同77文创园3层',
      getPersonName:'刘军',
      phone:'18612345678'
    },
    hiddenToast:true
    
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //在此没进入一次页面都要请求一次设置的默认地址
  },
  onReady:function(){ 
    // 页面渲染完成
    
  },
  onShow:function(){

    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //微信支付成功显示
  wxpay:function(){
   this.setData({   hiddenToast: !this.data.hiddenToast  })
  },
   /**
 * toast显示时间到时处理业务 
 */
 toastHidden:function(){
  this.setData({
  hiddenToast: true
  })
 },
 
  //获取ajax请求





})