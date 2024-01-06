<template>
  <div>
    <el-row type="flex">
      <el-col :span="18">
        <el-form-item
          label="最小值"
          prop="val.minValue"
        >
          <el-input
            type="number"
            :value="val.minValue"
            @input="$emit('update', { ...val, minValue: $event })"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item prop="val.includeMin">
          <el-checkbox
            :value="val.includeMin"
            @change="$emit('update', { ...val, includeMin: $event })"
            >包含边界</el-checkbox
          >
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18">
        <el-form-item
          label="最大值"
          prop="val.maxValue"
        >
          <el-input
            type="number"
            :value="val.maxValue"
            @input="$emit('update', { ...val, maxValue: $event })"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item prop="val.includeMax">
          <el-checkbox
            :value="val.includeMax"
            @change="$emit('update', { ...val, includeMax: $event })"
            >包含边界</el-checkbox
          >
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'val',
    event: 'update',
  },
  props: {
    val: {
      type: Object,
      default: () => {
        return {
          minValue: '',
          maxValue: '',
          includeMin: false,
          includeMax: false,
        }
      },
    },
  },
}
</script>
