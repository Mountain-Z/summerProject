// pages/detail/detail.js
Page({
	data: {
	},

		cd1: function () {
			wx.showActionSheet({
				itemList: ['A', 'B', 'C'],
				// success (res) {
				// 	console.log(res.tapIndex)
				// },
				// fail (res) {
				// 	console.log(res.errMsg)
				// }
			})
		},
		cd2: function () {
			wx.showActionSheet({
				itemList: ['A', 'B', 'C'],
				// success (res) {
				// 	console.log(res.tapIndex)
				// },
				// fail (res) {
				// 	console.log(res.errMsg)
				// }
			})
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
			console.log(options.id)
		},
	})