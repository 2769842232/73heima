<template>
    <div class="login-center">
      <el-card class="box">
        <img src="../../assets/image/logo_index.png" alt="">
      </el-card>
    </div>
</template>

<script>
export default {

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
        margin: 0px auto;
      }
    }
  }
</style>
