import { ILoginState } from "./login/types"

export interface IRootState {
  name: string
  age: number
  entireMenu: any[]
}
export interface IRootWithModule {
  login: ILoginState
}

// 交叉类型
export type IStoreType = IRootState & IRootWithModule
