import { Module } from "vuex"

import { IDataType } from "@/service/types"
import { IMainState } from "./types"
import { IRootState } from "../types"
import to from "await-to-js"

import { getIndexInfoApi, getArticleListApi } from "@/service/main/main"

const mainModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      statisticInfo: {},
      articleList: [],
      articleCount: 0
    }
  },
  mutations: {
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeStatisticInfo(state, statisticInfo: any) {
      state.statisticInfo = statisticInfo
    },
    changeArticleList(state, articleList) {
      state.articleList = articleList
    },
    changeArticleCount(state, count) {
      state.articleCount = count
    }
  },
  actions: {
    async getIndexInfoAction({ commit }) {
      const [err, result] = await to<IDataType>(getIndexInfoApi())
      if (err || result?.code !== 200) {
        return Promise.reject(result?.msg ?? "获取失败")
      }
      const { user, statisticInfo } = result.data
      commit(`changeUserInfo`, user)
      commit(`changeStatisticInfo`, statisticInfo)

      return Promise.resolve(true)
    },

    async getArticleListAction({ commit }, payload: any) {
      const [err, result] = await to<IDataType>(getArticleListApi(payload))
      if (err || result?.code !== 200) {
        return Promise.reject(result?.msg ?? "获取失败")
      }
      commit(`changeArticleList`, result.data.list)
      commit(`changeArticleCount`, result.data.totalCount)
    }
  },
  getters: {
    getArticleList(state) {
      return state.articleList
    }
  }
}

export default mainModule
