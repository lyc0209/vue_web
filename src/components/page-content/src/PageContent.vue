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
        <el-button v-if="isCreate" type="primary" size="medium" @click="handleNewClick"
          >新建</el-button
        >
        <!-- <el-button><i class="iconfont el-icon-refresh"></i></el-button> -->
      </template>

      <!-- 2.列中的插槽(固定存在的) -->
      <template #status="scope">
        <!-- TODO: status在商品信息中有问题，应该是status而不是enable，需要抽取出来 -->
        <el-button size="mini" :type="scope.row.enable === 1 ? 'success' : 'danger'">{{
          scope.row.enable === 1 ? "启用" : "禁用"
        }}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button v-if="isUpdate" size="mini" type="text" @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            size="mini"
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

      <!-- <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template> -->
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
    const isCreate = usePermission(props.pageName === "user" ? "users" : props.pageName, "create")
    const isUpdate = usePermission(props.pageName === "user" ? "users" : props.pageName, "update")
    const isDelete = usePermission(props.pageName === "user" ? "users" : props.pageName, "delete")
    const isQuery = usePermission(props.pageName === "user" ? "users" : props.pageName, "query")

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 2.调用store system模块的action方法
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) {
        return
      }
      store.dispatch("system/getPageListAction", {
        pageUrl: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getPageData()

    // 3.从vuex获取
    //const userList = computed(() => store.state.system.userList)
    const dataList = computed(() => store.getters[`system/pageListData`](props.pageName))
    const dataCount = computed(() => store.getters[`system/pageListCount`](props.pageName))

    // 表格选中事件
    const handleSelectionChange = (value: any) => {
      console.log(value)
    }

    // 4.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
      // return (
      //   item.slotName !== "status" ||
      //   item.slotName !== "createAt" ||
      //   item.slotName !== "updateAt" ||
      //   item.slotName !== "handler"
      // )
      if (!item.slotName) {
        return false
      }
      if (item.slotName === "status") {
        return false
      }
      if (item.slotName === "createAt") {
        return false
      }
      if (item.slotName === "updateAt") {
        return false
      }
      if (item.slotName === "handler") {
        return false
      }
      return true
    })

    // 5. 删除操作
    const handleDeleteClick = (item: any) => {
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName === "user" ? "users" : props.pageName,
        id: item.id
      })
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
