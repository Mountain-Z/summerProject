// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [], //数据 
    order: [],
    unselected: [],
    iscart: true,
    hidden: null,
    isAllSelect: false,
    totalMoney: 0,
    id: '75c568195f3e0dad002542fa5c1e98b7',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  testSQL: function () {
    console.log(this.data.carts)
    console.info(this.data.hidden);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db = wx.cloud.database({});
    const _ = db.command;
    //对userid要判断吗--------------------------------------------where-----
    const cont = db.collection('userInfo').doc(this.data.id).get().then(res => {
      console.log(res.data.carts)
      this.setData({
        carts: res.data.carts
      })
    })
    //  console.log('Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+this.data.carts+'end');
    // 有数据的话，就遍历数据，计算总金额 和 总数量  

  },
  //勾选事件处理函数  
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  
    var Allprice = 0,
      i = 0;
    let id = e.target.dataset.id,

      index = parseInt(e.target.dataset.index);
    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;


    //价钱统计
    if (this.data.carts[index].isSelect) {
      this.data.totalMoney = this.data.totalMoney + (this.data.carts[index].price * this.data.carts[index].count);

    } else {
      this.data.totalMoney = this.data.totalMoney - (this.data.carts[index].price * this.data.carts[index].count);
    }
    //是否全选判断
    for (i = 0; i < this.data.carts.length; i++) {
      Allprice = Allprice + (this.data.carts[index].price * this.data.carts[index].count);
    }
    if (Allprice == this.data.totalMoney) {
      this.data.isAllSelect = true;
    } else {
      this.data.isAllSelect = false;
    }

    this.setData({
      carts: this.data.carts,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
    })
    ///////////////////////////////////////////////
    for (i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].isSelect) {
       var order = this.data.order;
        order.push(this.data.carts[i]);
        this.setData({
          order: order
        })
      } else {
        var unselected = this.data.unselected;
        unselected.push(this.data.carts[i]);
        this.setData({
          unselected: unselected
        })
      }
    }
    ///////////////////////////////////////////////////
  },
  //全选
  allSelect: function (e) {
    //处理全选逻辑
    let i = 0;
    if (!this.data.isAllSelect) {
      this.data.totalMoney = 0;
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = true;
        this.data.totalMoney = this.data.totalMoney + (this.data.carts[i].price * this.data.carts[i].count);

      }
    } else {
      for (i = 0; i < this.data.carts.length; i++) {
        this.data.carts[i].isSelect = false;
      }
      this.data.totalMoney = 0;
    }
    this.setData({
      carts: this.data.carts,
      isAllSelect: !this.data.isAllSelect,
      totalMoney: this.data.totalMoney,
    })
  },
  // 去结算
  toBuy() {
    wx.showToast({
      title: '去结算',
      icon: 'success',
      duration: 3000
    });
    this.setData({
      showDialog: !this.data.showDialog
    });
    console.log(this.data.order);
    console.log(this.data.unselected);

    // 更新data数据对象  
    let db = wx.cloud.database()
    const _ = db.command;

    db.collection('userInfo').doc(this.data.id).update({
      data: {
        carts: _.set(this.data.unselected)
      }
    })
    db.collection('userInfo').doc(this.data.id).update({
      data: {
        order: _.push(this.data.order)
      }
    })
    this.setData({
      carts: this.data.unselected
    });
    this.onLoad();
  },
  //数量变化处理
  handleQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;
    this.data.carts[componentId].count.quantity = quantity;
    this.setData({
      carts: this.data.carts,
    });
  },
  /* 减数 */
  delCount: function (e) {
    var index = e.target.dataset.index;
    console.log("刚刚您点击了加一");
    var count = this.data.carts[index].count;
    // 商品总数量-1
    if (count > 1) {
      this.data.carts[index].count--;
    }
    // 将数值与状态写回  
    this.setData({
      carts: this.data.carts
    });

    let db = wx.cloud.database()
    const _ = db.command;
    db.collection('userInfo').doc(this.data.id).update({
      data: {
        carts: _.set(this.data.carts)
      }
    })
    console.log("carts:" + this.data.carts);
    this.priceCount();
  },
  /* 加数 */
  addCount: function (e) {
    var index = e.target.dataset.index;
    console.log("刚刚您点击了加+");
    var count = this.data.carts[index].count;
    // 商品总数量+1  
    if (count < 100) {
      this.data.carts[index].count++;
    }
    // 将数值与状态写回  
    this.setData({
      carts: this.data.carts
    });

    let db = wx.cloud.database()
    const _ = db.command;
    db.collection('userInfo').doc(this.data.id).update({
      data: {
        carts: _.set(this.data.carts)
      }
    })
    console.log("carts:" + this.data.carts);
    this.priceCount();
  },
  priceCount: function (e) {
    this.data.totalMoney = 0;
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].isSelect == true) {
        this.data.totalMoney = this.data.totalMoney + (this.data.carts[i].price * this.data.carts[i].count);
      }

    }
    this.setData({
      totalMoney: this.data.totalMoney,
    })
  },
  /* 删除item */
  delGoods: function (e) {
    this.data.carts.splice(e.target.id.substring(3), 1);
    // 更新data数据对象  
    let db = wx.cloud.database()
    const _ = db.command;
    db.collection('userInfo').doc(this.data.id).update({
      data: {
        carts: _.set(this.data.carts)
      }
    })

    if (this.data.carts.length > 0) {
      this.setData({
        carts: this.data.carts
      })
      wx.setStorageSync('cart', this.data.carts);
      this.priceCount();
    } else {
      this.setData({
        cart: this.data.carts,
        iscart: false,
        hidden: true,
      })
      wx.setStorageSync('cart', []);
    }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})