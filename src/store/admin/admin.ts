import { IRootState } from "@/store/types"
import { Module } from "vuex"
import { ISystemState } from "./types"

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/admin/admin"

const adminModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      articleList: [],
      articleCount: 0,
      categoryList: [],
      categoryCount: 0,
      tagList: [],
      tagCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeArticleList(state, articleList: any[]) {
      state.articleList = articleList
    },
    changeArticleCount(state, articleCount: number) {
      state.articleCount = articleCount
    },
    changeCategoryList(state, categoryList: any[]) {
      state.categoryList = categoryList
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount
    },
    changeTagList(state, tagList: any[]) {
      state.tagList = tagList
    },
    changeTagCount(state, tagCount: number) {
      state.tagCount = tagCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case "user":
            return state.userList
          case "article":
            return state.articleList
          case "category":
            return state.categoryList
          case "tag":
            return state.tagList
        }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case "user":
            return state.userCount
          case "article":
            return state.articleCount
          case "category":
            return state.categoryCount
          case "tag":
            return state.tagCount
        }
      }
    }
  },
  actions: {
    // 获取用户列表
    async getPageListAction({ commit }, payload: any) {
      // 获取pageUrl
      const pageName = payload.pageUrl
      const pageUrl = `/admin/${pageName}/list`

      // 1.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 2.数据存储到state中
      const { list, totalCount } = pageResult.data
      switch (pageName) {
        case "user":
          commit(`changeUserList`, list)
          commit(`changeUserCount`, totalCount)
          break
        case "article":
          commit(`changeArticleList`, list)
          commit(`changeArticleCount`, totalCount)
          break
        case "category":
          commit(`changeCategoryList`, list)
          commit(`changeCategoryCount`, totalCount)
          break
        case "tag":
          commit(`changeTagList`, list)
          commit(`changeTagount`, totalCount)
          break
      }
    },

    // 删除数据
    async deletePageDataAction({ dispatch }, payload: any) {
      // 获取pageName和id
      // 1.pageName -> /users/
      // 2.id -> /users/id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 调用删除的网络请求
      await deletePageData(pageUrl)

      // 2. 重新请求最新数据
      dispatch("getPageListAction", {
        pageUrl: pageName,
        queryInfo: {
          pageNum: 1,
          pageSize: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      // 创建数据请求
      await createPageData(pageUrl, newData)

      // 2. 重新请求最新数据
      dispatch("getPageListAction", {
        pageUrl: pageName,
        queryInfo: {
          pageNum: 1,
          pageSize: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 创建数据请求
      await editPageData(pageUrl, editData)

      // 2. 重新请求最新数据
      dispatch("getPageListAction", {
        pageUrl: pageName,
        queryInfo: {
          pageNum: 1,
          pageSize: 10
        }
      })
    }
  }
}

export default adminModule
