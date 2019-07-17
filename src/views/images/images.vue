<template>
  <!-- 添加缓存功能 -->
  <div class="images-center" v-loading="loading" element-loading-text="着急个栏子">
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮式单选框 -->
      <div style="margin-bottom:20px">
        <!-- change绑定值变化时触发的事件 -->
        <el-radio-group @change="serch" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 添加素材的按钮 -->
        <el-button @click="dialogVisible=true" style="float:right" size="small" type="success">添加素材</el-button>
      </div>
      <!-- 素材管理 -->
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot">
            <!-- 收藏功能 -->
            <span
              class="el-icon-star-off"
              @click="toggleFav(item)"
              :class="{red:item.is_collected}"
            ></span>
            <!-- 删除功能 -->
            <span class="el-icon-delete" @click="del(item.id)"></span>
          </div>
        </li>
      </ul>
      <div class="box" style="text-align:center">
        <!--  v-if="total>reqParams.per_page" 如果大于一页 才去显示分页功能 -->
        <el-pagination
          background
          layout="prev, pager, next"
          v-if="total>reqParams.per_page"
          @current-change="pager"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          :total="total"
        ></el-pagination>
      </div>
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :headers='headers'
          name='image'
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        // 按钮是否是收藏的图片 true是收藏 false是全部
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 分页相关
      total: 0,
      // 控制对话框的显示与隐藏 默认隐藏 false
      dialogVisible: false,
      // 预览
      imageUrl: null,
      // 上传请求头
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('tt')).token
      },
      // 缓存 加载状态
      loading: false
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 上传后的处理函数
    handleAvatarSuccess (res) {
      // 预览需要地址
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      // 关闭对话框 跟新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
        this.imageUrl = null
      }, 1000)
    },
    // 收藏功能
    async toggleFav (item) {
      const {
        data: { data }
      } = await this.axios.put('user/images/' + item.id, {
        collect: !item.is_collected
      })
      this.$message.success('收藏成功')
      item.is_collected = data.collect
      // collect 接口参数
    },
    // 删除功能
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.axios.delete(`user/images/${id}`)
          this.$message.success({ message: '删除成功!' })
          // 删除成功之后刷新素材列表数据
          this.getImages()
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 跳转收藏与全部功能
    serch () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 跳转分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
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

<style  scoped lang="less">
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 180px;
    height: 180px;
    float: left;
    border: 1px dashed #eee;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    img {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      bottom: 0;
      text-align: center;
      span {
        margin: 10px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
