// components/order-item/order-item.js
Component({
	properties: {
		index:{
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

	}
})
