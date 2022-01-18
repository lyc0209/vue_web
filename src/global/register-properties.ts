import { App } from "vue"
import { timestampToString, DATE_TIME_FORMAT_DEFAULT } from "@/utils/data-format"

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: number, format: string = DATE_TIME_FORMAT_DEFAULT) {
      return timestampToString(value, format)
    }
  }
}
