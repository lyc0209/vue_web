import { IForm } from "@/base-ui/form"

export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "标签名称",
      rules: [],
      placeholder: "请输入标签名称"
    },
    {
      field: "color",
      type: "color-picker",
      label: "标签颜色",
      default: "#18BBB3",
      rules: [],
      placeholder: "请输入标签颜色"
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
