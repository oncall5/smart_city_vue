<template>
    <div>
        <el-card style="display: flex;justify-content: center">
            <el-tag>检测成功率 {{detectionIndex.pred_success_ratio}}</el-tag>
            <el-tag>检测失败数量 {{detectionIndex.error_detection_count}}</el-tag>
            <el-tag>检测成功数量 {{detectionIndex.correct_detection_count}}</el-tag>
            <el-tag>所有检测数量 {{detectionIndex.total}}</el-tag>
        </el-card>
        <el-card>
            <el-table :data="datas">
                <el-table-column
                        prop="trajIndex"
                        label="索引">
                </el-table-column>
                <el-table-column
                        prop="pred"
                        label="真实标签">
                </el-table-column>
                <el-table-column
                        prop="true"
                        label="预测标签">
                </el-table-column>
                <el-table-column
                        label="预测的异常种类">
                    <template slot-scope="scope">
                        {{map[scope.row.pred]}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="预测结果">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.res ===0" type="success">正确</el-tag>
                        <el-tag v-else type="danger">错误</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="轨迹图片">
                    <template slot-scope="scope">
                        <el-image
                                style="max-height: 100px"
                                :src=scope.row.image
                                :preview-src-list=[scope.row.image]>
                        </el-image>
                        <!--<img :src=scope.row.image alt="图片加载失败" style="max-height: 100px">-->
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
        name: "trajectory_detection",
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
                detectionIndex: {},
                map: {
                    0: '全局绕路',
                    1: '局部绕路',
                    2: '正常轨迹',
                    3: '局部捷径',
                    4: '全局捷径'
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                this.queryInfo.pageSize = val;
                this.queryListDatas();
            },
            handleCurrentChange(val) {
                this.queryInfo.pageNum = val;
                this.queryListDatas();
            },
            //获取指标数据
            getIndex() {
                return axios.$get(comm.Traj_Url + 'getDetectionIndex').then(res => {
                    this.queryInfo.total = res.length;
                    this.detectionIndex.total = res.length;
                    this.detectionIndex.error_detection_count = res.error_detection_count;
                    this.detectionIndex.correct_detection_count = res.correct_detection_count;
                    this.detectionIndex.pred_success_ratio = res.pred_success_ratio;
                })
            },
            queryListDatas() {
                let parmas = {
                    page: this.queryInfo.pageNum,
                    pageSize: this.queryInfo.pageSize
                };
                axios.$get(comm.Traj_Url + 'getDetectionList', parmas).then(res => {
                    this.datas = res;
                    this.datas.forEach(item => {
                        item.image = 'data:;base64,' + item.image
                    })
                })
            },
        },
        created() {
            this.getIndex().then(res => {
                this.queryListDatas();
            })
        }
    }
</script>

<style scoped>

</style>
