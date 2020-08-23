Page({

  data: {

    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    picId: 0,
    imgUrls: ['https://img.alicdn.com/tfs/TB19Xy0e8FR4u4jSZFPXXanzFXa-520-280.jpg_q90_.webp',
      'https://img.alicdn.com/simba/img/TB1JrOqfTM11u4jSZPxSuuhcXXa.jpg',
      'https://img.alicdn.com/simba/img/TB1qq8gLbj1gK0jSZFuSuwrHpXa.jpg'
    ],
    goodsData: []
  },
  printId: function (e) {
    console.log(e.id)
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current,
      picId: e.detail.current
    })
  },
  //点击指示点切换  
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  swipclick: function (e) {
    console.log("点击图片,跳转到详情页")
    console.log(this.data.picId)
  },
  clickBox: function (e) {
    console.log("点击" + e.currentTarget.id + "，跳转到板块")
  },

  onLoad: function (options) {

    const db = wx.cloud.database({});
    const cont = db.collection('goodsItems').get().then(res => {
      this.setData({
        goodsData: res.data
      })
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  testSQL: function () {
    console.log(this.data.goodsData)
  },

  onUnload: function () {

  },

  onShareAppMessage: function () {
  }
})