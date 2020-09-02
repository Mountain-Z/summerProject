
Page({
	data: {
		openId:null,
		goodsId:null,
		goodsItems:null,
	},
	onLoad: async function (options) {
		const openId = wx.getStorageSync('openId')
		this.setData({
			openId,
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
	async postGoodsId(){
		let isGoods = false,
			isGoodsCount = 1,
			_id = null;

		const db = wx.cloud.database()
		
		const result = await this.handleisGoods()

		console.log(result)
		if(result.data.length){
			isGoods=true
			isGoodsCount =result.data[0].count
			_id=result.data[0]._id
		}

		if(isGoods){
			db.collection('userInfo').doc(_id).update({
				data:{
					count:isGoodsCount + 1
				}
			})
		}else{
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
						userGoods:res.data[0],
						isSelect:false
					}
				})
			})
		}
		wx.showToast({
		  title: '加购成功',
		  icon:'success',
		  duration:1500,
		  mask:true
		})
		
	},

	async handleisGoods(){
		return new Promise((resolve,reject) =>{
			const db = wx.cloud.database()
			db.collection('userInfo').where({
				_openid:this.data.openId,
				goodsId:this.data.goodsId,
				orderStatus:0
			}).get({
				success:(res) => {
					resolve(res)
				}
			})
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