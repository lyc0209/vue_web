<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
import { ElConfigProvider } from "element-plus"

import { useStore } from "@/store"

import zhCn from "element-plus/lib/locale/lang/zh-cn"

import localCahe from "@/utils/cache"

export default defineComponent({
  name: "App",
  components: {
    ElConfigProvider
  },
  setup() {
    const store = useStore()

    // onMounted(() => {
    //   const storeData = localCahe.getCache("store", false)
    //   if (storeData) {
    //     console.log(JSON.parse(storeData))
    //     store.replaceState(Object.assign({}, store.state, JSON.parse(storeData)))
    //     console.log(store.state.admin.articleList)
    //   }

    //   //在页面刷新时将vuex里的信息保存到sessionStorage里
    //   window.addEventListener("beforeunload", () => {
    //     console.log("页面刷新")
    //     localCahe.setCache("store", JSON.stringify(store.state), false)
    //   })
    // })

    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
