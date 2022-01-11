import type { AxiosRequestConfig, AxiosResponse } from "axios"

export interface LycRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface LycRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 集成的接口中扩展interceptor属性
  interceptors?: LycRequestInterceptors<T>
  // 是否显示加载框
  showLoading?: boolean
}
