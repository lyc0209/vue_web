import { createApp } from "vue"
import App from "./App.vue"

import "normalize.css"
import "./assets/css/index.css"

import router from "./router"
import store from "./store"
import { setupStore } from "./store"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import mavonEditor from "mavon-editor"
import "mavon-editor/dist/css/index.css"

import { globalRegister } from "@/global/index"

const app = createApp(App)
app.use(ElementPlus)
app.use(mavonEditor)
app.use(store)
// 先进行动态路由注册，再调use router. 否则会出现刷新时动态路由还未注册，导致跳到notfound页面
setupStore()

app.use(router)
app.use(globalRegister)
app.mount("#app")
