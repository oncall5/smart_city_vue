<template>
  <el-container class="home-container">
    <!--    头部区域-->
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">余杭区</template>
          <el-submenu index="2-1">
            <template slot="title">浙江省</template>
            <el-submenu index="2-1-1">
              <template slot="title">杭州市</template>
              <el-menu-item index="2-1">余杭区</el-menu-item>
              <el-menu-item index="2-2">江干区</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-submenu>

        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4">管理</el-menu-item>
      </el-menu>
      <!--      <div>-->
      <!--        <i class="el-icon-location"></i>-->
      <!--        <span href="">HDU</span>-->
      <!--        <span href="">概要</span>-->
      <!--        <span href="">多源数据智能协同清洗系统</span>-->
      <!--        <span href="">数据类型</span>-->
      <!--      </div>-->

      <el-button type="info">多源数据智能协同清洗系统</el-button>
    </el-header>
    <!--    主题区域-->
    <el-container class="main-section">
      <!--      侧边栏-->
      <el-aside>
        <!--        侧边栏菜单区域-->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <!--          介绍-->
          <el-menu-item index="/introduct">
            <i class="el-icon-question"></i>
            <span>系统介绍</span>
          </el-menu-item>
          <!--          一级菜单-->
          <el-submenu index="1">
            <!--              一级菜单的模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-office-building"></i>
              <!--              文本-->
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
            <!--                        <el-menu-item index="/home/text">智能文本检测系统</el-menu-item>-->
            <!--                        <el-menu-item index="1-3">重大活动监测</el-menu-item>-->
            <!--                        <el-submenu index="1-4">-->
            <!--                            <template slot="title">公共设施管理</template>-->
            <!--                            <el-submenu index="1-4-1">-->
            <!--                                <template slot="title">电梯温度</template>-->
            <!--                                <el-menu-item index="1-4-1-1">温度传感器001</el-menu-item>-->
            <!--                                <el-menu-item index="1-4-1-2">温度传感器002</el-menu-item>-->
            <!--                            </el-submenu>-->
            <!--                            <el-submenu index="1-4-2">-->
            <!--                                <template slot="title">电梯摄像头</template>-->
            <!--                                <el-menu-item index="1-4-1-1">10号楼1号电梯</el-menu-item>-->
            <!--                                <el-menu-item index="1-4-1-2">10号楼2号电梯</el-menu-item>-->
            <!--                            </el-submenu>-->
            <!--                        </el-submenu>-->
          </el-submenu>
          <!--          菜单2-->
          <el-submenu index="2">
            <!--              一级菜单的模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-cpu"></i>
              <!--              文本-->
              <span>传感器</span>
            </template>
            <el-menu-item index="/home/zhijiangAll">之江传感器</el-menu-item>
            <!--                        <el-submenu index="2-1">-->
            <!--                            <template slot="title">-->
            <!--                                &lt;!&ndash;              图标&ndash;&gt;-->
            <!--                                &lt;!&ndash;                                <i class="el-icon-loading"></i>&ndash;&gt;-->
            <!--                                &lt;!&ndash;              文本&ndash;&gt;-->
            <!--                                <span>温度传感器</span>-->
            <!--                            </template>-->
            <!--                            <el-menu-item index="/home/ch1All">温度传感器1</el-menu-item>-->
            <!--                            <el-menu-item index="/home/ch2All">温度传感器2</el-menu-item>-->
            <!--                            <el-menu-item index="/home/ch3All">温度传感器3</el-menu-item>-->
            <!--                            <el-menu-item index="/home/ch4All">温度传感器4</el-menu-item>-->
            <!--                        </el-submenu>-->
            <!--                        <el-menu-item index="/home/lightTemperatureAll">激光温度传感器</el-menu-item>-->
            <!--                        <el-menu-item index="/home/distanceAll">距离传感器</el-menu-item>-->
            <!--                        <el-menu-item index="/home/CO2All">CO2传感器</el-menu-item>-->
            <!--                        <el-menu-item index="/home/PM25All">pm2.5传感器</el-menu-item>-->
            <!--                        <el-menu-item index="/home/PM10All">pm10传感器</el-menu-item>-->
            <!--                        <el-menu-item index="/home/pressureAll">压力传感器</el-menu-item>-->
            <el-menu-item index="/home/index">指标汇总</el-menu-item>
          </el-submenu>
          <!--          菜单3-->
          <el-submenu index="3">
            <!--              一级菜单的模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-camera-solid"></i>
              <!--              文本-->
              <span>摄像头</span>
            </template>
            <el-submenu index="3-1">
              <template slot="title">十号楼</template>
              <!--                            <el-menu-item index="/camera/southcamera">南门口摄像头</el-menu-item>-->
              <el-menu-item index="/camera/eastexitcamera"
                >东大门出口</el-menu-item
              >
              <el-menu-item index="/camera/northcamera"
                >北门口摄像头</el-menu-item
              >
              <!-- <el-menu-item index="/camera/colorCast"
                >偏色检测</el-menu-item
              > -->
            </el-submenu>
          </el-submenu>
          <!--                    <el-submenu index="4">-->
          <!--                        &lt;!&ndash;              一级菜单的模板区域&ndash;&gt;-->
          <!--                        <template slot="title">-->
          <!--                            &lt;!&ndash;              图标&ndash;&gt;-->
          <!--                            <i class="el-icon-setting"></i>-->
          <!--                            &lt;!&ndash;              文本&ndash;&gt;-->
          <!--                            <span>数据源管理</span>-->
          <!--                        </template>-->
          <!--                        <el-submenu index="4-1">-->
          <!--                            <template slot="title">结构化数据管理</template>-->
          <!--                            <el-menu-item index="/dataclean/datasource/StructedData/DataInfo">查看数据</el-menu-item>-->
          <!--                            <el-menu-item index="/dataclean/datasource/StructedData/testquota">测试指标</el-menu-item>-->
          <!--                            <el-menu-item index="/dataclean/datasource/StructedData/testdata">测试数据</el-menu-item>-->
          <!--                        </el-submenu>-->
          <!--                        <el-submenu index="4-2">-->
          <!--                            <template slot="title">视频数据管理</template>-->
          <!--                            <el-menu-item index="/dataclean/datasource/VideoData/DataInfo">查看数据</el-menu-item>-->
          <!--                        </el-submenu>-->
          <!--                        <el-submenu index="4-3">-->
          <!--                            <template slot="title">文本数据管理</template>-->
          <!--                            <el-menu-item index="/dataclean/datasource/VideoData/DataInfo">查看数据</el-menu-item>-->
          <!--                        </el-submenu>-->
          <!--                        <el-submenu index="4-4">-->
          <!--                            <template slot="title">数值数据管理</template>-->
          <!--                            <el-menu-item index="/dataclean/datasource/VideoData/DataInfo">查看数据</el-menu-item>-->
          <!--                        </el-submenu>-->
          <!--                        <el-submenu index="4-5">-->
          <!--                            <template slot="title">轨迹数据管理</template>-->
          <!--                            <el-menu-item index="/dataclean/datasource/trajectoryData/DataInfo">查看数据</el-menu-item>-->
          <!--                        </el-submenu>-->
          <!--                    </el-submenu>-->
          <!-- <el-menu-item index="/home/rule">规则引擎</el-menu-item> -->
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
      </el-aside>
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
}

.main-section {
  height: calc(100% - var(--header-height));
}
</style>
