//划重点！ 由于微信小程序需要用微信官方请求接口，因此需要用adapter自定义

const options = {

}
//封装fetch并暴露
function fetch (config) {
	uni.showLoading({
		title: '拼命加载中...'
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.url,
			method: config.method,
			data: config.params,
			success: (res) => {
				return resolve(res.data)
			},
			fail: (err) => {
				return reject(err)
			},
			complete: res => {
				uni.hideLoading();
				//wx.hideLoading()
				// TODO:
			}
		})
	})
}


export {
	fetch
}
