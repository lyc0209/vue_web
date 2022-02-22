<template>
  <div class="article-detail">
    <mavon-editor
      class="article-mavon-editor"
      v-model="articleDetail.content"
      :subfield="false"
      defaultOpen="preview"
      :editable="false"
      :toolbarsFlag="false"
      :html="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "@/store"

export default defineComponent({
  name: "ArticleDetail",
  setup() {
    const route = useRoute()
    const store = useStore()

    const id = Number(route.query.id)

    const getPageData = (id: number) => {
      store.dispatch("main/getArticleDetailAction", {
        id: id
      })
    }

    getPageData(id)

    const articleDetail = computed(() => store.getters[`main/getArticleDetail`])

    return {
      articleDetail
    }
  }
})
</script>

<style scoped lang="less">
.article-detail {
  display: flex;
  justify-content: center;
  width: 100%;

  .article-mavon-editor {
    width: 60%;
  }
}
</style>
