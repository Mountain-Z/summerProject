// components/order-item/order-item.js
Component({
	properties: {
		goodsId:{
			type:Number
		},
		index:{
			type:Number
		},
		currentIndex:{
			type:Number,
			value:0
		},
		detail:{
			type:Object
		}
	},
	data: {
		btnTitle:[
			["申请开票","查看物流",'确认收货'],
			["修改地址","帮我付","付款"],
			["修改地址","帮我付","付款"],
			["申请开票","查看物流","确认收货"],
			["卖了换钱","查看物流","评价"]
		]
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleIndex(){
			console.log(this.properties.goodsId)
			//将点击订单的index值传送给详情页
			wx.navigateTo({
			  url: '../../pages/detail/detail?id='+ this.properties.detail.goodsId,
			})
		}
	}
})
