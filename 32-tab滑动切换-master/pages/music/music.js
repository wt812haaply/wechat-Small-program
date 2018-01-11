Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    open : false,
    poster: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG.jpg?max_age=2592000',
    name: '晴天',
    author: '周杰伦',
    src: 'http://dl.stream.qqmusic.qq.com/C4000039MnYb0qxYhV.m4a?vkey=E05A57DF634CFA16341FE5D06FCF59D85F50BA5B31658B3E051E70DDC12ABCCFFB8410A9777805DB0FD934E27F183EE8668363CCE711C021&guid=6293206556&uin=1814239988&fromtag=66',
  },
  tap_ch: function(e){
    if(this.data.open){
      this.setData({
        open : false
      });
    }else{
      this.setData({
        open : true
      });
    }
  }
})