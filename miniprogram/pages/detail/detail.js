
Page({
	data: {
		goodsId:null,
		goodsItems:null
	},
	onLoad: async function (options) {
		this.setData({
			goodsId:options.id,
		})
		let items = await this.getItems()
		console.log(items)
		this.setData({
			goodsItems:items.data[0]
		})
		console.log(this.data.goodsItems)
		
	},
	getItems() {
		return new Promise((resolve,reject) =>{
			const db = wx.cloud.database()
			db.collection('goodsItems').where({
				goodsId:this.data.goodsId
			}).get().then( (res) =>{ 
				resolve(res)
			})
		})	
	},
	postGoodsId(){
		
		const db = wx.cloud.database()
		db.collection('goodsItems').where({
			goodsId:this.data.goodsId
		}).get().then(res => {console.log(res)
			db.collection('userInfo').add({
				data:{
					count: 1,
					orderStatus:0,
					goodsId:res.data[0].goodsId,
					price:res.data[0].goodsPrice,
					title:res.data[0].goodsTitle,
					imageUrl:res.data[0].imageUrl,
					userGoods:res.data[0]
				}
			})
		})

		wx.showToast({
		  title: '加购成功',
		  icon:'success',
		  duration:1500,
		  mask:true
		})
		
	},
	toBuy() {

		wx.showToast({
		  title: '结算成功',
		  icon: 'success',
		  duration: 3000,
		  mask:true
		});
	
		const db = wx.cloud.database()
		db.collection('goodsItems').where({
			goodsId:this.data.goodsId
		}).get().then(res => {console.log(res)
			db.collection('userInfo').add({
				data:{
					count: 1,
					orderStatus:3,
					goodsId:res.data[0].goodsId,
					price:res.data[0].goodsPrice,
					title:res.data[0].goodsTitle,
					imageUrl:res.data[0].imageUrl,
					userGoods:res.data[0]
				}
			})
		})

	},
})