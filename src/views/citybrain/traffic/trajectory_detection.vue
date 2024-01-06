<template>
  <div class="trajectory-detection">
    <el-card class="quota-container">
      <el-tag>检测召回率 {{ detectionMetric.r }}</el-tag>
      <el-tag>检测精确率率 {{ detectionMetric.p }}</el-tag>
      <el-tag>检测f1 {{ detectionMetric.f1 }}</el-tag>
      <el-tag>所有异常轨迹点数量 {{ detectionMetric.true_anomaly }}</el-tag>
      <el-tag>检测到的轨迹异常点数量 {{ detectionMetric.pred_anomaly }}</el-tag>
      <el-tag>所有轨迹点数量 {{ detectionMetric.length }}</el-tag>
    </el-card>
    <el-card>
      <el-table :data="datas">
        <el-table-column prop="index" label="索引"> </el-table-column>
        <el-table-column prop="complete_len" label="轨迹点数">
        </el-table-column>
        <el-table-column prop="true_anomaly" label="异常轨迹点数量">
        </el-table-column>
        <el-table-column prop="pred_anomaly" label="检测到的异常点数量">
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
  name: 'trajectory_detection',
  data() {
    return {
      detectionMetric: {},
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
      return axios.$get(comm.Traj_Url + 'getDectionIndex').then((res) => {
        this.queryInfo.total = res.count
        this.detectionMetric.r = res.r
        this.detectionMetric.p = res.p
        this.detectionMetric.f1 = res.f1
        this.detectionMetric.true_anomaly = res.true_anomaly
        this.detectionMetric.pred_anomaly = res.pred_anomaly
        this.detectionMetric.length = res.length
      })
    },
    queryListDatas() {
      let parmas = {
        page: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
      }
      axios.$get(comm.Traj_Url + 'getGeoDetectionList', parmas).then((res) => {
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
        name: 'trajectory_detection_detail',
        params: { index: val.index },
      })
    },
  },
  created() {
    this.getIndex().then(() => {
      this.queryListDatas()
    })
  },
}
</script>

<style lang="less" scoped>
.trajectory-detection {
  .quota-container {
    span.el-tag:not(:last-child) {
      margin-right: 15px;
    }
  }
}
</style>
