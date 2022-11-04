import {fetch} from './serves'

//demo接口
export function getDemo(url) {
    return fetch({
        url,
        method:'get'
    })
}
