//划重点！ 由于微信小程序需要用微信官方请求接口，因此需要用adapter自定义
//`adapter` 允许自定义处理请求，以使测试更轻松,返回一个 promise 并应用一个有效的响应
Axios.defaults.adapter = function (config) {
// let baseURL = process.env.BASE_API
// 发交易之前显示加载中
	wx.showLoading({
		title: '拼命加载中...'
	})
	return new Promise((resolve, reject) => {
		wx.request({
			url: config.url,
			method: config.method,
			data: config.params,
			success: (res) => {
				return resolve(res)
			},
			fail: (err) => {
				return reject(err)
			},
			complete: res => {
				//wx.hideLoading()
				// TODO:
			}
		})
	})
}


//封装fetch并暴露
function fetch (options) {
	return new Promise((resolve, reject) => {
		Axios(options)
			.then(response => {
				wx.hideLoading();
				resolve(response.data)
			})
			.catch(error => {
				wx.showToast({
					title: '诶呀,好疼',
					icon: 'none',
					duration: 2000
				})
				reject(error)
			})
	})
}


export {
	Axios,
	fetch
}

// export function requestMock(config) {
//   //创建axios的实例
//   const Instance2= axios.create({
//     baseURL:'/mock',
//     timeOut:5000
//   })
//
//   //创建拦截器
//   Instance2.interceptors.request.use(config =>{
//     return config
//   },err =>{
//     console.log(err);
//   })
//
//   //获取响应体中的data部分
//   Instance2.interceptors.response.use(res =>{
//     return res.data
//   },err =>{
//     console.log(err);
//   })
//
//   //返回请求结果
//   return Instance2(config)
// }
