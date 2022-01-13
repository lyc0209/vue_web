import { ref } from "vue"
import PageContent from "@/components/page-content"

export function usePagesearch() {
  const pageContenRef = ref<InstanceType<typeof PageContent>>()

  // 来自search组件的重置事件
  const handleResetClick = () => {
    // 调用content组件中的方法
    pageContenRef.value?.getPageData()
  }

  // 来自search组件的搜索事件
  const handleQueryClick = (queryInfo: any) => {
    // 调用content组件中的方法
    pageContenRef.value?.getPageData(queryInfo)
  }

  return [pageContenRef, handleResetClick, handleQueryClick]
}
