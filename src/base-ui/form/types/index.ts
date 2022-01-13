type IFormType = "input" | "password" | "select" | "datepicker"

export interface IFormItem {
  field: string
  type: IFormType // 表单类型
  label: string
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
