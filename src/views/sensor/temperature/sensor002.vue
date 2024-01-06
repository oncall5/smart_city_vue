<template>
  <div class="container">
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 800px;height:400px;"></div>
    </el-card>
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div class="tem-label">
        <h1 style="text-align: center">温度实时表</h1>
        <el-table
          :data="tableData"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="clock"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="temperature"
            label="温度">
          </el-table-column>
          <el-table-column
            prop="new_temperature"
            label="修改温度">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>

</template>

<script>

  var echarts = require('echarts')
  export default {
    data () {
      return {
        tableData: [{
          date: '2016-05-03',
          clock: '11：01',
          temperature: '8',
          new_temperature: '8'
        }, {
          date: '2016-05-02',
          clock: '11：02',
          temperature: '8',
          new_temperature: '8'
        }, {
          date: '2016-05-04',
          clock: '11：03',
          temperature: '8',
          new_temperature: '8'
        }, {
          date: '2016-05-01',
          clock: '11：04',
          temperature: '8',
          new_temperature: '8'
        }, {
          date: '2016-05-08',
          clock: '11：05',
          temperature: '8',
          new_temperature: '8'
        }, {
          date: '2016-05-06',
          clock: '11：06',
          temperature: '8',
          new_temperature: '8'
        }, {
          date: '2016-05-07',
          clock: '11：07',
          temperature: '8',
          new_temperature: '8'
        }],
      }
    },
    created() {
    },
    mounted(){
      this.chartLine = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },

        legend: {               //设置区分（哪条线属于什么）
          data:['原始温度','修改温度']
        },
        color: ['#8AE09F', '#FA6F53'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {                //设置x轴
          type: 'category',
          boundaryGap: false,     //坐标轴两边不留白
          data: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',],
          name: 'TIME',           //X轴 name
          nameTextStyle: {        //坐标轴名称的文字样式
            color: '#FA6F53',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {             //坐标轴轴线相关设置。
            lineStyle: {
              color: '#FA6F53',
            }
          }
        },
        yAxis: {
          name: 'temperature',
          nameTextStyle: {
            color: '#FA6F53',
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#FA6F53',
            }
          },
          type: 'value'
        },
        series: [
          {
            name: '原始温度',
            data:  [8, 9, 10, 12, 15, 4, 13],
            type: 'line',               // 类型为折线图
            lineStyle: {                // 线条样式 => 必须使用normal属性
              normal: {
                color: '#8AE09F',
              }
            },
          },
          {
            name: '修改温度',
            data: [8, 9, 10, 12, 15, 14, 13],
            type: 'line',
            lineStyle: {
              normal: {
                color: '#FA6F53',
              }
            },
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option);
    },
    methods: {}
  }
</script>
<style lang="less" scoped>

</style>
