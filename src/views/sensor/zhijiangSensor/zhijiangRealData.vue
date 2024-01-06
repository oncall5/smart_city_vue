<template>
  <div class="container">
    <!--        <el-card>-->
    <!--            <condition ref="conditionRef"></condition>-->
    <!--        </el-card>-->
    <el-card class="chart" style="text-align: center">
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <h1 style="margin: 0 0 15px 0">
        {{ deviceMap[deviceName] + '：' + cmdMap[cmd] }}
      </h1>
      <div style="display: flex">
        <lineChart
          :id="id"
          :option-data="chartOptionData"
          style="width: 60%;height: 60vh;"
          ref="lineChartRef"
        ></lineChart>
        <div style="display: flex; justify-content: center; width: 40%">
          <el-date-picker
            style="width: 50%"
            class="pick"
            v-model="choicetime"
            type="datetimerange"
            range-separator="——"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="getDataByFixedTime"           
          >
          </el-date-picker>
        </div>
      </div>
      <div style="display: flex; justify-content: space-evenly;width: 60%;">
        <el-input-number
          class="inumber"
          v-model="num"
          :min="1"
          :max="60"
          label="分钟"
        ></el-input-number>
        <el-button type="info" @click="handleRealTimeBtnClick" >{{
          isFetchingRealTimeData ? '停止获取实时数据' : '获取实时数据'
        }}</el-button>
      </div>
    </el-card>
    <el-card class="datacard" :body-style="{ padding: '0px' }">
      <!-- <div class="tem-label"> -->
        <!-- <h1 style="text-align: center;color:#ffd04b ;">数据实时表</h1> -->
        <el-table
          :data="tableData"
          max-height="40vh"
          style="background-color: #367384;margin: 0;width: 100%;"
          :header-cell-style="{'background-color': '#367384','text-align': 'center','color':'#ffd04b'}"
          :cell-style="{'background-color': '#367384','text-align': 'center','color':'#ffd04b'}"
        >
          <el-table-column prop="sensorname" label="设备名"> </el-table-column>
          <el-table-column prop="starttime" label="时间"> </el-table-column>
          <el-table-column prop="dirtydata" label="待检测数据">
          </el-table-column>
          <el-table-column prop="repairdata" label="修复值"> </el-table-column>
        </el-table>
      <!-- </div> -->
    </el-card>
  </div>
</template>

<script>
import lineChart from '@/components/echartsGraphs/line/zhijiangChart'
import axios from '@/api/axios.js'
import { comm } from '../../../global/common'
import { deviceMap, cmdMap } from '../../../global/deviceMap'
import { transofrmTime } from '../../../utils/time'
// import condition from '../../../components/condition'

export default {
  name: 'zhijiangRealData',
  components: {
    lineChart,
    // condition
  },
  data() {
    return {
      choicetime: null,
      id: 'line',
      tableData: [],
      chartOptionData: {
        name: this.deviceName,
        repairData: [],
        dirtyData: [],
        data: [],
      },
      deviceName: '',
      cmd: '',
      //0获取实时数据 1获取时间段数据
      mode: 0,
      fn: null,
      num: 1,
      timer: null,
      deviceMap,
      cmdMap,
    }
  },
  created() {},
  mounted() {
    const { name, cmd } = this.$route.query
    this.deviceName = name
    this.cmd = cmd
  },
  beforeRouteLeave(to, from, next) {
    next()
    this.stopFetchingData()
  },
  beforeDestroy() {
    this.stopFetchingData()
  },
  methods: {
    handleRealTimeBtnClick() {
      if (this.isFetchingRealTimeData) {
        this.stopFetchingData()
      } else {
        this.timer = window.setInterval(() => {
          this.getDataByRealTime()
        }, 1000)
      }
    },
    stopFetchingData() {
      window.clearInterval(this.timer)
      this.timer = undefined
    },
    buttonClick() {
      this.getDataByRealTime()
    },
    //获取实时数据
    getDataByRealTime() {
      let currTime = new Date().getTime()
      let params = {
        sensorname: this.deviceName,
        cmd: this.cmd,
        endtime: parseInt(currTime / 1000),
        starttime: parseInt(currTime / 1000) - 60 * this.num,
      }
      this.getData(params)
    },
    //获取固定时间数据
    getDataByFixedTime() {
      let params = {
        sensorname: this.deviceName,
        cmd: this.cmd,
        starttime: this.choicetime[0] / 1000,
        endtime: this.choicetime[1] / 1000,
      }
      this.getData(params)
    },
    //获取数据
    getData(params) {
      axios.$get(comm.WEB_URL + 'testdatareal/datalist', params).then((res) => {
        this.chartOptionData.repairData = []
        this.chartOptionData.dirtyData = []
        this.chartOptionData.data = []

        res.forEach((item) => {
          //数据没有错误
          if (item.detectionresult === 0) {
            this.chartOptionData.data.push([
              item.repairtime * 1000,
              item.repairdata,
            ])
          } else {
            this.chartOptionData.repairData.push([
              item.repairtime * 1000,
              item.repairdata,
            ])
            this.chartOptionData.dirtyData.push([
              item.repairtime * 1000,
              item.dirtydata,
            ])
          }
        })
        res.forEach((item) => {
          item.starttime = transofrmTime(item.starttime)
        })
        this.tableData = res

        this.$refs.lineChartRef.refresh(this.chartOptionData)
        // let params1 = {
        //   sensorType: params.sensorname,
        //   startTime: params.starttime,
        //   endTime: params.endtime
        // }

        // axios.$get(comm.WEB_URL + 'test/sensorTestQuote', params1).then(res => {
        //   res.startTime = params1.startTime;
        //   res.endTime = params1.endTime;
        //   this.$refs.conditionRef.updateData(res)
        // })
      })
    },
  },
  computed: {
    isFetchingRealTimeData() {
      return this.timer !== undefined && this.timer !== null
    },
  },
}
</script>

