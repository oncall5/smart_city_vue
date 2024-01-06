<template>
    <div>
        <el-card class="texttable" :body-style="{ padding: '0px' }" style="width: 600px;">
            <el-table 
                :data="datas" 
                max-height="400"
                style="background-color: #545c64;border: 0;margin: 0;"
                :header-cell-style="{'background-color': '#545c64','text-align': 'center','color':'#fff'}"
                :cell-style="{'background-color': '#545c64','text-align': 'center','color':'#fff'}"
                >
                <el-table-column
                        prop="true_lat"
                        label="真实纬度">
                </el-table-column>
                <el-table-column
                        prop="true_lng"
                        label="真实经度">
                </el-table-column>
                <el-table-column
                        prop="anomaly_lat"
                        label="测试纬度">
                </el-table-column>
                <el-table-column
                        prop="pred_label"
                        label="预测结果">
                </el-table-column>
                <el-table-column
                        prop="true_label"
                        label="真实结果">
                </el-table-column>
            </el-table>
        </el-card>
        <!-- <el-card style="height: 1080px;"> -->
        <Map style="width: 100%;height: 80vh"></Map>
        <!-- </el-card> -->
    </div>
</template>

<script>
    import {comm} from "../../../global/common";
    import Map from '@/views/map/map';
    import axios from '@/api/axios.js';
    import {mapGetters} from "vuex";

    export default {
        name: "trajectory_detection_detail",
        components: {
            Map
        },
        data() {
            return {
                index: this.$route.params.index,
                datas: [],
                train_markers: [],
                true_markers: [],
                pred_markers: [],
                positions: [],
                marker_group: []
            }
        },
        methods: {
            queryDetailData() {
                let parmas = {
                    index: this.index
                };
                return axios.$get(comm.Traj_Url + 'getDetectionDetail', parmas).then(res => {
                    let len = res.true_lat.length;
                    for (let i = 0; i < len; i++) {
                        this.datas.push({
                            'true_lat': res.true_lat[i],
                            'true_lng': res.true_lng[i],
                            'anomaly_lat': res.anomaly_lat[i],
                            'anomaly_lng': res.anomaly_lng[i],
                            'pred_label': res.pred_label[i],
                            'true_label': res.true_label[i],
                        });
                        let temp = {
                            'anomaly_lat': res.anomaly_lat[i],
                            'anomaly_lng': res.anomaly_lng[i],
                            'true_label': res.true_label[i],
                        };
                        this.positions.push(temp)
                    }
                })
            },
            setMarkers() {
                this.positions = JSON.parse(JSON.stringify(this.positions));

                this.positions.forEach(item => {
                    let tip = `${item.anomaly_lng ? "经度: " + item.anomaly_lng + "<br>" : ""}
            ${item.anomaly_lat ? "纬度: " + item.anomaly_lat + "<br>" : ""}`;
                    let color = item.true_label == 1 ? '#ff000e' : '#49ff3d'
                    let marker = L.circle(L.latLng(item.anomaly_lat, item.anomaly_lng), {
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.50,
                        radius: 10
                    }).unbindTooltip().bindTooltip(tip, {
                        direction: 'right',
                        opacity: 1,
                        className: 'ls_tooltip_ty'
                    }).addTo(this.vuexMap);
                });
            }
        },
        computed: {
            ...mapGetters([
                "vuexMap",
            ])
        },
        created() {

            this.queryDetailData().then(res => {
                this.setMarkers();
                this.vuexMap.setView(L.latLng(this.datas[0].true_lat, this.datas[0].true_lng), 13)
            })
        },
    }
</script>

<style scoped>
.texttable {
    position: absolute;
    right: 100px;
    top: 20vh;
    z-index: 999;
    opacity: 0.85;
    /* background-color: #545c64; */
}
.el-table::before {
    height: 0;
}
::v-deep .el-table__header-wrapper th {
    background-color: #545c64;
}
/* 去除表格每一行的下标线； */
/* /deep/.el-table th {
  background-color: #545c64;
} */
/* //去除表头的下标线； */
/* /deep/.el-table th.is-leaf {
  border-bottom: none;
  border: 0;
} */
/* /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px;
} */
/* 设置滚动快样式 */
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #353a3f;
    border-radius: 3px;
}
/* 设置滚动条样式 */
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
/* 隐藏表格头部多余的空白列 */
::v-deep .el-table th.gutter{
  display: none;
  width:0px
}
/* 隐藏表格主题的多余空白列 */
::v-deep .el-table colgroup col[name='gutter']{
  display: none;
  width: 0;
}
/* 强制表格主体填充整个宽度 */
::v-deep .el-table__body{
  width: 100% !important;
}
</style>
