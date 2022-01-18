<template>
  <div class="lyc-form">
    <!-- 插槽，外部自定义头部内容 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" ref="formRef" :model="formData">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :class="item.itemStype"
              :prop="item.field"
            >
              <template v-if="item.type === 'input' || item.type === 'password'">
                <!-- 这里通过props接收父组件数据，v-model="formData[`${item.field}`]"将父组件数据放到子组件修改是不应该的，不符合单向数据流 -->
                <!-- 应该子组件emit一个事件，让父组件收到后去修改 -->
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                  v-bind="item.otherOptions"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.title"
                    :value="option.value"
                    >{{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
              <template v-else-if="item.type === 'switch'">
                <el-switch v-model="formData[`${item.field}`]" />
              </template>
              <template v-else-if="item.type === 'color-picker'">
                <el-color-picker v-model="formData[`${item.field}`]" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"
import { IFormItem } from "../types"

import { ElForm } from "element-plus"

export default defineComponent({
  name: "Form",
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 40px" })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  // 发射出去，让父组件接收
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // const formData = computed({
    //   get: () => props.modelValue,
    //   set: (newValue) => {
    //     // 有bug，formData内单个属性变化时不会触发set
    //     // 而且和直接使用modelValue没区别
    //     emit("update:modelValue", newValue)
    //   }
    // })
    // 解构，生成新的对象。不违背单向数据流
    const formData = ref({ ...props.modelValue })
    // watch(
    //   () => props.modelValue,
    //   (newValue) => {
    //     formData.value = { ...newValue }
    //   }
    // )
    console.log(props.modelValue)

    watch(formData, (newValue) => emit("update:modelValue", newValue), {
      deep: true
    })

    const formRef = ref<InstanceType<typeof ElForm>>()
    const validateAction = () => {
      let isValidated = false
      formRef.value!.validate((valid) => {
        isValidated = valid ?? false
      })
      return isValidated
    }

    return {
      formData,
      formRef,
      validateAction
    }
  }
})
</script>

<style scoped lang="less">
.lyc-form {
  padding-top: 22px;
}
</style>
