<template>
  <div class="image-container">
    <!-- 图片按钮  默认显示的是默认图 当你选择过封面之后显示的是封面图-->
    <div class="img-btn" @click="openDialog()">
      <img :src="value||defaultImage" />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- 标签页 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image" v-loading="loading">
          <!-- 单选框组 -->
          <div style="margin-bottom:10px;">
            <el-radio-group size="small" @change="toggleImage" v-model="reqParams.collect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div
            class="img-item"
            :class="{selected:selectedImageUrl===item.url}"
            @click="selected(item.url)"
            v-for="item in images"
            :key="item.id"
          >
            <img :src="item.url" />
          </div>
          <!-- 分页区域 -->
          <el-pagination
            background
            v-if="total>reqParams.per_page"
            @current-change="peger"
            layout="prev, pager, next"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <!-- 上传图片区域 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            name="image"
            :headers="headers"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- 点击确认 把选中的图片 再你的图片按钮出预览 -->
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/image/default.png'
export default {
  name: 'my-image',
  // 子组件接收数据
  props: ['value'],
  data () {
    return {
      defaultImage,
      // 上传图片的头部
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('tt')).token
      },
      // 控制对话框显示与隐藏
      dialogVisible: false,
      // 控制选项拉选中谁
      activeName: 'image',
      // 请求素材列表的参数
      reqParams: {
        // 默认选中全部
        collect: false,
        page: 1,
        per_page: 8
      },
      // 上传图片预览地址
      imageUrl: null,
      // 素材列表
      images: [],
      total: 0,
      // 缓存加载
      loading: false,
      // 选中的图片的url
      selectedImageUrl: null
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 点击确认  确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return
        this.$message.info('请选中封面图')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.imageUrl) return
        this.$message.info('请上传封面图')
        // this.value = this.imageUrl
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    },
    openDialog () {
      this.dialogVisible = true
      this.getImages()
    },
    // 上传成功后预览
    handleSuccess (res) {
      this.imageUrl = res.data.url
    },
    // 素材列表切换
    toggleImage () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页跳转
    peger (newpaeg) {
      this.reqParams.page = newpaeg
      this.getImages()
    },
    // 选中当前点击的图片
    selected (url) {
      this.selectedImageUrl = url
    },
    // 获取列表
    async getImages () {
      // 再请求前开启加载
      this.loading = true
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 获取总条数
      this.total = data.total_count
      // 再结束的时候结束加载
      this.loading = false
    }
  }
}
</script>

<style  scoped lang='less'>
.image-container{
  width: 150px;
  height: 120px;
  margin-right: 35px;
  display: inline-block;
  margin-bottom: 35px;
}

  .img-item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    // margin-bottom: 10px;
    margin-right: 10px;
    position: relative;
    &.selected {
      &::before {
        // 一个和图片一样大小的容器  有半透明背景 打钩图标
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/image/selected.png)
          no-repeat center / 60px 60px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      //图片属性 让图片按照登比例缩放显示再容器内
      object-fit: contain;
    }
  }
  .img-btn {
  width: 178px;
  height: 178px;
  border: 1px dashed #ddd;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
