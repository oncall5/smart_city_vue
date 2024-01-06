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
                choicetime:[],
                test:{},
                alldata10:[],
                datavalue10:[],
                dirtydata10:[],
                alldata25:[],
                datavalue25:[],
                dirtydata25:[],
                xData:[],
                today:{start:new Date()-150*1000,
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
                    data:['距离','dirty距离']
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
                    name:'PM10',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: this.datavalue10,
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
                        name:'dirtyPM10',
                        type: 'line',
                        symbol: 'circle',//折线点设置为实心点
                        symbolSize: 4,   //折线点的大小
                        //隐藏点
                        //showSymbol: false,
                        hoverAnimation: false,
                        data: this.dirtydata10,
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
                    {
                        name:'PM2.5',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: this.datavalue25,
                        itemStyle: {
                            normal: {
                                color: "#2668ef",
                                lineStyle:{
                                    color:'#2668ef',
                                    width:2,
                                    //type:'dotted'
                                }
                            }
                        }
                    },
                    {
                        name:'dirtyPM2.5',
                        type: 'line',
                        symbol: 'circle',//折线点设置为实心点
                        symbolSize: 4,   //折线点的大小
                        //隐藏点
                        //showSymbol: false,
                        hoverAnimation: false,
                        data: this.dirtydata25,
                        itemStyle: {
                            normal: {
                                color: "#000000",//折线点的颜色
                                lineStyle:{
                                    color:'#000000',
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
                axios.get('/sensor/pm/pm0001/pm10data',{params:{time:nowtime}}).then(res=>{
                    //console.log(res.data)
                    if(res.data==""){console.log("无数据")}
                    else{this.alldata10.push(res.data)}
                    //console.log(this.alldata)
                    while(this.alldata10.length>30){this.alldata10.shift()}
                    this.temperaturestarget.detection=0
                    this.temperaturestarget.undetection=0
                    this.temperaturestarget.misdetection=0
                    this.temperaturestarget.errorsum=0
                    this.temperaturestarget.erroravg=0
                    //数据总量
                    this.temperaturestarget.sumdata=this.alldata10.length
                    this.datavalue10.splice(0,this.datavalue10.length)
                    this.dirtydata10.splice(0,this.dirtydata10.length)

                    // console.log(this.datavalue.length)
                    // console.log(this.datavalue)
                    this.setdataPM10()
                    this.chartLine.setOption(this.option);
                })
                nowtime=parseInt(new Date().getTime()/1000-3)*1000;
                axios.get('/sensor/pm/pm0001/pm25data',{params:{time:nowtime}}).then(res=>{
                    //console.log(res.data)
                    if(res.data==""){console.log("无数据")}
                    else{this.alldata25.push(res.data)}
                    //console.log(this.alldata)
                    while(this.alldata25.length>30){this.alldata25.shift()}
                    //数据总量
                    this.temperaturestarget.sumdata=this.alldata25.length+this.temperaturestarget.sumdata
                    this.datavalue25.splice(0,this.datavalue25.length)
                    this.dirtydata25.splice(0,this.dirtydata25.length)

                    // console.log(this.datavalue.length)
                    // console.log(this.datavalue)
                    this.setdataPM25()
                    this.chartLine.setOption(this.option);
                    this.quote();
                })
            },
            stop(){
                this.sign=0;
            },
            quote(){
                this.$set(this.test,"sumdata",this.temperaturestarget.sumdata)
                this.$set(this.test,"detection",this.temperaturestarget.detection)
                this.$set(this.test,"undetection",this.temperaturestarget.undetection)
                this.$set(this.test,"misdetection",this.temperaturestarget.misdetection)
                this.$set(this.test,"recall",(this.temperaturestarget.detection/
                    (this.temperaturestarget.detection+this.temperaturestarget.undetection)).toFixed(4))
                this.$set(this.test,"precision",(this.temperaturestarget.detection/
                    (this.temperaturestarget.detection+this.temperaturestarget.misdetection)).toFixed(4))
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
            setdataPM10(){
                var time=0
                for(var i in this.alldata10){
                    if(time!=this.alldata10[i].time)
                    {
                        if(this.alldata10[i].detectionresult){
                            this.dirtydata10.push({ name: this.alldata10[i].time, value: [this.alldata10[i].time, this.alldata10[i].dirtydata] },)
                            this.datavalue10.push({ name: this.alldata10[i].time, value: [this.alldata10[i].time, this.alldata10[i].repairdata] },)
                            this.temperaturestarget.errorsum=this.temperaturestarget.errorsum+Math.abs(this.alldata10[i].cleandata-this.alldata10[i].repairdata)
                            this.temperaturestarget.erroravg=this.temperaturestarget.erroravg+Math.abs(this.alldata10[i].cleandata-this.alldata10[i].repairdata)/this.alldata10[i].cleandata
                            if(this.alldata10[i].dirtydata!=this.alldata10[i].cleandata){this.temperaturestarget.detection=this.temperaturestarget.detection+1}
                            else{this.temperaturestarget.misdetection=this.temperaturestarget.misdetection+1}
                        }
                        else {
                            this.datavalue10.push({ name: this.alldata10[i].time, value: [this.alldata10[i].time, this.alldata10[i].cleandata] },)
                            if(this.alldata10[i].dirtydata!=this.alldata10[i].cleandata){this.temperaturestarget.undetection=this.temperaturestarget.undetection+1}
                        }
                    }
                    time=this.alldata10[i].time
                }
            },
            setdataPM25(){
                var time=0
                for(var i in this.alldata25){
                    if(time!=this.alldata25[i].time)
                    {
                        if(this.alldata25[i].detectionresult){
                            this.dirtydata25.push({ name: this.alldata25[i].time, value: [this.alldata25[i].time, this.alldata25[i].dirtydata] },)
                            this.datavalue25.push({ name: this.alldata25[i].time, value: [this.alldata25[i].time, this.alldata25[i].repairdata] },)
                            this.temperaturestarget.errorsum=this.temperaturestarget.errorsum+Math.abs(this.alldata25[i].cleandata-this.alldata25[i].repairdata)
                            this.temperaturestarget.erroravg=this.temperaturestarget.erroravg+Math.abs(this.alldata25[i].cleandata-this.alldata25[i].repairdata)/this.alldata25[i].cleandata
                            if(this.alldata25[i].dirtydata!=this.alldata25[i].cleandata){this.temperaturestarget.detection=this.temperaturestarget.detection+1}
                            else{this.temperaturestarget.misdetection=this.temperaturestarget.misdetection+1}
                        }
                        else {
                            this.datavalue25.push({ name: this.alldata25[i].time, value: [this.alldata25[i].time, this.alldata25[i].cleandata] },)
                            if(this.alldata25[i].dirtydata!=this.alldata25[i].cleandata){this.temperaturestarget.undetection=this.temperaturestarget.undetection+1}
                        }
                    }
                    time=this.alldata25[i].time
                }
            },
            changetime(){
                this.sign=0
                this.today.start=this.choicetime[0].getTime()
                this.today.end=this.choicetime[1].getTime()
                this.alldata10.splice(0,this.datavalue10.length)
                this.alldata10.splice(0,this.dirtydata10.length)
                this.alldata25.splice(0,this.datavalue25.length)
                this.alldata25.splice(0,this.dirtydata25.length)
                this.getoneday()
            },
            getoneday(){
                axios.get('/sensor/pm/pm0001/pm10datas',{params:{starttime:this.today.start,endtime:this.today.end}}).then(res=>{
                    //console.log(res)
                    //指标
                    this.temperaturestarget.detection=0
                    this.temperaturestarget.undetection=0
                    this.temperaturestarget.misdetection=0
                    this.alldata10=res.data
                    this.temperaturestarget.errorsum=0
                    this.temperaturestarget.erroravg=0
                    //数据总量
                    this.temperaturestarget.sumdata=this.alldata10.length
                    //this.temperaturestarget.alldata=res.data.length
                    this.dirtydata10.splice(0,this.dirtydata10.length)
                    this.datavalue10.splice(0,this.datavalue10.length)
                    this.setdataPM10()
                    this.chartLine.setOption(this.option);
                })
                axios.get('/sensor/pm/pm0001/pm25datas',{params:{starttime:this.today.start,endtime:this.today.end}}).then(res=>{
                    //console.log(res)
                    //指标
                    this.alldata25=res.data
                    //数据总量
                    this.temperaturestarget.sumdata=this.alldata25.length+this.temperaturestarget.sumdata
                    //this.temperaturestarget.alldata=res.data.length
                    this.dirtydata25.splice(0,this.dirtydata25.length)
                    this.datavalue25.splice(0,this.datavalue25.length)
                    this.setdataPM25()
                    this.chartLine.setOption(this.option);
                    this.quote();
                })
            }
        }
    }
</script>
<style lang="less" scoped>

</style>
