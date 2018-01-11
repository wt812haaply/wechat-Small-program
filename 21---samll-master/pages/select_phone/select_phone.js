// pages/select_phone/select_phone.js
//获取应用实例
var app = getApp();
Page({
  data: {
    brand_num: -1,
    model_num: -1,
    color_num: -1,
    brandArr: '', //品牌数组
    modelArr: '', //型号数组
    modelList: '', //型号数组
    colorArr: '', //颜色数组
    colorList: '', //颜色数组
    select_brand: '', //选择什么品牌
    select_model: '', //选择什么型号
    select_color: '', //选择什么颜色
    select_brandID: '', //选择什么品牌ID
    select_modelID: '', //选择什么型号ID
    select_colorID: '', //选择什么颜色ID
    flag_brand_content: false, //品牌内容是否隐藏
    flag_modelCon: true, //型号容器是否隐藏
    flag_model_content: false, //型号内容是否隐藏
    flag_colorCon: true //颜色容器是否隐藏
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 0,
      mask: true
    })
    if (options.brandID) {
      var brandID = options.brandID;
      var modelID = options.modelID;

      //请求服务器获取数据
      wx.request({
        url: app.globalData.serverUrl + 'getModel',
        data: {},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log(res);

          //品牌
          var brandArr = res.data.data.brandList;
          var brand_num = -1;
          var select_brand = '';
          var select_brandID = brandID;
          for (var i = 0; i < brandArr.length; i++) {
            if (brandArr[i].brandID == brandID) {
              brand_num = i;
              select_brand = brandArr[i].brandName;
            }
          }

          //型号
          var model_num = -1;
          var select_model = '';
          var select_modelID = modelID;
          var modelArr = [];
          var modelList = res.data.data.modelList;
          for (var i = 0, len = modelList.length; i < len; i++) {
            if (brandID == modelList[i].brandID) {
              modelArr.push(modelList[i]);
            }
          }

          var sub_index = '';
          for (var i = 0; i < modelArr.length; i++) {
            if (modelArr[i].modelID == modelID) {
              model_num = i;
              select_model = modelArr[i].modelName;
              sub_index = modelArr[i].sub_index;
            }
          }

          //颜色
          var colorArr = [];
          var colorList = res.data.data.colorList;
          for (var i = 0, len = colorList.length; i < len; i++) {
            if (sub_index == colorList[i].sub_index) {
              colorArr.push(colorList[i]);
            }
          }

          that.setData({
            flag_brand_content: true,
            flag_modelCon: false,
            flag_model_content: true,
            flag_colorCon: false,
            flag_color_content: false,
            brand_num: brand_num,
            select_brand: select_brand,
            select_brandID: select_brandID,
            model_num: model_num,
            select_model: select_model,
            select_modelID: select_modelID,
            brandArr: res.data.data.brandList,
            modelList: res.data.data.modelList,
            colorList: res.data.data.colorList,
            modelArr: modelArr,
            colorArr: colorArr,
          });
          wx.hideToast();
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })

    } else {
      //请求服务器获取数据
      wx.request({
        url: app.globalData.serverUrl + 'getModel',
        data: {},
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log(res);
          that.setData({
            brandArr: res.data.data.brandList,
            modelList: res.data.data.modelList,
            colorList: res.data.data.colorList
          });
          wx.hideToast();
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  //切换显示
  taggle: function (event) {

    var type = event.target.dataset.type;
    if (type == 'brand') {
      this.setData({
        flag_brand_content: !this.data.flag_brand_content
      });
    } else if (type == 'model') {
      this.setData({
        flag_model_content: !this.data.flag_model_content
      });
    } else {

    }
  },
  //选择品牌,型号,颜色
  select_brand: function (event) {
    var type = event.target.dataset.type;
    var id = event.target.dataset.id;
    var text = event.target.dataset.text;
    var ArrTemp = [];

    if (type == 'brand') { //品牌
      var modelList = this.data.modelList;
      for (var i = 0, len = modelList.length; i < len; i++) {
        if (id == modelList[i].brandID) {
          ArrTemp.push(modelList[i]);
        }
      }
      this.setData({
        brand_num: event.target.dataset.num,
        select_brand: text,
        select_brandID: id,
        flag_brand_content: true,
        flag_modelCon: false,
        flag_model_content: false,
        modelArr: ArrTemp,
        select_model: '',
        flag_colorCon: true,
        model_num: -1
      })
    } else if (type == 'model') { //型号
      var sub_index = event.target.dataset.sub_index;
      var colorList = this.data.colorList;
      for (var i = 0, len = colorList.length; i < len; i++) {
        if (sub_index == colorList[i].sub_index) {
          ArrTemp.push(colorList[i]);
        }
      }
      this.setData({
        model_num: event.target.dataset.num,
        select_model: text,
        select_modelID: id,
        flag_brand_content: true,
        flag_model_content: true,
        flag_colorCon: false,
        colorArr: ArrTemp,
        color_num: -1
      })
    } else { //颜色
      this.setData({
        color_num: event.target.dataset.num,
        select_color: text,
        select_colorID: id
      });
      //带参数跳转到选择故障页面
      wx.navigateTo({
        url: '../select_fault/select_fault?brand=' + this.data.select_brand + '&model=' + this.data.select_model + '&color=' + this.data.select_color + '&brandID=' + this.data.select_brandID + '&modelID=' + this.data.select_modelID + '&colorID=' + this.data.select_colorID
      });
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
