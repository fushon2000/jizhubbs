import Vue from 'vue';
import VueRouter from 'vue-router';
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
            name: "blank",
            path: "/blank",
            component: () => import("@/pages/Blank"),
        },
        // 登录页
        {
            name: "login",
            path: "/login",
            component: () => import("@/pages/Login"),
            hidden: true,
            meta: {
                title: "登录"
            }
        },
        // 主页
        {
            name: "home",
            path: "/home",
            redirect: "/home/recommend",
            component: () => import("@/pages/Home"),
            meta: {
                title: "吉猪 - 电子布告栏"
            },
            children: [
                {
                    name: "recommend",
                    path: "recommend",
                    components: {
                        recommend: () => import("@/pages/PublishedShow")
                    },
                    meta: {
                        title: "吉猪 - 电子布告栏"
                    },

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
        // 发布帖子
        {
            name: "publishPosting",
            path: "/publishPosting/:uid",
            component: () => import("@/pages/PublishPosting"),
            meta: {
                title: "写文章"
            },
        },
        // 帖子详细内容
        {
            name: "postingDetail",
            path: "/postingDetail/:pid",
            component: () => import("@/pages/PostingDetail"),
            meta: {
                title: '详情'
            },
        },
        // 搜索
        {
            name: "search",
            path: "/search",
            component: () => import("@/pages/Search"),
            meta: {
                title: "搜索"
            }
        },
        // 学院模块
        {
            name: 'department',
            path: '/department',
            component: () => import('@/pages/Department'),
        },
        // 个人主页 要放到最后一个匹配，因为任何路径都可以匹配/:username，这就导致会进入该路由
        {
            name: "homepage",
            path: "/:username",
            component: () => import("@/pages/Homepage"),
            redirect: "/:username/overview",
            meta: {
                title: store.state.user.userInfo.username
            },
            children: [
                {
                    // 个人主页的概况
                    name: "overview",
                    path: "overview",
                    component: () => import("@/pages/Homepage/Overview"),
                },
                {
                    // 发布的所有帖子
                    name: "repositories",
                    path: "repositories",
                    component: () => import("@/pages/Homepage/Repositories"),
                },
                {
                    // 点过赞的帖子
                    name: "stars",
                    path: "stars",
                    component: () => import("@/pages/Homepage/Stars"),
                },
                {
                    // 收藏的帖子
                    name: "likes",
                    path: "likes",
                    component: () => import("@/pages/Homepage/Likes"),
                },
                {
                    // 我的关注
                    name: "follow",
                    path: "follow",
                    component: () => import("@/pages/Homepage/Follow"),
                },
            ]
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
        // 每次跳转路由都查询store是否存在userInfo，不存在就去调用getUserInfo然后存到store中，防止页面刷新store数据丢失
        else if (!store.state.user.userInfo) {
            store.dispatch("user/getUserInfo", getToken()).then(res => {
                next()
            })
        } else {
            if (to.meta.title) {
                document.title = to.meta.title
            }
            next()
        }
    }
    // 未登录
    else {
        document.title = "登录"
        if (to.path==='/department') {
            next()
        }
        else if (to.name === 'login') {
            next()
        } else {
            next("/login")
        }

    }
})

export default router