<template>
    <div>
        <el-card style="display: flex;justify-content: center">
            <el-tag>修复成功率 {{cleanIndex.recovery_ratio}}</el-tag>
            <el-tag>修复失败数量 {{cleanIndex.correct_recovery_count}}</el-tag>
            <el-tag>修复成功数量 {{cleanIndex.error_recovery_count}}</el-tag>
            <el-tag>所有修复数量 {{cleanIndex.all_recovery_count}}</el-tag>
        </el-card>
        <el-card>
            <el-table :data="datas">
                <el-table-column
                        prop="userID"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="wait_recovery"
                        label="待修复轨迹点总数">
                </el-table-column>

                <el-table-column
                        prop="success_recovery"
                        label="修复成功轨迹点数量">
                </el-table-column>
                <el-table-column
                        prop="ratio_recovery"
                        label="修复成功轨迹点比例">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--查看数据详情结点按钮-->
                        <el-tooltip class="item" effect="dark" content="查看详情" :enterable="false" placement="top">
                            <!--查看详情按钮-->
                            <el-button type="primary" icon="el-icon-view" size="mini"
                                       @click="gotoSimialrMoveDetail(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
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
    import {comm} from "../../../global/common";

    import axios from '@/api/axios.js';

    export default {
        name: "trajectory_interpolation2",
        data() {
            return {
                datas: [],
                queryInfo: {
                    // 当前页数
                    pageNum: 1,
                    // 每页显示多少数据
                    pageSize: 10,
                    total: 0,
                },
                cleanIndex: {}
            }
        },
        methods: {
            //获取指标数据
            getIndex() {
                return axios.$get(comm.Traj_Url + 'getSimialrMoveIndex').then(res => {
                    this.queryInfo.total = parseInt(res.length / 10) - 10;
                    this.cleanIndex.correct_recovery_count = res.correct_recovery_count;
                    this.cleanIndex.error_recovery_count = res.error_recovery_count;
                    this.cleanIndex.recovery_ratio = res.recovery_ratio;
                    this.cleanIndex.all_recovery_count = res.length;
                })
            },
            handleSizeChange(val) {
                this.queryInfo.pageSize = val;
                this.queryListDatas();
            },
            handleCurrentChange(val) {
                this.queryInfo.pageNum = val;
                this.queryListDatas();
            },
            queryListDatas() {
                let parmas = {
                    page: this.queryInfo.pageNum,
                    pageSize: this.queryInfo.pageSize
                };
                axios.$get(comm.Traj_Url + 'getSimilarMoveList', parmas).then(res => {
                    this.datas = res;
                })
            },
            gotoSimialrMoveDetail(val) {
                this.$router.push({name: 'trajectoryDetail2', params: {index: val.userID}})
            }
        },
        created() {
            this.getIndex().then(res => {
                this.queryListDatas()
            });
        }
    }
</script>

<style scoped>

</style>
