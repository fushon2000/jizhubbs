import Vue from 'vue';
import VueRouter from 'vue-router';
import PublishedShow from '@/pages/PublishedShow'
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
export default new VueRouter({
    // mode:"history",
    routes: [
        {
            name: "home",
            path: "/home",
            component: () => import("@/pages/Home"),
            children: [
                {
                    name: "recommend",
                    path: "recommend",
                    components: {
                        recommend: () => import("@/pages/PublishedShow")
                    },

                },
                {
                    name: "latest",
                    path: "latest",
                    components: {
                        latest:  () => import("@/pages/PublishedShow")
                    },
                }
            ],
        },
        {
            name:"test",
            path:"/test",
            component:()=>import("@/pages/Test"),
            hidden: true
        }

    ]
})