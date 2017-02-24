// // pages/imglook/imglook.js
var imageUtil = require('../../utils/util.js');  
Page({
  data: {
    stv: {
      offsetX:0,
      offsetY: 0,
      zoom: false, //是否缩放状态
      distance: 0,  //两指距离
      scale: 1,  //缩放倍数,及显示缩放的倍数
      scaleNum:0,//显示放大倍数
      winHeight:0,//屏幕的高度
      winWidth:0//屏幕的宽度
    }
  },
  //事件处理函数
  touchstartCallback: function(e) {
    //触摸开始
   // console.log('touchstartCallback');
    //console.log(e);
   
    if (e.touches.length === 1) {
      let {clientX, clientY} = e.touches[0];
      this.startX = clientX;
      this.startY = clientY;
      this.touchStartEvent = e.touches;

     // console.log(e.touches);查看单指操作的x，y值    
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
  touchmoveCallback: function(e) {
    
    //触摸移动中
    // console.log('touchmoveCallback');
     console.log(e);

    if (e.touches.length === 1) {
      //单指移动
      if (this.data.stv.zoom) {
        //缩放状态，不处理单指
        return ;
      }
      let {clientX, clientY} = e.touches[0];
      
      //控制图片的坐标越界，防止视图出现空白文件
      let{pageX,pageY}=e.touches[0];
     
      //防止越界
            let offsetX = clientX - this.startX;
            let offsetY = clientY- this.startY;
            this.startX = clientX;
            this.startY = clientY; 
            let {stv} = this.data;
            stv.offsetX += offsetX;
            stv.offsetY += offsetY;
            stv.offsetLeftX = -stv.offsetX;
            stv.offsetLeftY = -stv.offsetLeftY;
            //console.log("clientX"+clientX);

            this.setData({
                stv: stv
              });
             
          //防止中间部分出现空白，图片被拖拽到看不到的地方，分别对x，y进行设置
            // if(Math.abs(this.data.stv.offsetX)>this.data.stv.winWidth/2){
            //   if(this.data.stv.offsetX<0){
            //         this.setData({
            //           'stv.offsetX':-this.data.stv.winWidth/2
            //         })
            //   }else{
            //     this.setData({
            //           'stv.offsetX':this.data.stv.winWidth/2
            //         })
            //   }
                
            // }
            //   if(Math.abs(this.data.stv.offsetY)>this.data.stv.winHeight/2){
            //   if(this.data.stv.offsetY<0){
            //         this.setData({
            //           'stv.offsetY':-this.data.stv.winHeight/2
            //         })
            //   }else{
            //     this.setData({
            //           'stv.offsetY':this.data.stv.winHeight/2
            //         })
            //   }
                
            // }

    } else {
      //双指缩放
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);

      let distanceDiff = distance - this.data.stv.distance;
      let newScale = this.data.stv.scale + 0.005 * distanceDiff;

       this.setData({
                  'stv.distance': distance,
                  'stv.scale': newScale,
                  'stv.scaleNum': Math.floor((newScale-1)*100)
                  }) 

  

      //放大倍数限制
      // if(Math.floor((newScale-1)*100)<=100&&Math.floor((newScale-1)*100)>=10){ 
      //   this.setData({
      //             'stv.distance': distance,
      //             'stv.scale': newScale,
      //             'stv.scaleNum': Math.floor((newScale-1)*100)
      //             })          
      //     }  
    }

  },
  touchendCallback: function(e) {
        //触摸结束    
    //console.log('touchendCallback');
   // console.log(e);   

    if (e.touches.length === 0) {
      this.setData({
        'stv.zoom': false, //重置缩放状态
      })
    }
  },
  onLoad: function () {
   // console.log('onLoad');
   //初始化获取屏幕的宽度和高度
    let that=this;
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            'stv.winHeight':res.windowHeight,
            'stv.winWidth':res.windowWidth
          }) 
         
        }
      });
  },
  // imageLoad:function(e){
  //    var imageSize = imageUtil.imageUtil(e)  
  //   this.setData({  
  //     imagewidth: imageSize.imageWidth,  
  //     imageheight: imageSize.imageHeight  
  //   })  
  // }
})
