<template>
  <el-container class="home-container">
    <span class="introduct">国家重点研发计划项目:面向城市公共服务的高效融合与动态认知技术和平台(2019YFB2102100)</span>
    <span class="introduct">课题一:多源多模数据实时采集与协同感知演示系统</span>
    <!--    头部区域-->
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
        <el-menu-item index="/introduct">
          <i class="el-icon-question"></i>
          <span>系统介绍</span>
        </el-menu-item>
        <!-- 第一部分 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-office-building"></i>
            <span>城市大脑数据</span>
          </template>
          <el-submenu index="1-1">
              <template slot="title">智慧交通系统</template>
              <el-menu-item index="/dataclean/citybrain/traffic/mobileGps"
                >行人位置获取</el-menu-item
              >
              <el-menu-item
                index="/dataclean/citybrain/traffic/queryFilghtsData"
                >GPS与道路转换</el-menu-item
              >
              <el-menu-item index="/home/trajectory_interpolation"
                >轨迹数据修复</el-menu-item
              >
              <!--                            <el-menu-item index="/home/trajectory_interpolation2">轨迹数据修复2</el-menu-item>-->
              <el-menu-item index="/home/trajectory_detection"
                >轨迹数据异常检测</el-menu-item
              >
              <!--                            <el-menu-item index="/home/trajectory_detection2">轨迹数据异常检测2</el-menu-item>-->
              <el-menu-item index="/dataclean/citybrain/traffic/licensePlate"
                >汽车车牌转换</el-menu-item
              >
            </el-submenu>
        </el-submenu>
        <!-- 第二部分 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-cpu"></i>
            <span>传感器</span>
          </template>
          <el-menu-item index="/home/zhijiangAll">之江传感器</el-menu-item>
          <el-menu-item index="/home/index">指标汇总</el-menu-item>
        </el-submenu>
        <!-- 第三部分 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-camera-solid"></i>
            <span>摄像头</span>
          </template>
          <el-submenu index="3-1">
            <template slot="title">十号楼</template>
            <el-menu-item index="/camera/eastexitcamera"
                >东大门出口
              </el-menu-item>
              <el-menu-item index="/camera/northcamera"
                >北门口摄像头
              </el-menu-item>
          </el-submenu>
        </el-submenu>
        <!-- 第四部分 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-odometer"></i>
            <span>规则引擎</span>
          </template>
          <el-menu-item index="/home/rule">
            <i class="el-icon-odometer"></i>
            <span>自定义规则引擎</span>
          </el-menu-item>
          <el-menu-item index="/home/rule3">
            <i class="el-icon-odometer"></i>
            <span>智能规则引擎</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/camera/colorCast2">
          <i class="el-icon-refresh"></i>
          <span>偏色检测</span>
        </el-menu-item>
        <el-menu-item index="/home/weibo">
          <i class="el-icon-school"></i>
          <span>社群数据</span>
        </el-menu-item>
      </el-menu>

      <!-- <el-button type="info">多源多模数据实时采集与协同感知演示系统</el-button> -->
      <!-- <el-button type="info">
        面向城市公共服务的高效融合与动态认知技术和平台
        <br>
        课题一多源多模数据实时采集与协同感知演示系统
      </el-button> -->
    </el-header>
    <!--    主题区域-->
    <el-container class="main-section">
      <!--      侧边栏-->
      <!-- <el-aside>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/introduct">
            <i class="el-icon-question"></i>
            <span>系统介绍</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-office-building"></i>
              <span>城市大脑数据</span>
            </template>
            <el-submenu index="1-1">
              <template slot="title">智慧交通系统</template>
              <el-menu-item index="/dataclean/citybrain/traffic/mobileGps"
                >行人位置获取</el-menu-item
              >
              <el-menu-item
                index="/dataclean/citybrain/traffic/queryFilghtsData"
                >GPS与道路转换</el-menu-item
              >
              <el-menu-item index="/home/trajectory_interpolation"
                >轨迹数据修复</el-menu-item
              >
              <el-menu-item index="/home/trajectory_detection"
                >轨迹数据异常检测</el-menu-item
              >
              <el-menu-item index="/dataclean/citybrain/traffic/licensePlate"
                >汽车车牌转换</el-menu-item
              >
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-cpu"></i>
              <span>传感器</span>
            </template>
            <el-menu-item index="/home/zhijiangAll">之江传感器</el-menu-item>
            <el-menu-item index="/home/index">指标汇总</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-camera-solid"></i>
              <span>摄像头</span>
            </template>
            <el-submenu index="3-1">
              <template slot="title">十号楼</template>
              <el-menu-item index="/camera/eastexitcamera"
                >东大门出口
              </el-menu-item>
              <el-menu-item index="/camera/northcamera"
                >北门口摄像头
              </el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-odometer"></i>
              <span>规则引擎</span>
            </template>
            <el-menu-item index="/home/rule">
              <i class="el-icon-odometer"></i>
              <span>自定义规则引擎</span>
            </el-menu-item>
            <el-menu-item index="/home/rule3">
              <i class="el-icon-odometer"></i>
              <span>智能规则引擎</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/camera/colorCast2">
            <i class="el-icon-refresh"></i>
            <span>偏色检测</span>
          </el-menu-item>
          <el-menu-item index="/home/weibo">
            <i class="el-icon-school"></i>
            <span>社群数据</span>
          </el-menu-item>
        </el-menu>
      </el-aside> -->
      <!--右侧内容主题-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      checked1: false,
      checked2: true,
    }
  },
  methods: {
    handleSelect() {},
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  overflow: hidden;
  --header-height: 60px;
  --aside-width: 220px;
}

.el-header {
  background-color: #545c64;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  align-items: center;
  color: #ffffff;
  font-size: 10px;
  height: var(--header-height);
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
      margin-right: 25px;
      font-size: 14px;
    }
  }
}

.el-aside {
  background-color: #ffffff;
  overflow-y: scroll;
  width: var(--aside-width);
}

.el-main {
  background-color: #eaedf1;
  padding: 10px;
}

.main-section {
  // height: calc(100% - var(--header-height));
  height: 85vh;
}
.introduct {
  background-color: #485466;
  color: #ffd04b;
  text-align: center;
  line-height: 4vh;
  font-size: large;
}
</style>
