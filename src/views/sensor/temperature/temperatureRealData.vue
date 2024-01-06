<template>
    <div class="container">
        <el-card>
            <condition ref="conditionRef"></condition>
        </el-card>
        <el-card>
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div style="display: flex">
                <lineChart :id="id" :option-data="chartOptionData" style="width: 80%" ref="lineChartRef"></lineChart>
                <div style="display: flex;flex-flow: column;width: 20%">
                    <el-date-picker
                            style="width: 100%"
                            v-model="choicetime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="timestamp"
                            @change="changeTime"
                    >
                    </el-date-picker>
                </div>
            </div>
            <div style="display: flex;justify-content: space-evenly">
                <el-input-number v-model="num" :min="1" :max="60" label="分钟"></el-input-number>
<!--                <el-button type="primary" @click="changeTime">获取实时数据</el-button>-->
            </div>
        </el-card>
        <el-card>
            <div class="tem-label">
                <h1 style="text-align: center">数据表</h1>
                <el-table
                        :data="tableData"
                        height="250"
                        max-height="400"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="sensorname"
                            label="设备名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="starttime"
                            label="时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="cleandata"
                            label="原始值">
                    </el-table-column>
                    <el-table-column
                            prop="conversiondata"
                            label="华氏度">
                    </el-table-column>
                    <el-table-column
                            prop="dirtydata"
                            label="待检测数据">
                    </el-table-column>
                    <el-table-column
                            prop="repairdata"
                            label="修复值">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
  import lineChart from '@/components/echartsGraphs/line/lineChart'
  import axios from '@/api/axios.js';
  import {comm} from "../../../global/common";
  import {transofrmTime} from "../../../utils/time";
  import condition from '../../../components/condition'

  export default {
    name: "temperatureRealData",
    components: {
      lineChart,
      condition
    },
    data() {
      return {
        choicetime: null,
        id: 'line',
        tableData: [],
        chartOptionData: {
          name: this.deviceName,
          cleanData: [],
          dirtyData: []
        },
        deviceName: this.$route.params.name,
        //0获取实时数据 1获取时间段数据
        mode: 0,
        fn: null,
        num: 1
      }
    },
    created() {
      console.log(this.deviceName)
        console.log(4444444444444444)
    },

    methods: {
      changeTime() {

        this.getDataByFixedTime();
      },
      buttonClick() {
        this.getDataByRealTime();
      },
      //获取实时数据
      getDataByRealTime() {
        let currTime = new Date().getTime();
        let params = {
          sensorname: this.deviceName,
          endtime: parseInt(currTime / 1000),
          starttime: parseInt(currTime / 1000) - 60 * this.num
        };
        this.getData(params);
        console.log(params)
      },
      //获取固定时间数据
      getDataByFixedTime() {
        let params = {
          sensorname: this.deviceName,
          starttime: this.choicetime[0] / 1000,
          endtime: this.choicetime[1] / 1000
        };
        this.getData(params);
      },
      //获取数据
      getData(params) {
        axios.$get(comm.WEB_URL + 'testdata/datalist', params).then(res => {
          this.chartOptionData.cleanData = [];
          this.chartOptionData.dirtyData = [];

          res.forEach(item => {
            //数据没有错误
            if (item.detectionresult === 0) {
              this.chartOptionData.cleanData.push([item.repairtime * 1000, item.cleandata])
            } else {
              this.chartOptionData.cleanData.push([item.repairtime * 1000, item.repairdata]);
              this.chartOptionData.dirtyData.push([item.repairtime * 1000, item.dirtydata])
            }
          });
          res.forEach(item => {
            item.starttime = transofrmTime(item.starttime)
          });
          this.tableData = res;

          this.$refs.lineChartRef.refresh(this.chartOptionData);
          let params1 = {
            sensorType: params.sensorname,
            startTime: params.starttime,
            endTime: params.endtime
          }

          axios.$get(comm.WEB_URL + 'test/sensorTestQuote', params1).then(res => {
            res.startTime = params1.startTime;
            res.endTime = params1.endTime;
            this.$refs.conditionRef.updateData(res)
          })
        })
      }
    },

  }
</script>

<style scoped>

</style>
