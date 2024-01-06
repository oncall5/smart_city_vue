<template>
    <div>
        <el-card style="display: flex;justify-content: center">
            <el-tag>所有错误文本数量 {{metric.all_error}}</el-tag>
            <el-tag>检测到的错误文本数量 {{metric.all_detection}}</el-tag>
            <el-tag>修复的文本数量 {{metric.all_recover}}</el-tag>
            <el-tag>检测率 {{metric.detection_rate}}</el-tag>
            <el-tag>修复率 {{metric.recover_rate}}</el-tag>
        </el-card>
        <el-card>
            <el-table :data="datas">
                <el-table-column
                        prop="origin_text"
                        label="原始文本">
                </el-table-column>
                <el-table-column
                        label="检测的文本">
                    <template slot-scope="scope">
                        <span v-html="scope.row.detection_text"></span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="修复的文本">
                    <template slot-scope="scope">
                        <span v-html="scope.row.recover_text"></span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="true_error_index"
                        label="错误本文索引">
                </el-table-column>
                <el-table-column
                        prop="true_error_number"
                        label="错误的文本数量">
                </el-table-column>
                <el-table-column
                        prop="detection_error_index"
                        label="检测到的错误文本索引">
                </el-table-column>
                <el-table-column
                        prop="detection_error_number"
                        label="检测到的错误文本数量">
                </el-table-column>
                <el-table-column
                        prop="recover_res"
                        label="修复的文本">
                </el-table-column>
                <el-table-column
                        prop="recover_text_number"
                        label="修复的文本数量">
                </el-table-column>
                <el-table-column
                        prop="recover_success_text_number"
                        label="修复成功文本数量">
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
        //完整的配置数据（不要的可以直接注释掉）
        data() {
            return {
                metric: {},
                queryInfo: {
                    // 当前页数
                    pageNum: 1,
                    // 每页显示多少数据
                    pageSize: 10,
                    total: 0,
                },
                datas: [],
            }
        },
        methods: {
            //获取指标数据
            getIndex() {
                return axios.$get(comm.Traj_Url + 'getTextIndex').then(res => {
                    this.queryInfo.total = res.len;
                    this.metric.all_error = res.all_error;
                    this.metric.all_detection = res.all_detection;
                    this.metric.all_recover = res.all_recover;
                    this.metric.detection_rate = res.detection_rate;
                    this.metric.recover_rate = res.recover_rate;

                })
            },
            queryListDatas() {
                let parmas = {
                    page: this.queryInfo.pageNum,
                    pageSize: this.queryInfo.pageSize
                };
                axios.$get(comm.Traj_Url + 'getTextList', parmas).then(res => {
                    this.datas = res;
                    this.datas.forEach(item => {
                        if (item.detection_error_index.length > 1) {
                            let indexs = item.detection_error_index.split(',').map(item => {
                                return parseInt(item) - 1
                            })
                            item.detection_text = this.ChangeColor(item.detection_text, [...indexs], 'Red')
                            item.recover_text = this.ChangeColor(item.recover_text, [...indexs], 'Green')
                        }
                    })
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
            ChangeColor(obj, a, color) {
                let obj1 = "";
                let add = 25 + color.length - 3;  //“一”的长度是1，“<font color="Red">一</font>”的长度是26，差了25，需要增加
                for (let i = 0; i < a.length; i++) {
                    obj1 = obj.substr(0, a[i]) + obj.charAt(a[i]).fontcolor(color) + obj.substr(a[i] + 1);//替换指定位置，变成红色
                    obj = obj1;  //用新的字符串循环替换
                    if (i < a.length - 1) { //注意这里i 的边界值
                        a[i + 1] = a[i + 1] + add  //下一次替换时位置要后移
                    }
                    add = add + 25 + color.length - 3; //每增加一次循环，后移位置增加
                }
                return obj;
            },

        },
        created() {
            this.getIndex().then(res => {
                this.queryListDatas()
            });
        },
    }
</script>
