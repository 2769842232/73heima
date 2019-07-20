<template>
  <el-container class="shou">
    <el-aside :width="collapse?'64px':'200px'" class="ce">
      <!-- 切换log -->
      <div class="log" :class="{close:collapse}"></div>
      <!-- 高亮显示 -->
      <el-menu
        :default-active="$route.path"
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
            <!-- 取消原头像路径 绑定上属性 从token中获取到用户的头像 -->
            <img
              :src="tu"
              alt
              width="35px"
              height="30px"
              style="vertical-align:middle"

            />
            <b style="font-size: 15px; padding-left:10px;">{{name}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- 跳转到个人中心 -->
            <el-dropdown-item @click.native="setting">
              <i class="el-icon-s-custom"></i>
              个人中心
            </el-dropdown-item>
            <!-- 他不是原生的dom 不一定支持原生的事件绑定
              使用一个事件的修饰符 最默认行为@click.native 触发原生事件
             -->
            <el-dropdown-item @click.native="logout()">
              <i class="el-icon-setting"></i>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由 -->
        <!-- 欢迎页面..... -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '../../eventBus/index'
export default {
  data () {
    return {
      // collapse的属性去控制false展开 ture收起
      collapse: false,
      name: '',
      tu: ''
    }
  },
  // 创建阶段
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('tt'))
    // 获取到用户名
    this.name = user.name
    // 获取到用户头像
    this.tu = user.photo
    // 需要再shou组件绑定 绑定事件
    eventBus.$on('userHeaderName', (name) => {
      this.name = name
    })
    // 绑定事件
    eventBus.$on('userHeaderPhoto', (photo) => {
      this.tu = photo
    })
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    // 跳转到个人中心页面
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // 退出登录
      // 清楚token的数据
      window.sessionStorage.removeItem('tt')
      this.$router.push('/login')
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
