import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// ts中不能直接使用js，报错：implicitly has an 'any' type.
// 要么替换为ts,要么require
import GlobalComponents from './globals'

// const DB_PASSWORD = process.env.DB_PASSWORD
// declare var require: any
// const GlobalComponents = require('./globals')
// import * as GlobalComponents from './globals'

const app = createApp(App)

app.use(createPinia())
app.use(GlobalComponents)
app.use(router)
// app.use(routers)
// app.use(ElementPlus)
app.use(ElementPlus, {
  //   locale: ug - cn
  //   locale: zhCn
})

app.mount('#app')
