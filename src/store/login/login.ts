import { Module } from "vuex"

import {
  accountLoginRequest,
  requestUserInfo,
  requestUserMenus,
  requestAdminPermission
} from "@/service/login/login"
import { IAcount } from "@/service/login/types"
import localCahe from "@/utils/cache"
import { mapMenusToRoutes } from "@/utils/map-menus"
import { ILoginState } from "./types"
import { IRootState } from "../types"
import router from "@/router"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      adminInfo: {},
      adminMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeAdminInfo(state, userInfo: string) {
      state.adminInfo = userInfo
    },
    changeAdminMenus(state, menus) {
      state.adminMenus = menus

      // userMenu -> routes
      const routes = mapMenusToRoutes(menus)

      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute("admin", route)
      })
    },
    changeAdminPermissions(state, permissions) {
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAcount) {
      // 登录逻辑
      const token = await accountLoginRequest(payload)
      commit("changeToken", token)
      localCahe.setCache("token", token)

      // 发送初始化请求
      // 调根store的action (否则会调当前action)
      // dispatch("getInitialDataAction", null, { root: true })

      // 请求用户信息
      const userInfoResult = await requestUserInfo()
      const userInfo = userInfoResult.data
      commit("changeAdminInfo", userInfo)
      localCahe.setCache("adminInfo", userInfo)

      // 请求用户菜单
      const userMenusResult = await requestUserMenus()
      const userMenus = userMenusResult.data
      commit("changeAdminMenus", userMenus)
      localCahe.setCache("adminMenus", userMenus)

      const adminPermissionResult = await requestAdminPermission()
      const adminPermissions = adminPermissionResult.data
      commit("changeAdminPermissions", adminPermissions)
      localCahe.setCache("adminPermissions", adminPermissions)

      // 跳到首页
      router.push("/admin")
    },
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log("执行phoneLoginAction", payload)
    // }
    loadLocalLogin({ commit }) {
      const token = localCahe.getCache("token")
      if (token) {
        commit("changeToken", token)
        // 加载本地token时也请求role、department
        // dispatch("getInitialDataAction", null, { root: true })
      }
      const userInfo = localCahe.getCache("adminInfo")
      if (userInfo) {
        commit("changeAdminInfo", userInfo)
      }
      const userMenus = localCahe.getCache("adminMenus")
      if (userMenus) {
        commit("changeAdminMenus", userMenus)
      }
      const adminPermissons = localCahe.getCache("adminPermissions")
      if (adminPermissons) {
        commit("changeAdminPermissions", adminPermissons)
      }
    }
  },
  getters: {}
}

export default loginModule
