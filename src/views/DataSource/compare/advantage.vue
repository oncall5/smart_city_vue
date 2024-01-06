<template>
  <div>
    <h3>云边系统与云端清洗方法对比</h3>
    <h3>云边协同清洗结果</h3>
    <el-form :inline="true" :model="result">
      <el-row>
        <el-col :span="6">
          <el-form-item label="召回率">
            <el-input v-model="result.total" placeholder="MB" autosize disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="精确率">
            <el-input v-model="result.speed" placeholder="万条/s" autosize disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="内存消耗">
            <el-input v-model="result.ratio" placeholder="%" autosize disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="时间消耗">
            <el-input v-model="result.time" placeholder="s" autosize disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--卡片视图区域-->
    <el-card>
      <!--用户列表区域-->
      <el-table :data="CarsDirtyList" border stripe>
        <!--缩印列-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <h3>云端清洗结果</h3>
    <el-form :inline="true" :model="result">
      <el-row>
        <el-col :span="6">
          <el-form-item label="召回率">
            <el-input v-model="result.total" placeholder="MB" autosize disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="精确率">
            <el-input v-model="result.speed" placeholder="万条/s" autosize disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="内存消耗">
            <el-input v-model="result.ratio" placeholder="%" autosize disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="时间消耗">
            <el-input v-model="result.time" placeholder="s" autosize disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--卡片视图区域-->
    <el-card>
      <!--用户列表区域-->
      <el-table :data="CarsCleanList" border stripe>
        <!--缩印列-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--分页区域-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
                   layout="total, sizes, prev, pager, next, jumper" :total="total">

    </el-pagination>
  </div>

</template>

<script>
    export default {
      data(){
        return{
          CarsCleanList:[{username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12}],
          CarsDirtyList:[{username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
            {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12}],
          queryInfo: {
            query: '',
            //当前的页数
            pagenum: 1,
            //当前每页显示多少条数据
            pagesize: 2
          },
          total: 0,
          result:{
            total:'90%',
            speed:'80%',
            ratio:'80',
            time:'20s'
          }
        }
      }
    }
</script>

<style scoped>

</style>
