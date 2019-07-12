<template>
  <el-container class="shou">
    <el-aside :width="collapse?'64px':'200px'" class="ce">
      <!-- 切换log -->
      <div class="log" :class="{close:collapse}"></div>
      <el-menu
        default-active="1"
        background-color="#002233"
        text-color="#fff"
        style="border-right:none"
        :collapse="collapse"
        :collapse-transition="false"
        active-text-color="#ffd04b"
        router
      >
      <!--记得加上router -->
      <!-- index改成路径 然后个el-menu加上属性router -->
        <el-menu-item index="/Shou">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/images">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-square"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="txt">江苏传智播客教育科技有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img
              src="../../assets/image/avatar.jpg"
              alt
              width="35px"
              height="30px"
              style="vertical-align:middle"
            />
            <b style="font-size: 15px; padding-left:10px;">小青</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-s-custom"></i>
              个人中心
            </el-dropdown-item>
            <el-dropdown-item>
              <i class="el-icon-setting"></i>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // collapse的属性去控制false展开 ture收起
      collapse: false
    }
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style scoped lang="less">
.shou {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // background: yellowgreen;
  .ce {
    background: #002233;
    .log {
      width: 100%;
      height: 60px;
      background: url(../../assets/image/logo_admin.png) no-repeat center
        #002840;
    }
    .close {
      // background-image: url(../../assets/image/logo_admin_01.jpg);
      background-image: url(../../assets/image/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .header {
    border-bottom: 1px solid #dddd;
    span {
      line-height: 60px;
      font-size: 24px;
      vertical-align: middle;
      margin-right: 4px;
    }
    .txt {
      vertical-align: middle;
      line-height: 60px;
      font-size: 16px;
    }
  }
}
</style>
