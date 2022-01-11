import lycRequest from "../index"
import { IAcount } from "./types"
import { IDataType } from "../types"

enum LoginApi {
  AccountLogin = "/admin/login",
  LoginUserInfo = "/admin/user",
  UserMenus = "/role/"
}

export function accountLoginRequest(account: IAcount) {
  return lycRequest.post<IDataType>({
    url: LoginApi.AccountLogin,
    data: account
  })
}

export function requestUserInfoById() {
  return lycRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo
  })
}

// 请求menu
export function requestUserMenusByRoleId(id: number) {
  return lycRequest.get<IDataType>({
    url: LoginApi.UserMenus + id + "/menu"
  })
}
