// pages/order/order.js
const app = getApp()
Page({
	data: {
		openID:null,
		subTitle:['全部','待付款','代发货','待收货','待评价'],
		currentIndex:0,
		pages:[
			[{
			goods_id:12255,
			goods_title:'兰蔻轻透水漾防晒乳',
			goods_img:'https://img.alicdn.com/imgextra/i1/2360209412/O1CN01YX4JPq2JOkJe99Psj_!!2360209412.jpg_430x430q90.jpg',
			goods_xiaoliang:'8943',
			goods_price:'68.99'
		},
		{
		goods_id:12256,
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
		},{
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
		}],
		[
			{
				goods_id:12255,
				goods_title:'兰蔻轻透水漾防晒乳',
				goods_img:'https://img.alicdn.com/imgextra/i4/6000000002624/TB2QYtubk7OyuJjSsplXXXqdpXa_!!0-tbCommonAudio.jpg_180x180q90.jpg_.webp',
				goods_xiaoliang:'8943',
				goods_price:'68.99'
			},
			{
			goods_id:12254,
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
		],
		goodsDetail:null
	},

	handleindex(event){
		this.setData({
			currentIndex:event.currentTarget.dataset.index
		})
	},

	onLoad: function (options) {
		console.log("________________-")
		const that = this
		wx.getStorage({
			key: 'openID',
			success:(res) =>{
				console.log(res)
				that.setData({
					openID:res.data
				})
				console.log(res.data)
				wx.cloud.callFunction({
					name:'query',
					data:{
						openID:that.data.openID,
						collection:'goodsItems',
						status:0,
					},
					success:(res) =>{
						console.log(res)
						that.setData({
							goodsDetail:res.result.data
						})
					}
				})  
				  console.log(res)
				  console.log(this.data.openID)
			}
		  })
	},

	
})