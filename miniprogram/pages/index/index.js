Page({

  data: {
    swiperCurrent: 0,  
    indicatorDots: true,  
    autoplay: true,  
    interval: 3000,   
    duration: 800,   
    circular:true,  
    picId: 0,
    imgUrls: ['https://img.alicdn.com/tfs/TB19Xy0e8FR4u4jSZFPXXanzFXa-520-280.jpg_q90_.webp',
    'https://img.alicdn.com/simba/img/TB1JrOqfTM11u4jSZPxSuuhcXXa.jpg',
    'https://img.alicdn.com/simba/img/TB1qq8gLbj1gK0jSZFuSuwrHpXa.jpg'
    ],
    dataList:[
      {
        goods_id:1,
        goods_title:'兰蔻轻透水漾防晒乳',
        goods_img:'https://img.alicdn.com/imgextra/i1/2360209412/O1CN01YX4JPq2JOkJe99Psj_!!2360209412.jpg_430x430q90.jpg',
        goods_xiaoliang:'8943',
        goods_price:'68.99'
      },{
        goods_id:2,
        goods_title:'MateBook D 14 2020锐龙版7nm',
        goods_img:'https://img.alicdn.com/imgextra/i3/2838892713/O1CN01G5v6pD1Vub8fpsEpD_!!2838892713.png_430x430q90.jpg',
        goods_xiaoliang:'452',
        goods_price:'4799.00'
      }, {
        goods_id: 3,
        goods_title: 'The Reversible 瑜伽垫 3mm LU9A78S',
        goods_img: 'https://img.alicdn.com/imgextra/i2/2635590370/O1CN01yJqRJK1EbV9nuMk36_!!2635590370-0-lubanu-s.jpg_430x430q90.jpg',
        goods_xiaoliang: '6590',
        goods_price: '480.00'
      }
    ],
  },
  printId:function(e){
    console.log(e.id)
  },
  swiperChange:function (e) {    
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
  swipclick: function(e){
    console.log("点击图片,跳转到详情页")
    console.log(this.data.picId)
  },
  clickBox: function(e){
    console.log("点击"+e.currentTarget.id+"，跳转到板块")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  onUnload: function () {
    
  },

  onShareAppMessage: function () {
    
  }
})