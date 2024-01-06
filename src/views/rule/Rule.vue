<template>
  <div>
    <el-card>
      <div class="tag-bar__container">
        <div class="tag-bar__button-group">
          <el-button type="primary" @click="isAddRuleDialogShow = true"
            >添加规则</el-button
          >
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定要清空规则列表吗？"
            @confirm="rule = []"
          >
            <el-button type="danger" slot="reference">清空规则</el-button>
          </el-popconfirm>
        </div>
        <!-- <div class="tag-bar__tags">
          <el-tag
            class="tag-bar__tag"
            v-for="(r, idx) in rule"
            :key="idx"
            :type="r.isDirtyData ? 'danger' : 'primary'"
            @click="handleTagClick(idx)"
          >
            {{ getFieldZh(tableName, r.field) }}
          </el-tag>
        </div> -->
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        :row-class-name="highlightRow"
        :cell-class-name="highlightCell"
      >
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column
          v-for="(field, idx) in fields"
          :key="idx"
          :prop="field"
          :label="getFieldZh(tableName, field)"
        >
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-size="queryInfo.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryInfo.total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <add-rule-dialog
      v-bind:is-show.sync="isAddRuleDialogShow"
      :fields="supportedFields"
      :tableName="tableName"
      :supportedRules="supportedRule"
      @submit="handleAddRuleClick"
    />
    <edit-rule-dialog
      v-bind:is-show.sync="isEditRuleDialogShow"
      :tableName="tableName"
      :rule="rule[editingRuleIndex]"
      :supportedRules="supportedRule"
      @edit-click="handleEditRuleClick"
      @delete-click="handleDeleteRuleClick"
    />
  </div>
</template>

<script>
import axios from '@/api/axios.js'
import AddRuleDialog from '../../components/rule/AddRuleDialog.vue'
import EditRuleDialog from '../../components/rule/EditRuleDialog.vue'
import FieldsMixin from '@/mixins/FieldsMixin'
import SearchMixin from '@/mixins/SearchMixin'
import LocalStorageMixin from '@/mixins/LocalStorageMixin'
import { omit } from 'lodash'
import { flattenObject } from '@/utils/tool.js'
export default {
  name: 'rule',
  mixins: [FieldsMixin, SearchMixin, LocalStorageMixin],
  components: {
    AddRuleDialog,
    EditRuleDialog,
  },
  data() {
    return {
      tableName: 'cross_road_car',
      queryInfo: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      isAddRuleDialogShow: false,
      rule: [],
      editingRuleIndex: null,
      isEditRuleDialogShow: false,
      matchedList: [],
      supportedRule: {},
      supportedFields: [],
    }
  },
  async mounted() {
    this.init()
  },
  methods: {
    async init() {
      const { supportedFields, supportedRule } =
        await this.fetchSupportedFieldsAndRules()
      this.supportedFields = supportedFields
      this.supportedRule = supportedRule
      const { content, totalElements } = await this.fetchTableData()
      this.tableData = content
      this.queryInfo.total = totalElements
      this.loadRules()
    },
    async fetchSupportedFieldsAndRules() {
      const supportedFields = await this.fetchSupportedFields(this.tableName)
      const supportedRule = await this.fetchSupportedRuleByFields(
        supportedFields
      )
      return { supportedFields, supportedRule }
    },
    async fetchTableData() {
      const { content, totalElements } = await axios.$get(
        this.comm.WEB_URL + 'crossroad/list',
        {
          page: this.queryInfo.page,
          pageSize: this.queryInfo.pageSize,
        }
      )
      return { content, totalElements }
    },
    handleSizeChange(newPageSize) {
      this.queryInfo = { ...this.queryInfo, pageSize: newPageSize }
    },
    handleCurrentChange(currentPage) {
      this.queryInfo = { ...this.queryInfo, page: currentPage }
    },
    handleAddRuleClick(ruleForDialog) {
      this.rule.push(ruleForDialog)
      this.isAddRuleDialogShow = false
    },
    handleTagClick(tagIdx) {
      this.editingRuleIndex = tagIdx
      this.isEditRuleDialogShow = true
    },
    handleEditRuleClick(editingRule) {
      this.rule.splice(this.editingRuleIndex, 1, { ...editingRule })
      this.isEditRuleDialogShow = false
      this.editingRuleIndex = null
    },
    handleDeleteRuleClick() {
      this.rule.splice(this.editingRuleIndex, 1)
      this.isEditRuleDialogShow = false
      this.editingRuleIndex = null
    },
    highlightRow({ row }) {
      if (
        this.matchedList.find((item) => item.id === row.id && item.isDirtyData)
      )
        return 'el-table__row--dirty'
      if (
        this.matchedList.find((item) => item.id === row.id && !item.isDirtyData)
      )
        return 'el-table__row--clean'
      return ''
    },
    highlightCell({ row, column }) {
      const matchedResult = this.matchedList.find((item) => item.id === row.id)
      if (!matchedResult) return ''
      if (matchedResult.dirtyFields.includes(column.property)) {
        return 'el-table__cell--dirty'
      }
      if (matchedResult.cleanFields.includes(column.property))
        return 'el-table__cell--clean'
      return ''
    },
    async search() {
      try {
        this.matchedList = await this.searchByRule(
          this.comm.WEB_URL + '/crossroad/target_id/3.0',
          this.queryInfo,
          this.ruleForRequest,
          this.supportedFields
        )
      } catch (error) {
        console.error(error)
        this.$message.error(error.message)
        this.matchedList = []
      }
    },
    saveRules() {
      this.setLocalStorage('dataclean__rule', this.rule)
    },
    loadRules() {
      this.rule = this.getLocalStorage('dataclean__rule') ?? []
    },
  },
  computed: {
    ruleForRequest() {
      return this.rule.map((r) =>
        Object.assign(flattenObject(omit(r, ['isDirtyData'])), {
          label: !r.isDirtyData,
          tableName: this.tableName,
        })
      )
    },
    fields() {
      return this.getFields(this.tableName)
    },
  },
  watch: {
    rule() {
      this.search()
      this.saveRules()
    },
    async queryInfo() {
      const { content, totalElements } = await this.fetchTableData()
      this.tableData = content
      this.queryInfo.total = totalElements
      this.search()
    },
  },
}
</script>

<style lang="less">
.tag-bar {
  &__container {
    display: flex;
    justify-content: space-between;
  }
  &__button-group {
    display: flex;
    gap: 8px;
  }
  &__tags {
    display: flex;
    align-items: center;
  }
  &__tag {
    transition: all 0.2s ease-in-out;
    &:hover {
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
.el-table {
  &__row {
    --bar-height: 100%;
    --after-top: calc((100% - var(--bar-height)) / 2);

    .higlight-row(@color) {
      position: relative;
      &::after {
        position: absolute;
        content: '';
        left: 0px;
        top: var(--after-top);
        width: 5px;
        height: var(--bar-height);
        z-index: 10;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        background-color: @color;
      }
    }
    &--dirty {
      .higlight-row(#f56c6c);
    }
    &--clean {
      .higlight-row(#409eff);
    }
  }
  &__cell {
    &--dirty {
      color: #f56c6c !important;
    }
    &--clean {
      color: #409eff !important;
    }
  }
}
</style>
