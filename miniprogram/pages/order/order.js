// pages/order/order.js
Page({
	data: {
		subTitle:['全部','待付款','代发货','待收货','待评价'],
		currentIndex:0,
		pages:[
			[{
			goods_id:1,
			goods_title:'兰蔻轻透水漾防晒乳',
			goods_img:'https://img.alicdn.com/imgextra/i1/2360209412/O1CN01YX4JPq2JOkJe99Psj_!!2360209412.jpg_430x430q90.jpg',
			goods_xiaoliang:'8943',
			goods_price:'68.99'
	  },
	  {
        goods_id:2,
        goods_title:'MateBook D 14 2020锐龙版7nm',
        goods_img:'https://img.alicdn.com/imgextra/i3/2838892713/O1CN01G5v6pD1Vub8fpsEpD_!!2838892713.png_430x430q90.jpg',
        goods_xiaoliang:'452',
        goods_price:'4799.00'
	  }, 
	  {
        goods_id: 3,
        goods_title: 'The Reversible 瑜伽垫 3mm LU9A78S',
        goods_img: 'https://img.alicdn.com/imgextra/i2/2635590370/O1CN01yJqRJK1EbV9nuMk36_!!2635590370-0-lubanu-s.jpg_430x430q90.jpg',
        goods_xiaoliang: '6590',
        goods_price: '480.00'
      }],[
		{
			goods_id:1,
			goods_title:'兰蔻轻透水漾防晒乳',
			goods_img:'https://img.alicdn.com/imgextra/i4/6000000002624/TB2QYtubk7OyuJjSsplXXXqdpXa_!!0-tbCommonAudio.jpg_180x180q90.jpg_.webp',
			goods_xiaoliang:'8943',
			goods_price:'68.99'
	  },
	  {
        goods_id:2,
        goods_title:'MateBook D 14 2020锐龙版7nm',
        goods_img:'https://img.alicdn.com/bao/uploaded/i1/48317215/O1CN01ehQZXZ23AWDj4DFIi_!!0-item_pic.jpg_180x180q90.jpg_.webp',
        goods_xiaoliang:'452',
        goods_price:'4799.00'
	  }, 
	  {
        goods_id: 3,
        goods_title: 'The Reversible 瑜伽垫 3mm LU9A78S',
        goods_img: 'https://img.alicdn.com/bao/uploaded/i2/634491/O1CN01T9PnWc1j2vIMn6gk2_!!634491.jpg_180x180q90.jpg_.webp',
        goods_xiaoliang: '6590',
        goods_price: '480.00'
      }
	  ]
		]
	},
	handleindex(event){
		this.setData({
			currentIndex:event.currentTarget.dataset.index
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	
})