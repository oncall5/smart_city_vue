<template>
    <div>
        <el-card>

            <el-table :data="datas"
                      max-height="600">
                <el-table-column
                        prop="id"
                        label="ID">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="时间">
                </el-table-column>
                <el-table-column
                        prop="lon"
                        label="经度">
                </el-table-column>
                <el-table-column
                        prop="lat"
                        label="纬度">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import axios from '@/api/axios.js'
    import {comm} from "../../../global/common";
    //import condition_gps from '../../../components/condition_gps'

    export default {
        data() {
            return {
                sign:"",
                datas: [],
                queryInfo: {
                    // 当前页数
                    pageNum: 1,
                    // 每页显示多少数据
                    pageSize: 10,
                    total: 0,
                },
                conditions:[]
            }
        },
        components:{
            //condition_gps
        },
        created() {
            console.log(this)
            this.queryDatas();
            this.sign=1
        },
        computed: {
            // 计算属性
            getDate() { return this.sign },
        },
        watch:{
            getDate: function (sign) {
                
                if(sign==1){
                    this.timer = window.setInterval(() => {
                        window.setTimeout(this.queryDatas, 0)
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
        beforeDestroy() {
            clearInterval(this.timer)
        },
        methods: {
            queryDatas() {
                axios.$get(comm.WEB_URL + 'citybrain/gpsList').then(res => {
                    this.datas = res;
                })
            },
        }
    }
</script>

<style lang="less" scoped>

</style>
