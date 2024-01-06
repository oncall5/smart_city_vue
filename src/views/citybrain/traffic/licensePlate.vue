<template>
  <div>
    <el-card>
      <el-tag style="margin-right: 20px">总数据量:{{ conditions.sum }}</el-tag>
      <el-tag type="danger" style="margin-right: 20px"
        >识别正确据量:{{ conditions.right }}</el-tag
      >
      <el-tag type="info" style="margin-right: 20px"
        >识别错误数据量:{{ conditions.error }}</el-tag
      >
      <el-tag type="success" style="margin-right: 20px"
        >数据转换率:{{ conditions.conversion }}%</el-tag
      >
    </el-card>
    <el-card>
      <!--用户列表区域-->
      <el-table :data="dataList" border stripe max-height="880" width="80%">
        <!--缩印列-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="识别车牌" prop="getnumber"></el-table-column>
        <el-table-column label="真实车牌" prop="realnumber"></el-table-column>
        <el-table-column label="Y/N" prop="result"></el-table-column>
        <el-table-column prop="url" label="图片" sortable width="180">
          <!--插入图片链接的代码-->
          <template slot-scope="scope">
            <img :src="scope.row.url" style="width: 150px;height: 50px" />
          </template>
          <!--                    <img src="src/assets/carnumber/云A1NM5K.jpg">-->
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
import { comm } from '../../../global/common'

export default {
  name: 'distanceAll',
  data() {
    return {
      // url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      url: '/carnumber/云A1CL0V.jpg',
      dataList: [{ name: 'dievice_0001' }, { name: 'dievice_0002' }],
      queryInfo: {
        query: 'distance',
        // 当前页数
        pageNum: 1,
        // 每页显示多少数据
        pageSize: 10,
        total: 0,
      },
      conditions: [],
    }
  },
  created() {
    this.getData()
    this.getQuota()
  },
  methods: {
    // getImgUrl(namea){
    //     console.log("*********");
    //     console.log(namea);
    //     return require(namea);
    // },
    saveSensors(val) {
      this.$store.commit('SAVEVSENSOR', val)
    },
    getData() {
      let params = {
        type: this.queryInfo.query,
        page: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
      }
      axios
        .$get(comm.WEB_URL + '/citybrain/traffic/getNumbers', params)
        .then((res) => {
          console.log(res)
          this.dataList = res
          axios
            .$get(comm.WEB_URL + '/citybrain/traffic/getCount', {
              sensorType: this.queryInfo.query,
            })
            .then((res) => {
              console.log(res)
              this.queryInfo.total = res
            })
          // this.queryInfo.total = res.total;
        })
    },
    getQuota() {
      axios.$get(comm.WEB_URL + 'citybrain/traffic/getQuota').then((res) => {
        this.conditions = res
        this.conditions.error = this.conditions.sum - this.conditions.right
        this.conditions.conversion = (
          (this.conditions.right * 100) /
          this.conditions.sum
        ).toFixed(3)
        // this.queryInfo.total = res.total;
      })
    },
    gotoData(val) {
      this.$router.push({
        name: 'distanceRealData',
        params: { name: val.name },
      })
    },
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.getData()
    },
  },
}
</script>

<style scoped></style>
