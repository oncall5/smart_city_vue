<template>
  <el-container class="home-container">
    <!--    头部区域-->
    <el-header>
      <div>
        <i class="el-icon-location"></i>
        <span href="">HDU</span>
        <span href="">概要</span>
        <span href="">数据清洗系统</span>
      </div>
      <el-button type="info">你好</el-button>
    </el-header>
    <!--    主题区域-->
    <el-container>
      <!--      侧边栏-->
      <el-aside width="250px">
        <!--        侧边栏菜单区域-->
        <el-menu
          background-color="#fff"
          text-color="#000"
          active-text-color="#000" router>
          <!--          介绍-->
          <el-menu-item index="0">
            <i class="el-icon-setting"></i>
            <span>系统介绍</span>
          </el-menu-item>
          <!--          一级菜单-->
          <el-submenu index="1">
            <!--              一级菜单的模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-location"></i>
              <!--              文本-->
              <span>城市大脑数据</span>
            </template>
            <el-submenu index="1-1">
              <template slot="title">智慧交通系统</template>
              <el-menu-item index="/dataclean/traffic/queryFilghtsData">飞机航班数据</el-menu-item>
              <el-menu-item index="/dataclean/traffic/queryCarsData">城市汽车数据</el-menu-item>
            </el-submenu>
            <el-menu-item index="1-2">智能文本检测系统</el-menu-item>
            <el-menu-item index="1-3">重大活动监测</el-menu-item>
            <el-submenu index="1-4">
              <template slot="title">公共设施管理</template>
              <el-submenu index="1-4-1">
                <template slot="title">电梯温度</template>
                <el-menu-item index="1-4-1-1">温度传感器001</el-menu-item>
                <el-menu-item index="1-4-1-2">温度传感器002</el-menu-item>
              </el-submenu>
              <el-submenu index="1-4-2">
                <template slot="title">电梯摄像头</template>
                <el-menu-item index="1-4-1-1">10号楼1号电梯</el-menu-item>
                <el-menu-item index="1-4-1-2">10号楼2号电梯</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!--          菜单2-->
          <el-submenu index="2">
            <!--              一级菜单的模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-location"></i>
              <!--              文本-->
              <span>传感器</span>
            </template>
            <el-submenu index="2-1">
              <template slot="title">温度传感器</template>
              <el-menu-item index="1-1-1">温度传感器001</el-menu-item>
              <el-menu-item index="1-1-1">温度传感器002</el-menu-item>
              <el-menu-item index="1-1-1">温度传感器003</el-menu-item>
            </el-submenu>
            <el-submenu index="2-2">
              <template slot="title">湿度传感器</template>
              <el-menu-item index="2-2-1">湿度传感器001</el-menu-item>
              <el-menu-item index="2-2-2">湿度传感器002</el-menu-item>
              <el-menu-item index="2-2-3">湿度传感器003</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!--          菜单3-->
          <el-submenu index="3">
            <!--              一级菜单的模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-location"></i>
              <!--              文本-->
              <span>摄像头</span>
            </template>
            <el-submenu index="3-1">
              <template slot="title">十号楼</template>
              <el-menu-item index="3-1-1">南门口摄像头</el-menu-item>
              <el-menu-item index="3-1-1">西门口摄像头</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="4">
            <!--              一级菜单的模板区域-->
            <template slot="title">
              <!--              图标-->
              <i class="el-icon-location"></i>
              <!--              文本-->
              <span>数据源管理</span>
            </template>
            <el-submenu index="3-1">
              <template slot="title">结构化数据管理</template>
              <el-menu-item index="/dataclean/datasource/StructedData/DataInfo">查看数据</el-menu-item>
            </el-submenu>
            <el-submenu index="3-2">
              <template slot="title">视频数据管理</template>
              <el-menu-item index="/dataclean/datasource/VideoData/DataInfo">查看数据</el-menu-item>
            </el-submenu>
          </el-submenu>
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
  }
</script>

<style lang="less" scoped>

  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #545C64;
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    align-items: center;
    color: #ffffff;
    font-size: 10px;
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
    /*display: flex;*/
    // border-right:1px solid #ccc;
    padding: 20px;
    margin: 20px;
  }

  .el-main {
    background-color: #eaedf1;

  }

</style>
