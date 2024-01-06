<template>
    <div>
        <el-divider></el-divider>
        <el-card>
            <el-table :data="DataList.slice((currentPage-1)*pagesize,currentPage*pagesize)"  border max-height="650"
                      :row-class-name="tableRowClassName" :cell-class-name="isRight">
                <el-table-column label="type" property="tuple_id" ></el-table-column>
                <el-table-column label="name" property="src"></el-table-column>
                <el-table-column label="cleandata" property="flight"></el-table-column>
                <el-table-column label="detectionresult" property="sched_dep_time"></el-table-column>
                <el-table-column label="repairresult" property="act_dep_time"></el-table-column>
                <el-table-column label="1" property="sched_arr_time"></el-table-column>
                <el-table-column label="2" property="act_arr_time"></el-table-column>
            </el-table>
            <el-pagination small layout="total, prev, pager, next,jumper"
                           :total="DataList.length"
                           :page-size="pagesize"
                           pager-count="10"
                           :current-page="currentPage"
                           @current-change="handleCurrentChange"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return {
                DataList:[{tuple_id:1,"是否正确数据":"是"},{tuple_id:2,"是否正确数据":"否"}],
                flightstarget:{},
                repairquota:{},
                pagesize:10,
                currentPage:1,
                checkpercent:'',
                percentage:'',
                percentage2:'',
                button2:true,
            }
        },
        computed: {
            // 计算属性
            statusData() { return this.percentage },
            statusData2() { return this.percentage2 }
        },
        watch: {
            statusData: function (val) {
                // 当返回的新值为创建中的时候,保持3秒轮询

                if (val ==0) {
                    this.timer = window.setInterval(() => {
                        window.setTimeout(this.getStatus, 0)
                    }, 200)
                    console.log("789456")
                }
                // 当返回的新值为成功的时候,关闭定时器,结束轮询
                if (val ==100) {
                    console.log(val)
                    window.clearInterval(this.timer)
                }
                // 当页面关闭的时候,结束轮询,否则就会一直发请求,
                //使用$once(eventName, eventHandler)一次性监听事件
                this.$once('hook:boforeDestory', () => {
                    window.clearInterval(this.timer)
                })
            },
            statusData2: function (val) {
                // 当返回的新值为创建中的时候,保持3秒轮询

                if (val ==0) {
                    this.timer = window.setInterval(() => {
                        window.setTimeout(this.getStatus2, 0)
                    }, 200)
                    console.log("789456")
                }
                // 当返回的新值为成功的时候,关闭定时器,结束轮询
                if (val ==100) {
                    console.log(val)
                    window.clearInterval(this.timer)
                }
                // 当页面关闭的时候,结束轮询,否则就会一直发请求,
                //使用$once(eventName, eventHandler)一次性监听事件
                this.$once('hook:boforeDestory', () => {
                    window.clearInterval(this.timer)
                })
            }
        },
        created() {
            axios.get('detection_dirty_data',{params: this.flightstarget},
                {'Access-Control-Allow-Origin':'*'}).then(res => {
                // console.log(res);
                this.DataList=res.data
            })
        },
        methods:{
            query(){
                axios.get('raha_detection',{username:'admin',password:123456}).then(res => {
                    // console.log(res);
                    this.flightstarget=res
                });
            },
            handleCurrentChange(val){
                this.currentPage=val;
            },
            testing(){
                this.$message('开始检测，大约花费15秒')
                axios.get('detection_run_detected_cell_XY',{params: this.flightstarget},
                    {'Access-Control-Allow-Origin':'*'}).then(res2 => {
                    // console.log(res2);
                    // console.log(res2.data[0])
                    // console.log(res2.data[1])
                    this.flightstarget=res2.data[0].quota
                    this.DataList=res2.data[1].data
                    this.$message('检测成功')
                    this.button2=false
                })
            },
            getStatus() {
                axios.get('detection_percent',{},
                    {'Access-Control-Allow-Origin':'*'}).then(res => {
                    console.log(res);
                    this.percentage=parseInt(res.data)
                })
            },
            getStatus2() {
                axios.get('correction_percent',{},
                    {'Access-Control-Allow-Origin':'*'}).then(res => {
                    console.log(res);
                    this.percentage2=parseInt(res.data)
                })
            },
            repair(){
                this.$message('开始修复，大约花费1分钟')
                axios.get('raha_correction_cell_xy',{},
                    {'Access-Control-Allow-Origin':'*'}).then(res2 => {
                    // console.log(res2);
                    this.repairquota=res2.data[0].quota
                    this.DataList=res2.data[1].data
                    console.log(this.DataList)
                    this.$message('修复成功')
                })
            },
            filterTag(value, row){
                // console.log(row);
                // console.log(value);
                // console.log(row.是否正确数据);
                return row.是否正确数据 == value;
            },
            tableRowClassName({row,rowIndex}){
                if(row.是否正确数据==='否'){
                    return 'warning-row';
                }
                // console.log(rowIndex);
                return '';
            },
            isRight({row,column,rowIndex,columnIndex}){
                if((row.是否正确数据==='否')&&(columnIndex!=8)&&(row.错误字段是.indexOf(column.label)>-1)){
                    return 'column-warning';
                }
                // console.log(column);
                // console.log(column.label);
            }
        }
    }
</script>

<style lang="less">
    .btns {
        padding-top: 20px;
        display: flex;
        justify-content: flex-end;
    }

    .jin{
        width: 40%;
        padding-top: 8px;
        padding-right: 20px;
    }

    .el-table .warning-row {
        /*color: #34c934 !important;*/
        background: rgba(0,255,255,0.5);
    }

    .el-table .column-warning{
        background: rgba(125,125,125,0.5) ;
    }
</style>
