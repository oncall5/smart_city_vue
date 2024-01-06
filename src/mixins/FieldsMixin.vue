<script>
import axios from '@/api/axios.js'
import { zip } from 'lodash'
export default {
  data() {
    return {
      fieldMap: {
        cross_road_car: {
          ssid: '卡口编号',
          cdbh: '车道编号',
          fx: '方向',
        },
      },
    }
  },
  methods: {
    getFieldZh(tableName, field) {
      if (!(tableName in this.fieldMap)) return
      const tableFields = this.fieldMap[tableName]
      if (!(field in tableFields)) return
      return tableFields[field]
    },
    async fetchSupportedRule(tableName, field) {
      if (!this.isFieldValid(tableName, field)) return []
      return await axios.$get(this.comm.WEB_URL + '/fieldInfo/rule', {
        tableName,
        field,
      })
    },
    isFieldValid(tableName, field) {
      const fields = this.getFields(tableName)
      return fields.includes(field)
    },
    getFields(tableName) {
      if (!this.tableNames.includes(tableName)) return []
      return Object.keys(this.fieldMap[tableName])
    },
    async fetchSupportedFields(tableName) {
      return await axios.$get(this.comm.WEB_URL + '/fieldInfo', {
        tableName,
      })
    },
    async fetchSupportedRuleByFields(fields) {
      const rules = await Promise.all(
        fields.map(
          async (field) => await this.fetchSupportedRule(this.tableName, field)
        )
      )
      return zip(fields, rules).reduce((acc, [field, rule]) => {
        acc[field] = rule
        return acc
      }, {})
    },
  },
  computed: {
    tableNames() {
      return Object.keys(this.fieldMap)
    },
  },
}
</script>
