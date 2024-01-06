<!--<template>-->
<!--    <div>-->
<!--        <video id="videoElement" controls autoplay muted width="600" height="400"></video>-->
<!--&lt;!&ndash;        <button @click="play">播放</button>&ndash;&gt;-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import flvjs from 'flv.js'-->
<!--    export default {-->
<!--        data () {-->
<!--            return {-->
<!--                msg: 'Welcome to Your Vue.js App',-->
<!--                flvPlayer:null-->
<!--            }-->
<!--        },-->
<!--        mounted() {-->
<!--            if (flvjs.isSupported()) {-->
<!--                var videoElement = document.getElementById('videoElement');-->
<!--                this.flvPlayer = flvjs.createPlayer({-->
<!--                    type: 'flv',-->
<!--                    isLive: true,-->
<!--                    hasAudio: false,-->
<!--                    // url: require('../../assets/video/camera-395-447.mp4')-->
<!--                    url: "http://10.11.24.154:8002/flv?port=1935&app=myapp&stream=test3"-->
<!--                });-->
<!--                this.flvPlayer.attachMediaElement(videoElement);-->
<!--                this.flvPlayer.load();-->
<!--                this.flvPlayer.play();-->
<!--            }-->
<!--        },-->
<!--        methods:{-->
<!--            play () {-->
<!--                this.flvPlayer.play();-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->




<template>
    <div>
        <div class="row">
            <div class="col1">
                <h4  style=" text-align:center;">原始流</h4>
                <video id="videoElement" controls autoplay muted width="600" height="400" style="padding-left: 30px"></video>
            </div>
            <div class="col2">
                <h1  style=" text-align:center;">色差流</h1>
<!--                <div class="video"></div>-->
                <video id="videoElement2" controls autoplay muted width="600" height="400" style="padding-left: 30px"></video>
            </div>
        </div>
        <div class="row">
            <div class="col1">
                <h1  style=" text-align:center;">标定流</h1>
                <video id="videoElement3" controls autoplay muted width="600" height="400" style="padding-left: 30px"></video>
            </div>
            <div class="col2">
                <h1  style=" text-align:center;">修复流</h1>
<!--                <div class="video"></div>-->
                <video id="videoElement4" controls autoplay muted width="600" height="400" style="padding-left: 30px"></video>
            </div>
        </div>
    </div>
</template>

<script>
    import flvjs from 'flv.js'
    import { streamUrl } from '../../api/stream.js';
    export default {
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                flvPlayer: null
            }
        },
        mounted() {
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById('videoElement');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    hasAudio: false,
                    // url: require('../../assets/video/camera-395-447.mp4')
                    url: streamUrl('source')
                });
                this.flvPlayer.attachMediaElement(videoElement);
                this.flvPlayer.load();
                this.flvPlayer.play();
            }
            if (flvjs.isSupported()) {
                var videoElement2 = document.getElementById('videoElement2');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    hasAudio: false,
                    // url: require('../../assets/video/camera-395-447.mp4')
                    // url: "http://10.11.24.154:8002/flv?port=1935&app=myapp&stream=colour-cast"
                    url: streamUrl('colour-cast')
                });
                this.flvPlayer.attachMediaElement(videoElement2);
                this.flvPlayer.load();
                this.flvPlayer.play();
            }
            if (flvjs.isSupported()) {
                var videoElement3 = document.getElementById('videoElement3');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    hasAudio: false,
                    // url: require('../../assets/video/camera-395-447.mp4')
                    url: streamUrl('colour-label')
                });
                this.flvPlayer.attachMediaElement(videoElement3);
                this.flvPlayer.load();
                this.flvPlayer.play();
            }
            if (flvjs.isSupported()) {
                var videoElement4 = document.getElementById('videoElement4');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    hasAudio: false,
                    // url: require('../../assets/video/camera-395-447.mp4')
                    url: streamUrl('colour-recover')
                });
                this.flvPlayer.attachMediaElement(videoElement4);
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

<style lang="less" scoped>
    .row {
        height: 700px;
        width: 1700px;
        padding-left: 100px;
    }
    .col1 {
        float: left;
        height: 550px;
        width: 780px;
        background-color: #cde6c7;
    }
    .col2 {
        float: right;
        height: 550px;
        width: 780px;
        background-color: #cde6c7;
    }
    .video1 {
        margin-left: 25px;
    }
</style>
