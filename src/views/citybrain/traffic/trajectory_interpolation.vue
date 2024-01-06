<template>
  <div class="trajectory-interpolation">
    <el-card class="quota-container">
      <el-tag
        >修复成功率(修复误差小于100米) {{ cleanIndex.repair_rate }}</el-tag
      >
      <el-tag>修复失败数量 {{ cleanIndex.error_repair_count }}</el-tag>
      <el-tag>修复成功数量 {{ cleanIndex.correct_repair_count }}</el-tag>
      <el-tag>所有修复数量 {{ cleanIndex.all_repiar_count }}</el-tag>
    </el-card>

    <el-card>
      <el-table :data="datas">
        <el-table-column prop="index" label="索引"> </el-table-column>
        <el-table-column prop="complete_len" label="轨迹点数">
        </el-table-column>
        <el-table-column prop="train_len" label="已有轨迹点数">
        </el-table-column>
        <el-table-column prop="repair_len" label="待修复轨迹点数">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--查看数据详情结点按钮-->
            <el-tooltip
              class="item"
              effect="dark"
              content="查看详情"
              :enterable="false"
              placement="top"
            >
              <!--查看详情按钮-->
              <el-button
                type="primary"
                icon="el-icon-view"
                size="mini"
                @click="gotoTrajDetailData(scope.row)"
              ></el-button>
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
import { comm } from '../../../global/common'

import axios from '@/api/axios.js'

export default {
  data() {
    return {
      datas: [{index:1}],
      queryInfo: {
        // 当前页数
        pageNum: 1,
        // 每页显示多少数据
        pageSize: 10,
        total: 0,
      },
      cleanIndex: {},
    }
  },
  created() {
    this.getIndex().then(() => {
      this.queryListDatas()
    })
  },
  methods: {
    //获取指标数据
    getIndex() {
      return axios
        .$get(comm.Traj_Url + '/getInterpolationIndex')
        .then((res) => {
          this.queryInfo.total = res.length
          this.cleanIndex.correct_repair_count = res.correct_repair_count
          this.cleanIndex.error_repair_count = res.error_repair_count
          this.cleanIndex.repair_rate = res.repair_rate
          this.cleanIndex.all_repiar_count = res.all_repiar_count
        })
    },
    queryListDatas() {
      let parmas = {
        page: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
      }
      axios
        .$get(comm.Traj_Url + '/getInterpolationList', parmas)
        .then((res) => {
          this.datas = res
        })
    },
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
      this.queryListDatas()
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.queryListDatas()
    },
    gotoTrajDetailData(val) {
      this.$router.push({
        name: 'trajectoryDetail',
        params: { index: val.index },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.trajectory-interpolation {
  .quota-container {
    span.el-tag:not(:last-child) {
      margin-right: 15px;
    }
  }
}
</style>
