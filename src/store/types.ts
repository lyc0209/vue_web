import { ILoginState } from "./login/types"
import { IAdminState } from "./admin/types"
import { IMainState } from "./main/types"

export interface IRootState {
  name: string
  age: number
  entireMenu: any[]
}
export interface IRootWithModule {
  login: ILoginState
  admin: IAdminState
  main: IMainState
}

// 交叉类型
export type IStoreType = IRootState & IRootWithModule
