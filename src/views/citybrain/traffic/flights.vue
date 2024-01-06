<template>
    <div>
        <el-card>
            <el-tag style="margin-right: 20px">总数据量:{{conditions.sum}}</el-tag>
            <el-tag type="danger" style="margin-right: 20px">识别正确据量:{{conditions.right}}</el-tag>
            <el-tag type="info" style="margin-right: 20px">识别错误数据量:{{conditions.error}}</el-tag>
            <el-tag type="success" style="margin-right: 20px">数据转换率:{{conditions.conversion}}%</el-tag>
        </el-card>

        <el-card>

            <el-table :data="datas"
            max-height="600">
                <el-table-column
                        prop="id"
                        label="ID">
                </el-table-column>
                <el-table-column
                        prop="lng"
                        label="经度">
                </el-table-column>
                <el-table-column
                        prop="lat"
                        label="纬度">
                </el-table-column>
                <el-table-column
                        prop="conversiondata"
                        label="转换值">
                </el-table-column>
                <el-table-column
                        prop="realdata"
                        label="真实值">
                </el-table-column>
                <el-table-column
                        prop="result"
                        label="转换是否正确">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-size="queryInfo.pagesize"
                    :page-sizes="[10, 20, 50, 100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="queryInfo.total"
            >
            </el-pagination>
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
                datas: [],
                queryInfo: {
                    // 当前页数
                    pageNum: 1,
                    // 每页显示多少数据
                    pageSize: 10,
                    total: 1,
                },
                conditions:[]
            }
        },
        components:{
            //condition_gps
        },
        created() {
          this.queryDatas();
          this.getQuota()
        },
        methods: {
            //获取指标数据
            getIndex() {
                axios.$get(comm.WEB_URL+'citybrain/gps/getQuota').then(res => {
                    this.$refs.conditionRef.updateData(res);
                })
            },
            queryDatas() {
                let parmas = {
                    page: this.queryInfo.pageNum,
                    pageSize: this.queryInfo.pageSize
                }
                axios.$get(comm.WEB_URL + '/citybrain/gpsaddress/getGpssAddress',parmas).then(res => {
                    axios.$get(comm.WEB_URL+'citybrain/gpsaddress/getCount').then(res => {
                        this.queryInfo.total = res;
                    })
                    this.datas = res;
                }).catch(error => {
                    // 请求失败处理逻辑
                    console.error("error111",error);
                })
            },
            getQuota(){
                axios.$get(comm.WEB_URL + 'citybrain/gpsaddress/getQuota').then(res => {
                    this.conditions = res;
                    this.conditions.error=this.conditions.sum-this.conditions.right
                    this.conditions.conversion=(this.conditions.right*100/this.conditions.sum).toFixed(3)
                    // this.queryInfo.total = res.total;
                }).catch(error => {
                    // 请求失败处理逻辑
                console.error("error",error);
            })
            },
            handleSizeChange(val) {
                this.queryInfo.pageSize = val;
                this.queryDatas();
            },
            handleCurrentChange(val) {
                this.queryInfo.pageNum = val;
                this.queryDatas();
            },
        }
    }
</script>

<style lang="less" scoped>

</style>
