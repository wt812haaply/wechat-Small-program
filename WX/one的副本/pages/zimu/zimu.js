// pages/zimu/zimu.js
Page({
 data: {
    zimu:['A','B','C','D','E','F','G','H','I','J','K','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    scrollIntoId:'A',
    groups: [{
      groupName: 'A',
      users: [
        {
          name: '阿码',
          avatar: '../../images/avatar.png'
        }
      ]
    },
    {
      groupName: 'B',
      users: [
        {
          name: '白娘子',
          avatar: '../../images/avatar.png'
        },
        {
          name: '包天齐',
          avatar: '../../images/avatar.png'
        }
      ]
    },
    {
      groupName: 'C',
      users: [
        {
          name: '陈大年',
          avatar: '../../images/avatar.png'
        },
        {
          name: '丛云山',
          avatar: '../../images/avatar.png'
        },
        {
          name: '崔鸣贵',
          avatar: '../../images/avatar.png'
        }
      ]
    },
    {
      groupName: 'D',
      users: [
        {
          name: '邓牛牛',
          avatar: '../../images/avatar.png'
        },
        {
          name: '刁仁衣',
          avatar: '../../images/avatar.png'
        },
        {
          name: '杜长城',
          avatar: '../../images/avatar.png'
        }
      ]
    },
    {
      groupName: 'F',
      users: [
        {
          name: '范长龙',
          avatar: '../../images/avatar.png'
        },
        {
          name: '冯肖晓',
          avatar: '../../images/avatar.png'
        }
      ]
    },
    {
      groupName: 'G',
      users: [
        {
          name: '甘地',
          avatar: '../../images/avatar.png'
        },
        {
          name: '高墙',
          avatar: '../../images/avatar.png'
        },
        {
          name: '宫都举',
          avatar: '../../images/avatar.png'
        }
      ]
    },
    {
      groupName: 'H',
      users: [
        {
          name: '何芸',
          avatar: '../../images/avatar.png'
        },
        {
          name: '胡坨坨',
          avatar: '../../images/avatar.png'
        },
        {
          name: '黄坨坨',
          avatar: '../../images/avatar.png'
        }
      ]
    },
    {
      groupName: 'T',
      users: [
        {
          name: '谭老头儿',
          avatar: '../../images/avatar.png'
        },
        {
          name: '汤云西',
          avatar: '../../images/avatar.png'
        },
        {
          name: '图图',
          avatar: '../../images/avatar.png'
        }
      ]
    },
    {
      groupName: 'X',
      users: [
        {
          name: '夏一天',
          avatar: '../../images/avatar.png'
        },
        {
          name: '鲜轰轰',
          avatar: '../../images/avatar.png'
        },
        {
          name: '谢大佩',
          avatar: '../../images/avatar.png'
        }
      ]
    }
    ]
  },
  touchmovefn:function(e){ // 右侧字母检索
  //console.log(e.changedTouches)
    var letterIndex = e.changedTouches['0'].pageY /20
    // console.log(e)
    // console.log(letterIndex)
    var index = parseInt(letterIndex)
    //console.log(index)
    var letter = this.data.zimu[index]
    //console.log(letter)
     this.setData({
      scrollIntoId:letter
    })
    wx.showToast({
      title:letter
    })
  },
  touchstartfn:function(e){ 
    //console.log(e.target.id)
    console.log(e);
    var letter = e.target.dataset.id
    this.setData({
      scrollIntoId:letter
    })
     wx.showToast({
      title:letter
    })
  }
})