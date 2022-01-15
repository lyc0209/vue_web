<template>
  <div class="write-artical">
    <article-option :articleOptionConfig="articleOptionConfigRef"></article-option>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"
import ArticleOption from "@/components/article-option"
import { articleOptionConfig } from "./config/option.config"

export default defineComponent({
  name: "WriteArticle",
  components: { ArticleOption },
  setup() {
    const store = useStore()
    const articleOptionConfigRef = computed(() => {
      const categoryItem = articleOptionConfig.formItems.find((item) => item.field === "categoryId")
      categoryItem!.options = store.state.admin.categoryList.map((item) => {
        return { title: item.name, value: item.id }
      })
      const tagItem = articleOptionConfig.formItems.find((item) => item.field === "tagList")
      tagItem!.options = store.state.admin.tagList.map((item) => {
        return { title: item.name, value: item.id }
      })
      return articleOptionConfig
    })

    return {
      articleOptionConfigRef
    }
  }
})
</script>

<style scoped></style>
