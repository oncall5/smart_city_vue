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
                        prop="time"
                        label="时间">
                </el-table-column>
                <el-table-column
                        prop="true_lat"
                        label="真实纬度">
                </el-table-column>
                <el-table-column
                        prop="true_lng"
                        label="真实经度">
                </el-table-column>
                <el-table-column
                        prop="pred_lat"
                        label="修复纬度">
                </el-table-column>
                <el-table-column
                        prop="pred_lng"
                        label="修复经度">
                </el-table-column>
                <el-table-column
                        prop="error"
                        label="误差(米)">
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
        name: "trajectoryDetail",
        components: {
            Map
        },
        data() {
            return {
                index: this.$route.params.index,
                datas: [{
                    time:"Thu, 23 Oct 2008 02:53:04 GMT",
                    true_lat:"39.984501",
                    true_lng:"116.314907",
                    pred_lat:"39.984534879241856",
                    pred_lng:"116.31493742764326",
                    error:"5",
                },{
                    time:"Thu, 23 Oct 2008 02:53:04 GMT",
                    true_lat:"39.984501",
                    true_lng:"116.314907",
                    pred_lat:"39.984534879241856",
                    pred_lng:"116.31493742764326",
                    error:"5",
                },{
                    time:"Thu, 23 Oct 2008 02:53:04 GMT",
                    true_lat:"39.984501",
                    true_lng:"116.314907",
                    pred_lat:"39.984534879241856",
                    pred_lng:"116.31493742764326",
                    error:"5",
                },{
                    time:"Thu, 23 Oct 2008 02:53:04 GMT",
                    true_lat:"39.984501",
                    true_lng:"116.314907",
                    pred_lat:"39.984534879241856",
                    pred_lng:"116.31493742764326",
                    error:"5",
                },{
                    time:"Thu, 23 Oct 2008 02:53:04 GMT",
                    true_lat:"39.984501",
                    true_lng:"116.314907",
                    pred_lat:"39.984534879241856",
                    pred_lng:"116.31493742764326",
                    error:"5",
                }],
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

                return axios.$get(comm.Traj_Url + 'getTrajectoryDetail', parmas).then(res => {
                    let len = res.pred_lat.length;
                    for (let i = 0; i < len; i++) {
                        this.datas.push({
                            'time': res.train_time_stamp[i],
                            'true_lat': res.true_lat[i],
                            'true_lng': res.true_lng[i],
                            'pred_lat': res.pred_lat[i],
                            'pred_lng': res.pred_lng[i],
                            'error': res.error[i],
                        });
                        let temp = {
                            'train_lat': res.train_lat[i],
                            'train_lng': res.train_lng[i],
                        };
                        this.positions.push(temp)
                    }
                })
            },
            setMarkers() {
                this.positions = JSON.parse(JSON.stringify(this.positions));

                this.positions.forEach(item => {
                    let tip = `${item.train_lng ? "经度: " + item.train_lng + "<br>" : ""}
            ${item.train_lat ? "纬度: " + item.train_lat + "<br>" : ""}`;
                    let marker = L.circle(L.latLng(item.train_lat, item.train_lng), {
                        color: '#ff000e',
                        fillColor: '#ff000e',
                        fillOpacity: 0.50,
                        radius: 10
                    }).unbindTooltip().bindTooltip(tip, {
                        direction: 'right',
                        opacity: 1,
                        className: 'ls_tooltip_ty'
                    }).addTo(this.vuexMap);
                });

                this.datas.forEach(item => {
                    let tip_pred = `${item.pred_lng ? "经度: " + item.pred_lng + "<br>" : ""}
            ${item.pred_lat ? "纬度: " + item.pred_lat + "<br>" : ""}`;
                    let marker_pred = L.circle(L.latLng(item.pred_lat, item.pred_lng), {
                        color: '#49ff3d',
                        fillColor: '#49ff3d',
                        fillOpacity: 0.50,
                        radius: 10
                    }).unbindTooltip().bindTooltip(tip_pred, {
                        direction: 'right',
                        opacity: 1,
                        className: 'ls_tooltip_ty'
                    }).addTo(this.vuexMap);


                    let tip = `${item.true_lng ? "经度: " + item.true_lng + "<br>" : ""}
            ${item.true_lat ? "纬度: " + item.true_lat + "<br>" : ""}`;
                    let marker = L.circle(L.latLng(item.true_lat, item.true_lng), {
                        color: '#ff9079',
                        fillColor: '#ff9079',
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
            console.log("this.vuexMap",this.vuexMap)
            this.queryDetailData().then(res => {
                this.setMarkers();
                console.log("this.vuexMap",this.vuexMap)
                this.vuexMap.setView(L.latLng(this.datas[0].true_lat, this.datas[0].true_lng), 13)
            })
        },
        mounted() {
            
        }
    }
</script>

<style scoped>
.map1 {
    height:92vh;
}
/* 定位，置顶，虚化程度设置为0.85 */
.texttable {
    position: absolute;
    right: 100px;
    top: 20vh;
    z-index: 999;
    opacity: 0.85;
}
/* 去除底部的白线 */
.el-table::before {
    height: 0;
}
/* ::v-deep .el-table__header-wrapper th {
    background-color: #545c64;
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
