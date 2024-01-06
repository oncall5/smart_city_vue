<template>
  <el-row>
    <el-form-item label="匹配规则" :prop="bindingPropName">
      <el-input :value="value" @input="$emit('input', $event)"></el-input>
    </el-form-item>
  </el-row>
</template>
<script>
export default {
  props: {
    bindingPropName: {
      type: String,
      required: true,
      default: 'regex',
    },
    value: String,
  },
}
</script>
