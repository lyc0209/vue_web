<template>
  <div class="nav-header">
    <i
      class="iconfont fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <nav-bread-crumb :breadcrumbs="breadCrumbs"></nav-bread-crumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import UserInfo from "./UserInfo.vue"
import NavBreadCrumb, { IBreadCrumb } from "@/base-ui/breadcrumb"

import { useStore } from "@/store"
import { useRoute } from "vue-router"
import { pathMapToBreadCrumbs } from "@/utils/map-menus"
// import { ArrowDown } from "@element-plus/icons-vue"

export default defineComponent({
  // 将事件发射出去
  emits: ["foldChange"],
  components: { UserInfo, NavBreadCrumb },
  setup(props, { emit }) {
    // 默认不折叠
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }

    const store = useStore()
    // 面包屑数据
    const breadCrumbs = computed(() => {
      const adminMenus = store.state.login.adminMenus
      return pathMapToBreadCrumbs(adminMenus, useRoute().path)
    })

    return {
      isFold,
      handleFoldClick,
      breadCrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center; // 垂直居中
    flex: 1;
    padding: 0 20px;
  }
}
</style>
