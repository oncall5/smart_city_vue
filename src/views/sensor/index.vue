<template>
  <div style="height: 100%">
    <div class="container">
      <!-- <el-card>
      <condition ref="conditionRef"></condition>
    </el-card> -->
      <el-card class="operator__card">
        <div class="operator__container">
          <el-date-picker
            v-model="selectTimes"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          >
          </el-date-picker>
          <el-select v-model="sensorType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="openDialog">配置清洗算法</el-button>
          <div class="operator__calc">
            <el-button
              type="primary"
              :disabled="!conditions.avaliable"
              @click="isResultPanelShow = true"
              >清洗结果
            </el-button>
            <el-button type="primary" @click="buttonClick" :disabled="loading">
              <div v-if="!loading">计算指标</div>
              <div v-else>
                <div class="operator__calc__loading">
                  <i class="el-icon-loading"></i>
                </div>
                计算大约需要{{ queryTime }}分钟
              </div>
            </el-button>
          </div>
        </div>
      </el-card>
      <el-card class="table__card" body-style="height:93%">
        <el-table :data="datas" class="table">
          <el-table-column prop="sensorname" label="设备名称">
          </el-table-column>
          <el-table-column prop="starttime" label="时间"> </el-table-column>
          <el-table-column prop="cleaningtime" label="清洗用时/秒">
          </el-table-column>
          <el-table-column prop="dirtydata" label="接收值"> </el-table-column>
          <el-table-column prop="cleandata" label="原始值"> </el-table-column>
          <el-table-column prop="detectionresult" label="检测结果">
          </el-table-column>
          <el-table-column prop="repairdata" label="修复值"> </el-table-column>
        </el-table>
        <div class="table__pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pageNum"
            :page-size="queryInfo.pagesize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryInfo.total"
            style="margin: 0"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
    <el-dialog title="配置清洗参数" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="清洗算法" label-width="80">
          <el-select v-model="form.algorithm" placeholder="请选择活动区域">
            <el-option label="离群点检测+LSTM修复" value="0"></el-option>
            <el-option label="离群点检测+插值修复" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top: 60px">
          <el-button type="primary" @click="startClean">选择该算法</el-button>
          <el-button type="info" style="float: right" @click="closeDialog"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <result-panel
      :visible.sync="isResultPanelShow"
      :raw-data="conditions"
      :columns="2"
    ></result-panel>
  </div>
</template>

<script>
import ResultPanel from '../../components/ResultPanel'
import axios from '@/api/axios.js'
import { comm } from '../../global/common'
import { transofrmTime } from '../../utils/time'

