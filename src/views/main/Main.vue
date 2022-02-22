<template>
  <div class="main">
    <el-container>
      <el-header><blog-header /></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer style="padding: 0"><blog-footer /></el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { useStore } from "@/store"

import BlogHeader from "./cpns/BlogHeader.vue"
import BlogFooter from "./cpns/BlogFooter.vue"

export default defineComponent({
  name: "Main",
  components: { BlogHeader, BlogFooter },
  setup() {
    const store = useStore()
    store.dispatch("main/getIndexInfoAction")

    return {}
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .page-info {
    background-color: #fff;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
  padding: 0;
}

.el-footer {
  background-color: #f0f2f5;
}

.el-main {
  // color: #333;
  text-align: center;
  // background-color: #f0f2f5;
}
</style>
