//获取应用实例
const app = getApp();

Page({
 
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
   /*  orderItems: [
      {        
        typeId: 0,        
        name: '待付款',        
        url: '../detail/detail',        
        imageurl: '../../images/待支付.png',
      },
      {        
        typeId: 1,        
        name: '待发货',        
        url: '',        
        imageurl: '../../images/待发货.png',
      },
      {        
        typeId: 2,        
        name: '待收货',        
        url: '',        
        imageurl: '../../images/待收货.png'
      },
      {        
        typeId: 3,        
        name: '已完成',        
        url: '',        
        imageurl: '../../images/已完成.png'
      }
    ], */
    menuitems: [
      { text: '查看订单', url: '../order/order', imgurl:'../../images/订单.png'  },
      { text: '收货地址', url: '../addressList/addressList', imgurl:'../../images/收货地址.png'  },
      { text: '联系客服', url: '../index/index', imgurl:'../../images/联系客服.png' }
    ]
  },

  onLoad: function (options) {
    let that = this;
    if (app.globalData.userInfo) {
      that.setUserInfo(app.globalData.userInfo);
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setUserInfo(res.userInfo);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          that.setUserInfo(res.userInfo);
        }
      })
    }
  },

  getUserInfo: function (e) {
    this.setUserInfo(e.detail.userInfo);
  },

  setUserInfo: function (userInfo) {
    if (userInfo != null) {
      app.globalData.userInfo = userInfo
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
  }
})