//edit.js
//获取全局变量
var app = getApp();//获取全局对象 

//获取应用实例
var tcity = require("../../utils/citys.js");

Page({
  data: {
    id: '',
    valueName: '',
    valuePhone: '',
    valueAddress: '',
    valuePostCode: '',
    trueName: '',//判断真实姓名
    truePhone: '',//联系方式  
    trueAddress: '',//详细地址
    Postcode: '',//邮政编码   
    provinces: [],
    province: '',
    citys: [],
    city: '',
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false
  },
  //绑定的是改变的时候的操作
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      // console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name);

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
      });

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
      });

      return;
    }
  },
  //绑定的是点击的时候的触发的事件
  open: function () {

    this.setData({
      condition: !this.data.condition,
    });
  },
  onLoad: function (options) {
    //初始化完成
    console.log("onLoad");
    let that = this;
    tcity.init(that);
    let cityData = that.data.cityData;
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

    })
    console.log('初始化完成');
    //创建可重复使用的WeToast实例，并附加到this上，通过this.wetoast访问
    new app.WeToast();
    //获取options数据
    that.setData({
      'id': options.id
    })
    console.log(that.data.id);
    if (options.id != '0') {
      //如果是修改地址
      that.setData({
        'valueName': options.name,//判断真实姓名
        'valuePhone': options.phone,//联系方式 
        'valueAddress': options.address,//详细地址
        'valuePostCode': options.postcode,//获取邮政编码
        'province': options.province,//省
        'city': options.city,//市
        'county': options.county//县

      })
    } else {//如果是重新创建一个地址，则走这个
      that.setData({
        'provinces': provinces,
        'citys': citys,
        'countys': countys,
        'province': cityData[0].name,
        'city': cityData[0].sub[0].name,
        'county': cityData[0].sub[0].sub[0].name
      })
    }
    console.log(that.data)
  },
  //在此处，onload事件结束

  //提交事件
  formSubmit: function (e) {
    var that = this;
    //获取input框内的value值
    let detrueName = e.detail.value.trueName;//获取真实姓名
    let detruePhone = e.detail.value.truePhone;//获取联系方式
    let detrueAddress = e.detail.value.trueAddress;//获取详细地址
    let dePostcode = e.detail.value.Postcode;//获取邮政编码
    //正则判断
    let phoneReg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;//电话正则

    /*判断真实姓名
     *判断真实姓名的长度是否为0
     */
    if (detrueName.length == 0) {
      that.wetoast.toast({
        title: '真实姓名不能为空',
        titleClassName: 'my_wetoast_title'
      });
      return;
    }

    /*判断联系方式
    *判断联系方式的长度是否为0
    *正则判断是否符合手机号的格式
    */
    // if(detruePhone.length==0){
    //   that.wetoast.toast({
    //     title: '手机号格式不正确,请认真检查提填写是否有错误',
    //     titleClassName: 'my_wetoast_title'
    //   });
    //   return;
    // }
    // if(!phoneReg.test(detruePhone)){
    //    that.wetoast.toast({
    //     title: '手机号码格式不正确,请认真检查填写是否有错误',
    //     titleClassName: 'my_wetoast_title'
    //   });
    //   return;
    // }
    // //判断详细地址
    // if(detrueAddress.length==0){
    //    that.wetoast.toast({
    //     title: '详细地址不能为空',
    //     titleClassName: 'my_wetoast_title'
    //   });
    //   return;
    // }


    let address = that.data.province + that.data.city + that.data.county + detrueAddress;


    //请求ajax，将添加的地址传递给后台，返回的一个地址的id
    let arrayNew = {
      id: '010',
      name: detrueName,
      phone: detruePhone,
      address: address,
      postCode: dePostcode
    }
    console.log(arrayNew);

    // app.globalData.array.push(arrayNew);
    // console.log(app.globalData.array);
    //返回并传递回去
    // wx.navigateTo({
    //   url: '../addlist/addlist'
    // })

  },



})
