<!--<template>-->
<!--  <div>-->
<!--    <div class="row">-->
<!--      <div class="col1">-->
<!--        <h1  style=" text-align:center;">原始视频</h1>-->
<!--        <video width="450" height="450" class="video1" controls>-->
<!--          <source src="../../assets/video/movie.mp4" type="video/mp4">-->
<!--        </video>-->
<!--      </div>-->
<!--      <div class="col2">-->
<!--        <h1  style=" text-align:center;">处理后视频</h1>-->
<!--        <div class="video"></div>-->
<!--        <video width="450" height="450" class="video1" controls>-->
<!--          <source src="../../assets/video/camera-395-447-colour-b.mp4" type="video/mp4">-->
<!--        </video>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="row">-->
<!--      <div class="col1">-->
<!--        <h1  style=" text-align:center;">原始视频</h1>-->
<!--        <video width="450" height="450" class="video1" controls>-->
<!--          <source src="../../assets/video/camera-395-447-colour-label.mp4" type="video/mp4">-->
<!--        </video>-->
<!--      </div>-->
<!--      <div class="col2">-->
<!--        <h1  style=" text-align:center;">处理后视频</h1>-->
<!--        <div class="video"></div>-->
<!--        <video width="450" height="450" class="video1" controls>-->
<!--          <source src="../../assets/video/camera-395-447-colour-recover.mp4" type="video/mp4">-->
<!--        </video>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->





<!--</template>-->

<!--<script>-->
<!--  import 'video.js/dist/video-js.css'-->
<!--  import { videoPlayer } from 'vue-video-player'-->
<!--  import 'videojs-flash'-->
<!--  export default {-->
<!--    components: {-->
<!--      videoPlayer-->
<!--    },-->
<!--    //完整的配置数据（不要的可以直接注释掉）-->
<!--    data(){-->
<!--      return {-->
<!--        playerOptions:{-->
<!--          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度-->
<!--          autoplay: false, //如果true,浏览器准备好时开始回放。-->
<!--          muted: false, // 默认情况下将会消除任何音频。-->
<!--          loop: false, // 导致视频一结束就重新开始。-->
<!--          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）-->
<!--          language: 'zh-CN',-->
<!--          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）-->
<!--          // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。-->
<!--          sources: [{-->
<!--            type: "application/x-mpegURL",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目-->
<!--            src: "rtmp://58.200.131.2:1935/livetv/hunanhd" //url地址-->
<!--          }],-->
<!--          // hls:true, //如果是播放m3u8必须加（需注释掉techOrder,不然会有报错）-->
<!--          techOrder: ['flash','flash'], //播放rtmp必须加-->
<!--          poster: "", //你的封面地址-->
<!--          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。-->
<!--          controlBar: {-->
<!--            timeDivider: true,-->
<!--            durationDisplay: true,-->
<!--            remainingTimeDisplay: false,-->
<!--            fullscreenToggle: true  //全屏按钮-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style lang="less" scoped>-->

<!--  .row {-->
<!--    height: 600px;-->
<!--    width: 1400px;-->
<!--    padding: 0px;-->
<!--  }-->
<!--  .col1 {-->
<!--    float: left;-->
<!--    height: 550px;-->
<!--    width: 550px;-->
<!--    background-color: #ffffff;-->
<!--  }-->
<!--  .col2 {-->
<!--    float: right;-->
<!--    height: 550px;-->
<!--    width: 550px;-->
<!--    background-color: #ffffff;-->
<!--  }-->
<!--  .video1 {-->
<!--    margin-left: 25px;-->
<!--  }-->

<!--</style>-->

<template>
    <div >
        <video muted id="my-video" class="video-js vjs-default-skin"
               controls = 'true'
               preload="auto"
               ref="video"
               height="500"
               width="auto">
        </video>
    </div>
</template>

<script>
    import videojs from 'video.js'
    import 'videojs-contrib-hls'
    import {streamUrl} from '../../api/stream.js'
    export default {
        name: 'Test6',
        data () {
            return {
                player: ''
            }
        },
        mounted () {
            // var vm = this
            /* this.player = videojs('my-video', {
              bigPlayButton: false,
              textTrackDisplay: false,
              posterImage: true,
              errorDisplay: false,
              controlBar: true
            }, function () {
              vm.player.play()
              // this.$refs.video.play()
            }) */
            this.player = videojs(document.getElementById('my-video'), {
                controls: true, // 是否显示控制条
                poster: 'xxx', // 视频封面图地址
                preload: 'auto',
                autoplay: true,
                fluid: true, // 自适应宽高
                language: 'zh-CN', // 设置语言
                // muted: false, // 是否静音
                inactivityTimeout: false,
                controlBar: { // 设置控制条组件
                    /* 设置控制条里面组件的相关属性及显示与否
                    'currentTimeDisplay':true,
                    'timeDivider':true,
                    'durationDisplay':true,
                    'remainingTimeDisplay':false,
                    volumePanel: {
                      inline: false,
                    }
                    */
                    /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
                    children: [
                        { name: 'playToggle' }, // 播放按钮
                        { name: 'currentTimeDisplay' }, // 当前已播放时间
                        { name: 'progressControl' }, // 播放进度条
                        { name: 'durationDisplay' }, // 总时间
                        { // 倍数播放
                            name: 'playbackRateMenuButton',
                            playbackRates: [0.5, 1, 1.5, 2, 2.5]
                        },
                        {
                            name: 'volumePanel', // 音量控制
                            inline: false // 不使用水平方式
                        },
                        { name: 'FullscreenToggle' } // 全屏
                    ]
                },
                sources: [ // 视频源
                    {
                        src: streamUrl('source'),
                        type: 'application/x-mpegURL'
                        // poster: '//vjs.zencdn.net/v/oceans.png'
                    }
                ]
            }, function () {
                console.log('视频可以播放了', this)
                this.play()
            })
        }
    }
</script>

<style scoped>
</style>
