<template>
    <div>
        <el-card>
            <el-table :data="datas" max-height="400">
                <el-table-column
                        prop="userID"
                        label="用户名">
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
                        prop="true_grid"
                        label="真实网格号">
                </el-table-column>
                <el-table-column
                        prop="pred_grid"
                        label="修复网格号">
                </el-table-column>
                <el-table-column
                        prop="dis_error"
                        label="误差(km)">
                </el-table-column>
            </el-table>
        </el-card>
        <el-card style="height: 1080px;">
            <Map style="width: 100%;height: 1080px"></Map>
        </el-card>
    </div>
</template>

<script>
    import {comm} from "../../../global/common";
    import Map from '@/views/map/map';
    import axios from '@/api/axios.js';
    import {mapGetters} from "vuex"

    export default {
        name: "trajectoryDetail2",
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
        components: {
            Map
        },
        computed: {
            ...mapGetters([
                "vuexMap",
            ])
        },
        methods: {
            queryDetailData() {
                let parmas = {
                    index: this.index
                };
                return axios.$get(comm.Traj_Url + 'getSimilarMoveDetail', parmas).then(res => {
                    let len = res.pred_lat.length;
                    for (let i = 0; i < len; i++) {
                        this.datas.push({
                            'userID': res.index,
                            'true_lat': res.true_lat[i],
                            'true_lng': res.true_lng[i],
                            'pred_lat': res.pred_lat[i],
                            'pred_lng': res.pred_lng[i],
                            'dis_error': res.dis_error[i],
                            'true_grid': res.true_grid[i],
                            'pred_grid': res.pred_grid[i],
                        });

                    }
                })
            },
            setMarkers() {
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
        created() {
            this.queryDetailData().then(res => {
                this.setMarkers();
                this.vuexMap.setView(L.latLng(this.datas[0].true_lat, this.datas[0].true_lng), 13)
            })
        }
    }
</script>

<style scoped>

</style>
