import {fetch} from './serversWechart.js'

//demo接口
export function getDemo(url) {
    return fetch({
        url,
        method:'get'
    })
}
//自定义请求接口
export function sendCustomReq(url,method = 'get',baseURL = '') {
	return fetch({
		url,
		method,
		baseURL
	})
}
