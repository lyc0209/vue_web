import { App } from "vue"
import { timestampToString } from "@/utils/data-format"

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: number) {
      return timestampToString(value)
    }
  }
}
