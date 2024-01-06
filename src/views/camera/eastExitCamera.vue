<template>
    <div>
        <div class="row">
            <h4  style=" text-align:center;">监控视频</h4>
            <video id="videoElement" controls autoplay muted width="1200" height="800" ></video>
            <!--        <button @click="play">播放</button>-->
        </div>

    </div>
</template>

<script>
    import flvjs from 'flv.js'
    import {streamUrl} from "../../api/stream";

    export default {
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                flvPlayer:null
            }
        },
        mounted() {
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById('videoElement');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'mp4',
                    isLive: true,
                    hasAudio: false,
                     url: require('../../assets/video/movie.mp4'),
                    // url: "http://10.11.24.154:8002/flv?port=1935&app=myapp&stream=test2"
                    // url:streamUrl('colour-label')
                    // url:'http://10.11.24.56:8002/live?port=1935&app=myapp&stream=test2'
                    // url: "http://172.20.10.6:8080/live?port=1935&app=myapp&stream=mystream"
                });
                this.flvPlayer.attachMediaElement(videoElement);
                this.flvPlayer.load();
                this.flvPlayer.play();
            }
        },
        methods:{
            play () {
                this.flvPlayer.play();
            }
        }
    }
</script>
<style scoped>
    .row {
        height: 800px;
        width: 1200px;
        padding-left: 100px;
        align-items: center;
        justify-content: center;
    }
    #videoElement {
        display: block;
        margin: auto;
    }
</style>
