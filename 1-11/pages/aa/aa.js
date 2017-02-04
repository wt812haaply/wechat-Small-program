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
  },
// })



//Modal

// Page({
  data:{
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
  },
// })




//scanCode

// Page({
  data:{
  },
  onLoad: function(options){
  },
  scancode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },


// })

// Page({
  data: {
    background: ['green', 'red', 'yellow', 'pink'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 3000,
    duration: 1200
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeVertical: function (e) {
    this.setData({
      vertical: !this.data.vertical
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
// })


// Page({
    data: {
        inputShowed: false,
        inputVal: ""
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
// });

// var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

// Page({
    data: {
        tabs: ["选项一", "选项二", "选项三"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
// })

//ActionSheet
// Page({
    open: function(){
        wx.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success: function(res) {
                if (!res.cancel) {
                    console.log(res.tapIndex)
                }
            }
        });
    },
// })


//dialog

// Page({
    openConfirm: function () {
        wx.showModal({
            title: '弹窗标题',
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            confirmText: "主操作",
            cancelText: "辅助操作",
            success: function (res) {
                console.log(res);
                if (res.confirm) {
                    console.log('用户点击主操作')
                }else{
                    console.log('用户点击辅助操作')
                }
            }
        });
    },
    openAlert: function () {
        wx.showModal({
            content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        });
    },
// })

// Page({
    data: {
        array: ['美国', '中国', '巴西', '日本'],
        index: 0,
        date: '2016-09-01',
        time: '12:01'
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value
        })
    },
// });







//xiala

// Page({
  data: {
    list: [
      {
        id: 'view',
        name: '紧急电话',
        open: false,
        subName: ['火警', '盗警', '急救', '报时', '电力抢修', '管道液化气抢修', '市话障碍', '交通事故', '天气预报', '号码查询', '自来水抢修'],
        phone: ['119', '110', '120', '117', '95598', '87221599', '112', '122', '121', '114', '87011670']
      }, {
        id: 'form',
        name: '银行电话',
        open: false,
        subName: ['工商银行', '建设银行', '农业银行', '中国银行', '交通银行', '浦发银行', '民生银行', '兴业银行', '中信银行', '深圳发展银行', '华夏银行', '招商银行', '广发银行', '广东农信', '光大银行'],
        phone: ['95588', '95533', '95599', '95566', '95559', '95528', '95568', '95561', '95558', '95501', '95577', '95555', '95508', '96138', '95595']
      }, {
        id: 'feedback',
        name: '快递电话',
        open: false,
        subName: ['申通快递', 'EMS', '第三人民医院', '顺丰速运', '	圆通速递', '中通速递', '韵达快运', '天天快递', '汇通快运', '速尔快递', '德邦物流', '中铁快运', '鑫飞鸿快递', 'UPS', 'FedEx(联邦快递)'],
        phone: ['4008895543', '4008100999', '400-811-1111', '021-69777888', '021-39777777', '021-39207888', '021-67662333', '021-62963636', '4008822168', '4008305555', '95572', '021-69781999', '4008208388', '4008861888']
      }, {
        id: 'nav',
        name: '通讯客服',
        open: false,
        subName: ['中国移动', '中国联通', '中国电信', '中国网通', '中国铁通', '中国邮政'],
        phone: ['10086', '10010', '10000', '10060', '10050', '11185']
      }, {
        id: 'media',
        name: '投诉举报',
        open: false,
        subName: ['消费者投诉热线', '价格投诉热线', '质量投诉', '环保投诉', '税务投诉', '公共卫生监督', '电信投诉', '市长热线', '法律援助', '妇女维权', '民工维权'],
        phone: ['12315', '12358', '12365', '12369', '12366', '12320', '12300', '12366', '12351', '12338', '12333']
      }, {
        id: 'map',
        name: '铁路航空',
        subName: ['铁路', '国航', '海航', '南航', '东航', '深航', '厦航', '山航'],
        phone: ['12306', '4008100999', '950718', '4006695539', '95530', '4008895080', '95557', '4006096777']
      }, {
        id: 'canvas',
        name: '售后服务',
        subName: ['苹果', '诺基亚', '三星', '联想', '戴尔', '索尼', '飞利浦', '松下', '东芝', 'TCL'],
        phone: ['4006272273', '4008800123', '8008108888', '8008580888', '8008209000', '8008201201', '8008100781', '8008108208', '4008123456']
      }, {
        id: 'canvas1',
        name: '法律相关',
        subName: ['工资拖欠问题举报', '经济犯罪举报中心', '打拐买举报电话', '土地矿产法律热线', '水利工程建设举报', '扫黄打非举报电话', '农业安全生产事故', '消费者申诉举报电话', '税务违法举报'],
        phone: ['010-68304532', '010-65204333', '010-84039250', '16829999', '010-63205050', '010-65254722', '010-64192512', '12315', '010-63417425']
      }
    ]
  },
  widgetsToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  },
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone
    })
  }
});







