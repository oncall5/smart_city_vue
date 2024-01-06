<template>
    <div>
      <h3>云边协同与云端清洗方法对比</h3>
      <el-row gutter="8">
        <el-col :span="8">
          <div id="chart01" style="height:400px;"></div>
        </el-col>
        <el-col :span="8">
          <div id="chart02" style="height:400px;"></div>
        </el-col>
        <el-col :span="8">
          <div id="chart03" style="height:400px;"></div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <div id="chart04" style="width: 600px;height:400px;"></div>
        </el-col>
        <el-col :span="8">
          <div id="chart05" style="width: 600px;height:400px;"></div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  var echarts = require('echarts');
    export default {
        data(){
            return{

            }
        },
      // 此时页面上的dom元素已经渲染完毕
        mounted(){
          // 基于准备好的dom，初始化echarts实例
          var myChart01 = echarts.init(document.getElementById('chart01'));
          // 指定图表的配置项和数据
          var option1 = {
            title: {
              text: '召回率对比'
            },
            tooltip: {},
            legend: {
              data:['召回率']
            },
            xAxis: {
              data: ["云边协同","云端"]
            },
            yAxis: {},
            series: [{
              name: '召回率',
              type: 'bar',
              data: [85, 80]
            }]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart01.setOption(option1);

          var myChart02 = echarts.init(document.getElementById('chart02'));
          var option2 = {
            title: {
              text: '精确率对比'
            },
            tooltip: {},
            legend: {
              data:['精确率']
            },
            xAxis: {
              data: ["云边协同","云端"]
            },
            yAxis: {},
            series: [{
              name: '精确率',
              type: 'bar',
              data: [88, 82]
            }]
          };
          myChart02.setOption(option2);

          var myChart03 = echarts.init(document.getElementById('chart03'));
          var option3 = {
            title: {
              text: '时间对比'
            },
            tooltip: {},
            legend: {
              data:['时间(s)']
            },
            xAxis: {
              data: ["云边协同","云端"]
            },
            yAxis: {},
            series: [{
              name: '时间(s)',
              type: 'bar',
              data: [70, 90]
            }]
          };
          myChart03.setOption(option3);

          var myChart04 = echarts.init(document.getElementById('chart04'));
          var option4 = {
            title: {
              text: '不同数据量清洗效果对比'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['云边协同', '云端']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: [2000, 4000, 6000, 8000, 10000, 12000, 14000]
            },
            yAxis: {
              type: 'value',
              min:0,
              max:100,
              axisLabel: {
                formatter: '{value} %'
              },
              name:'F1'
            },
            series: [
              {
                name: '云边协同',
                type: 'line',
                stack: '总量1',
                data: [40, 46, 57, 69, 70, 82, 85]
              },
              {
                name: '云端',
                type: 'line',
                stack: '总量2',
                data: [38, 42, 50, 55, 68, 79, 82]
              }
            ]
          };
          myChart04.setOption(option4);
        }
    }
</script>

<style scoped>

</style>
