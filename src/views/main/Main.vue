<template>
  <div class="main">
    <el-container>
      <el-header><blog-header /></el-header>
      <el-main>
        <left-panel></left-panel>
        <router-view></router-view>
      </el-main>
      <el-footer><blog-footer /></el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { useStore } from "@/store"

import BlogHeader from "./cpns/BlogHeader.vue"
import BlogFooter from "./cpns/BlogFooter.vue"
import LeftPanel from "@/views/main/panel/LeftPanel.vue"

export default defineComponent({
  name: "Main",
  components: { LeftPanel, BlogHeader, BlogFooter },
  setup() {
    const store = useStore()
    store.dispatch("main/getIndexInfoAction")

    return {}
  }
})
</script>

<style scoped lang="less">
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
  padding: 0;
}

.el-header {
  height: 48px !important;
}

.el-footer {
  background-color: #f0f2f5;
  height: 100px !important;
}

.el-main {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  //max-width: 1500px;
}
</style>
