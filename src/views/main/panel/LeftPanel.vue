<template>
  <div class="left-panel">
    <user-info></user-info>
    <statistic-info></statistic-info>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import UserInfo from "@/views/main/panel/cpns/UserInfo"
import StatisticInfo from "@/views/main/panel/cpns/StatisticInfo"

export default defineComponent({
  name: "LeftPanel",
  components: { StatisticInfo, UserInfo },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.left-panel {
  margin-top: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
}
</style>
