<script>
import axios from '@/api/axios.js'

export default {
  methods: {
    async fetchSreachResult(url, queryInfo, rule) {
      const { data } = await axios.post(url, rule, {
        headers: { 'Content-Type': 'application/json;charset=utf-8;' },
        params: {
          page: queryInfo.page,
          pageSize: queryInfo.pageSize,
        },
      })
      return data
    },
    async searchByRule(url, queryInfo, rule, fields) {
      if (rule?.length === 0) return []
      const { code, data, msg } = await this.fetchSreachResult(
        url,
        queryInfo,
        rule
      )
      if (code === '0') {
        const { labelInfo } = data
        fields = fields.map((f) => f + 'Label')
        return (
          labelInfo
            ?.filter((item) => item.label !== 0)
            ?.map((item) => {
              return {
                isDirtyData: item.label < 0,
                id: item.id,
                dirtyFields: this.filterFields(fields, (f) => item[f] < 0),
                cleanFields: this.filterFields(fields, (f) => item[f] > 0),
              }
            }) ?? []
        )
      }
      if (code === '1') {
        throw new Error(msg)
      }
      throw new Error('服务器异常')
    },
    filterFields(fields, filter) {
      return fields.filter(filter).map((f) => f.replace('Label', ''))
    },
  },
}
</script>
