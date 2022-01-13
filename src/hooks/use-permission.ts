import { useStore } from "@/store"

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions

  const verifyPermission = `admin:${pageName}:${handleName}`

  // 或者!!两次取反，转bool值
  return Boolean(permissions.find((item) => item === verifyPermission))
}
