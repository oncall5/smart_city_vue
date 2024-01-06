<template>
  <el-dialog
    v-if="isShow"
    :visible="isShow"
    @update:visible="handleVisibleChange"
    title="编辑规则"
  >
    <el-form ref="form" :model="editingRule" label-width="80px">
      <el-row type="flex" justify="space-between">
        <el-col :span="16">
          <el-form-item label="字段" prop="field">
            <el-input
              disabled
              :value="getFieldZh(tableName, editingRule.field)"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-switch
              active-text="脏数据"
              inactive-text="干净数据"
              v-model="editingRule.isDirtyData"
            >
            </el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="supportedRule">
        <template v-for="(r, idx) in supportedRule">
          <regex-input
            v-if="r.rule_type === 'regex'"
            :key="idx"
            v-model="editingRule.regex"
            bindingPropName="regex"
          ></regex-input>
          <min-max-input
            v-if="r.rule_type === 'min_max'"
            :key="idx"
            v-model="editingRule.val"
          ></min-max-input>
        </template>
      </template>
      <el-row>
        <el-input type="textarea" v-model="ruleForDisplay"></el-input>
      </el-row>
      <el-row type="flex" style="margin-top: 10px">
        <el-button
          type="primary"
          style="margin-left: auto"
          @click="handleEditClick"
          >编辑规则</el-button
        >
        <el-button type="danger" @click="$emit('delete-click')"
          >删除规则</el-button
        >
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
import FieldsMixin from '../../mixins/FieldsMixin.vue'
import MinMaxInput from './MinMaxInput.vue'
import RegexInput from './RegexInput.vue'
export default {
  components: { MinMaxInput, RegexInput },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    rule: {
      type: Object,
      default: () => ({
        field: '',
        isDirtyData: true,
        regex: '',
        val: {
          minValue: '',
          maxValue: '',
          includeMin: false,
          includeMax: false,
        },
      }),
    },
    tableName: {
      type: String,
      require: true,
    },
    supportedRules: {
      type: Object,
      required: true,
    },
  },
  mixins: [FieldsMixin],
  async mounted() {},
  data() {
    return {
      editingRule: {},
      supportedRule: {},
    }
  },
  methods: {
    handleEditClick() {
      if (!this.isRuleEditable) return
      this.$emit('edit-click', this.editingRule)
    },
    handleVisibleChange(newVisible) {
      this.$emit('update:is-show', newVisible)
    },
  },
  computed: {
    ruleForDisplay() {
      /***
       * 把当前规则转换成标准格式展示：
       * field: *****
       * dataType: *****
       * rule: ******
       */
      if (this.editingRule == null) return ''
      const { field, regex, val } = this.editingRule
      let result = ''
      if (field === 'ssid' || field === 'fx') {
        result = `field: ${field}\ndataType: string\nrule: ${regex}`
      } else if (field === 'cdbh') {
        if (regex !== null && regex !== '')
          result = `field: ${field}\ndataType: string\nrule: ${regex}\n`
        if (
          (val.minValue !== null && val.minValue !== '') ||
          (val.maxValue !== null && val.maxValue !== '')
        ) {
          result += `field: ${field}\ndataType: number\nrule:`
          if (val.minValue !== null && val.minValue !== '') {
            if (val.includeMin) {
              result += `[${val.minValue},`
            } else {
              result += `(${val.minValue},`
            }
          } else {
            result += `(-∞,`
          }
          if (val.maxValue !== null && val.maxValue !== '') {
            if (val.includeMax) {
              result += `${val.maxValue}]`
            } else {
              result += `${val.maxValue})`
            }
          } else {
            result += `+∞)`
          }
        }
      }
      return result
    },
    isRuleEditable() {
      return (
        this.editingRule?.regex !== '' ||
        (this.editingRule?.val.minValue !== null &&
          this.editingRule?.val.minValue !== '') ||
        (this.editingRule?.val.maxValue !== null &&
          this.editingRule?.val.maxValue !== '')
      )
    },
  },
  watch: {
    async rule(newRule) {
      if (newRule) {
        this.editingRule = Object.assign({}, newRule)
        this.supportedRule = this.supportedRules[newRule.field]
      }
    },
  },
}
</script>
