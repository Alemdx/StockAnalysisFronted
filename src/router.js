import Vue from 'vue'
import Router from 'vue-router'
import router from './router';

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        //Login
        {
          name: 'Login',
          path: '/login',
          component: () => import('@/views/dashboard/pages/Login'),
        },
        //Register
        {
          name: 'Register',
          path: '/register',
          component: () => import('@/views/dashboard/pages/Register'),
        },
        // Dashboard
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Lab',
          path: '/lab',
          component: () => import('@/views/dashboard/component/Lab'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Doc',
          path: 'components/doc',
          component: () => import('@/views/dashboard/component/Doc'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: 'tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: '行情指数',
          path: 'maps/kindex',
          component: () => import('@/views/dashboard/maps/Kindex'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
      ],
    },
  ],
})


// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token');
//   if (to.path != '/login' && !token&&to.path != '/register') {
//     alert("请先登录")
//     next({
//       path: '/login'
//     })
//   } else {
//     if (to.path == '/login' && token) {
//       //已经登录 不做操作 也可以跳转向其他的页面
//       next()
//     } else {     
//       next()
//     }
//   }
// })
