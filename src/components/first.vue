<template>
  <el-container class="home-container">
<!--    头部区域-->
    <el-header>
      <div>
        <img src="" alt="">
        <span>数据清洗系统</span>
      </div>
      <el-button type="info">你好</el-button>
    </el-header>
<!--    主题区域-->
    <el-container>
<!--      侧边栏-->
      <el-aside width="200px">Aside</el-aside>
<!--      右侧主题区域-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>export default {
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
  padding-left: 0px;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
    background-color: #ffffff;
    border-right:1px solid #ccc;
}

.el-main {
    background-color: #ffffff;
}

</style>
