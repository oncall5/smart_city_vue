<template>
    <div>
        <!--卡片视图区域-->
        <el-card>
            <!--用户列表区域-->
            <el-table :data="dataList" border stripe max-height="650">
                <!--缩印列-->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="deviceName" prop="name"></el-table-column>

                <el-table-column label="操作" width="240px">
                    <template slot-scope="scope">
                        <!--查看数据详情结点按钮-->
                        <el-tooltip class="item" effect="dark" content="查看详情" :enterable="false" placement="top">
                            <!--修改按钮-->
                            <el-button type="primary" icon="el-icon-view" size="mini"
                                       @click="gotoData(scope.row)"></el-button>
                        </el-tooltip>
                        <el-button type="primary" @click="saveSensors(scope.row)" size="mini">添加自定义</el-button>
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
  import axios from '@/api/axios.js';
  import {comm} from "../../../global/common";
  export default {
    name: "PM25All",
    data() {
      return {
        dataList: [
          {deviceName: 'dievice_0001'},
          {deviceName: 'dievice_0002'},
        ],
        queryInfo:{
          query: 'pm2_5',
          // 当前页数
          pageNum: 1,
          // 每页显示多少数据
          pageSize: 10,
          total: 0,
        },
      }
    },
    created() {
      this.getData()
    },
    methods: {
      saveSensors(val){
        this.$store.commit('SAVEVSENSOR',val)
      },
      getData(){
        let params = {
            type:this.queryInfo.query,
          page:this.queryInfo.pageNum,
          pageSize:this.queryInfo.pageSize
        }
        axios.$get(comm.WEB_URL+'sensorlist/getsensor',params).then(res => {
          console.log(res)
          this.dataList = res;
          axios.$get(comm.WEB_URL+'sensorlist/sensorcount',{sensorType:this.queryInfo.query}).then(res => {
            console.log(res);
            this.queryInfo.total = res;
          })
          // this.queryInfo.total = res.total;
        })
      },
      gotoData(val) {
        this.$router.push({name:'distanceRealData',params:{name:val.name}})
      },
      handleSizeChange(val) {
        this.queryInfo.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.queryInfo.pageNum = val;
        this.getData();

      }
    }
  }
</script>

<style scoped>

</style>
