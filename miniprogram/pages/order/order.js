
// pages/order/order.js
const app = getApp()
Page({
	data: {
		openID:null,
		subTitle:['全部','待付款','代发货','待收货','待评价'],
		currentIndex:0,
		Pages:null,
	},

	handleindex(event){
		this.setData({
			currentIndex:event.currentTarget.dataset.index
		})
	},

	onLoad: async function (options) {

		const goodsItems = await this.getItems()
		console.log(goodsItems)

		const goodsReadyPay = goodsItems.filter((res) => {
			return res.orderStatus == 1
		})

		const goodsReadyPost = goodsItems.filter((res) => {
			return res.orderStatus == 2
		})

		let goodsReadyGet = goodsItems.filter((res) => {
			return res.orderStatus == 3
		})
	
		const goodsComment = goodsItems.filter((res) => {
			return res.orderStatus == 4
		})

		const Pages = [
			goodsItems,
			goodsReadyPay,
			goodsReadyPost,
			goodsReadyGet,
			goodsComment
		]

		console.log(Pages)
		
		this.setData({
			Pages
		})

		console.log(goodsComment)
	},

	getItems(){
		return new Promise((resolve,reject) =>{
			
			wx.getStorage({
				key: 'openId',
				success:(res) =>{
					console.log(res)
					this.setData({
						openID:res.data
					})
					console.log(res.data)
					wx.cloud.callFunction({
						name:'query',
						data:{
							collection:'userInfo',
							openID:this.data.openID,
						},
						success:(res) =>{
							resolve(res.result.data)
						}
					})  
					  console.log(res)
					  console.log(this.data.openID)
				}
			  })
		})
	},

})