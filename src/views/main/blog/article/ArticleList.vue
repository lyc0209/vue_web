<template>
  <div class="article">
    <div class="article-card" v-for="article in articleList" :key="article.id">
      <el-image class="article-img" :src="article.indexPicture" />
      <div class="article-text">
        <div class="article-title" @click="handleTitleClick(article.id)">{{ article.title }}</div>
        <div class="article-info">
          <span>{{ article.author.nickname }}</span>
          <span class="separator">|</span>
          <span>{{ $filters.formatTime(article.createTime, "YYYY-MM-DD") }}</span>
          <span class="separator">|</span>
          <span>{{ article.category.name }}</span>
        </div>
        <div class="description">{{ article.description }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue"
import { useStore } from "@/store"
import { useRouter } from "vue-router"

export default defineComponent({
  name: "ArticleList",
  setup() {
    const store = useStore()
    const router = useRouter()
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    const getPageData = () => {
      store.dispatch("main/getArticleListAction", {
        pageNum: pageInfo.value.currentPage,
        pageSize: pageInfo.value.pageSize
      })
    }

    getPageData()

    const articleList = computed(() => store.getters[`main/getArticleList`])

    const handleTitleClick = (id: number) => {
      router.push({
        path: "/article",
        query: {
          id: id
        }
      })
    }

    return {
      articleList,
      handleTitleClick
    }
  }
})
</script>

<style scoped lang="less">
.article {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article-card {
  display: flex;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
  border-radius: 2px;
  width: 800px;
  margin: 10px 0;
  padding: 40px 20px;

  .article-img {
    width: 160px;
    height: 120px;
    border-radius: 2px;
  }

  .article-text {
    margin-left: 20px;
    text-align: left;
    flex: 1;

    .article-title {
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 5px;
      cursor: pointer;
    }
    .article-title:hover {
      color: #ed556a;
    }

    .article-info {
      font-size: 10px;
      color: #858585;
    }

    .separator {
      margin: 0 3px;
    }

    .description {
      margin-top: 5px;
      font-size: 14px;
      line-height: 150%;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}

.article-card:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.15);
}
</style>
