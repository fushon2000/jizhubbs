import request from "@/utils/request";


export function signInByUid(data) {
    return request({
        url: '/user/sign/signInByUid',
        method: 'post',
        data
    })
}
export function signInByPhone(data) {
    return request({
        url: '/user/sign/signInByPhone',
        method: 'post',
        params: data
    })
}
export function sendSignInCaptcha(phone) {
    return request({
        url: '/user/sign/sendSignInCaptcha',
        method: 'get',
        params: {
            phone
        }
    })
}
export function getUserInfo(token) {
    return request({
        url: '/user/getUserInfo',
        method: 'get',
        params: {
            token
        }
    })
}
