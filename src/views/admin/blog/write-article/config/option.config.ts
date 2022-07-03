import { IForm } from "@/base-ui/form"

export const articleOptionConfig: IForm = {
  labelWidth: "120px",
  itemStyle: {
    padding: "10px 40px"
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: "title",
      type: "input",
      label: "标题",
      rules: [
        {
          required: true,
          message: "标题不能为空",
          trigger: "blur"
        }
      ],
      placeholder: "请输入标题"
    },
    {
      field: "description",
      type: "input",
      label: "描述",
      rules: [],
      placeholder: "请输入描述"
    },
    {
      field: "indexPicture",
      type: "input",
      label: "首图",
      rules: [
        {
          required: true,
          message: "首图不能为空",
          trigger: "blur"
        }
      ],
      placeholder: "文章首图URL，用于文章展示"
    },
    {
      field: "password",
      type: "password",
      label: "密码",
      rules: [],
      placeholder: "输入密码开启保护",
      otherOptions: {
        autocomplete: "new-password"
      }
    },
    {
      field: "categoryId",
      type: "select",
      label: "分类",
      rules: [
        {
          required: true,
          message: "分类不能为空",
          trigger: "change"
        }
      ],
      placeholder: "请选择分类",
      options: []
    },
    {
      field: "tagList",
      type: "select",
      label: "标签",
      rules: [
        {
          required: true,
          message: "标签不能为空",
          trigger: "change"
        }
      ],
      placeholder: "请选择标签",
      options: [],
      otherOptions: {
        multiple: true
      }
    },
    {
      field: "isPublic",
      type: "switch",
      label: "公开",
      default: true,
      rules: [],
      placeholder: "是否公开"
    },
    {
      field: "isRecommend",
      type: "switch",
      label: "推荐",
      default: false,
      rules: [],
      placeholder: "是否推荐"
    },
    {
      field: "isCommentEnabled",
      type: "switch",
      label: "允许评论",
      default: false,
      rules: [],
      placeholder: "是否允许评论"
    },
    {
      field: "isTop",
      type: "switch",
      label: "置顶",
      default: false,
      rules: [],
      placeholder: "是否置顶"
    }
  ]
}
