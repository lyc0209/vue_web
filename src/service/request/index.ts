import axios from "axios"
import type { AxiosInstance } from "axios"
import { LycRequestInterceptors, LycRequestConfig } from "./types"
import { ElLoading } from "element-plus"
// import {  } from "element-plus/lib/el-loading/src/loading.type"
import { IDataType } from "../types"

// 默认是否显示加载框
const DEFAULT_LOADING = false

class LycRequest {
  private instance: AxiosInstance
  private interceptors?: LycRequestInterceptors
  private loading?: any

  public showLoading: boolean

  // 当有多个baseurl时，可以通过这种方式new出不同实例
  constructor(config: LycRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 从config中去除的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    // 注意！后添加的先执行
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0, 0, 0, 0.5)"
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        if (res.data.code == "-1001") {
          console.log("response error")
        } else {
          return res.data
        }
      },
      (err) => {
        this.loading?.close()
        switch (err.response.status) {
          case "404":
            console.log("404 error")
            break
          default:
            console.log("other error")
        }
        return err
      }
    )
  }

  request<T = IDataType>(config: LycRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 每个请求如果有拦截器，也处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === !DEFAULT_LOADING) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            config = config.interceptors.responseInterceptor(res)
          }
          // 将showLoading设置为true, 不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = IDataType>(config: LycRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T = IDataType>(config: LycRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T = IDataType>(config: LycRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T = IDataType>(config: LycRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }

  put<T = IDataType>(config: LycRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" })
  }
}

export default LycRequest
