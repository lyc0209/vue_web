<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <!-- prop: rules中的字段匹配 -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from "element-plus"
import { defineComponent, reactive, ref } from "vue"
import { rules } from "../config/account-config"
import localCache from "@/utils/cache"
import { useStore } from "vuex"

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      username: localCache.getCache("username") ?? "",
      password: localCache.getCache("password") ?? ""
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    // 登录逻辑
    const loginAction = (isPeepPassword: boolean) => {
      formRef.value?.validate((valid?: boolean) => {
        if (!valid) {
          return
        }
        if (isPeepPassword) {
          localCache.setCache("username", account.username)
          localCache.setCache("password", account.password)
        } else {
          localCache.deleteCache("username")
          localCache.deleteCache("password")
        }

        store.dispatch("login/accountLoginAction", { ...account })
      })
    }

    // 校验规则, 规则数组，可以存在多个

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
