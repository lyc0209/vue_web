<template>
  <div class="page-search">
    <lyc-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </lyc-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import LycForm from "@/base-ui/form"

export default defineComponent({
  name: "PageSearch",
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: { LycForm },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    //1. formData中的属性应该动态决定
    const formItems = props.searchFormConfig?.formItems ?? []
    let formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = item.default ?? ""
    }

    // 父子组件尽量用ref，reactive有些问题
    const formData = ref(formOriginData)

    const handleResetClick = () => {
      // 直接修改formData，内部监听的还是老的，页面不变化
      // formData.value = formOriginData

      // 修改formData内部的值，内部组件仍然可以监听
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      // 发射重置事件，重新请求数据
      emit("resetBtnClick")
    }

    // 搜索按钮点击事件
    const handleQueryClick = () => {
      emit("queryBtnClick", formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
