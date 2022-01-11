import LycRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"
import { LycRequestInterceptors } from "./request/types"

import localCahe from "@/utils/cache"

const interceptors: LycRequestInterceptors = {
  requestInterceptor: (config) => {
    const token = localCahe.getCache("token")
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }

    return config
  },
  requestInterceptorCatch: (err) => {
    return err
  },
  responseInterceptor: (res) => {
    return res
  },
  responseInterceptorCatch: (err) => {
    return err
  }
}

const lycRequest = new LycRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors
})
// const lycRequest2 = new LycRequest()

export default lycRequest
