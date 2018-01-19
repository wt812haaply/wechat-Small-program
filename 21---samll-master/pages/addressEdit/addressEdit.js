//获取应用实例
var tcity = require("../../utils/citys.js");

var app = getApp()
Page({
  data: {
    name: '',
    phone: '',
    address: '',
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false
  },
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function (options) {
    var that = this;


    //设置城市选择
    console.log("onLoad");


    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
    var value = '';
    try {
      value = wx.getStorageSync('order_data');
    } catch (e) {
      // Do something when catch error
    }
    console.log(value)
    var name = '';
    if (value.name != 'undefined') {
      name = value.name;
    }
    var phone = '';
    if (value.phone != 'undefined') {
      phone = value.phone;
    }
    var address = '';
    if (value.address != 'undefined') {
      address = value.address;
    }
    var province = '北京';
    if (value.province != 'undefined') {
      province = value.province;
    }
    var city = '北京市';
    if (value.city != 'undefined') {
      city = value.city;
    }
    var district = '东城区';
    if (value.district != 'undefined') {
      district = value.district;
    }
    var id = '';
    if (value.id != 'undefined') {
      id = value.id;
    }
    console.log(name)
    that.setData({
      init_name: name,
      name: name,
      init_phone: phone,
      phone: phone,
      init_address: address,
      address: address,
      province: province,
      city: city,
      county: district,
      id: id
    })

  },
  //姓名手机号详细地址输入
  input: function (event) {

    var val = event.target.dataset.type;
    if (val == "name") {
      this.setData({
        name: event.detail.value
      })
    } else if (val == "phone") {
      this.setData({
        phone: event.detail.value
      })
    } else if (val == "address") {
      this.setData({
        address: event.detail.value
      })
    }
    console.log(event.detail.value)
  },
  //确定
  confirm: function () {
    var that = this;
    console.log(this.data)
    var data = this.data;

    if (!data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: '12',
        duration: 2000
      });
      return false;
    }

    if (!data.phone) {
      wx.showToast({
        title: '请输入手机号',
        duration: 2000
      });
      return false;
    }

    if (!data.address) {
      wx.showToast({
        title: '请输入详情地址',
        duration: 2000
      });
      return false;
    }
    wx.showToast({
      title: '保存中...',
      icon: 'loading',
      duration: 10000
    });
    console.log(data)
    wx.request({
      url: app.globalData.serverUrl + 'saveAddress',
      data: {
        name: data.name,
        phone: data.phone,
        province: data.province,
        address: data.address,
        city: data.city,
        district: data.county,
        userID: app.globalData.userid,
        isOn: 1, //1正常，0删除
        id: that.data.id //有代码修改，无代表添加
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
        if (res.data.error_code == 0) {
          //返回页面
          wx.navigateBack({
            delta: 1
          })
        } else {
          setTimeout(function () {
            wx.showToast({
              title: res.data.error_msg,
              icon: 'success',
              duration: 2000
            })
          }, 2000)
        }
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        wx.hideToast()
      }
    })
  }
})
