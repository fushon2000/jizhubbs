import Vue from 'vue';
import VueRouter from 'vue-router';
import PublishedShow from '@/pages/PublishedShow'
import store from "@/store";
import {getToken, removeToken} from "@/utils/auth";
//使用插件
Vue.use(VueRouter)
//防止重复点击同一路由组件报红
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//配置路由组件
const router = new VueRouter({
    // mode:"history",
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        {
            name: "login",
            path: "/login",
            component: () => import("@/pages/Login"),
            hidden: true,
            meta: {
                title: "登录"
            }
        },
        {
            name: "home",
            path: "/home",
            redirect: "/home/recommend",
            component: () => import("@/pages/Home"),
            children: [
                {
                    name: "recommend",
                    path: "recommend",
                    components: {
                        recommend: () => import("@/pages/PublishedShow")
                    },
                    meta: {
                        title: "吉猪 - 电子布告栏"
                    }
                },
                {
                    name: "latest",
                    path: "latest",
                    components: {
                        latest: () => import("@/pages/PublishedShow")
                    },
                    meta: {
                        title: "吉猪 - 电子布告栏"
                    }
                },
            ],
            meta: {
                title: "吉猪 - 电子布告栏"
            }
        },
        {
            name: "test",
            path: "/test",
            component: () => import("@/pages/Test"),
            hidden: true
        },
        {
            name: "writeArticle",
            path: "/writeArticle/:uid",
            component: () => import("@/pages/WriteArticle"),
            meta: {
                title: "发帖板"
            }
        },

    ],
    // 跳转路由回到顶部，savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
})
router.beforeEach((to, from, next) => {
    // 已登录
    if (getToken()) {
        // 前往login页面则跳转到home页面
        if (to.name === 'login') {
            document.title = "吉猪 - 电子布告栏"
            next("/home")
        }
        // 若store中不存在用户信息，则请求后端
        if (!store.state.user.userInfo) {
            store.dispatch("user/getUserInfo", getToken()).then(res => {})
        }
        if (to.meta.title) {
            document.title = to.meta.title
        }
        next()
    }
    // 未登录
    else {
        document.title = "登录"
        if (to.name === 'login') {
            next()
        } else {
            next("/login")
        }
    }
})
export default router