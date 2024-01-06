<template>
    <!-- <el-card>
      <div class="tag-bar__container">
        <el-button type="primary" @click="isAddRuleDialogShow = true">
            偏色检测
        </el-button>
        <el-button type="primary" @click="isAddRuleDialogShow = true">
            偏色视频播放
        </el-button>
        <div class="tag-bar__tags">
          <el-tag
            class="tag-bar__tag"
            v-for="(r, idx) in rule"
            :key="idx"
            :type="r.isDirtyData ? 'danger' : 'primary'"
            @click="handleTagClick(idx)"
          >
            {{ getFieldZh(tableName, r.field) }}
          </el-tag>
        </div>
      </div>
    </el-card> -->
    <div>
        <el-card>
            <div class="tag-bar__container">
                <el-button type="primary" @click="choosevideo">
                    偏色检测
                </el-button>
                <el-button type="primary" @click="ffmpeg">
                    偏色视频播放
                </el-button>
                <div>
                    <el-button type="primary" @click="isShow=true">
                        检测率
                    </el-button>
                    <span v-show='isShow==true'>{{111}}</span>
                </div>
                
                <div class="tag-bar__tags">
                <el-tag
                    class="tag-bar__tag"
                    v-for="(r, idx) in camera"
                    :key="idx"
                    :type="r.isDirtyData ? 'danger' : 'primary'"
                    @click="handleTagClick(idx)"
                >
                    {{ getFieldZh(tableName, r.field) }}
                </el-tag>
                </div>
            </div>
        </el-card>

        <div class="row">
            <div class="col1">
                <h4  style=" text-align:center;">原视频</h4>
                <video id="videoElement" controls autoplay muted width="600" height="400" style="padding-left: 10px;"></video>
            </div>
            <div class="col2">
                <h1  style=" text-align:center;">偏色视频</h1>
                <!-- <div class="video"></div> -->
                <video id="videoElement2" controls autoplay muted width="600" height="400" style="padding-left: 10px"></video>
            </div>
        </div>
        <!-- <div>
            <button class="btn">偏色视频播放</button>
        </div>
        <div>
            <button class="btn">偏色检测</button>
        </div> -->
        <!-- <div class="row">
            <div class="col1">
                <h1  style=" text-align:center;">标定流</h1>
                <video id="videoElement3" controls autoplay muted width="600" height="400" style="padding-left: 30px"></video>
            </div>
            <div class="col2">
                <h1  style=" text-align:center;">修复流</h1>
               <div class="video"></div>
                <video id="videoElement4" controls autoplay muted width="600" height="400" style="padding-left: 30px"></video>
            </div>
        </div> -->
    </div>
</template>

<script>
    import axios from '@/api/axios.js'
    import {comm} from '../../global/common'
    import flvjs from 'flv.js'
    import { get } from 'http';
    import { streamUrl } from '../../api/stream.js';
    import camera from '../../router/camera';
    export default {
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                flvPlayer: null,
                isShow:false
            }
        },
        mounted() {
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById('videoElement');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'mp4',
                    isLive: true,
                    hasAudio: false,
                    //url: "http://10.65.7.25:8080/flv?port=1935&app=myapp&stream=mystream"
                    //url: streamUrl('source')
                    url: require("C:/jc/Project/smartCity/dataclean/src/main/resources/cast_video/source.mp4")
                });
                this.flvPlayer.attachMediaElement(videoElement);
                this.flvPlayer.load();
                this.flvPlayer.play();
            }
            if (flvjs.isSupported()) {
                var videoElement2 = document.getElementById('videoElement2');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'mp4',
                    isLive: true,
                    hasAudio: false,
                    // url: require('../../assets/video/camera-395-447.mp4')
                    // url: "http://10.11.24.154:8002/flv?port=1935&app=myapp&stream=colour-cast"
                    //url: require('../../assets/video/cast_detect.mp4')
                    //url: '../../assets/video/movie.mp4'
                    //url: "http://10.65.7.25:8080/flv?port=1935&app=myapp&stream=mystream"
                    //url: streamUrl('colour-cast')
                    url: require("C:/jc/Project/smartCity/dataclean/src/main/resources/cast_video/cast.mp4")
                });
                this.flvPlayer.attachMediaElement(videoElement2);
                this.flvPlayer.load();
                this.flvPlayer.play();
            }
            // if (flvjs.isSupported()) {
            //     var videoElement3 = document.getElementById('videoElement3');
            //     this.flvPlayer = flvjs.createPlayer({
            //         type: 'flv',
            //         isLive: true,
            //         hasAudio: false,
            //         // url: require('../../assets/video/camera-395-447.mp4')
            //         //url: require('../../assets/video/movie.mp4')
            //         //url: '../../assets/video/movie.mp4'
            //         url: "http://10.65.7.25:8080/flv?port=1935&app=myapp&stream=mystream"
            //         //url: streamUrl('colour-label')
            //     });
            //     this.flvPlayer.attachMediaElement(videoElement3);
            //     this.flvPlayer.load();
            //     this.flvPlayer.play();
            // }
            // if (flvjs.isSupported()) {
            //     var videoElement4 = document.getElementById('videoElement4');
            //     this.flvPlayer = flvjs.createPlayer({
            //         type: 'flv',
            //         isLive: true,
            //         hasAudio: false,
            //         // url: require('../../assets/video/camera-395-447.mp4')
            //         //url: require('../../assets/video/movie.mp4')
            //         //url: '../../assets/video/movie.mp4'
            //         url: "http://10.65.7.25:8080/flv?port=1935&app=myapp&stream=mystream"  http://10.65.7.22:8181
            //         //url: streamUrl('colour-recover')
            //     });
            //     this.flvPlayer.attachMediaElement(videoElement4);
            //     this.flvPlayer.load();
            //     this.flvPlayer.play();
            // }
        },
        methods:{
            play () {
                this.flvPlayer.play();
            },
            choosevideo(){
                axios.$post(comm.WEB_URL+'colorCast/python').then(res => {
                    console.log(res)
                })
                // method: "post"
                // url:"/dataClean/colorCast/python",
                // method: "post",
            },
            ffmpeg(){
                axios.$post(comm.WEB_URL+'colorCast/encode').then(res => {
                    //console.log(res)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .row {
        display: flex;
        height: 700px;
        width: 1400px;
        padding-left: 0px;
    }
    .col1 {
        float: left;
        height: 500px;
        width: 650px;
        //border:1px solid
        background-color: #cde6c7;
    }
    .col2 {
        float: right;
        height: 500px;
        width: 650px;
        background-color: #cde6c7;
    }
    .video1 {
        margin-left: 25px;
    }
    .btn {
        //float: left;
        margin-left: 100px;
        height: 100px;
        width: 100px;
    }
    .tag-bar {
        &__container {
            display: flex;
            // width: 1600px;
            justify-content: space-between;
        }
        &__tags {
            display: flex;
            align-items: center;
        }
        &__tag {
            transition: all 0.2s ease-in-out;
            &:hover {
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            &:not(:last-child) {
            margin-right: 10px;
            }
        }
    }
    .videoElement{
        margin: 0 auto;
    }
</style>
