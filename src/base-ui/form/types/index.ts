type IFormType = "input" | "password" | "select" | "datepicker" | "switch"

export interface IFormItem {
  field: string
  type: IFormType // 表单类型
  label: string
  default?: any //默认值
  rules?: any[]
  placeholder?: any
  options?: any[] // select选项
  // 针对特殊的属性
  otherOptions?: any
  // 控制item是否隐藏
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
