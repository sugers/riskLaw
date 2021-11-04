import Vue from 'vue'
import VueRouter from 'vue-router'
import Thestartpage from '../components/Thestartpage.vue'
import soutable from '../components/soutable.vue'
import usertable from '../components/usertable.vue'
import adminlogin from '../components/adminlogin.vue'
import taipeilogin from '../components/taipeilogin.vue'
import audittable from '../components/audittable.vue'
import adminfiedform from '../components/adminfiedform.vue'
import hisupervisor from '../components/hisupervisor.vue'
import hisupervisores from '../components/hisupervisores.vue'
import asingconfirm from '../components/asingconfirm.vue'
import adminfiedlook from '../components/adminfiedlook.vue'
import InsuranceCompany from '../components/InsuranceCompany/InsuranceCompany.vue'
import insuranceUser from '../components/insuranceUser/insuranceUser.vue'
import laywerManage from '../components/laywerManage/laywerManage.vue'
import Financia from '../components/Financia/Financia.vue'
import notics from '../components/notics/notics.vue'
import noticsDetail from '../components/notics/noticsDetail/noticsDetail.vue'
import bulletinBoard from '../components/notics/bulletinBoard/bulletinBoard.vue'
import usermanager from '../components/usermanager/usermanager.vue'
import Statistics from '../components/Statistics/Statistics.vue'
import TrendChart from '../components/TrendChart/TrendChart.vue'
import OverviewTable from '../components/OverviewTable/OverviewTable.vue'
import laywerChart from '../components/laywerStatistics/laywerChart/laywerChart.vue'
import layweroverTable from '../components/laywerStatistics/layweroverTable/layweroverTable.vue'
import laywerWorkload from '../components/laywerStatistics/laywerWorkload/laywerWorkload.vue'
import CasetypeAdmin from '../components/CasetypeAdmin.vue'
// import Layout from '../layout'
import store from '../store/store/index'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
    // 平台登录
    {
        path: '/adminLogin',
        name: 'adminlogin',
        component: adminlogin,
        meta: {
            requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
        }
    },
    // 保险公司人员登录
    {
        path: '/taipeilogin',
        name: 'taipeilogin',
        component: taipeilogin,
        meta: {
            requireAuth: false, // 添加该字段，表示进入这个路由是需要登录的
        }
    },
    // 快速反馈，填写细节信息，上级复审，出单确认，查看
    {
        path: '/usertable/adminfiedform',
        name: 'adminfiedform',
        component: adminfiedform,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '快速反馈'
        },
    },
    {
        path: '/usertable/hisupervisor',
        name: 'hisupervisor',
        component: hisupervisor,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '填写细节信息'
        },
    },
    {
        path: '/usertable/hisupervisores',
        name: 'hisupervisores',
        component: hisupervisores,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '上级复审'
        },
    },
    {
        path: '/usertable/asingconfirm',
        name: 'asingconfirm',
        component: asingconfirm,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: '出单确认'
        },
    },
    {
        path: '/usertable/adminfiedlook',
        name: 'adminfiedlook',
        component: adminfiedlook,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            title: "订单详情"
        },
    },

    {
        path: '/',
        name: 'Thestartpage',
        redirect: soutable,
        component: Thestartpage,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        children: [
            {
                path: '/soutable',
                name: 'soutable',
                component: soutable,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: '/usertable',
                name: 'usertable',
                component: usertable,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: '/audittable',
                name: 'audittable',
                component: audittable,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            //  平台方管理公司
            {
                path: '/InsuranceCompany',
                name: 'InsuranceCompany',
                component: InsuranceCompany,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: '/insuranceUser',
                name: 'insuranceUser',
                component: insuranceUser,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            //律师模块
            {
                path: '/laywerManage',
                name: 'laywerManage',
                component: laywerManage,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            // 财务对账
            {
                path: '/Financia',
                name: 'Financia',
                component: Financia,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            // 公告栏

            {
                path: '/notics',
                name: 'notics',
                component: notics,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            // 案由类型管理
            {
                path: '/CasetypeAdmin',
                name: 'CasetypeAdmin',
                component: CasetypeAdmin,
                meta: {
                    requireAuth: true
                },
            },
            {
                path: '/notics/noticsDetail',
                name: 'noticsDetail',
                component: noticsDetail,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: '/notics/bulletinBoard',
                name: 'bulletinBoard',
                component: bulletinBoard,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },

            // 用户管理

            {
                path: '/usermanager',
                name: 'usermanager',
                component: usermanager,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            // 统计
            {
                path: '/Statistics',
                name: 'Statistics',
                component: Statistics,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: '/TrendChart',
                name: 'TrendChart',
                component: TrendChart,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: '/OverviewTable',
                name: 'OverviewTable',
                component: OverviewTable,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            // 律师统计
            {
                path: '/laywerChart',
                name: 'laywerChart',
                component: laywerChart,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: '/layweroverTable',
                name: 'layweroverTable',
                component: layweroverTable,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            },
            {
                path: '/laywerWorkload',
                name: 'laywerWorkload',
                component: laywerWorkload,
                meta: {
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
            }


        ]
    },

    // {
    // path: '/about',
    // name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    {
        path: '*',
        redirect: '/adminLogin',
    },
]

const router = new VueRouter({
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    store.state.token = localStorage.getItem("access_token");
    // 判断路由是否需要登录权限
    if (to.meta.requireAuth) {

        if (store.state.token) {
            // document.body.scrollTop = 0;

            next();
        } else {
            next({
                path: '/adminLogin'
                //   ,
                // query:{redirect: to.fullPath}

            })
        }
    } else {
        next();
    }
})


export default router
