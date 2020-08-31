// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()

	wx.request({
		url: 'https://api.weixin.qq.com/sns/jscode2session',
		data: {
		  appid: 'wx52c63d8e7c4a0908',
		  secret: 'cb1bbf7bad37147a4ec3cf15390a4923',
		  js_code: event.code,
		  grant_type: 'authorization_code'
		},
		method: 'GET',
		success: (res) => {
		  return res
		  
		}
	  })


	
}