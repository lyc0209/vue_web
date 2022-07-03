<template>
  <div class="statistic-info">
    <div>统计信息</div>
    <div class="info">
      <div class="info-item">
        <span class="info-item-label">文章数目：</span>
        <span>{{ statisticInfo.articleNumber }}</span>
      </div>
      <div class="info-item">
        <span class="info-item-label">总字数：</span>
        <span>{{ statisticInfo.totalWords }}</span>
      </div>
      <div class="info-item">
        <span class="info-item-label">访客数：</span>
        <span>{{ statisticInfo.totalVisitorNumber }}</span>
      </div>
      <div class="info-item">
        <span class="info-item-label">已运行时间：</span>
        <span>{{ $filters.getDateDiffText(statisticInfo.startServiceTime) }}</span>
      </div>
      <div class="info-item">
        <span class="info-item-label">最后更新时间：</span>
        <span>{{ $filters.getDateDiffText(statisticInfo.lastUpdateTime) }}前</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/store"
import { computed } from "vue"

const store = useStore()

const statisticInfo = computed(() => store.getters[`main/getStatisticInfo`])
</script>

<style scoped lang="less">
.statistic-info {
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

  .info {
    width: 100%;

    .info-item {
      display: flex;
      padding: 6px 2px 0;

      .info-item-label {
        flex: 1;
        text-align: left;
      }
    }
  }
}
</style>
