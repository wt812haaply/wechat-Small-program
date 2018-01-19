var timer = null;
Page({
  data: {
    loadTips: '',
    slideshow: false,
    selectedId: 0
  },

  // 页面加载执行
  onLoad: function () {
    this.getImages();
  },

  // 加载图片数据（自己改成异步）
  getImages: function () {
    var that = this;

    // 加载前
    that.setData({
      loadTips: '加载中...'
    });

    // 请求成功
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      that.setData({
        loadTips: '',
        images: [{
          smallSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/03/B6/ooYBAFe1MUyARRslAAFHzGDKT2U342.jpg?imageView2/1/w/100/h/100/interlace/1/q/100',
          bigSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/03/B6/ooYBAFe1MUyARRslAAFHzGDKT2U342.jpg?imageView2/1/interlace/1/q/100',
          id: 0,
        }, {
          smallSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/05/1C/oYYBAFguvUCAIlZIAADZfrIYZMc256.jpg?imageView2/1/w/100/h/100/interlace/1/q/100',
          bigSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/05/1C/oYYBAFguvUCAIlZIAADZfrIYZMc256.jpg?imageView2/1/interlace/1/q/100',
          id: 1
        }, {
          smallSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/02/B3/ooYBAFd6G-yAPvRDAABpsEdMlO4123.jpg?imageView2/1/w/100/h/100/interlace/1/q/100',
          bigSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/02/B3/ooYBAFd6G-yAPvRDAABpsEdMlO4123.jpg?imageView2/1/interlace/1/q/100',
          id: 2,
        }, {
          smallSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/02/48/oYYBAFdfoT6Aci-4AAFpUdToI6w409.jpg?imageView2/1/w/100/h/100/interlace/1/q/100',
          bigSrc: 'https://qiniu-cdn5.jinxidao.com/group1/M00/02/48/oYYBAFdfoT6Aci-4AAFpUdToI6w409.jpg?imageView2/1/interlace/1/q/100',
          id: 3
        }]
      })
    }, 1000);
  },

  // 打开轮播遮罩层
  show: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    console.log(id)
    if (that.data.images.length) {
      that.setData({
        slideshow: true,
        selectedId: id
      })
    }
  },

  // 关闭遮罩层
  hide:function(){
    this.setData({
      slideshow:false
    })
  }
})