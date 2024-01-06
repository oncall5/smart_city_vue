<template>
  <el-dialog
    :visible="isShow"
    @update:visible="handleVisibleChange"
    title="添加规则"
  >
    <el-form ref="form" :model="rule" label-width="80px">
      <el-row type="flex" justify="space-between">
        <el-col :span="16">
          <el-form-item label="字段" prop="field">
            <el-select
              v-model="rule.field"
              placeholder="请选择字段"
              @change="handleFieldSelectorChange"
            >
              <el-option
                v-for="(f, idx) in fields"
                :key="idx"
                :label="getFieldZh(tableName, f)"
                :value="f"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-switch
              active-text="脏数据"
              inactive-text="干净数据"
              v-model="rule.isDirtyData"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="rule.field && supportedRule">
        <template v-for="(r, idx) in supportedRule">
          <regex-input
            v-if="r.rule_type === 'regex'"
            :key="idx"
            v-model="rule.regex"
            bindingPropName="regex"
          ></regex-input>
          <min-max-input
            v-if="r.rule_type === 'min_max'"
            :key="idx"
            v-model="rule.val"
          ></min-max-input>
        </template>
      </template>
      <el-row type="flex" style="margin-top: 10px">
        <el-button
          type="primary"
          style="margin-left: auto"
          :disabled="!isRuleAddable"
          @click="handleSubmitBtnClick"
          >添加规则</el-button
        >
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
import FieldsMixin from '@/mixins/FieldsMixin'
import RegexInput from '@/components/rule/RegexInput.vue'
import MinMaxInput from '@/components/rule/MinMaxInput.vue'

export default {
  mixins: [FieldsMixin],
  components: {
    RegexInput,
    MinMaxInput,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    tableName: {
      type: String,
      required: true,
    },
    supportedRules: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  methods: {
    resetRule() {
      this.rule = {
        field: null,
        isDirtyData: this.rule.isDirtyData,
        regex: '',
        val: {
          minValue: null,
          includeMin: false,
          maxValue: null,
          includeMax: false,
        },
      }
    },
    handleSubmitBtnClick() {
      if (!this.isRuleAddable) return
      this.$emit('submit', { ...this.rule })
      this.resetRule()
    },
    handleVisibleChange(newVisible) {
      console.log(newVisible)
      this.$emit('update:is-show', newVisible)
    },
    async handleFieldSelectorChange() {
      this.supportedRule = this.supportedRules[this.rule.field]
    },
  },
  data() {
    return {
      rule: {
        isDirtyData: true,
        field: null,
        regex: '',
        val: {
          minValue: null,
          includeMin: false,
          maxValue: null,
          includeMax: false,
        },
      },
      supportedRule: [],
    }
  },
  computed: {
    isRuleAddable() {
      return (
        this.rule?.regex !== '' ||
        (this.rule?.val.minValue !== null && this.rule?.val.minValue !== '') ||
        (this.rule?.val.maxValue !== null && this.rule?.val.maxValue !== '')
      )
    },
  },
}
</script>
