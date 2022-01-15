<template>
  <div class="article-option">
    <lyc-form v-bind="articleOptionConfig" v-model="formData">
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

export default defineComponent({
  name: "ArticleOption",
  props: {
    articleOptionConfig: {
      type: Object,
      required: true
    }
  },
  components: { LycForm },
  setup(props) {
    const store = useStore()

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
    for (const item of formItems) {
      formOriginData[item.field] = item.default ?? ""
    }

    // 父子组件尽量用ref，reactive有些问题
    const formData = ref(formOriginData)

    const handleSaveClick = () => {
      console.log(formData.value)
    }

    const content = ref("")

    return {
      formData,
      handleSaveClick,
      content
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
