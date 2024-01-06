<template>
    <div>
        <span>数据源详情：{{this.$route.query.dataId}}</span>
        <!--卡片视图区域-->
        <el-card>
            <!--用户列表区域-->
            <el-table :data="flightsDirtyList" border stripe>
                <!--缩印列-->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
            </el-table>
        </el-card>
        <!--卡片视图区域-->
        <el-card>
            <!--用户列表区域-->
            <el-table :data="flightsCleanList" border stripe>
                <!--缩印列-->
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
            </el-table>
        </el-card>
        <el-row>
            <el-col :span=8>
                <!--分页区域-->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </el-col>
            <el-col :span=8>
                <!--进度条-->
                <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
            </el-col>

            <el-col :span=4>
                <el-button type="primary">开始清洗</el-button>
            </el-col>
            <el-col :span=4>
                <el-button type="success" @click="compare">查看结果</el-button>
            </el-col>

        </el-row>

        <!-- 添加数据源的对话框 -->
        <el-dialog title="结果对比" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <router-view></router-view>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                flightsCleanList:[],
                flightsDirtyList:[],
                flightstarget:{},
                queryInfo: {
                    query: '',
                    //当前的页数
                    pagenum: 1,
                    //当前每页显示多少条数据
                    pagesize: 2
                },
                total: 0,
                addDialogVisible:false
            }
        },
        methods:{
            handleSizeChange(newSize){

            },
            handleCurrentChange(newPage){

            },
            compare(){
                this.addDialogVisible = true;
                this.$router.push('/dataclean/datasource/AdvantageVisualization')
            },
            addDialogClosed(){

            }
        }
    }
</script>

<style scoped>
    .el-card{
        height: 350px;
    }
    .el-row{
        margin-top: 20px;
    }
    .el-progress{
        margin-top: 20px;
    }
    .el-button{
        margin-top: 10px;
    }
</style>