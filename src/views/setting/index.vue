<template>
  <div class="setting-center">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
        <!-- 非父子传值 -->
        <!-- <my-coma></my-coma> -->
        <!-- <my-comb></my-comb> -->
      </div>
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="userForm">
            <el-form-item label="编号:">
              {{userForm.id}}
            </el-form-item>
            <el-form-item label='手机:'>{{userForm.mobile}}</el-form-item>
            <el-form-item label='邮箱:'>{{userForm.email}}</el-form-item>
            <el-form-item label='媒体名称:'>
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label='媒体介绍:'>
              <el-input v-model="userForm.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="Useredit()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传头像 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/profile"
            :show-file-list="false"
            :http-request='upload'
          >
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '../../eventBus/index'
export default {
  data () {
    return {
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('tt')).token
      },
      userForm: {
        id: null,
        name: null,
        intro: null,
        photo: null,
        email: null,
        mobile: null
      }
    }
  },
  created () {
    this.getuserForm()
  },
  methods: {
    async getuserForm () {
      const { data: { data } } = await
      this.axios.get('user/profile')
      this.userForm = data
    },
    // 修改
    async Useredit () {
      const { data: { data } } = await
      this.axios.patch('user/profile', {
        name: this.userForm.name,
        email: this.userForm.email,
        intro: this.userForm.intro
      })
      this.$message.success('修改用户信息成功')
      // 让头部的用户名成和返回的用户名成同步
      // setting组件的数据 传递个home组件
      eventBus.$emit('userHeaderName', data.name)
      // 刷新页面欧使用的是本地存储的事件
      // 保存sessionStrage的信息
      const user = JSON.parse(window.sessionStorage.getItem('tt'))
      user.name = data.name
      window.sessionStorage.setItem('tt', JSON.stringify(user))
    },
    // 修改头像
    upload (data) {
      // console.log(data.file)// 选择的图片
      // 把文件数据放在formdata中
      const formData = new FormData()
      formData.append('photo', data.file)
      this.axios.patch('user/photo', formData)
        .then((res) => {
          // 更新设置的头像
          this.userForm.photo = res.data.data.photo
          // 更新本地存储
          eventBus.$emit('userHeaderPhoto', res.data.data.photo)
          const user = JSON.parse(window.sessionStorage.getItem('tt'))
          user.photo = res.data.data.photo
          window.sessionStorage.setItem('tt', JSON.stringify(user))
        })
    }
  }
}
</script>

<style>
</style>
