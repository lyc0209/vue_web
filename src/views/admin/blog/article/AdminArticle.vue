<template>
  <div class="admin-artical">
    <page-content
      :contentTableConfig="contentTableConfig"
      :pageName="'article'"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #isTopSwitch="scope">
        <el-switch disabled v-model="scope.row.isTop" />
      </template>
      <template #isRecommendswitch="scope">
        <el-switch disabled v-model="scope.row.isRecommend" />
      </template>
      <template #isCommentSwitch="scope">
        <el-switch disabled v-model="scope.row.isCommentEnabled" />
      </template>
      <template #isPublicSwitch="scope">
        <el-switch disabled v-model="scope.row.isPublic" />
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from "vue-router"
import { contentTableConfig } from "./config/content.config"
import PageContent from "@/components/page-content"

export default defineComponent({
  name: "AdminArticle",
  components: { PageContent },
  setup() {
    const router = useRouter()

    const handleNewData = () => {
      router.push({
        name: "WriteArticle"
      })
    }

    const handleEditData = () => {
      console.log("click edit")
    }

    return {
      contentTableConfig,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
