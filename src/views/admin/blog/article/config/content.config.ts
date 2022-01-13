const title = "博客列表"

const propList = [
  {
    prop: "title",
    label: "标题",
    minWidth: "100"
  },
  {
    prop: "category",
    label: "分类",
    minWidth: "100"
  },
  {
    prop: "isTop",
    label: "置顶",
    minWidth: "40",
    slotName: "isTopSwitch"
  },
  {
    prop: "isRecommend",
    label: "推荐",
    minWidth: "40",
    slotName: "isRecommendswitch"
  },
  {
    prop: "isCommentEnabled",
    label: "评论",
    minWidth: "40",
    slotName: "isCommentSwitch"
  },
  {
    prop: "isPublic",
    label: "公开",
    minWidth: "40",
    slotName: "isPublicSwitch"
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
