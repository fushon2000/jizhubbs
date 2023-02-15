import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import router from "@/router";
import store from "@/store";
import {getToken, removeToken, setToken} from "@/utils/auth";
import Cookies from "js-cookie";

// create an axios instance
const service = axios.create({
    baseURL: '/api',
    timeout: 60000 // request timeout 异步请求60秒没数据返回报超时错误
})

// request interceptor
service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['token'] = getToken()
        }
        // do something before request is sent
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        // 508: Illegal token; 512: Other clients logged in; 514: Token expired;
        if (res.code === 508 || res.code === 512 || res.code === 514) {
            // to re-login
            // You have been logged out, you can cancel to stay on this page, or log in again
            MessageBox.confirm('您已注销，您可以取消以保留此页面，或再次登录', '登录已超时', {
                confirmButtonText: '重新登陆',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 关闭其他MessageBox弹框，不然多次请求被拒会出现重复弹框
                MessageBox.close()
                store.dispatch('user/removeToken').then(() => {
                    location.reload()
                })
            }).catch(() => {
                // 关闭其他MessageBox弹框，不然多次请求被拒会出现重复弹框
                MessageBox.close()
            })
            return
        }
        // if the custom code is not 200, it is judged as an error.
        if (res.code !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        }
        if (response.headers.token) {
            // 刷新token
            removeToken()
            setToken(response.headers.token)
            // console.log(getToken())
        }
        return res
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service

