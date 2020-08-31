// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()

	let collect = event.collection
	try{
		return await db.collection(collect).where({
			_openid:event.openId,
			goodsId:event.goodsId
		}).update({
			data:{
				count:event.count,
				orderStatus:event.status
			}
		})
	}catch(err){
		console.log(err)
	}
}