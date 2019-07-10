<template>
    <div class="login-center">
      <el-card class="box">
        <img src="../../assets/image/logo_index.png" alt="">
        <el-form>
          <el-form-item>
             <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
          </el-form-item>
           <el-form-item>
             <el-input  placeholder="请输入验证码" style="width:200px" ></el-input>
             <el-button type="primary" style="margin-left:40px" @click="dian()">发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked"></el-checkbox>
              我已阅读并同意<el-link  :underline="false" type="primary">用户协议</el-link>和<el-link  :underline="false" type="primary">隐私条款</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  style="width:100%" @click="deng()">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: ''
      },
      checked: true
    }
  },
  methods: {
    deng () {
      alert('登录成功')
    },
    dian () {
      alert('已发送')
    }
  }
}
</script>

<style scoped lang="less">
  .login-center{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    background: url(../../assets/image/login_bg.jpg) no-repeat center;
    .box{
      width: 400px;
      height: 350px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      img{
        display: block;
        margin: 0px auto 10px;
      }
    }
  }
</style>
