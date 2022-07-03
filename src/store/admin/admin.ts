import { IRootState } from "@/store/types"
import { Module } from "vuex"
import { IAdminState } from "./types"
import { IDataType } from "@/service/types"
import to from "await-to-js"

import { ElMessage } from "element-plus"

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/admin/admin"

const adminModule: Module<IAdminState, IRootState> = {
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
          for (const item of list) {
            item["categoryName"] = item.category.name
            item["categoryId"] = item.category.id
          }
          commit(`changeArticleList`, list)
          commit(`changeArticleCount`, totalCount)
          break
        case "category":
          commit(`changeCategoryList`, list)
          commit(`changeCategoryCount`, totalCount)
          break
        case "tag":
          commit(`changeTagList`, list)
          commit(`changeTagCount`, totalCount)
          break
      }
    },

    // 删除数据
    async deletePageDataAction({ dispatch }, payload: any) {
      // 获取pageName和id
      // 1.pageName -> /users/
      // 2.id -> /users/id
      const { pageName, id } = payload
      const pageUrl = `/admin/${pageName}/${id}`
      // 调用删除的网络请求
      const [err, result] = await to<IDataType>(deletePageData(pageUrl))
      if (err || result?.code !== 200) {
        ElMessage.error(result?.msg ?? "删除失败")
        return
      }

      ElMessage.success("删除成功")

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
      const pageUrl = `/admin/${pageName}`
      // 创建数据请求
      const [err, result] = await to<IDataType>(createPageData(pageUrl, newData))
      if (err || result?.code !== 200) {
        ElMessage.error("创建失败")
        return Promise.reject(false)
      }

      ElMessage.success("创建成功")

      // 2. 重新请求最新数据
      dispatch("getPageListAction", {
        pageUrl: pageName,
        queryInfo: {
          pageNum: 1,
          pageSize: 10
        }
      })

      return Promise.resolve(true)
    },

    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData } = payload
      const pageUrl = `/admin/${pageName}`
      // 创建数据请求
      //await editPageData(pageUrl, editData)
      const [err, result] = await to<IDataType>(editPageData(pageUrl, editData))
      if (err || result?.code !== 200) {
        ElMessage.error("更新失败")
        return Promise.reject(false)
      }

      ElMessage.success("更新成功")

      // 2. 重新请求最新数据
      dispatch("getPageListAction", {
        pageUrl: pageName,
        queryInfo: {
          pageNum: 1,
          pageSize: 10
        }
      })
      return Promise.resolve(true)
    }
  }
}

export default adminModule
