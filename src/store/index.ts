import { createStore, Store, useStore as useVuexStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
import { IRootState, IStoreType } from "./types"
import login from "./login/login"
import admin from "./admin/admin"

import { getPageListData } from "@/service/admin/admin"

const store = createStore<IRootState>({
  state() {
    return {
      name: "lyc",
      age: 11,
      entireMenu: []
    }
  },
  mutations: {
    changeName(state) {
      console.log(state)
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    // 查询完整菜单，给角色分配菜单用
    // async getInitialDataAction({ commit }) {
    //   // 1. 请求菜单数据
    //   const menuResult = await getPageListData("/menu/list", {})
    //   // 2. 保存数据
    //   commit("changeEntireMenu", menuResult.data.list)
    // }
  },
  modules: {
    login,
    admin
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
})

// vuex 浏览器一刷新，数据就消失
export function setupStore() {
  store.dispatch("login/loadLocalLogin")
  // store.dispatch("getInitialDataAction")
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
