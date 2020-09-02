Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    _id:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const opneId = wx.getStorageSync('openId')
    
    const db = wx.cloud.database()
    db.collection('useradress').where({
      _openid:opneId
    }).get().then((res) => {
      this.setData({
        _id:res.data[0]._id 
      })
    })
    
    var arr = wx.getStorageSync('addressList') || [];
    console.info("缓存数据：" + arr);
    // 更新数据  
    this.setData({
      addressList: arr
    });

    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },
  addAddress:function(){
    wx.navigateTo({ url: '../address/address' });
  },
  chooseAddress(e){
    console.log(e)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('handleBuy', {data: e});

    wx.switchTab({
      url: '../cart/cart',
    })
  },
  /* 删除item */
  delAddress: function (e) {
    this.data.addressList.splice(e.target.id.substring(3), 1);
    // 更新data数据对象  
    if (this.data.addressList.length > 0) {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', this.data.addressList);
    } else {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', []);
    }

    console.log(this.data._id)
    const db = wx.cloud.database()
    db.collection('useradress').doc(this.data._id).remove()

  }
})