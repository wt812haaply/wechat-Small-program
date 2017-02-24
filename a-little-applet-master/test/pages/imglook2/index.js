//scale.js
//获取应用实例
var imageUtil = require('../../utils/util.js');//引入外部文件用来初始化图片的缩放
var windowHeight = '';//定义全局变量来存储屏幕的高度
var windowWidth = '';//定义全局变量来存储屏幕的宽度
var app = getApp();//获取全局属性
Page({
  data: {
    winHeight: '',//data里面定义屏幕的高度
    winWidth: '',//data里面定义屏幕的宽度
    imagewidth: '',  //图片的宽度
    imageheight: '',//图片的高度
    marginTop: '', //距离顶部的高度
    hiddenMask:true,//遮罩

    stv: {
      offsetX: 0,
      offsetY: 0,
      zoom: false, //是否缩放状态
      distance: 0,  //两指距离
      scale: 1,  //缩放倍数
    },
    item: {
      name: '冬日的阳光',
      author: '刘东阳',
      className: '油画',
      size: '68*128',
      years: '2015',
      money: '35,000',
      phoneValue: '18332393892',
    }
  },
  //事件处理函数
  touchstartCallback: function (e) {
    //触摸开始
    console.log('touchstartCallback');
    console.log(e);


    if (e.touches.length === 1) {
      let {clientX, clientY} = e.touches[0];
      this.startX = clientX;
      this.startY = clientY;
      this.touchStartEvent = e.touches;
    } else {
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      this.setData({
        'stv.distance': distance,
        'stv.zoom': true, //缩放状态

      })
    }

  },
  touchmoveCallback: function (e) {
    //触摸移动中
    console.log('touchmoveCallback');
    console.log(e);

    if (e.touches.length === 1) {
      //单指移动
      if (this.data.stv.zoom) {
        //缩放状态，不处理单指
        return;
      }
      let {clientX, clientY} = e.touches[0];
      let offsetX = clientX - this.startX;
      let offsetY = clientY - this.startY;
      this.startX = clientX;
      this.startY = clientY;
      let {stv} = this.data;
      stv.offsetX += offsetX;
      stv.offsetY += offsetY;
      stv.offsetLeftX = -stv.offsetX;
      stv.offsetLeftY = -stv.offsetLeftY;
      this.setData({
        stv: stv
      });

    } else {
      //双指缩放
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);//distance 变量即为两只手指之间的距离


      let distanceDiff = distance - this.data.stv.distance;
      /*
       *设定一个新的变量 distance - this.data.stv.distance，
       *它反映两次 touchmove 触发瞬间，两根手指相对距离的变化值。
       */
      let newScale = this.data.stv.scale + 0.005 * distanceDiff;

      // /console.log(e);
      console.log(this.data)

      //放大倍数限制
      if (Math.floor((newScale - 1) * 100) <= 200 && Math.floor((newScale - 1) * 100) >= 0) {
        this.setData({
          'stv.distance': distance,
          'stv.scale': newScale,
          // 'stv.scaleNum': Math.floor((newScale-1)*100)
        })
      }

    }

  },
  touchendCallback: function (e) {
    //触摸结束
    console.log('touchendCallback');


    if (e.touches.length === 0) {
      this.setData({
        'stv.zoom': false, //重置缩放状态
      })
    }
  },
  onLoad: function () {
    console.log('onLoad');
    if(app. globalData.MaskHidden=='0'){
        this.setData({
          hiddenMask:false
        })
    }
    wx.getSystemInfo({
      success: function (res) {
        windowHeight = res.windowHeight;
        windowWidth = res.windowWidth;
      }

    })
    //定义遮罩层的高度和宽度
    this.setData({
      'winWidth': windowWidth,
      'winHeight': windowHeight
    })

  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e) //将图片进行缩放处理    
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight,
      marginTop: 50
    })

  },
  //打电话
  PhoneCall: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.item.phoneValue,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },
  //返回按钮
  backBtn: function () {
    wx.navigateBack({
      url: '../index/index'
    })
  },
  //orderCart
  orderCart: function () {
    //调用ajax
    wx.navigateTo({
      url: '../cart/cart'
    })
  },
  //隐藏引导页
  hiddenMask:function(){
    this.setData({
      hiddenMask:true,//遮罩
    })
  },


})
