// pages/addresslist/addresslist.js

//定义全局变量
var addListId = "";//id值
var addListIndex = "";//index数值
Page({

  data: {
    modalHidden: true,//将modal框显示出来
    loadingHidden: true,
    length: 6,
    items: [
      {
        id: '001',
        name: '张三',
        phone: '18339378678',
        province: '北京',
        city: '北京市',
        county: '海淀区',
        trueaddress: '西三旗街道万世家园12号楼1单元908',
        checked: true,
        postCode: '123456'

      },
      {
        id: '002',
        name: '李四',
        phone: '12345678987',
        province: '湖南省',
        city: '秦皇岛市',
        county: '海淀区',
        trueaddress: '西三旗街道万世家园12号楼1单元908',
        postCode: '163456',
        checked: false
      },
      // {
      //   id: '003',
      //   name: '王五',
      //   phone: '12345678987',
      //   province: '湖南省',
      //   city: '秦皇岛市',
      //   county: '海淀区',
      //   trueaddress: '西三旗街道万世家园12号楼1单元908',
      //   checked: false,
      //   postCode: '189765'
      // },
      // {
      //   id: '004',
      //   name: '马六',
      //   phone: '12345678987',
      //   province: '湖南省',
      //   city: '秦皇岛市',
      //   county: '海淀区',
      //   trueaddress: '西三旗街道万世家园12号楼1单元908',
      //   checked: false,
      //   postCode: '098765'
      // },
      // {
      //   id: '005',
      //   name: '李明',
      //   phone: '12345678987',
      //   province: '湖南省',
      //   city: '秦皇岛市',
      //   county: '海淀区',
      //   trueaddress: '西三旗街道万世家园12号楼1单元908',
      //   checked: false,
      //   postCode: '190878'
      // }
    ]
  },
  //选择为默认地址
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    console.log("在此次向后台进行ajax请求，将选中的地址的id传递过去");  
    console.log(e);
    //在请求成功以后返回cart页面
    //返回到cart页面
    wx.navigateBack({
      url: '../cart/cart'
    })
  },
  //删除事件
  delete: function (e) {
    console.log(e);
    let that = this;
    addListId = e.currentTarget.dataset.id;//将点击的index值赋值给全局变量
    addListIndex = e.currentTarget.dataset.index;//将点击的id值赋值给全局变量
    //将modal框显示出来
    that.setData({
      modalHidden: false
    })
  },
  //modal点击事件
  modalChange: function (res) {
    let that = this;
    console.log(res);
    //点击了确定按钮
    if (res.type == "confirm") {
      console.log("点击了确定");
      /*
      *在此处请求后台，将id值传递给后台，
      *有个加载动画在此处开启
      */
      that.setData({
        loadingHidden: false
      })
      //此处请求数据，在success里面写入
      //加载动画在success里面结束
      that.setData({
        loadingHidden: true
      })
      var array = that.data.items;
      array.splice(addListIndex, 1);//删除数组中的值     
      that.setData({
        items: array
      })
      //打印全局变量的数据
      // console.log(app.globalData.array)
      //重置全局变量
      addListId = "";//id值
      addListIndex = "";//index数值

    } else {
      console.log("点击了取消");//点击了取消按钮
    }
    //modal框关闭
    that.setData({
      modalHidden: true
    })

  },
  //点击编辑进行的事件
  edit:function(e){
    console.log(e);
    let data=e.currentTarget.dataset;
    wx.navigateTo({
      url:'../address/edit?id='+data.id+'&name='+data.name+'&province='+data.province+'&city='+data.city+'&county='+data.county+'&phone='+data.phone+'&address='+data.address+'&postcode='+data.postcode
    })
  }
})