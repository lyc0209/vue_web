<template>
  <div class="blog-header">
    <div class="user-name">{{ userName }}</div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleMenuSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-sub-menu index="2">
        <template #title>文章</template>
        <el-menu-item index="2-1">分类</el-menu-item>
        <el-menu-item index="2-2">标签</el-menu-item>
        <el-menu-item index="2-3">时间轴</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3">收藏夹</el-menu-item>
      <el-menu-item index="4">关于</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue"
import { useStore } from "@/store"

export default defineComponent({
  setup() {
    const store = useStore()
    const userName = computed(() => store.state.main.userInfo.nickname)

    const activeIndex = ref("1")
    const handleMenuSelect = () => {
      console.log("click")
    }

    return {
      userName,
      activeIndex,
      handleMenuSelect
    }
  }
})
</script>

<style scoped lang="less">
.blog-header {
  display: flex;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 60%);

  .user-name {
    display: flex;
    align-items: center;
    font-weight: bolder;
    margin-left: 20px;
  }

  .el-menu {
    justify-content: flex-end;
    flex: 1;
    height: 100%;
    border: 0;
  }
}
</style>
