const title = "分类列表"

const propList = [
  {
    prop: "name",
    label: "名称",
    minWidth: "100"
  },
  {
    prop: "createTime",
    label: "创建时间",
    minWidth: "100",
    slotName: "createTime"
  },
  {
    prop: "updateTime",
    label: "更新时间",
    minWidth: "100",
    slotName: "updateTime"
  },
  {
    label: "操作",
    minWidth: "80",
    slotName: "handler"
  }
]

const showIndexColumn = true
const showSelectColumn = true

export const contentTableConfig = {
  title,
  propList,
  showIndexColumn,
  showSelectColumn
}
