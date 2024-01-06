<template>
  <div class="app-container" :style="backgroundDiv">
    <div class="sxt1">
      <span>摄像头</span>
      <el-dropdown>
        <el-image :src="require('../../assets/04.jpeg')" style="height: 50px;"></el-image>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="{ path: '/camera/eastexitcamera' }">
              餐厅通道
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{ path: '/camera/northcamera' }">
              摄像头
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="csdn">
      <span>城市大脑数据</span>
      <el-dropdown>
        <el-image :src="require('../../assets/0.jpeg')" style="height: 50px;"></el-image>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="{ path: '/home/trajectory_interpolation' }">
              轨迹数据修复
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{ path: '/home/trajectory_detection' }">
              轨迹数据异常检测
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{ path: '/dataclean/citybrain/traffic/licensePlate' }">
              汽车车牌转换
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="cgq">
      <span>传感器</span>
      <el-dropdown>
        <el-image :src="require('../../assets/3.jpeg')" style="height: 50px;"></el-image>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="{ path: '/home/zhijiangAll' }">
              之江传感器
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{ path: '/home/index' }">
              指标汇总
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="gzyq">
      <span>规则引擎</span>
      <el-dropdown>
        <el-image :src="require('../../assets/05.jpeg')" style="height: 50px;"></el-image>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link :to="{ path: '/home/rule' }">
              自定义规则引擎
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{ path: '/home/rule3' }">
              智能规则引擎
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="psjc">
      <span>偏色检测</span>
      <router-link :to="{ path: '/camera/colorCast2' }">
        <el-image :src="require('../../assets/06.jpeg')" style="height: 50px;"></el-image>
      </router-link>
    </div>
    <div class="sqsj">
      <span>社群数据</span>
      <router-link :to="{ path: '/home/weibo' }">
        <el-image :src="require('../../assets/07.jpeg')" style="height: 50px;"></el-image>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        src:"../../assets/1111.jpg",
        backgroundDiv: {
          backgroundImage: 'url(' + require('../../assets/1.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        }
      };
    }
  }
</script>

<style>
.app-container{
    height: 100%;
    width:100%;
  }
.sxt1{
  /* 设置相对定位 */
  position: absolute;
  /* 相对元素原来的位置距离上边缘 50px */
  top: 60%;
  /* 相对于原来的位置距左边缘 100px */
  left: 92%;
  width: 60px;
  height: 60px;
  float: left;
}
.cgq{
  /* 设置相对定位 */
  position: absolute;
  /* 相对元素原来的位置距离上边缘 50px */
  top: 60%;
  /* 相对于原来的位置距左边缘 100px */
  left: 89%;
  width: 60px;
  height: 60px;
  float: left;
}
.csdn{
  /* 设置相对定位 */
  position: absolute;
  /* 相对元素原来的位置距离上边缘 50px */
  top: 60%;
  /* 相对于原来的位置距左边缘 100px */
  left: 86%;
  width: 60px;
  height: 60px;
  float: left;
}
.gzyq{
  /* 设置相对定位 */
  position: absolute;
  /* 相对元素原来的位置距离上边缘 50px */
  top: 70%;
  /* 相对于原来的位置距左边缘 100px */
  left: 86%;
  width: 70px;
  height: 60px;
  float: left;
}
.psjc{
  /* 设置相对定位 */
  position: absolute;
  /* 相对元素原来的位置距离上边缘 50px */
  top: 70%;
  /* 相对于原来的位置距左边缘 100px */
  left: 89%;
  width: 70px;
  height: 60px;
  float: left;
}
.sqsj{
  /* 设置相对定位 */
  position: absolute;
  /* 相对元素原来的位置距离上边缘 50px */
  top: 70%;
  /* 相对于原来的位置距左边缘 100px */
  left: 92%;
  width: 70px;
  height: 60px;
  float: left;
}
</style>
