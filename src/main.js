import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import formatRMB from 'format-rmb';
import ViewUI from 'view-design';
import * as echarts from 'echarts';
import 'view-design/dist/styles/iview.css';
import VueCurrencyFilter from 'vue-currency-filter'
// 引入公共样式以及js
import '../static/css/common.css';
import getIp from '../static/js/common.js';
Vue.prototype.$ip = getIp;
// 引入拦截器
import './api/axios'



import {
    Button,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Drawer,
    Avatar,
    Row,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Scrollbar,
    Table,
    TableColumn,
    Form,
    FormItem,
    Input,
    Checkbox,
    RadioGroup,
    RadioButton,
    Pagination,
    Dialog,
    Steps,
    Step,
    Image,
    Upload,
    MessageBox,
    Radio,
    Loading,
    Message,
    Select,
    Option,
    Tabs,
    TabPane,
    Popover,
    Carousel,
    CarouselItem,
    DatePicker,
    Switch,
    Tooltip,
    Card,
    Tag,
    Backtop,
    Notification,
    Progress,
} from 'element-ui'
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Drawer)
Vue.use(Avatar)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Scrollbar)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Image)
Vue.use(Upload)
Vue.use(Loading)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Popover)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Backtop)
Vue.use(Progress)
Vue.use(ViewUI);

Vue.use(VueCurrencyFilter,{
    symbol: '',
    thousandsSeparator: ',',
    fractionCount: 2,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: false,
    avoidEmptyDecimals: '00',
})

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.formatRMB = formatRMB;
Vue.prototype.$echarts = echarts;

Vue.prototype.$axios = axios

Vue.http = Vue.prototype.$http = axios

Vue.config.productionTip = false

// Vue.directive('focus', {
//     inserted: function (el) {
//         el.focus();
//     }
// })

router.beforeEach((to,from,next)=>{
    if(to.meta.title){
        document.title = to.meta.title;
    }
    next();
})

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
