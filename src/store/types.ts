import { ILoginState } from "./login/types"
import { IAdminState } from "./admin/types"

export interface IRootState {
  name: string
  age: number
  entireMenu: any[]
}
export interface IRootWithModule {
  login: ILoginState
  admin: IAdminState
}

// 交叉类型
export type IStoreType = IRootState & IRootWithModule
