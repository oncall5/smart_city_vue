<template>
    <div :id="id" :style="chartSize" ref="chartRef">
    </div>
</template>

<script>
  const echarts = require('echarts');
  export default {
    name: "zhijiangChart",
    props: ['id', 'optionData', "width", "height"],
    data() {
      return {
        chartSize: {
          width: this.width ? this.width : "500px",
          height: this.height ? this.height : "500px"
        },
        option: {
          title: {
            text: this.optionData.name,
          },
          tooltip: {              //设置tip提示
            trigger: 'axis'
          },
          legend: {               //设置区分（哪条线属于什么）
            // data: [ '正常数据','异常数据', '修复数据']
            data:[{
              name:'正常数据',
              textStyle:{
                color:'#ffd04b'
              }
            },{
              name:'异常数据',
              textStyle:{
                color:'#ffd04b'
              }
            },{
              name:'修复数据',
              textStyle:{
                color:'#ffd04b'
              }
            }]
          },
          grid: {
            x: 50,
            y: 50,
            x2: 50,
            y2: 50
          },
          xAxis: {
            type: 'time',
            splitNumber: 5, //可以通过它控制x轴显示的坐标轴的数量
            splitLine: {
              show: false
            },
            label: {
              show: false
            },
            axisLabel: {
              interval: 30, //加入axisLabel字段,interval后面加你想要间隔的个数
              textStyle:{
                color:'#ffd04b'
              }
            }
          },
          yAxis: {
            type: 'value',
            //min: 1, //当每条数据之间相差很小，折线图波动不明显时，我们可以设置最小值。
            boundaryGap: ['0', '20%'],
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle:{
                color:'#ffd04b'
              }
            }
          },
          series: [
            {
              name: '修复数据',
              type: 'line',
              symbol: 'circle',//折线点设置为实心点
              symbolSize: 8,   //折线点的大小
              // showSymbol: false,
              hoverAnimation: false,
              data: this.optionData.repairData,
              itemStyle: {
                normal: {
                  color: "#00BB00",
                  lineStyle: {
                    color: '#00BB00',
                    width: 0,
                    type:'dotted'
                  }
                }
              }
            },
            {
              name: '异常数据',
              type: 'line',
              symbol: 'circle',//折线点设置为实心点
              symbolSize: 8,   //折线点的大小
              //隐藏点
              //showSymbol: false,
              hoverAnimation: false,
              data: this.optionData.dirtyData,
              itemStyle: {
                normal: {
                  color: "#ff0000",//折线点的颜色
                  lineStyle: {
                    color: '#ff0000',
                    width: 0,
                    type: 'dotted'
                  }
                }
              }
            },
              {
                  name: '正常数据',
                  type: 'line',
                  symbol: 'circle',//折线点设置为实心点
                  symbolSize: 4,   //折线点的大小
                  //隐藏点
                  //showSymbol: false,
                  hoverAnimation: false,
                  data: this.optionData.data,
                  itemStyle: {
                      normal: {
                          color: "#001aff",//折线点的颜色
                          lineStyle: {
                              color: '#001aff',
                              width: 2,
                              type: 'dotted'
                          }
                      }
                  }
              },
          ]
        },
        chart:null
      }
    },
    methods: {
      refresh(val){
        //刷新数据
        let option = this.chart.getOption();
        option.series[0].data = val.repairData;
        option.series[1].data = val.dirtyData;
          option.series[2].data = val.data;
        this.chart.setOption(option);

      },
      addChart() {
        this.chart = echarts.init(this.$refs.chartRef);
        this.chart.setOption(this.option)
      },
    },
    mounted() {

      this.addChart();
    }
  }
</script>

<style scoped>

</style>
