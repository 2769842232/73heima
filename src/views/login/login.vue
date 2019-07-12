<template>
    <div class="login-center">
      <el-card class="box">
        <img src="../../assets/image/logo_index.png" alt="">
        <!-- 通过 'rules' 属性传入约定的验证规则 -->
        <el-form ref="loginForm" status-icon :model="loginForm" :rules='loginRules'>
          <el-form-item prop='mobile'>
             <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
           <el-form-item prop='code'>
             <el-input v-model="loginForm.code"   placeholder="请输入验证码" style="width:200px" ></el-input>
             <el-button type="primary" style="float:right" >发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
             <el-link  :underline="false" type="primary">用户协议</el-link>和<el-link  :underline="false" type="primary">隐私条款</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  style="width:100%" @click="login()" >登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    // 检验手机号的
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        // 表单验证规则对象
        mobile: [
          // 验证规则 是否必填 长度 格式
          { required: true, message: '手机号必填', tirgger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', tirgger: 'blur' },
          { len: 6, message: '必须是6位', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    login () {
      // 整体表单的验证
      // 对整个表单进行校验的方法，参数为一个回调函数。
      // 该回调函数会在校验结束后被调用，并传入两个参数
      // ：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 如果验证成功 进行登录
          this.axios
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then((res) => {
              const data = res.data
              console.log(data)
              // 登录成功之后跳转页面
              // 保存登录状态
              /// --------------- ///保存会话状态
              // 再本地存储token信息
              // 保存登录状态  保存登录后返回的用户信息 包含token
              // 使用sessionStorage 来储存 关闭浏览器 绘话失效
              window.sessionStorage.setItem('tt', JSON.stringify(res.data.data))
              this.$router.push('/Shou')
            }).catch(() => {
              this.$message.error('用户名或密码错误')
            })
        }
      })
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
