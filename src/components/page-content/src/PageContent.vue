<template>
  <div class="page-content">
    <lyc-table
      :listData="dataList"
      v-bind="contentTableConfig"
      @selectionChange="handleSelectionChange"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="default" @click="handleNewClick"
          >新建</el-button
        >
        <!-- <el-button><i class="iconfont el-icon-refresh"></i></el-button> -->
      </template>

      <!-- 2.列中的插槽(固定存在的) -->
      <template #createTime="scope">
        <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
      </template>
      <template #updateTime="scope">
        <span>{{ $filters.formatTime(scope.row.createTime) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button v-if="isUpdate" size="small" type="text" @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            size="small"
            type="text"
            style="color: red"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 动态插槽， 在page-content中动态插入剩余的插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <!-- slotName有值时才加插槽 -->
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </lyc-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue"
import { useStore } from "@/store"
import { usePermission } from "@/hooks/use-permission"
import LycTable from "@/base-ui/table/index"

export default defineComponent({
  name: "PageContent",
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: { LycTable },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore()

    //0. 获取操作权限
    const isCreate = usePermission(props.pageName, "create")
    const isUpdate = usePermission(props.pageName, "update")
    const isDelete = usePermission(props.pageName, "delete")
    const isQuery = usePermission(props.pageName, "query")

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2.调用store admin模块的action方法
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) {
        return
      }
      store.dispatch("admin/getPageListAction", {
        pageUrl: props.pageName,
        queryInfo: {
          pageNum: pageInfo.value.currentPage,
          pageSize: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getPageData()

    // 3.从vuex获取
    //const userList = computed(() => store.state.system.userList)
    const dataList = computed(() => store.getters[`admin/pageListData`](props.pageName))
    const dataCount = computed(() => store.getters[`admin/pageListCount`](props.pageName))

    // 表格选中事件
    const handleSelectionChange = (value: any) => {
      console.log(value)
    }

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
      if (!item.slotName) {
        return false
      }
      if (item.slotName === "createTime") {
        return false
      }
      if (item.slotName === "updateTime") {
        return false
      }
      if (item.slotName === "handler") {
        return false
      }
      return true
    })

    // 5. 删除操作
    const handleDeleteClick = (item: any) => {
      console.log(item)
      // store.dispatch("admin/deletePageDataAction", {
      //   pageName: props.pageName === "user" ? "users" : props.pageName,
      //   id: item.id
      // })
    }

    // 新建按钮点击事件
    const handleNewClick = () => {
      emit("newBtnClick")
    }
    // 编辑按钮点击事件
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item)
    }

    return {
      dataList,
      dataCount,
      handleSelectionChange,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  /* 上边框样式 */
  border-top: 20px solid #f5f5f5;
}
</style>
