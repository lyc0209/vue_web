import { App } from "vue"
import { utcToString } from "@/utils/data-format"

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return utcToString(value)
    }
  }
}
