import Vue from 'vue'
import App from './App.vue'
//引入路由器
import router from '@/router'
import VueBus from "vue-bus";
import store from "@/store";
import {
    Image, Tabs, TabPane, Carousel, CarouselItem, Tree, Message, MessageBox,
    Upload, Dialog, Button, Input, Form, FormItem, Avatar, Popover, Table, TableColumn,
    Switch, Select, Tooltip, RadioButton, RadioGroup, Option, Dropdown,
    DropdownMenu, DropdownItem, Pagination, Radio, Row, Col, Card, Popconfirm
} from 'element-ui'
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
Vue.use(Switch)
Vue.use(Select)
Vue.use(Tooltip)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Option)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Pagination)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Popconfirm)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.use(VueBus)
// froala富文本编辑器
//Import Froala Editor
import 'froala-editor/js/plugins.pkgd.min.js';
//Import third party plugins
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/image_tui.min';
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/languages/zh_cn';

import VueFroala from 'vue-froala-wysiwyg';
Vue.use(VueFroala)



new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
