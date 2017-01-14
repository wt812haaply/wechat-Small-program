Page({
  data:{
  },
  onLoad: function(options){
  },
  previewImage: function () {
    wx.previewImage({
      current: 'http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg', // 当前显示图片的http链接
      urls: ['http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg', 'http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg', 'http://b.hiphotos.baidu.com/news/pic/item/b58f8c5494eef01fc443a39fe9fe9925bc317d11.jpg'] // 需要预览的图片http链接列表
    })
//   }
// })

//Modal

// Page({
//   data:{
  },
  onLoad: function(options){
  },
  showModal: function () {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
//   }
// })

//scanCode

// Page({
//   data:{
  },
  onLoad: function(options){
  },
  scancode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
//   }
// })



//loading

// Page({
//     data:{
//         hidden:true
    },
    changeHidden: function(){
        this.setData({
            hidden: !this.data.hidden
        });
//     }
// })

//modal

// Page({
//     data:{
        // hidden:false,
        // nocancel:false
    },
    cancel: function(){
        this.setData({
             hidden: true
        });
    },
    confirm: function(){
        this.setData({
             nocancel: !this.data.nocancel
        });    
        console.log("clicked confirm");
    }
})



//tab


Page( {
  data: {
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
  },
  tabFun: function(e){
    //获取触发事件组件的dataset属性
    var _datasetId=e.target.dataset.id;
    console.log("----"+_datasetId+"----");
    var _obj={};
    _obj.curHdIndex=_datasetId;
    _obj.curBdIndex=_datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  onLoad: function( options ) {
    alert( "------" );
  }
})




