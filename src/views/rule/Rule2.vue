<template>
    <div>
        <el-card>
            <el-button type="primary" @click="dialogTableVisible = true;fetchgridData()">脏数据</el-button>
            <el-dialog title="Dataset" :visible.sync="dialogTableVisible" style="text-align: center">
                <el-table :data="gridData" height="250" highlight-current-row @current-change="handleCurrentContent">
                    <el-table-column property="id" label="id" ></el-table-column>
                    <el-table-column property="ssid" label="卡口编号"></el-table-column>
                    <el-table-column property="cdbh" label="车道编号"></el-table-column>
                    <el-table-column property="fx" label="方向"></el-table-column>
                </el-table>
                <h1>修改规则</h1>
                <el-form label-width="80px" :model="formLabelAlign">
                    <el-row>
                        <el-checkbox-group>
                            <el-col :span="8">
                                <el-checkbox label="卡口编号" name="type"></el-checkbox>
                                <el-input v-model="formLabelAlign.ssid1" ></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox label="车道编号" name="type"></el-checkbox>
                                <el-input v-model="formLabelAlign.cdbh1" ></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox label="方向" name="type"></el-checkbox>
                                <el-input v-model="formLabelAlign.fx1" ></el-input>
                            </el-col>
                        </el-checkbox-group>
                    </el-row>
                    <el-button type="primary" @click="showlabelalign">提交修改</el-button>
                </el-form>
            </el-dialog>
        </el-card>
        <el-card style="text-align: center">
            <h1>Dataset</h1>
            <el-table
            :data="tableData"
            style="width:100%">
            <el-table-column
                prop="id"
                label="id"
                align="center">
            </el-table-column>
            <el-table-column
                prop="ssid"
                label="卡口编号"
                align="center">
            </el-table-column>
            <el-table-column
                prop="cdbh"
                label="车道编号"
                align="center">
            </el-table-column>
            <el-table-column
                prop="fx"
                label="方向"
                align="center">
            </el-table-column>
            </el-table>
            <el-row type="flex" justify="center">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="queryInfo.page"
                  :page-size="queryInfo.pageSize"
                  :page-sizes="[10, 20, 50, 100]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="queryInfo.total"
                >
                </el-pagination>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import axios from '@/api/axios.js'
    import {comm} from '../../global/common'
    export default{
        data(){
            return {
                dialogTableVisible: false,
                radio:'1',
                form:[],
                formLabelAlign:{
                    id1:'',
                    ssid1:'',
                    cdbh1:'',
                    fx1:''
                },
                gridData:[],
                tableData:[],
                queryInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0,
                },
            }
        },
        mounted() {
            this.query()
        },
        methods:{
            fetchgridData(){
                axios.$get(this.comm.CLEAN_URL + '/sample').then(res => {
                    //console.log(res)
                    this.gridData = res.samples
                })
                // this.gridData = content
                // console.log(this.gridData)
            },
            showlabelalign(){
                console.log(this.formLabelAlign)
                this.gridData[this.formLabelAlign.id1-1].ssid=this.formLabelAlign.ssid1
                this.gridData[this.formLabelAlign.id1-1].cdbh=this.formLabelAlign.cdbh1
                this.gridData[this.formLabelAlign.id1-1].fx=this.formLabelAlign.fx1
                console.log(this.gridData)
            },
            async query() {
                const { content, totalElements } = await this.fetchTableData()
                this.tableData = content
                console.log(this.tableData)
                this.queryInfo.total = totalElements
            },
            async fetchTableData() {
                const { content, totalElements } = await axios.$get(
                    this.comm.WEB_URL + 'crossroad/list',
                    {
                        page: this.queryInfo.page,
                        pageSize: this.queryInfo.pageSize,
                    }
                )
                return { content, totalElements }
            },
            handleSizeChange(newPageSize) {
                this.queryInfo = { ...this.queryInfo, pageSize: newPageSize }
                this.query()
            },
            handleCurrentChange(currentPage) {
                this.queryInfo = { ...this.queryInfo, page: currentPage }
                this.query()
            },
            handleCurrentContent(val){
                //console.log(val.id)
                //console.log(this.form)
                this.formLabelAlign.id1=val.id
                this.formLabelAlign.ssid1=val.ssid
                this.formLabelAlign.cdbh1=val.cdbh
                this.formLabelAlign.fx1=val.fx
                this.form.push(val)
                //console.log(this.formLabelAlign)
                console.log(this.gridData)
                console.log(this.gridData[this.formLabelAlign.id1-1])
            },
        }
    }
</script>