import { Module } from "vuex"

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login"
import { IAcount } from "@/service/login/types"
import localCahe from "@/utils/cache"
import { mapMenusToRoutes, mapMenuToPermissions } from "@/utils/map-menus"
import { ILoginState } from "./types"
import { IRootState } from "../types"
import router from "@/router"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: string) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, menus) {
      state.userMenus = menus

      // // userMenu -> routes
      // const routes = mapMenusToRoutes(menus)

      // // 将routes => router.main.children
      // routes.forEach((route) => {
      //   router.addRoute("admin", route)
      // })

      // // 获取按钮权限
      // const permissions = mapMenuToPermissions(menus)
      // state.permissions = permissions
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
      const userInfoResult = await requestUserInfoById()
      const userInfo = userInfoResult.data
      commit("changeUserInfo", userInfo)
      localCahe.setCache("userInfo", userInfo)

      // // 请求用户菜单
      // const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      // const userMenus = userMenusResult.data
      // commit("changeUserMenus", userMenus)
      // localCahe.setCache("userMenus", userMenus)

      // 跳到首页
      router.push("/admin")
    },
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log("执行phoneLoginAction", payload)
    // }
    loadLocalLogin({ commit, dispatch }) {
      const token = localCahe.getCache("token")
      if (token) {
        commit("changeToken", token)
        // 加载本地token时也请求role、department
        // dispatch("getInitialDataAction", null, { root: true })
      }
      const userInfo = localCahe.getCache("userInfo")
      if (userInfo) {
        commit("changeUserInfo", userInfo)
      }
      const userMenus = localCahe.getCache("userMenus")
      if (token) {
        commit("changeUserMenus", userMenus)
      }
    }
  },
  getters: {}
}

export default loginModule
