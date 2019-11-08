import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Register from '@/pages/auth/Register'
import Login from '@/pages/auth/Login'
import ChangePwd from '@/pages/auth/ChangePwd'
import ProjectList from '@/pages/project/ProjectList'
import ProjectDetail from '@/pages/project/ProjectDetail'
//import DebugTalk from '@/pages/httprunner/DebugTalk'
import DebugTalk from '@/pages/pycode/RecordPycode'
import RecordApi from '@/pages/fastrunner/api/RecordApi'
import AutoTest from '@/pages/fastrunner/case/AutoTest'
import GlobalEnv from '@/pages/variables/GlobalEnv'
import ReportList from '@/pages/reports/ReportList'
import RecordConfig from '@/pages/fastrunner/config/RecordConfig'
import Tasks from '@/pages/task/Tasks'
import HostAddress from '@/pages/variables/HostAddress'

Vue.use(Router);

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/fastrunner/register',
            name: 'Register',
            component: Register,
            meta: {
                title: '用户注册'
            }
        }, 
        {
            path: '/fastrunner/login',
            name: 'Login',
            component: Login,
            meta: {
                title: '用户登录'
            }
        }, 
        {
            path: '/fastrunner/changepwd',
            name: 'ChangePwd',
            component: ChangePwd,
            meta: {
                title: '修改密码',
                requireAuth: true
            }
        }, 
        {

            path: '/fastrunner',
            name: 'Index',
            component: Home,
            menuShow: true,
            iconCls: 'iconfont icon-home', // 图标样式class
            meta: {
                title: '首页',
                requireAuth: true
            },
            children: [
                {
                    name: 'ProjectList',
                    path: 'project_list',
                    component: ProjectList,
                    menuShow: true,
                    iconCls: 'iconfont icon-home', // 图标样式class
                    meta: {
                        title: '项目列表',
                        requireAuth: true,
                    }
                },
                {
                    name: 'ProjectDetail',
                    path: 'project/:id/dashbord',
                    component: ProjectDetail,
                    menuShow: true,
                    iconCls: 'iconfont icon-home', // 图标样式class
                    meta: {
                        title: '项目预览',
                        requireAuth: true,
                    }

                },
                {
                    name: 'DebugTalk',
                    path: 'debugtalk/:id',
                    component: DebugTalk,
                    menuShow: true,
                    iconCls: 'iconfont icon-home', // 图标样式class
                    meta: {
                        title: '编辑驱动',
                        requireAuth: true,
                    }

                },
                {
                    name: 'RecordApi',
                    path: 'api_record/:id',
                    component: RecordApi,
                    menuShow: true,
                    iconCls: 'iconfont icon-home', // 图标样式class
                    meta: {
                        title: '接口模板',
                        requireAuth: true
                    }

                },
                {
                    name: 'AutoTest',
                    path: 'auto_test/:id',
                    component: AutoTest,
                    menuShow: true,
                    iconCls: 'iconfont icon-home', // 图标样式class
                    meta: {
                        title: '自动化测试',
                        requireAuth: true
                    }

                },
                {
                    name: 'RecordConfig',
                    path: 'record_config/:id',
                    component: RecordConfig,
                    menuShow: true,
                    iconCls: 'iconfont icon-home', // 图标样式class
                    meta: {
                        title: '配置管理',
                        requireAuth: true
                    }

                },
                {
                    name: 'GlobalEnv',
                    path: 'global_env/:id',
                    component: GlobalEnv,
                    menuShow: true,
                    iconCls: 'iconfont icon-home', // 图标样式class
                    meta: {
                        title: '全局变量',
                        requireAuth: true
                    }

                },
                {
                    name: 'Reports',
                    path: 'reports/:id',
                    component: ReportList,
                    menuShow: true,
                    iconCls: 'iconfont icon-home', // 图标样式class
                    meta: {
                        title: '历史报告',
                        requireAuth: true
                    }

                },
                {
                    name: 'Task',
                    path: 'tasks/:id',
                    component: Tasks,
                    menuShow: true,
                    iconCls: 'iconfont icon-home', // 图标样式class
                    meta: {
                        title: '定时任务',
                        requireAuth: true
                    }

                },
                {
                    name: 'HostIP',
                    path: 'host_ip/:id',
                    component: HostAddress,
                    menuShow: true,
                    iconCls: 'iconfont icon-home', // 图标样式class
                    meta: {
                        title: 'HOST配置',
                        requireAuth: true
                    }

                },
            ]
        },
        {
            path:'*',
            redirect: '/fastrunner',
            component: Login,
            meta: {
                title: '用户登录'
            }
        }

    ]
})

