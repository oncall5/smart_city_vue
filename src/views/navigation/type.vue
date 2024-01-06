<el-menu
  background-color="#fff"
  text-color="#000"
  active-text-color="#000" router>
  <!--          介绍-->
  <el-menu-item index="/introduct">
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
      <el-menu-item index="/dataclean/traffic/queryCarsData">出租车GPS数据</el-menu-item>
    </el-submenu>
    <el-menu-item index="1-2">智慧旅游系统</el-menu-item>
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
    <el-submenu index="3-3">
      <template slot="title">文本数据管理</template>
      <el-menu-item index="/dataclean/datasource/VideoData/DataInfo">查看数据</el-menu-item>
    </el-submenu>
    <el-submenu index="3-4">
      <template slot="title">数值数据管理</template>
      <el-menu-item index="/dataclean/datasource/VideoData/DataInfo">查看数据</el-menu-item>
    </el-submenu>
    <el-submenu index="3-5">
      <template slot="title">轨迹数据管理</template>
      <el-menu-item index="/dataclean/datasource/trajectoryData/DataInfo">查看数据</el-menu-item>
    </el-submenu>
  </el-submenu>
</el-menu>
