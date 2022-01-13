<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar class="avatar" :size="'small'" :src="avatarUrl"></el-avatar>
        <span>{{ name }}</span>
        <!-- <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon> -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogoutClick">退出登录</el-dropdown-item>
          <!-- <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"
import localCache from "@/utils/cache"
import { useRouter } from "vue-router"

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.nickname)
    const avatarUrl = computed(() => store.state.login.userInfo.avatar)

    const router = useRouter()
    const handleLogoutClick = () => {
      console.log("click")
      localCache.deleteCache("token")
      router.push("/admin")
    }

    return {
      name,
      avatarUrl,
      handleLogoutClick
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  .avatar {
    margin: 0 10px;
  }
}
</style>
