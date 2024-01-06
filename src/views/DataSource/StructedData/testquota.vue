<template>
    <div>
        <el-card>
            <el-form inline="true" :v-model="quota">
                <el-form-item label="清洗数据">
                    <el-input v-model="quota.alldata" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="检测出的数据">
                    <el-input v-model="quota.detectiondata" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="错误检测">
                    <el-input v-model="quota.misdetection" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="未检测出">
                    <el-input v-model="quota.undetection" placeholder=""></el-input>
                </el-form-item>
                <br>
                <el-form-item label="修复率">
                    <el-input v-model="quota.repairquota.repairAll" placeholder="秒"></el-input>
                </el-form-item>
                <el-form-item label="检测">
                    <el-input v-model="quota.detectiontime" placeholder="秒"></el-input>
                </el-form-item>
                <el-form-item label="修复时间">
                    <el-input v-model="quota.repairtime" placeholder="秒"></el-input>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card>
            <el-table :data="DataList"  border max-height="650">
                <el-table-column label="传感器" property="type" ></el-table-column>
                <el-table-column label="检测率" property="detectionrate"></el-table-column>
                <el-table-column label="修复率" property="repairrate"></el-table-column>
            </el-table>
        </el-card>





    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                DataList:[],
                quota:{},
                sign:"",
            }
        },
        computed: {
            // 计算属性
            getDate() { return this.sign },
        },
        watch: {
            getDate: function (sign) {
                if(sign==1){
                    this.timer = window.setInterval(() => {
                        window.setTimeout(this.query(), 0)
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
        created() {
            this.query();
            //console.log(this.DataList)
            this.sign=1;
        },
        methods:{
            query(){
                axios.get('test/test_quota').then(res => {
                    //console.log(res.data);
                    this.quota=res.data;
                    this.DataList=[];
                    this.quota.repairquota=JSON.parse(this.quota.repairquota.replace(/'/g,'"'))
                    this.quota.detectionquota=JSON.parse(this.quota.detectionquota.replace(/'/g,'"'))
                    console.log(this.quota)
                    for(var key in this.quota.detectionquota){
                        var dict={}
                        dict.type=key
                        console.log(key)
                        dict.detectionrate=((this.quota.detectionquota[key].detectiondata-this.quota.detectionquota[key].misdetection)/
                            (this.quota.detectionquota[key].detectiondata-this.quota.detectionquota[key].misdetection+this.quota.detectionquota[key].undetection)).toFixed(3)
                        dict.repairrate=this.quota.repairquota[key]
                        console.log(dict)
                        this.DataList.push(dict)
                    }
                    console.log(this.DataList)
                });
            },
        }
    }
</script>

