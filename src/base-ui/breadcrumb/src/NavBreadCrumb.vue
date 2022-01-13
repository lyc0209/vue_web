<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { useRoute } from "vue-router"
import { IBreadCrumb } from "../types"

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadCrumb[]>,
      default: () => []
    }
  },
  setup() {
    const route = useRoute()
    console.log(route.matched)

    return {}
  }
})
</script>

<style scoped lang="less"></style>
