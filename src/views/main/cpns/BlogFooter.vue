<template>
  <div class="blog-footer">
    <div>Copyright ©2021 GoldenLee</div>
    <div class="icp-info">
      <el-image
        class="icp-icon"
        src="https://cdn.jsdelivr.net/gh/lyc0209/pic/blog/icp.png"
      ></el-image>
      <a target="_blank" href="http://www.beian.gov.cn">皖ICP备20001171号</a>
    </div>
    <!-- <div>
      <a href="https://www.jsdelivr.com/">
        <el-image src="https://img.shields.io/badge/CDN-jsDelivr-orange"></el-image>
      </a>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.blog-footer {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  color: #eee;
  height: 100px;

  background-color: #24587a;

  .icp-info {
    margin-top: 10px;

    .icp-icon {
      height: 16px;
      width: 16px;
      padding: 0 4px;
      vertical-align: text-bottom;
    }

    a:link {
      color: #eee;
      text-decoration: none;
    }
    a:visited {
      color: #eee;
      text-decoration: none;
    }

    a:hover {
      font-size: 12px;
      color: #eee;
      text-decoration: underline;
    }
  }
}
</style>
