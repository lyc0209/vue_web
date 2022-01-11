import { App } from "vue"
import registerProperties from "./register-properties"

// 统一全局注册
export function globalRegister(app: App): void {
  app.use(registerProperties)
}