<style scoped>
/* 设置表格的背景色以及文字的颜色 */
.chart {
  /* background-color: #5a6570; */
  background-color: #4c5864;
  /* color: #5d7c9c; */
  color: #ffd04b;
  opacity: 0.75;
}
/* 设置日期选择器的背景色为透明，设置边框颜色以及阴影效果 */
::v-deep .pick.el-input__inner {
	  background-color: transparent !important;
	  border-color:#80ffff;
	  box-shadow: 1px 1px 5px 1px  RGB(128,255,255,0.8) inset;
	  height: 30px;
	}
/* 将pick类设置高度以及背景色 */
.pick {
  height: 30px;
  background-color:#4c5864;
}
/* 开始日期等背景透明化 */
::v-deep .el-range-input {
    background-color:transparent !important;
  }

::v-deep .el-input__icon {
    display: flex;
    align-items: center;
  }
::v-deep .el-date-editor .el-range-separator{
  display: flex;
  align-items: center;
  color: #ffd04b;
}
/* 加号按钮样式调整 */
::v-deep .el-input-number__increase{
  background-color: #4c5864;
  border-color:#80ffff;
  box-shadow: 1px 1px 8px 1px  RGB(128,255,255,0.8) inset;
}
/* 加号按钮文字样式调整 */
::v-deep .el-icon-plus:before{
  color: #ffd04b;
}
::v-deep .inumber .el-input__inner {
	  background-color: transparent !important;
	  border-color:#80ffff;
	  box-shadow: 1px 1px 5px 1px  RGB(128,255,255,0.8) inset;
	  /* height: 30px; */
    color: #ffd04b;
	}
/* 减号按钮样式修改 */
::v-deep .el-input-number__decrease{
  background-color: #4c5864;
  border-color:#80ffff;
  box-shadow: 1px 1px 8px 1px  RGB(128,255,255,0.8) inset;
}
/* 减号按钮文字样式修改 */
::v-deep .el-icon-minus:before{
  color: #ffd04b;
}
/* 获取实时数据按钮样式修改 */
::v-deep .el-button--info{
  color: #ffd04b;
  background-color: #4c5864;
  border-color:#80ffff;
  box-shadow: 1px 1px 8px 1px  RGB(128,255,255,0.8) inset;
}
/* 数据实时表样式调整 */
.datacard {
    position: absolute;
    border-color:#80ffff;
    box-shadow: 1px 1px 3px 1px  RGB(128,255,255,0.8) inset;
    margin: 0;
    right: 1vw;
    top: 30vh;
    z-index: 999;
    opacity: 0.65;
    width: 40%;
    /* max-height: 40vh;
    background-color: #367384; */
}
.el-table::before {
    height: 0;
}
::v-deep .datacard .el-card__body{
  padding: 0px;
  background-color: transparent !important;
  border-color:#80ffff;
  box-shadow: 1px 1px 8px 1px  RGB(128,255,255,0.8) inset;
}
/* 设置滚动快样式 */
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #353a3f;
    border-radius: 3px;
}
/* 设置滚动条样式 */
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
/* 隐藏表格头部多余的空白列 */
::v-deep .el-table th.gutter{
  display: none;
  width:0px
}
/* 隐藏表格主题的多余空白列 */
::v-deep .el-table colgroup col[name='gutter']{
  display: none;
  width: 0;
}
/* 强制表格主体填充整个宽度 */
::v-deep .el-table__body{
  width: 100% !important;
}
::v-deep .el-table__header-wrapper th {
    background-color: #367384;
}
::v-deep .el-table{
  margin-top: 0;
  /* background-color: transparent !important; */
  border-color:#80ffff;
  color: #ffd04b;
  box-shadow: 1px 1px 8px 1px  RGB(128,255,255,0.8) inset;
}

::v-deep .el-date-editor .el-range-input{
  color: #ffd04b;
}
</style>
