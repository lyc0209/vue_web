<template>
  <div class="user-info">
    <el-avatar shape="circle" :size="60" fit="cover" :src="userInfo.avatar" />
    <span class="nickname">{{ userInfo.nickname }}</span>
    <span class="description">{{ userInfo.description }}</span>
    <div class="numbers">
      <div>
        <div>文章</div>
        <div class="number">{{ statisticInfo.articleNumber }}</div>
      </div>
      <div>
        <div>标签</div>
        <div class="number">{{ statisticInfo.tagNumber }}</div>
      </div>
      <div>
        <div>分类</div>
        <div class="number">{{ statisticInfo.categoryNumber }}</div>
      </div>
    </div>
    <a class="url" target="_blank" rel="noopener" :href="userInfo.giteeUrl">
      <span>Follow me</span>
    </a>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue"
import { useStore } from "@/store"

export default defineComponent({
  name: "UserInfo",
  setup() {
    const store = useStore()

    const userInfo = computed(() => store.getters[`main/getUserInfo`])
    const statisticInfo = computed(() => store.getters[`main/getStatisticInfo`])

    return {
      userInfo,
      statisticInfo
    }
  }
})
</script>

<style scoped lang="less">
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
  border-radius: 2px;
  width: 200px;
  height: 280px;
  margin: 10px 0;
  padding: 20px 20px;
  &:hover {
    box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.15);
  }

  .nickname {
    font-weight: 700;
    font-size: 20px;
    padding: 10px 0 5px;
  }
  .numbers {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    padding: 20px 0;

    .number {
      font-size: 20px;
      padding-top: 4px;
    }
  }
  a {
    display: block;
    background-color: #49b1f5;
    width: 100%;
    &:link {
      background-color: #49b1f5;
      text-decoration: none;
    }
    &:visited {
      background-color: #49b1f5;
      text-decoration: none;
    }
    &:hover {
      background-color: #ff7242;
      text-decoration: none;
    }

    span {
      color: white;
      line-height: 2.4;
    }
  }
}
</style>
