<template>
  <div class="admin-category">
    <page-content
      :contentTableConfig="contentTableConfig"
      :pageName="'category'"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      :modalConfig="modalConfig"
      pageName="category"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"
import PageContent from "@/components/page-content"
import PageModal from "@/components/page-modal"

import { usePageModal } from "@/hooks/use-page-modal"

export default defineComponent({
  name: "AdminCategory",
  components: { PageContent, PageModal },
  setup() {
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal()

    return {
      contentTableConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      modalConfig
    }
  }
})
</script>

<style scoped></style>
