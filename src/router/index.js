import Vue from 'vue'
import VueRouter from 'vue-router'
import ClassView from "../views/ClassView.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () =>
            import('../views/Home.vue'),
        redirect: to => {
            const login = localStorage.getItem('login');
            const userInfo = JSON.parse(localStorage.getItem('userinfo'));
            if (login && userInfo && userInfo.role === 'teacher') {
                console.log('teacher');
                return '/experimentalPerformance';
            } else if (login && userInfo && userInfo.role === 'student') {
                return '/updateInfo';
            } else if (login && userInfo && userInfo.role === 'parent') {
                return '/updateInfo';
            } else if (login && userInfo && userInfo.role === 'admin') {
                return '/updateInfo';
            }else {
                return '/login';
            }
        },
        children: [
            {
                path: '/home',
                name: "Home",
                component: ClassView,
            },
            {
                path: '/test',
                name: 'Test',
                component: () =>
                    import('../views/Test.vue')
            },
            {
                path: '/groupView',
                name: 'GroupView',
                component: () =>
                    import('../views/GroupView.vue')
            },
            {
                path: '/studentView',
                name: 'StudentView',
                component: () =>
                    import('../views/StudentView.vue'),
                meta: {
                    noCache: true // 禁用缓存的标记
                },
            },
            {
                path: '/updateInfo',
                name: 'UpdateInfo',
                component: () =>
                    import('../views/UpdateInfo.vue')
            },
            {
                path: '/psychologicalView',
                name: 'PsychologicalView',
                component: () =>
                    import('../views/PsychologicalView.vue')
            },
            {
                path: '/experimentalPerformance',
                name: 'ExperimentalPerformance',
                component: () =>
                    import('../views/ExperimentalPerformance.vue')
            },
            {
                path: '/teachingQuality',
                name: 'TeachingQuality',
                component: () =>
                    import('../views/TeachingQuality.vue')
            },
            {
                path: '/answeringQuestion',
                name: 'AnsweringQuestion',
                component: () =>
                    import('../views/AnsweringQuestion.vue'),
                redirect: '/answeringQuestion/answeringQuestionBody',
                children: [{
                    path: '/answeringQuestion/answeringQuestionBody',
                    name: 'AnsweringQuestionBody',
                    component: () =>
                        import('../components/AnsweringQuestionBody.vue')

                }]
            },
            {
                path: '/informationManagement',
                name: 'InformationManagement',
                component: () =>
                    import('../views/InformationManagement.vue'),
                redirect: '/informationManagement/classInfo',
                children: [
                    {
                        path: '/informationManagement/classInfo',
                        name: 'ClassInfo',
                        component: () =>
                            import('../components/ClassInfo.vue'),
                    },
                    {
                        path: '/informationManagement/classInfo/classAdd',
                        name: 'ClassAdd',
                        component: () =>
                            import('../components/ClassAdd.vue'),
                    },
                    {
                        path: '/informationManagement/studentInfo',
                        name: 'StudentInfo',
                        component: () =>
                            import('../components/StudentInfo.vue'),
                        redirect: '/informationManagement/studentInfo/studentAll',
                        children: [
                            {
                                path: '/informationManagement/studentInfo/studentAdd',
                                name: 'StudentAdd',
                                component: () =>
                                    import('../components/StudentAdd.vue'),
                            },
                            {
                                path: '/informationManagement/studentInfo/studentAlter',
                                name: 'StudentAlter',
                                component: () =>
                                    import('../components/StudentAlter.vue'),
                            },
                            {
                                path: '/informationManagement/studentInfo/studentAll',
                                name: 'StudentAll',
                                component: () =>
                                    import('../components/StudentAll.vue'),
                            }
                        ],
                    },
                    {
                        path: '/informationManagement/createClass',
                        name: 'CreateClass',
                        component: () =>
                            import('../components/CreateClass.vue')
                    },
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import('../views/Login.vue'),
        redirect: '/login/gologin',
        children: [
            {
                path: '/login/gologin',
                name: 'GoLogin',
                component: () =>
                    import('../views/Login/GoLogin.vue')
            },
            {
                path: '/login/tologin',
                name: 'ToLogin',
                component: () =>
                    import('../views/Login/ToLogin.vue')
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',  //把Router的mode修改为history模式,VueRouter默认的模式为HASH模式
    base: process.env.BASE_URL,
    routes
})

export default router