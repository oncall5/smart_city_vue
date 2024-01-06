<template>
    <div class="container">
        <el-form inline="true" :v-model="test">
            <el-form-item label="检测数据量">
                <el-input v-model="test.sumdata" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="检测出的异常点数">
                <el-input v-model="test.detection" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="未检测出的异常点数">
                <el-input v-model="test.undetection" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="检测异常点错误数">
                <el-input v-model="test.misdetection" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="召回率">
                <el-input v-model="test.recall" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="精确率">
                <el-input v-model="test.precision" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="F1">
                <el-input v-model="test.F1" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="绝对误差">
                <el-input v-model="test.error" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="相对误差">
                <el-input v-model="test.erroravg" placeholder=""></el-input>
            </el-form-item>
        </el-form>

        <el-card style="width: 100%;height:1000px;">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <!--      <button @click="addtime">start</button>-->
            <!--      <button @click="stop">stop</button>-->
            <div id="main" style="width: 100%;height:900px;"></div>
            <div class="block">
                <el-date-picker
                        v-model="choicetime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="changetime">
                </el-date-picker>
            </div>
        </el-card>

    </div>

</template>

<script>
    import axios from 'axios'

    var echarts = require('echarts')
    export default {
        data () {
            return {
                sign:"",
                option:{},
                temperaturestarget:{},
                test:{},
                alldata:[],
                datavalue:[
                ],
                choicetime:[],
                dirtydata:[],
                xData:[],
                today:{start:new Date()-60*60*1000,
                    end:new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 -1
                }
            }
        },
        created() {
            this.getoneday()
            this.sign=1
        },
        mounted(){
            this.chartLine = echarts.init(document.getElementById('main'));
            //折线图数据
//x轴坐标数据

            this.today.end=new Date()
            this.xData=[{ name: 'head', value: [this.today.start, 0] },
                { name: 'end', value: [this.today.end, 0] }]

            this.option = {
                tooltip: {              //设置tip提示
                    trigger: 'axis'
                },
                legend: {               //设置区分（哪条线属于什么）
                    data:['CO2','dirtyCO2']
                },
                grid: {
                    x:50,
                    y:50,
                    x2:50,
                    y2:50
                },
                xAxis: {
                    type: 'time',
                    splitNumber: 5, //可以通过它控制x轴显示的坐标轴的数量
                    splitLine: {
                        show: false
                    },
                    label:{
                        show: false
                    },
                    axisLabel:{
                        interval:30, //加入axisLabel字段,interval后面加你想要间隔的个数
                    }
                },
                yAxis: {
                    type: 'value',
                    //min: 1, //当每条数据之间相差很小，折线图波动不明显时，我们可以设置最小值。
                    boundaryGap: ['0', '20%'],
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name:'CO2',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: this.datavalue,
                    itemStyle: {
                        normal: {
                            color: "#00BB00",
                            lineStyle:{
                                color:'#00BB00',
                                width:2,
                                //type:'dotted'
                            }
                        }
                    }
                },
                    {
                        name:'dirtyCO2',
                        type: 'line',
                        symbol: 'circle',//折线点设置为实心点
                        symbolSize: 4,   //折线点的大小
                        //隐藏点
                        //showSymbol: false,
                        hoverAnimation: false,
                        data: this.dirtydata,
                        itemStyle: {
                            normal: {
                                color: "#ff0000",//折线点的颜色
                                lineStyle:{
                                    color:'#ff0000',
                                    width:0,
                                    type:'dotted'
                                }
                            }
                        }
                    },
                    // {
                    //   type: 'line',
                    //   showSymbol: false,
                    //   data: xData,
                    //   itemStyle: { normal: { opacity: 0 } },
                    //   lineStyle: { normal: { opacity: 0 } }
                    // }
                ]
            };
            this.chartLine.setOption(this.option);
        },
        computed: {
            // 计算属性
            getDate() { return this.sign },
        },
        watch:{
            getDate: function (sign) {
                if(sign==1){
                    this.timer = window.setInterval(() => {
                        window.setTimeout(this.addtime, 0)
                    }, 1000)
                }
                if (sign ==0) {
                    window.clearInterval(this.timer)
                }
                // 当页面关闭的时候,结束轮询,否则就会一直发请求,
                //使用$once(eventName, eventHandler)一次性监听事件
                this.$once('hook:boforeDestory', () => {
                    window.clearInterval(this.timer)
                    this.stop()
                })
            }
        },
        methods:{
            start(){
                this.addtime()
            },
            addtime(){
                var nowtime=parseInt(new Date().getTime()/1000-3)*1000;
                axios.get('/sensor/co2/co20001/oneco2',{params:{time:nowtime}}).then(res=>{
                    //console.log(res.data)
                    if(res.data==""){console.log("无数据")}
                    else{this.alldata.push(res.data)}
                    //console.log(this.alldata)
                    while(this.alldata.length>30){this.alldata.shift()}
                    this.temperaturestarget.detection=0
                    this.temperaturestarget.undetection=0
                    this.temperaturestarget.misdetection=0
                    this.temperaturestarget.errorsum=0
                    this.temperaturestarget.erroravg=0
                    //数据总量
                    this.temperaturestarget.sumdata=this.alldata.length
                    this.datavalue.splice(0,this.datavalue.length)
                    this.dirtydata.splice(0,this.dirtydata.length)
                    this.setdata()
                })
            },
            stop(){
                this.sign=0;
            },
            quote(){
                this.chartLine.setOption(this.option);
                this.$set(this.test,"sumdata",this.temperaturestarget.sumdata)
                this.$set(this.test,"detection",this.temperaturestarget.detection)
                this.$set(this.test,"undetection",this.temperaturestarget.undetection)
                this.$set(this.test,"misdetection",this.temperaturestarget.misdetection)
                this.$set(this.test,"recall",(this.temperaturestarget.detection/(this.temperaturestarget.detection+this.temperaturestarget.undetection)).toFixed(4))
                this.$set(this.test,"precision",(this.temperaturestarget.detection/(this.temperaturestarget.detection+this.temperaturestarget.misdetection)).toFixed(4))
                this.$set(this.test,"F1",(2*this.temperaturestarget.detection/
                    (2*this.temperaturestarget.detection+this.temperaturestarget.misdetection+this.temperaturestarget.undetection)).toFixed(4))
                if(this.temperaturestarget.detection==0){
                    this.$set(this.test,"error",0)
                    this.$set(this.test,"erroravg",0)
                }
                else{
                    this.$set(this.test,"error",(this.temperaturestarget.errorsum/this.temperaturestarget.detection).toFixed(3))
                    this.$set(this.test,"erroravg",(this.temperaturestarget.erroravg*100/this.temperaturestarget.detection).toFixed(3)+"%")
                }
            },
            setdata(){
                for(var i in this.alldata){
                    if(this.alldata[i].detectionresult){
                        this.dirtydata.push({ name: this.alldata[i].time, value: [this.alldata[i].time, this.alldata[i].dirtydata] },)
                        this.datavalue.push({ name: this.alldata[i].time, value: [this.alldata[i].time, this.alldata[i].repairdata] },)
                        this.temperaturestarget.errorsum=this.temperaturestarget.errorsum+Math.abs(this.alldata[i].cleandata-this.alldata[i].repairdata)
                        this.temperaturestarget.erroravg=this.temperaturestarget.erroravg+Math.abs(this.alldata[i].cleandata-this.alldata[i].repairdata)/this.alldata[i].cleandata
                        if(this.alldata[i].dirtydata!=this.alldata[i].cleandata){this.temperaturestarget.detection=this.temperaturestarget.detection+1}
                        else{this.temperaturestarget.misdetection=this.temperaturestarget.misdetection+1}
                    }
                    else {
                        this.datavalue.push({ name: this.alldata[i].time, value: [this.alldata[i].time, this.alldata[i].cleandata] },)
                        if(this.alldata[i].dirtydata!=this.alldata[i].cleandata){this.temperaturestarget.undetection=this.temperaturestarget.undetection+1}
                    }
                }
            },
            changetime(){
                this.sign=0
                this.today.start=this.choicetime[0].getTime()
                this.today.end=this.choicetime[1].getTime()
                this.alldata.splice(0,this.datavalue.length)
                this.alldata.splice(0,this.dirtydata.length)
                this.getoneday()
            },
            getoneday(){
                axios.get('/sensor/co2/co20001/co2',{params:{starttime:this.today.start,endtime:this.today.end}}).then(res=>{
                    //console.log(res)
                    //指标
                    this.temperaturestarget.detection=0
                    this.temperaturestarget.undetection=0
                    this.temperaturestarget.misdetection=0
                    this.temperaturestarget.errorsum=0
                    this.temperaturestarget.erroravg=0
                    this.alldata=res.data
                    //数据总量
                    this.temperaturestarget.sumdata=this.alldata.length
                    this.temperaturestarget.alldata=res.data.length
                    this.dirtydata.splice(0,this.dirtydata.length)
                    this.datavalue.splice(0,this.datavalue.length)
                    this.setdata()
                    this.chartLine.setOption(this.option);

                    this.quote()
                })
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
