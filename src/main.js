import Vue from 'vue'
import App from './App.vue'
//引入路由器
import router from '@/router'
import VueBus from "vue-bus";
import store from "@/store";
import {Image,Tabs,TabPane,Carousel,CarouselItem,Tree,Message,MessageBox,
    Upload,Dialog,Button,Input,Form,FormItem,Avatar,Popover,Table,TableColumn} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 引入fontawesome
/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from  '@fortawesome/free-regular-svg-icons'
// import {fab} from  '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(fas,far/*,fab*/)
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Image)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Tree)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Avatar)
Vue.use(Popover)
Vue.use(Table)
Vue.use(TableColumn)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.use(VueBus)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
