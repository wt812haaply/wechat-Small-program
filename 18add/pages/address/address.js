// page/address/edit.js 
//index.js
var city = require("../../utils/city.js");
var username = '';
var address = '';
var iphone = '';
Page({
  data: {
    username: username,
    address: address,
    iphone: iphone,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数  
    var that = this;
    city.init(that);
  },
  bingAddressTap: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
        var REGION_PROVINCE = [];
        var addressBean = {
          REGION_PROVINCE: null,
          REGION_COUNTRY: null,
          REGION_CITY: null,
          ADDRESS: null
        };

        function regexAddressBean(address, addressBean) {
          regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
          var addxress = regex.exec(address);
          addressBean.REGION_CITY = addxress[0];
          addressBean.REGION_COUNTRY = addxress[2];
          addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
          var province = addxress[1];
          var city = addxress[2];
          var citytitle = addxress[3];
          // 市区
          var provinceSemicolon = addxress[1];
          var citySemicolon = addxress[2];
          var citytitleSemicolon = addxress[3];
          // 市区
          // 单单省区
          var minprovince = addressBean.REGION_PROVINCE;
          var addressSemicolon = minprovince + ',' + provinceSemicolon + citySemicolon + ',' + citytitleSemicolon;

          wx.setStorageSync('addressSemicolon', addressSemicolon);

        }
        if (!(REGION_PROVINCE = regex.exec(res.address))) {
          regex = /^(.*?(省|自治区))(.*?)$/;
          REGION_PROVINCE = regex.exec(res.address);
          addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
          regexAddressBean(REGION_PROVINCE[3], addressBean);
        } else {
          addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
          regexAddressBean(res.address, addressBean);

        }

        var automaticAddress = addressBean.REGION_PROVINCE + addressBean.REGION_CITY;
        wx.setStorageSync('automaticAddress', automaticAddress);
        that.setData({

          ADDRESS_1_STR: addressBean.REGION_PROVINCE + " " + addressBean.REGION_CITY + "" + addressBean.REGION_COUNTRY

        });
        that.setData(addressBean);

      }

    })


  },
  bindblurname: function (e) {

    var username = e.detail.value;

    wx.setStorageSync('usernames', username);
  },
  bindblurphone: function (e) {
    var userphone = e.detail.value;
    wx.setStorageSync('userphones', userphone);
    this.checkPhone(userphone);
  },
  checkPhone: function (phone) {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      wx.showModal({
        title: '提示',
        content: '手机号码有误',
        showCancel: false,
        success: function (res) {

        }
      })
    }
  },
  hasAddress: function () {
    // 地址缓存
    var addressBean = wx.getStorageSync('listaddress');
    // 名字缓存
    var usernames = wx.getStorageSync('usernames');
    // 电话缓存
    var userphones = wx.getStorageSync('userphones');
    if (usernames == '') {
      wx.showModal({
        title: '提示',
        content: '请填写收信人姓名',
        showCancel: false,
        success: function (res) {

        }
      })
    } else if (userphones == '') {
      wx.showModal({
        title: '提示',
        content: '请填写收信人电话',
        showCancel: false,
        success: function (res) {

        }
      })
    } else {
      wx.navigateTo({
        url: '../gathering/gathering'
      })
    }
  },
  particularFn: function (e) {

    var particularAddress = e.detail.value;

    wx.setStorageSync('particularAddress', particularAddress);


    var addressBean = wx.getStorageSync('listaddress');

    addressBean = addressBean + particularAddress;

    wx.setStorageSync('listaddress', addressBean);

    var addressSemicolon = wx.getStorageSync('addressSemicolon');

    addressSemicolon = addressSemicolon + particularAddress;

    wx.setStorageSync('addressSemicolon', addressSemicolon);

  }

})