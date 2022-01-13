<template>
  <div class="lyc-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <!-- 让外界决定header的处理事件 -->
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%"
      :row-key="childrenProps.rowKey"
      :tree-props="childrenProps.treeProp"
    >
      <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60" />
      <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80" />
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column
          :prop="propItem.prop"
          :label="propItem.label"
          :min-width="propItem.minWidth"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <!-- 动态插槽，将数据传回上层，做自定义修改 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Table",
  props: {
    title: {
      type: String,
      default: ""
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    // 是否显示序号
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否显示选中
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit("selectionChange", value)
    }

    // 当前页数监听函数
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage })
    }

    // 每页条数监听函数
    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize })
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}
.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
.content {
  padding: 20px;
  /* 上边框样式 */
  border-top: 20px solid #f5f5f5;
}
</style>
