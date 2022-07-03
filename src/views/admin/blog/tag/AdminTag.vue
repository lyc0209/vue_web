<template>
  <div class="admin-tag">
    <page-content
      :contentTableConfig="contentTableConfig"
      :pageName="'tag'"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #color="scope">
        <div class="color-item" :style="{ background: scope.row.color }"></div>
      </template>
    </page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      :modalConfig="modalConfig"
      pageName="tag"
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
  name: "AdminTag",
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

<style scoped>
.color-item {
  width: 100px;
  height: 23px;
  display: inline-flex;
  justify-content: center;
}
</style>
