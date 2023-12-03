// import {
//   type Router,
//   type RouteRecordRaw,
//   type RouterOptions,
//   createRouter,
//   createWebHistory
// } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// // . /	当前文件同级目录
// // . . /	当前文件上一级目录
// // @	在引入模块时，可以使用 @ 代替 /src 目录，指相对路径
// import myindex from '@/views/index/myindex.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/index',
//       name: 'index',
//       component: myindex
//       //   component: () => import('../views/index/myindex.vue')
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     }
//   ]
// })

// export default router

// 第二版
import {
  type RouteRecordNormalized,
  type RouteRecordRaw,
  createRouter,
  createWebHistory
} from 'vue-router'

import HomeView from '../views/HomeView.vue'

// 之前使用 webpack 构建项目一直使用动态导入 require.context API 自动化注册组件及路由；
// const views = require.context('../views', true, /\/.*\.vue$/);

// 转移到 vite 之后，开发习惯当然不能变；随即使用的是 import.meta.globEager
const viewsList = import.meta.glob('@/views/**/*.vue', { import: 'default', eager: true })
// the import.meta.globEager() function instead, as this does not lazy load components.
console.log('viewsList:', viewsList)

const dynamicRoutes: Array<RouteRecordRaw> = []
// 遍历文件名字
Object.keys(viewsList).forEach((key) => {
  console.log('viewsList:', key)
  const statIndex = key.indexOf('/', 5)
  const endIndex = key.lastIndexOf('/') + 1
  const endIndexDot = key.lastIndexOf('.')
  //   路径：view之后到画面名之前，都带/
  const pName = key.substring(statIndex, endIndex)
  //   最后的画面名
  const name = key.substring(endIndex, endIndexDot)
  let route: any = {}
  const appName = import.meta.env.VITE_APP_NAME
  //   路径拆分之后再添加到对应的路径上
  //   自动化注册组件及路由
  console.log('appName:', appName, key, name, statIndex, endIndex)
  console.log('pName=', pName, name)
  if (appName && pName && pName !== '/' && name && name !== '404' && name !== 'dashboard') {
    route = {
      name: name,
      path: `${pName}`,
      //   component: () => import(`@/views${pName}${name}.vue`) //懒加载的！
      component: viewsList[key]
    }
    dynamicRoutes.push(route)
  }
  //   else if (appName && pName === '') {
  //     route = {
  //       name: name,
  //       path: `/`,
  //       component: () => import(`@/views/${name}/${name}.vue`) //懒加载的！
  //     }
  //     dynamicRoutes.push(route)
  //   }
})

const basicRoutes: Array<RouteRecordRaw> = [
  {
    name: 'dashboard',
    path: '/childHome',
    component: () => import('@/views/dashboard/index.vue')
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/bsvue/error/404.vue')
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/index',
  //   name: 'index',
  // //   component: myindex
  //   component: () => import('../views/myindex/myindex.vue')
  // },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
]
const routes = dynamicRoutes.concat(basicRoutes)
// RouteRecordRaw 只是一个类型定义，它并不会自动注册路由。
// 要将其注册到 Vue Router 中，还需要使用 createRouter 函数创建路由实例，并将路由记录传递给该实例的 routes 属性：
const router = createRouter({
  //   history: createWebHistory(),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
export default router

// 第一版
// import { createRouter, type Router, type RouteRecordRaw, type RouterOptions } from 'vue-router'

// // progress bar
// // import NProgress from 'nprogress'; // progress bar
// // import { IForm, IFormParamsInfo } from '../components/model/model/data.ts'

// const views = require.context('../views', true, /\/.*\.vue$/)
// const generate: Array<RouteRecordRaw> = []
// // 遍历文件名字
// views.keys().forEach((key: string) => {
//   // console.log('key', key);
//   // 生成对应的路由对象
//   const statIndex = key.indexOf('/')
//   const endIndex = key.indexOf('/', statIndex + 1)
//   const name = key.substring(statIndex + 1, endIndex)
//   // console.log('name', name);
//   let route: any = {}
//   const appName = process.env.VUE_APP_NAME
//   if (appName && name !== '404' && name !== 'dashboard') {
//     route = {
//       name: name,
//       path: `/${name}`,
//       component: () => import(`@/views/${name}/${name}.vue`) //懒加载的！
//     }
//     generate.push(route)
//   }
// })

// const basicRoutes: Array<RouteRecordRaw> = [
//   {
//     name: 'dashboard',
//     path: '/',
//     component: () => import('../views/bsvue/dashboard/index.vue')
//   },
//   // {
//   //   name: 'refresh',
//   //   path: '/refresh',
//   //   component: () => import('@/views/refresh/index.vue')
//   // },
//   {
//     name: 'not-found',
//     path: '/:pathMatch(.*)*',
//     component: () => import('@/views/bsvue/error/index.vue')
//   }
// ]
// export interface IForm {
//   formName: string
//   formCaption: string
//   formPartition: string
//   appName: string
//   dllName: string
//   formPath: string
//   formCallMode: string
// }
// export const initRouter = (
//   options: RouterOptions,
//   formInfo?: IForm,
//   formParamsInfo?: IFormParamsInfo
// ): Router => {
//   options.routes = [...routes]
//   const router = createRouter(options)
//   router.beforeEach(async (to, from, next) => {
//     if (!window.__POWERED_BY_QIANKUN__) {
//       if (process.env.NODE_ENV === 'production') {
//         next(false)
//       } else if (to.name === 'empty' || to.name === 'dashboard') {
//         next()
//       } else {
//         const efFormInfo = require('@baosight/ef').EFFormInfo
//         await efFormInfo.loadFormInfo(to)
//         next()
//       }
//     } else {
//       next()
//     }
//   })

//   return router
// }
// const routes = generate.concat(basicRoutes)
// export default routes
