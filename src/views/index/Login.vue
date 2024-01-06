<template>
  <div class="login_container">
    <div class="background">
        <div class="login_box">
          <div class="avatar_box">
            <img src="../../assets/hdu_logo.png" alt="">
          </div>
    <!--      登录表单区域-->
    <!-- 这个是表单的验证规则 ：model代表绑定vue中数据模型，rules是表单的验证规则 -->
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_from">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item >
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
            </el-form-item>
            <el-form-item class="btns">
              <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
  //  点击重置按钮
    resetLoginForm () {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$router.push('/introduct');
      console.log(this)
      // 登录
      axios.get('http://10.11.24.169:8181/dataclean/login',{params:{username:this.loginForm.username,password:this.loginForm.password}}).then(res => {
        console.log(res)
        if(res.data=="登录成功") {
          this.$router.push('/home');
        }
        else{
          console.log(this)
          this.$message.error("用户名或密码错误");
        //this.flightstarget=res
        }
      });

    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  height: 100%;
}
.background {
  width: 100%;
  height: 100%;
    background-image: url("../../assets/background.jpeg");
    background-repeat: no-repeat;
    background-position: center top;
}
/*绝对定位
距离左边距离为父元素宽度的一般 距离顶部的距离为父元素高度的一半
但是这是以该元素左上角为定点的
transform: translate(-50%,-50%);向上想做移动自身元素长度与高度的一半
*/
.login_box {
  width: 450px;
  height: 300px;
  border-radius: 10px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

.avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0 0 10px #818181;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
  }
}

.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
