<template>
    <div>
        <el-card>
            <!--用户列表区域-->
            <el-table :data="dataList" border stripe max-height="650">
                <!--缩印列-->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="名称" prop="groupname"></el-table-column>
                <el-table-column label="保存时间" prop="setuptime"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="open(scope.row)">查看详情</el-button>
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
        <el-card>
            <div>
                <el-tag style="margin-left: 20px"
                        closable
                        @close="removeSensor(item)"
                        v-for="(item,index) in sensors"
                        :key="index">{{item.name}}
                </el-tag>
            </div>
            <div style="display: flex;justify-content: center;margin-top: 20px">
                <el-button type="primary" size="mini" @click="saveVisible = true">保存</el-button>
            </div>
        </el-card>
        <el-dialog title="保存当前分组"
                   @close="saveVisible = false"
                   width="30%"
                   :visible="saveVisible">
            <el-form :model="form">
                <el-form-item label="组名">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="保存时间">
                    <el-input v-model="form.time"></el-input>
                </el-form-item>
                <el-form-item label="当前的传感器">
                    <el-tag style="margin-left: 20px"
                            v-for="(item,index) in sensors"
                            :key="index">{{item.name}}
                    </el-tag>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="saveData">确认</el-button>
                    <el-button type="info" size="mini" @click="saveVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {transofrmTimeMs} from "../../../utils/time";
    import axios from '@/api/axios.js';
    import {comm} from "../../../global/common";

    export default {
        name: "groups",
        data() {
            return {
                queryInfo: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 10,

                },
                saveVisible: false,
                form: {
                    title: null,
                    time: transofrmTimeMs(new Date().getTime())
                },
                dataList: []
            }
        },
        created() {
            this.queryGroup();
        },
        methods: {

            handleSizeChange(val) {
                this.queryInfo.pageSize = val;
                this.queryGroup();
            },
            handleCurrentChange(val) {
                this.queryInfo.pageNum = val;
                this.queryGroup();
            },
            queryGroup() {
                let params = {
                    page: this.queryInfo.pageNum,
                    pageSize: this.queryInfo.pageSize,
                }
                axios.$get(comm.WEB_URL + 'groupdata/getgroup', params).then(res => {
                    this.dataList = res.groupList;
                    this.queryInfo.total = res.total;
                })
            },
            saveData() {
                let parmas = {
                    groupName: this.form.title,
                    setUpTime: this.form.time,
                }
                axios.$get(comm.WEB_URL + 'groupdata/setupgroup', parmas).then(res => {
                    if (res < 0)
                        return this.$message.error('添加组失败!!!')

                    let parmas1 = {
                        groupId: res,
                        sensorNameList: []
                    }
                    this.sensors.forEach(item => {
                        parmas1.sensorNameList.push(item.name)
                    })
                    parmas1.sensorNameList = parmas1.sensorNameList.join(',')
                    console.log(parmas1)
                    axios.$get(comm.WEB_URL + 'groupdata/insertgroupsensor', parmas1).then(res => {
                        if (res < 0)
                            return this.$message.error('插入传感器失败')
                        this.$message.success('添加成功')
                        this.saveVisible = false;
                        this.queryGroup();
                    })
                })
            },
            open(val) {
                console.log(val);
                this.$router.push({name: 'custom', params: {groupId: val.id}})
            },
            removeSensor(val) {
                this.$store.commit('RWMOVESENSOR', val);
            }
        },
        computed: {
            ...mapGetters([
                "sensors"
            ]),
        },
        /*
        * 组表  组名 时间(字符串) id
        *存表  组名 时间 传感器数量 id返回给我
        * 传感器表 groupId 名称
        *
        * 存传感器
        * 名称 device_co2_0001,device_co2_0002,device_co2_0003
        * groupId（id）
        *
        * 2个查询接口（分页 page pageSize）
        * 查组 page pageSize
        *
        * 查传感器 id
        * */
    }
</script>

<style scoped>

</style>
