<template>
  <div class="introduct">
    <h1>数据清洗系统</h1>
    <el-divider></el-divider>
    <span>基于最前沿的开源框架所自主研发的端边云分布式智能边缘系统，涵盖了边缘计算、云计算、物联网、智能AI等技术领域</span>
    <el-divider></el-divider>
    <h1>功能</h1>
    <el-checkbox disabled v-model="checked2" checked>sadsafsa</el-checkbox>
    <br>
    <el-checkbox disabled v-model="checked2" checked>格式修改</el-checkbox>
    <br>
    <el-checkbox disabled v-model="checked2" checked>错误标注</el-checkbox>
    <br>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked1: false,
        checked2: true
      };
    }
  }
</script>

<style>
.introduct {
  border:1px solid #a1a1a1;
  padding:40px;
  width:800px;
  height: 400px;
  border-radius:4px;
}
</style>
