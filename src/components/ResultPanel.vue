<template>
  <el-dialog
    title="结果指标"
    width="40%"
    :visible="visible"
    @close="$emit('update:visible', false)"
  >
    <el-row :gutter="20" v-for="(condition, idx) in conditions" :key="idx">
      <el-col v-for="c in condition" :key="c.name" :span="24 / columns">
        <strong>{{ c.name }}：</strong>{{ c.value }}
        {{ c.unit === undefined || c.unit === null ? '' : c.unit }}
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Number,
      default: 2,
    },
    rawData: {
      default: {
        avaliable: false,
        data: undefined,
      },
    },
  },
  computed: {
    conditions() {
      // reshape原始数组
      if (this.rawData.avaliable === false) return []
      return this.rawData.data.reduce(
        (acc, _, index, array) =>
          index % this.columns === 0
            ? [...acc, array.slice(index, index + this.columns)]
            : acc,
        []
      )
    },
  },
}
</script>
<style></style>
