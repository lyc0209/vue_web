<template>
  <div class="article-option">
    <lyc-form v-bind="articleOptionConfig" v-model="formData" ref="lycFormRef">
      <template #header>
        <h1 class="header">编辑文章</h1>
      </template>
      <template #footer>
        <mavon-editor v-model="content" />
        <div class="article-button">
          <el-button type="primary" auto-insert-space @click="handleSaveClick">保存</el-button>
        </div>
      </template>
    </lyc-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useStore } from "@/store"
import LycForm from "@/base-ui/form"
import { ElMessage } from "element-plus"

export default defineComponent({
  name: "ArticleOption",
  props: {
    articleOptionConfig: {
      type: Object,
      required: true
    },
    defaultId: {
      type: String,
      default: "-1"
    }
  },
  components: { LycForm },
  setup(props) {
    const store = useStore()

    const content = ref("")

    const pageInfo = ref({ currentPage: 1, pageSize: 10000 })
    const getCategoryData = (queryInfo: any = {}) => {
      store.dispatch("admin/getPageListAction", {
        pageUrl: "category",
        queryInfo: {
          pageNum: pageInfo.value.currentPage,
          pageSize: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    const getTagData = (queryInfo: any = {}) => {
      store.dispatch("admin/getPageListAction", {
        pageUrl: "tag",
        queryInfo: {
          pageNum: pageInfo.value.currentPage,
          pageSize: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getCategoryData()
    getTagData()

    //1. formData中的属性应该动态决定
    const formItems = props.articleOptionConfig?.formItems ?? []
    let formOriginData: any = {}
    if (Number(props.defaultId) !== -1) {
      const defaultArticle = store.state.admin.articleList.find(
        (item) => item.id === Number(props.defaultId)
      )

      for (const item of formItems) {
        formOriginData[item.field] = item.default ?? ""
        formOriginData[item.field] = defaultArticle?.[item.field] ?? ""
      }
      content.value = defaultArticle?.content ?? ""
    } else {
      for (const item of formItems) {
        formOriginData[item.field] = item.default ?? ""
      }
    }

    // 父子组件尽量用ref，reactive有些问题
    const formData = ref(formOriginData)
    const lycFormRef = ref<InstanceType<typeof LycForm>>()
    const handleSaveClick = () => {
      const isFormValidated = lycFormRef.value?.validateAction()
      if (!isFormValidated) {
        ElMessage.error("请完成必填内容")
        return
      }
      if (!content.value.length) {
        ElMessage.error("文章内容不不能为空")
        return
      }
      if (Number(props.defaultId) === -1) {
        // 新建
        const params = { ...formData.value, content: content.value }
        store.dispatch("admin/createPageDataAction", {
          pageName: "article",
          newData: params
        })
      } else {
        // 编辑
        const params = { ...formData.value, content: content.value, id: Number(props.defaultId) }
        store.dispatch("admin/editPageDataAction", {
          pageName: "article",
          editData: params
        })
      }
    }

    return {
      formData,
      handleSaveClick,
      content,
      lycFormRef
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
.article-button {
  padding: 20px 0 20px 0;
}
</style>
