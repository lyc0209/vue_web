import { Module } from "vuex"

import { IDataType } from "@/service/types"
import { IMainState } from "./types"
import { IRootState } from "../types"
import to from "await-to-js"

import { getIndexInfoApi, getArticleListApi, getArticleDetailActionApi } from "@/service/main/main"

const mainModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      statisticInfo: {},
      articleList: [],
      articleCount: 0,
      articleDetail: {}
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
    },
    changeArticleDetail(state, detail) {
      state.articleDetail = detail
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
      return Promise.resolve(true)
    },

    async getArticleDetailAction({ commit }, payload: any) {
      const [err, result] = await to<IDataType>(getArticleDetailActionApi(payload))
      if (err || result?.code !== 200) {
        return Promise.reject(result?.msg ?? "获取失败")
      }
      commit(`changeArticleDetail`, result.data)
      return Promise.resolve(true)
    }
  },
  getters: {
    getArticleList(state) {
      return state.articleList
    },
    getArticleDetail(state) {
      return state.articleDetail
    },
    getUserInfo(state) {
      return state.userInfo
    },
    getStatisticInfo(state) {
      return state.statisticInfo
    }
  }
}

export default mainModule
