<template>
    <div>
        <el-card>
            <el-button type="primary" @click="initRaha()">初始化引擎</el-button>
            <!-- 设置buttonshow来动态显示按钮，仅在初始化完成后才显示智能检测按钮 -->
            <el-button type="primary" @click="showlabelalign" v-show="buttonshow">智能检测</el-button>
            <!-- 弹窗 -->
            <el-dialog title="数据标记" :visible.sync="dialogTableVisible" style="text-align: center" class="data-dialog">
                <div>
                    <el-tag style="margin-bottom:12px">第 {{count+1<=10?count+1:10}} 条采样 (共 10 条)：请将数据错误标记出来，并修改</el-tag>
                </div>
                <!-- 采样数据显示 -->
                <el-form label-width="80px" :model="formLabelAlign">
                    <el-row>
                        <el-col :span="8">
                            <el-checkbox label="卡口编号" @change="handleinput1Change" v-model="check1"></el-checkbox>
                            <el-input v-model="formLabelAlign.ssid" :disabled="showinput1"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label="车道编号" @change="handleinput2Change" v-model="check2"></el-checkbox>
                            <el-input v-model="formLabelAlign.cdbh" :disabled="showinput2"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox label="方向" @change="handleinput3Change" v-model="check3"></el-checkbox>
                            <el-input v-model="formLabelAlign.fx" :disabled="showinput3"></el-input>
                        </el-col>
                    </el-row>
                    <el-button type="primary" @click="closedialog();changelabelalign();changecolor()" style="margin-top: 12px">提交修改</el-button>
                </el-form>
            </el-dialog>
        </el-card>
        <!-- 展示数据 -->
        <el-card style="text-align: center">
            <h1>Dataset</h1>
            <el-table
            :data="tableData"
            :cell-style="cellStyle"
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
            <!-- 分页功能 -->
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
                count:0,
                numb:[],
                nnn:[],
                visible: false,
                showinput1:true,
                showinput2:true,
                showinput3:true,
                check1:false,
                check2:false,
                check3:false,
                buttonshow:false,
                formla:[],
                formLabelAlign:{
                    id:'',
                    ssid:'',
                    cdbh:'',
                    fx:'',
                    index:0
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
        // 挂载后自动调用query方法加载数据
        mounted(){
            this.getTableData()
        },
        methods:{
            open1(){
                this.dialogTableVisible = false
                this.buttonshow = false
                this.$message({
                    message: '内部错误，请先初始化引擎',
                    type: 'warning',
                    center: true
                })
            },
            // 缓存失效
            open2(){
                this.dialogTableVisible = false
                this.buttonshow = false
                this.$message({
                    message: '请先初始化引擎',
                    type: 'warning',
                    center: true
                })
            },
            // 初始化操作
            initRaha(){
                axios.$get(this.comm.CLEAN_URL + '/initRaha').then(res => {
                    console.log('初始化引擎')
                    this.count = 0
                    console.log(res)
                    if(res.code == 0){
                        this.buttonshow = true
                    }
                })
            },
            // 关闭弹窗操作，当十条采样结束后关闭弹窗，隐藏采样按钮
            closedialog(){
                if(this.count==9){
                    this.dialogTableVisible = false
                    this.buttonshow = false
                }
            },
            // 数据标注操作，将文字标注为红色
            cellStyle({row, column, rowIndex, columnIndex}){
                for(const i in this.numb){
                if(row.id-1 == this.numb[i][0] && columnIndex == this.numb[i][1])
                    return 'color:red'
                }
            },
            // 仅获取当前页面需要标注的数据位置，减少页面渲染时间
            changecolor(){
                this.numb.splice(0,this.numb.length)
                let i = this.queryInfo.pageSize/10
                // console.log(i)
                for(let t=0;t<i;t++){
                    for(const p in this.nnn[this.queryInfo.page*i-i+t])
                        this.numb.push(this.nnn[this.queryInfo.page*i-i+t][p])
                    }
            },
            // 获取新的采样数据
            showlabelalign(){
                // await this.changelabelalign()
                console.log(this.formla)
                axios.$get(this.comm.CLEAN_URL + '/sample').then(res => {
                    if(res.code == 0){
                        this.dialogTableVisible = true
                        console.log(res.data)
                        console.log('data_id '+res.data.id)
                        this.formLabelAlign = JSON.parse(JSON.stringify(this.formLabelAlign))
                        this.formLabelAlign.id = res.data.id
                        this.formLabelAlign.ssid = res.data.ssid
                        this.formLabelAlign.cdbh = res.data.cdbh
                        this.formLabelAlign.fx = res.data.fx
                        this.formLabelAlign.index = res.data.index
                    }
                    else if(res.code == 412){
                        this.open1()
                    }
                    else{
                        this.open2()
                    }
                })
            },
            // 将输入框和选择框都修改回默认值。提交修改过后的数据，并且调用采样方法获得新数据。
            changelabelalign(){
                this.check1 = false
                this.check2 = false
                this.check3 = false
                this.showinput1 = true
                this.showinput2 = true
                this.showinput3 = true
                this.formla = JSON.parse(JSON.stringify(this.formLabelAlign))
                // console.log(this.formla)
                axios.$post(this.comm.CLEAN_URL + '/labelByUser',this.formla).then(res => {
                    if(res.code == 0){
                        console.log(res.data)
                        console.log('labeled '+res.data.labeled)
                        this.count = res.data.labeled
                        this.nnn = res.data.labels 
                        this.$nextTick(function(){
                            if(this.count < 10){
                                this.showlabelalign()
                            }
                            if(this.nnn.length != 0){
                                this.changecolor()
                            }
                        })
                    }
                    else if(res.code == 412){
                        this.open1()
                    }
                    else{
                        this.open2()
                    }
                })
            },
            // 获得表格数据以及分页的初始数据
            async query() {
                const { content, totalElements } = await this.fetchTableData()
                // console.log(content)
                this.tableData = content
                this.queryInfo.total = totalElements
            },
            // 获取表格数据以及页数，页面大小等数据
            async fetchTableData() {
                const { content, totalElements } = await axios.$get(
                    this.comm.CLEAN_URL + 'selectByPage',
                    {
                        page: this.queryInfo.page,
                        pageSize: this.queryInfo.pageSize,
                    }
                )
                return { content, totalElements }
            },
            //获取数据
            getTableData(){
                axios.$get(this.comm.CLEAN_URL + 'selectByPage',
                    {
                        page: this.queryInfo.page,
                        pageSize: this.queryInfo.pageSize,
                    }).then(res => {
                        console.log(res)
                        this.tableData = res.data.tableData
                        this.queryInfo.total = res.data.total
                    })
            },
            // 修改输入框属性为默认不可输入
            handleinput1Change(val){
                this.showinput1 = val?false:true;
            },
            handleinput2Change(val){
                this.showinput2 = val?false:true;
            },
            handleinput3Change(val){
                this.showinput3 = val?false:true;
            },
            // 修改页面数据条数操作，并且给数据进行标注
            handleSizeChange(newPageSize) {
                this.queryInfo = { ...this.queryInfo, pageSize: newPageSize }
                this.getTableData()
                this.changecolor()
            },
            // 修改页面数据操作，并且标注数据
            handleCurrentChange(currentPage) {
                this.queryInfo = { ...this.queryInfo, page: currentPage }
                this.getTableData()
                this.changecolor()
            },
        }
    }
</script>

<style scoped>
/* 修改弹窗里内容体的样式，将上边框改为10px */
.data-dialog /deep/.el-dialog__body {
        padding-top: 10px;
    }
</style>