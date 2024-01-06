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

    <el-row :gutter="12">
      <el-col :span="8" style="width: 50%;height:600px;">
        <el-card>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <!--      <button @click="addtime">start</button>-->
          <!--      <button @click="stop">stop</button>-->
          <div id="main" style="width: 100%;height:500px;"></div>
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
      </el-col>
      <el-col :span="8" style="width: 50%;height:600px;">
        <el-card >
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <!--      <button @click="addtime">start</button>-->
          <!--      <button @click="stop">stop</button>-->
          <div id="main2" style="width: 100%;height:500px;"></div>
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
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="8" style="width: 50%;height:600px;">
        <el-card>
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <!--      <button @click="addtime">start</button>-->
          <!--      <button @click="stop">stop</button>-->
          <div id="main3" style="width: 100%;height:500px;"></div>
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
      </el-col>
      <el-col :span="8" style="width: 50%;height:600px;">
        <el-card >
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <!--      <button @click="addtime">start</button>-->
          <!--      <button @click="stop">stop</button>-->
          <div id="main4" style="width: 100%;height:500px;"></div>
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
      </el-col>
    </el-row>

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
        temperaturestarget:{errorsum:0,
          erroravg:0},
        test:{},
        alldata:{ch1:[],ch2:[],ch3:[],ch4:[]},
        datavalue:{ch1:[],ch2:[],ch3:[],ch4:[]},
        choicetime:[],
        dirtydata:{ch1:[],ch2:[],ch3:[],ch4:[]},
        xData:[],
        today:{start:new Date()-30*60*1000,
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
      this.chartLine2 = echarts.init(document.getElementById('main2'));
      this.chartLine3 = echarts.init(document.getElementById('main3'));
      this.chartLine4 = echarts.init(document.getElementById('main4'));
      //折线图数据
//x轴坐标数据

      this.today.end=new Date()
      this.xData=[{ name: 'head', value: [this.today.start, 0] },
        { name: 'end', value: [this.today.end, 0] }]

      this.option1 = {
        title:{
          text: 'CH1',
        },
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },
        legend: {               //设置区分（哪条线属于什么）
          data:['温度','dirty温度']
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
          name:'温度',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.datavalue.ch1,
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
            name:'dirty温度',
            type: 'line',
            symbol: 'circle',//折线点设置为实心点
            symbolSize: 4,   //折线点的大小
            //隐藏点
            //showSymbol: false,
            hoverAnimation: false,
            data: this.dirtydata.ch1,
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
        ]
      };
      this.chartLine.setOption(this.option1);
      this.option2 = {
        title:{
          text: 'CH2',
        },
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },
        legend: {               //设置区分（哪条线属于什么）
          data:['温度','dirty温度']
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
          name:'温度',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.datavalue.ch2,
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
            name:'dirty温度',
            type: 'line',
            symbol: 'circle',//折线点设置为实心点
            symbolSize: 4,   //折线点的大小
            //隐藏点
            //showSymbol: false,
            hoverAnimation: false,
            data: this.dirtydata.ch2,
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
        ]
      };
      this.chartLine2.setOption(this.option2);
      this.option3 = {
        title:{
          text: 'CH3',
        },
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },
        legend: {               //设置区分（哪条线属于什么）
          data:['温度','dirty温度']
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
          name:'温度',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.datavalue.ch3,
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
            name:'dirty温度',
            type: 'line',
            symbol: 'circle',//折线点设置为实心点
            symbolSize: 4,   //折线点的大小
            //隐藏点
            //showSymbol: false,
            hoverAnimation: false,
            data: this.dirtydata.ch3,
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
        ]
      };
      this.chartLine3.setOption(this.option3);
      this.option4 = {
        title:{
          text: 'CH4',
        },
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },
        legend: {               //设置区分（哪条线属于什么）
          data:['温度','dirty温度']
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
          name:'温度',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.datavalue.ch4,
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
            name:'dirty温度',
            type: 'line',
            symbol: 'circle',//折线点设置为实心点
            symbolSize: 4,   //折线点的大小
            //隐藏点
            //showSymbol: false,
            hoverAnimation: false,
            data: this.dirtydata.ch4,
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
        ]
      };
      this.chartLine4.setOption(this.option4);
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
        axios.get('/sensor/temp/temp0002/ch1data',{params:{time:nowtime}}).then(res=>{
          //console.log(res.data)
          if(res.data==""){console.log("无数据")}
          else{this.alldata.ch1.push(res.data)}
          //console.log(this.alldata)
          while(this.alldata.ch1.length>30){this.alldata.ch1.shift()}
          this.temperaturestarget.detection=0
          this.temperaturestarget.undetection=0
          this.temperaturestarget.misdetection=0
          //数据总量
          this.temperaturestarget.sumdata=this.alldata.ch1.length
          this.datavalue.ch1.splice(0,this.datavalue.ch1.length)
          this.dirtydata.ch1.splice(0,this.dirtydata.ch1.length)

          // console.log(this.datavalue.ch1.length)
          // console.log(this.datavalue.ch1)

        })
        axios.get('/sensor/temp/temp0002/ch2data',{params:{time:nowtime}}).then(res=>{
          //console.log(res.data)
          if(res.data==""){console.log("无数据")}
          else{this.alldata.ch2.push(res.data)}
          //console.log(this.alldata)
          while(this.alldata.ch2.length>30){this.alldata.ch2.shift()}
          //数据总量
          this.temperaturestarget.sumdata=this.alldata.ch2.length
          this.datavalue.ch2.splice(0,this.datavalue.ch2.length)
          this.dirtydata.ch2.splice(0,this.dirtydata.ch2.length)
        })
        axios.get('/sensor/temp/temp0002/ch3data',{params:{time:nowtime}}).then(res=>{
          //console.log(res.data)
          if(res.data==""){console.log("无数据")}
          else{this.alldata.ch3.push(res.data)}
          //console.log(this.alldata)
          while(this.alldata.ch3.length>30){this.alldata.ch3.shift()}
          //数据总量
          this.temperaturestarget.sumdata=this.alldata.ch3.length
          this.datavalue.ch3.splice(0,this.datavalue.ch3.length)
          this.dirtydata.ch3.splice(0,this.dirtydata.ch3.length)
        })
        axios.get('/sensor/temp/temp0002/ch2data',{params:{time:nowtime}}).then(res=>{
          //console.log(res.data)
          if(res.data==""){console.log("无数据")}
          else{this.alldata.ch4.push(res.data)}
          //console.log(this.alldata)
          while(this.alldata.ch4.length>30){this.alldata.ch4.shift()}
          //数据总量
          this.temperaturestarget.errorsum=0
          this.temperaturestarget.erroravg=0
          this.temperaturestarget.sumdata=this.alldata.ch4.length
          this.datavalue.ch4.splice(0,this.datavalue.ch4.length)
          this.dirtydata.ch4.splice(0,this.dirtydata.ch4.length)

        })
        this.setdata()
        this.chartLine.setOption(this.option1);
        this.chartLine2.setOption(this.option2);
        this.chartLine3.setOption(this.option3);
        this.chartLine4.setOption(this.option4);
        this.quote();

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
      setdata(){

        for(var i in this.alldata.ch1){
          if(this.alldata.ch1[i].detectionresult){
            this.dirtydata.ch1.push({ name: this.alldata.ch1[i].time, value: [this.alldata.ch1[i].time, this.alldata.ch1[i].dirtydata] },)
            this.datavalue.ch1.push({ name: this.alldata.ch1[i].time, value: [this.alldata.ch1[i].time, this.alldata.ch1[i].repairdata] },)
            this.temperaturestarget.errorsum=this.temperaturestarget.errorsum+Math.abs(this.alldata.ch1[i].cleandata-this.alldata.ch1[i].repairdata)
            this.temperaturestarget.erroravg=this.temperaturestarget.erroravg+Math.abs(this.alldata.ch1[i].cleandata-this.alldata.ch1[i].repairdata)/this.alldata.ch1[i].cleandata
            if(this.alldata.ch1[i].dirtydata!=this.alldata.ch1[i].cleandata){this.temperaturestarget.detection=this.temperaturestarget.detection+1}
            else{this.temperaturestarget.misdetection=this.temperaturestarget.misdetection+1}
          }
          else {
            this.datavalue.ch1.push({ name: this.alldata.ch1[i].time, value: [this.alldata.ch1[i].time, this.alldata.ch1[i].cleandata] },)
            if(this.alldata.ch1[i].dirtydata!=this.alldata.ch1[i].cleandata){this.temperaturestarget.undetection=this.temperaturestarget.undetection+1}
          }
        }
        for(i in this.alldata.ch2){
          if(this.alldata.ch2[i].detectionresult){
            this.dirtydata.ch2.push({ name: this.alldata.ch2[i].time, value: [this.alldata.ch2[i].time, this.alldata.ch2[i].dirtydata] },)
            this.datavalue.ch2.push({ name: this.alldata.ch2[i].time, value: [this.alldata.ch2[i].time, this.alldata.ch2[i].repairdata] },)
            this.temperaturestarget.errorsum=this.temperaturestarget.errorsum+Math.abs(this.alldata.ch2[i].cleandata-this.alldata.ch2[i].repairdata)
            this.temperaturestarget.erroravg=this.temperaturestarget.erroravg+Math.abs(this.alldata.ch2[i].cleandata-this.alldata.ch2[i].repairdata)/this.alldata.ch2[i].cleandata
            if(this.alldata.ch2[i].dirtydata!=this.alldata.ch2[i].cleandata){this.temperaturestarget.detection=this.temperaturestarget.detection+1}
            else{this.temperaturestarget.misdetection=this.temperaturestarget.misdetection+1}
          }
          else {
            this.datavalue.ch2.push({ name: this.alldata.ch2[i].time, value: [this.alldata.ch2[i].time, this.alldata.ch2[i].cleandata] },)
            if(this.alldata.ch2[i].dirtydata!=this.alldata.ch2[i].cleandata){this.temperaturestarget.undetection=this.temperaturestarget.undetection+1}
          }
        }
        for(i in this.alldata.ch3){
          if(this.alldata.ch3[i].detectionresult){
            this.dirtydata.ch3.push({ name: this.alldata.ch3[i].time, value: [this.alldata.ch3[i].time, this.alldata.ch3[i].dirtydata] },)
            this.datavalue.ch3.push({ name: this.alldata.ch3[i].time, value: [this.alldata.ch3[i].time, this.alldata.ch3[i].repairdata] },)
            this.temperaturestarget.errorsum=this.temperaturestarget.errorsum+Math.abs(this.alldata.ch3[i].cleandata-this.alldata.ch3[i].repairdata)
            this.temperaturestarget.erroravg=this.temperaturestarget.erroravg+Math.abs(this.alldata.ch3[i].cleandata-this.alldata.ch3[i].repairdata)/this.alldata.ch3[i].cleandata
            if(this.alldata.ch3[i].dirtydata!=this.alldata.ch3[i].cleandata){this.temperaturestarget.detection=this.temperaturestarget.detection+1}
            else{this.temperaturestarget.misdetection=this.temperaturestarget.misdetection+1}
          }
          else {
            this.datavalue.ch3.push({ name: this.alldata.ch3[i].time, value: [this.alldata.ch3[i].time, this.alldata.ch3[i].cleandata] },)
            if(this.alldata.ch3[i].dirtydata!=this.alldata.ch3[i].cleandata){this.temperaturestarget.undetection=this.temperaturestarget.undetection+1}
          }
        }
        for(i in this.alldata.ch4){
          if(this.alldata.ch4[i].detectionresult){
            this.dirtydata.ch4.push({ name: this.alldata.ch4[i].time, value: [this.alldata.ch4[i].time, this.alldata.ch4[i].dirtydata] },)
            this.datavalue.ch4.push({ name: this.alldata.ch4[i].time, value: [this.alldata.ch4[i].time, this.alldata.ch4[i].repairdata] },)
            this.temperaturestarget.errorsum=this.temperaturestarget.errorsum+Math.abs(this.alldata.ch4[i].cleandata-this.alldata.ch4[i].repairdata)
            this.temperaturestarget.erroravg=this.temperaturestarget.erroravg+Math.abs(this.alldata.ch4[i].cleandata-this.alldata.ch4[i].repairdata)/this.alldata.ch4[i].cleandata
            if(this.alldata.ch4[i].dirtydata!=this.alldata.ch4[i].cleandata){this.temperaturestarget.detection=this.temperaturestarget.detection+1}
            else{this.temperaturestarget.misdetection=this.temperaturestarget.misdetection+1}
          }
          else {
            this.datavalue.ch4.push({ name: this.alldata.ch4[i].time, value: [this.alldata.ch4[i].time, this.alldata.ch4[i].cleandata] },)
            if(this.alldata.ch4[i].dirtydata!=this.alldata.ch4[i].cleandata){this.temperaturestarget.undetection=this.temperaturestarget.undetection+1}
          }
        }

      },
      changetime(){
        this.sign=0
        this.today.start=this.choicetime[0].getTime()
        this.today.end=this.choicetime[1].getTime()
        this.alldata.ch1.splice(0,this.datavalue.ch1.length)
        this.alldata.ch1.splice(0,this.dirtydata.ch1.length)
        this.alldata.ch2.splice(0,this.datavalue.ch2.length)
        this.alldata.ch2.splice(0,this.dirtydata.ch2.length)
        this.alldata.ch3.splice(0,this.datavalue.ch3.length)
        this.alldata.ch3.splice(0,this.dirtydata.ch3.length)
        this.alldata.ch4.splice(0,this.datavalue.ch4.length)
        this.alldata.ch4.splice(0,this.dirtydata.ch4.length)
        this.temperaturestarget.errorsum=0
        this.temperaturestarget.erroravg=0
        this.getoneday()
      },
      getoneday(){
        axios.get('/sensor/temp/temp0002/ch1datas',{params:{starttime:this.today.start,endtime:this.today.end}}).then(res=>{
          //console.log(res)
          //指标
          this.temperaturestarget.detection=0
          this.temperaturestarget.undetection=0
          this.temperaturestarget.misdetection=0
          this.alldata.ch1=res.data
          //数据总量
          this.temperaturestarget.sumdata=this.alldata.ch1.length
          //this.temperaturestarget.alldata.ch1=res.data.length
          this.dirtydata.ch1.splice(0,this.dirtydata.ch1.length)
          this.datavalue.ch1.splice(0,this.datavalue.ch1.length)
        })
        axios.get('/sensor/temp/temp0002/ch2datas',{params:{starttime:this.today.start,endtime:this.today.end}}).then(res=>{
          //console.log(res)
          //指标
          this.alldata.ch2=res.data
          //数据总量
          this.temperaturestarget.sumdata=this.temperaturestarget.sumdata+this.alldata.ch2.length
          //this.temperaturestarget.alldata.ch1=res.data.length
          this.dirtydata.ch2.splice(0,this.dirtydata.ch2.length)
          this.datavalue.ch2.splice(0,this.datavalue.ch2.length)
        })
        axios.get('/sensor/temp/temp0002/ch3datas',{params:{starttime:this.today.start,endtime:this.today.end}}).then(res=>{
          //console.log(res)
          //指标
          this.alldata.ch3=res.data
          //数据总量
          this.temperaturestarget.sumdata=this.temperaturestarget.sumdata+this.alldata.ch3.length
          //this.temperaturestarget.alldata.ch1=res.data.length
          this.dirtydata.ch3.splice(0,this.dirtydata.ch3.length)
          this.datavalue.ch3.splice(0,this.datavalue.ch3.length)
        })
        axios.get('/sensor/temp/temp0002/ch4datas',{params:{starttime:this.today.start,endtime:this.today.end}}).then(res=>{
          //console.log(res)
          //指标
          this.alldata.ch4=res.data
          //数据总量
          this.temperaturestarget.sumdata=this.temperaturestarget.sumdata+this.alldata.ch4.length
          //this.temperaturestarget.alldata.ch1=res.data.length
          this.dirtydata.ch4.splice(0,this.dirtydata.ch4.length)
          this.datavalue.ch4.splice(0,this.datavalue.ch4.length)
          this.setdata()
          this.chartLine.setOption(this.option1);
          this.chartLine2.setOption(this.option2);
          this.chartLine3.setOption(this.option3);
          this.chartLine4.setOption(this.option4);
          this.quote();
        })

      }
    }
  }
</script>
<style lang="less" scoped>

</style>