export default {
  name: 'index',
  components: {
    ResultPanel,
  },
  data() {
    return {
      form: {
        algorithm: '1',
      },
      dialogVisible: false,
      queryTime: null,
      loading: false,
      sensorType: 'all',
      selectTimes: [],
      options: [
        { value: 'all', label: '所有传感器' },
        { value: 'distance', label: '距离' },
        { value: 'temperature', label: '激光温度' },
        { value: 'pm2_5', label: 'PM2.5' },
        { value: 'pm10', label: 'PM10' },
        { value: 'pressure', label: '压力' },
        { value: 'ch1', label: '温度1' },
        { value: 'ch2', label: '温度2' },
        { value: 'ch3', label: '温度3' },
        { value: 'ch4', label: '温度4' },
        { value: 'co2', label: '二氧化碳' },
      ],
      fn: null,
      num: 2,
      queryInfo: {
        // 当前页数
        pageNum: 1,
        // 每页显示多少数据
        pageSize: 10,
        total: 0,
      },
      datas: [],
      conditions: {
        data: undefined,
        avaliable: false,
      },
      isResultPanelShow: false,
    }
  },
  methods: {
    //发送清洗开始请求
    startClean() {
      let params = {
        tag: this.form.algorithm,
      }
      axios
        .$get(comm.WEB_URL + '/choosealgorithm', params)
        .then((res) => {
          console.log(res)
        })

      this.dialogVisible = false
      return this.$message.success('配置成功')
    },
    //关闭清洗配置对话框
    closeDialog() {
      this.dialogVisible = false
    },
    //打开清洗配置对话框
    openDialog() {
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
      this.queryDatas()
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.queryDatas()
    },
    queryDatas() {
      // let currTime = new Date().getTime()
      let parmas = {
        sensorType: this.sensorType,
        startTime: this.selectTimes[0] / 1000,
        endTime: this.selectTimes[1] / 1000,
        page: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
      }
      axios.$get(comm.WEB_URL + 'testdata/datas', parmas).then((res) => {
        res.forEach((item) => {
          item.starttime = transofrmTime(item.starttime)
        })
        this.datas = res
      })
    },
    //时间选择事件
    // changeTime() {
    //   this.getDataByFixedTime();
    // },
    //按钮点击事件
    buttonClick() {
      this.getDataByFixedTime()
    },
    //获取指定时间数据
    getDataByFixedTime() {
      if (this.selectTimes.length < 2) {
        return this.$message.error('请选择时间')
      }
      let parmas = {
        sensorType: this.sensorType,
        startTime: this.selectTimes[0] / 1000,
        endTime: this.selectTimes[1] / 1000,
      }
      this.queryTime = (
        ((parmas.endTime - parmas.startTime) / 3600) *
        4
      ).toFixed(2)
      this.getData(parmas)
    },
    //获取实时数据
    getDataByRealTime() {
      let currTime = new Date().getTime()
      let parmas = {
        sensorType: this.sensorType,
        startTime: parseInt(currTime / 1000) - 60 * this.num,
        endTime: parseInt(currTime / 1000),
      }
      this.getData(parmas)
    },
    //获取指标数据
    getData(parmas) {
      this.loading = true
      this.conditions.avaliable = false
      axios
        .$get(comm.WEB_URL + 'test/typeTestQuote', parmas)
        .then((res) => {
          this.queryInfo.total = res.typeDataCount
          res.startTime = parmas.startTime
          res.endTime = parmas.endTime
          this.fetchCondition(res)
          this.$message.success('查询成功!!!')
          this.queryInfo.pageNum = 1
          this.queryDatas()
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    fetchCondition(val) {
      let conditions = {}
      conditions.total = val.typeDataCount
      conditions.realDirtyData = val.typeDirtyDataCount
      conditions.checkedDirtyData = val.typeRightDetectionDataCount
      conditions.repairData = val.typeRepairSuccessDataCount
      conditions.startTime = val.startTime
      conditions.endTime = val.endTime
      conditions.delay = val.typeDataDelay
      conditions.conversion = val.typeConversion

      conditions.delay = (conditions.delay / conditions.total).toFixed(2)
      conditions.cleanSpeed = (
        conditions.total /
        (conditions.endTime - conditions.startTime)
      ).toFixed(2)
      conditions.repair = (
        (conditions.repairData / conditions.checkedDirtyData) *
        100
      ).toFixed(2)
      conditions.detection = (
        (conditions.checkedDirtyData / conditions.realDirtyData) *
        100
      ).toFixed(2)
      conditions.startTime = transofrmTime(conditions.startTime)
      conditions.endTime = transofrmTime(conditions.endTime)

      this.conditions.data = [
        { name: '开始时间', value: conditions.startTime },
        { name: '结束时间', value: conditions.endTime },
        { name: '数据量', value: conditions.total },
        { name: '脏数据量', value: conditions.realDirtyData },
        { name: '检测数据量', value: conditions.checkedDirtyData },
        { name: '修复数据量', value: conditions.repairData },
        { name: '清洗速度', value: conditions.cleanSpeed, unit: '条/s' },
        { name: '清洗延迟', value: conditions.delay, unit: '秒' },
        { name: '检测率', value: conditions.detection, unit: '%' },
        { name: '修复率', value: conditions.repair, unit: '%' },
      ]
      this.conditions.avaliable = true
    },
  },
}
</script>

<style scoped lang="less">
.container {
  --operator-card-height: 80px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.operator {
  &__card {
    height: var(--operator-card-height);
  }
  &__container {
    display: flex;
    align-items: center;
    width: 100%;
    & > :not(:last-child) {
      margin-right: 16px;
    }
  }
  &__calc {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: auto;
    &__loading {
      display: inline;
      height: 100%;
      align-items: center;
    }
  }
}
.table {
  --pagination-height: 26px;
  min-height: calc(100% - var(--pagination-height) - 28px);
  margin-top: 0;
  &__card {
    flex: 1;
    overflow: scroll;
  }
  &__pagination {
    margin: 10px 0;
    height: var(--pagination-height);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
