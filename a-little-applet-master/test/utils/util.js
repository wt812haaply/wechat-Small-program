/* function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
} */
//util.js  
function imageUtil(e) {  
  var imageSize = {};  
 
  var originalWidth = e.detail.width;//图片原始宽  
  var originalHeight = e.detail.height;//图片原始高  
  var originalScale = originalHeight/originalWidth;//图片高宽比  
  imageSize.Scale=originalScale;//记录宽高比例
  console.log('originalWidth: ' + originalWidth)  
  console.log('originalHeight: ' + originalHeight)  
  //获取屏幕宽高  
  wx.getSystemInfo({  
    success: function (res) {  
      var windowWidth = res.windowWidth;  
      var windowHeight = res.windowHeight;  
      var windowscale = windowHeight/windowWidth;//屏幕高宽比  
      console.log('windowWidth: ' + windowWidth)  
      console.log('windowHeight: ' + windowHeight)  
      if(originalScale < windowscale){//图片高宽比小于屏幕高宽比  
        //图片缩放后的宽为屏幕宽  
         imageSize.imageWidth = windowWidth-20;  
         imageSize.imageHeight = ((windowWidth-20) * originalHeight) / originalWidth;  
         
      }else{//图片高宽比大于屏幕高宽比  
        //图片缩放后的高为屏幕高  
         imageSize.imageHeight = windowHeight-20;  
         imageSize.imageWidth = ((windowHeight-20) * originalWidth) / originalHeight;  
       
      }  
    
    }  
  })  
  console.log('缩放后的宽: ' + imageSize.imageWidth);  
  console.log('缩放后的高: ' + imageSize.imageHeight);
 
  return imageSize;  
}  
  
module.exports = {  
  imageUtil: imageUtil  
}  
