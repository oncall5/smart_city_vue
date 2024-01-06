<template>
    <div>
        <el-card>
            <el-button type="primary" @click="startColorCast">偏色检测</el-button>
            <el-button type="primary" @click="ffmpeg">偏色视频播放</el-button>
            <el-button type="primary" @click="getRate">查询检测率</el-button>
            <span v-show='isShow==true' style='margin-left:10px'>检测成功率：{{rate}}</span>
        </el-card> 
        <el-card style='margin-top:20px'>
            <div class="row">
                <div class="col1" >
                    <h4  style=" text-align:center;">偏色视频</h4>
                    <video id="videoElement" controls autoplay muted width="700" height="500"></video>
                </div>
                <div class="col2">
                    <h4  style=" text-align:center;padding-left: 5vw">偏色检测视频</h4>
                    <!-- <div class="video"></div> -->
                    <video id="videoElement2" controls autoplay muted width="700" height="500" style="padding-left: 5vw"></video>
                </div>
            </div>
        </el-card>
        <el-card v-show='isShow==true' style='margin-top:20px'>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="id" label="帧号" align="center"></el-table-column>
                <el-table-column prop="afactor" label="a_factor" align="center"></el-table-column>
                <el-table-column prop="bfactor" label="b_factor" align="center"></el-table-column>
                <el-table-column prop="castDegree" label="偏色度" align="center"></el-table-column>
                <el-table-column prop="realCast" label="实际偏色" align="center">
                <template slot-scope="scope">{{scope.row.realCast ? "是":"否"}}</template>
                </el-table-column>
                <el-table-column prop="checkResult" label="评判结果" align="center">
                <template slot-scope="scope">{{scope.row.checkResult ? "是":"否"}}</template>
                </el-table-column>
                <el-table-column prop="correctFlag" label="是否正确" align="center">
                <template slot-scope="scope">{{scope.row.correctFlag ? "是":"否"}}</template>
                </el-table-column>
                <!-- v-for="(item,index) in tableData" -->
                <el-table-column 
                    fixed="right"
                    label="帧图"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                        type="primary" 
                        icon="el-icon-search"
                        @click="dialogVisible = true"
                        @click.native.prevent="getrows(scope.row);onPreview()"
                        >
                        查看
                        </el-button>
                    </template>
                    <el-image-viewer 
                        v-if="showViewer" 
                        :on-close="closeViewer" 
                        :url-list="srcList" />
                </el-table-column>
            </el-table>
            <!-- @click.native.prevent="showpicture(scope.$index + 1)" -->
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
    import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
    import axios from '@/api/axios.js'
    import {comm} from '../../global/common'
    import flvjs from 'flv.js'
    export default {
        data(){
            return{
                isShow:false,
                showViewer: false,
                srcList:[],
                rate:0,
                canPlay: false,
                play:true,
                dialogVisible: false,
                index:1,
                tableData:[],
                queryInfo: {
                    page: 1,
                    pageSize: 10,
                    total: 0,
                },
                
            }
        },
        components:{ 
            ElImageViewer
        },
        methods:{
            onPreview() {
                this.showViewer = true
            },
            // 关闭查看器
            closeViewer() {
                this.showViewer = false
            },
            getrows(row){
                let _this = this
                // console.log(row.id)
                this.index=row.id
                //this.$refs.previewImg.showViewer = true;
                //console.log(this.$refs.previewImg.showViewer)
                if (this.srcList == undefined){
                    return this.srcList.push(require(`../../assets/cast_detect/${row.id}.jpg`))
                }else{
                    return this.srcList.splice(0,1,require(`../../assets/cast_detect/${row.id}.jpg`))
                }
            },
            startColorCast(){
                axios.$post(comm.WEB_URL+'colorCast/python').then(res => {
                    //console.log(res)
                    this.isShow=false
                })

            },
            ffmpeg(){
                var _this=this  //改变This的指向，避免异步问题
                axios.$post(comm.WEB_URL+'colorCast/encode').then(res => {
                    this.canPlay=res.data.canPlay
                })
            },
            getRate(){
                axios.$get(comm.WEB_URL+'colorCast/getRate').then(res => {
                    // console.log(res)
                    this.rate=res.data.correct_rate
                    this.isShow=true
                    this.query
                })
            },
            async query() {
                const { content, totalElements } = await this.fetchTableData()
                this.tableData = content
                this.queryInfo.total = totalElements
            },
            async fetchTableData() {
                const { content, totalElements } = await axios.$get(
                    this.comm.WEB_URL + 'colorCast/getColorCast',
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
            }

        },
        mounted(){
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById('videoElement');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'mp4',
                    isLive: true,
                    hasAudio: false,
                    url: require("C:/project/smart-city/front/smart-city-vue/smart-city-vue/src/assets/video/movie.mp4")
                });
                this.flvPlayer.attachMediaElement(videoElement);
                this.flvPlayer.load();
                this.flvPlayer.play();
            }
            if (flvjs.isSupported()) {
                var videoElement2 = document.getElementById('videoElement2');
                this.flvPlayer2 = flvjs.createPlayer({
                    type: 'mp4',
                    isLive: true,
                    hasAudio: false,
                    url: require("C:/project/smart-city/front/smart-city-vue/smart-city-vue/src/assets/video/movie.mp4")
                });
                this.flvPlayer2.attachMediaElement(videoElement2);
                this.flvPlayer2.load();
                this.flvPlayer2.play();
            }
            this.query()
        }
    }
</script>

<style lang="less" scoped>
    .row {
        display: flex;
        //height: 700px;
        width: 100%;
        padding-left: 0px;
        justify-content: center;
    }
</style>