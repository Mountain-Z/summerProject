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
    isSelect:false,
    totalMoney: 0,
    openId:null,
    quantity:1,
    componentId:0,
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
    const openId = wx.getStorageSync('openId')

    this.setData({
      openId
    })

    db.collection('userInfo').where({
      _openid:openId,
      orderStatus:0
    }).get().then((res) => {
      console.log(res)
      this.setData({
        carts:res.data,
      })
    })
  },
  //勾选事件处理函数  
  switchSelect: function (e) {
    // 获取item项的id，和数组的下标值  
    let Allprice = 0
    let i = 0;
    let id = e.target.dataset.id
    let index = parseInt(e.target.dataset.index);

    this.data.carts[index].isSelect = !this.data.carts[index].isSelect;

    console.log(this.data.carts)
  
    this.data.isSelect = this.data.carts[index].isSelect;
    
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
      isSelect:this.data.isSelect,
    })
    ///////////////////////////////////////////////
    for (i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].isSelect) {
       let order = this.data.order;
        order.push(this.data.carts[i]);
        this.setData({
          order: order
        })
      } else {
        let unselected = this.data.unselected;
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
    if(this.data.carts.length !== 0){
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
    }
   
  },
  // 去结算
  toBuy() {

    console.log(this.data.carts)

    const isSelect = this.data.carts.some((res) =>{
      return res.isSelect === true
    })

    const unselected = this.data.carts.filter((res) =>{
      return res.isSelect === false
    })
    const goodsItems = this.data.carts.filter((res) =>{
      return res.isSelect === true
    })

    console.log(unselected)
    console.log(isSelect)

    if(this.data.isAllSelect || isSelect){
       
    wx.showToast({
      title: '结算成功',
      icon: 'success',
      duration: 3000,
      mask:true
    });

    this.setData({
      showDialog: !this.data.showDialog
    });

    console.log(this.data.carts[this.data.componentId])

  for(let item of goodsItems){
    wx.cloud.callFunction({
      name:'update',
      data:{
        collection:'userInfo',
        openId:this.data.openId,
        goodsId:item.goodsId,
        status:3
      },
      success:(res) => console.log(res),
      fail:(err) => console.log(err)
    })
  }
    

    this.setData({
      carts: unselected,
      totalMoney:0,
      isAllSelect:false
    });

    this.onLoad();

    }else{
      wx.showModal({
        title:'错误',
        content:'未选中任何商品',
        showCancel:false,
      })
    }
   
  },
  //数量变化处理

  handleQuantityChange(e) {
    let componentId = e.componentId;
    let quantity = e.quantity;
    this.data.carts[componentId].count.quantity = quantity;
    this.setData({
      carts: this.data.carts,
      quantity,
      componentId
    });
  },
  /* 减数 */
  delCount: function (e) {
    let index = e.target.dataset.index;
    console.log("刚刚您点击了加一");
    let count = this.data.carts[index].count;
    // 商品总数量-1
    if (count > 1) {
      this.data.carts[index].count--;
    }
    // 将数值与状态写回  
    this.setData({
      carts: this.data.carts
    });

    const db = wx.cloud.database()
    db.collection('userInfo').doc(this.data.carts[e.target.dataset.index]._id).update({
      data: {
        count:this.data.carts[index].count,
      }
    })
    console.log("carts:" + this.data.carts);
    this.priceCount();
  },
  /* 加数 */
  addCount: function (e) {
    let index = e.target.dataset.index;
    console.log("刚刚您点击了加+");
    let count = this.data.carts[index].count;
    // 商品总数量+1  
    if (count < 100) {
      this.data.carts[index].count ++;
    }
    // 将数值与状态写回  
    this.setData({
      carts: this.data.carts,
    });

    let db = wx.cloud.database()
    const _ = db.command;
    db.collection('userInfo').doc(this.data.carts[e.target.dataset.index]._id).update({
      data: {
        count:this.data.carts[index].count,
      }
    })
    console.log("carts:" + this.data.carts);
    this.priceCount();
  },
  priceCount: function (e) {
    this.data.totalMoney = 0;
    for (let i = 0; i < this.data.carts.length; i++) {
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

    wx.showModal({
      title:'警告',
      content:'是否删除',
      cancelColor: 'cancelColor',
      success:(res) => {
        if(res.confirm){

          const db = wx.cloud.database()

          db.collection('userInfo').doc(this.data.carts[e.target.dataset.index]._id).remove({
            success:(res) =>console.log(res)
          })
      
          console.log(e.target.dataset.index)
          this.data.carts.splice(e.target.dataset.index, 1);
          console.log(this.data.carts)
          
          this.setData({
            carts:this.data.carts
          })
        }
      }
    })
  },

})