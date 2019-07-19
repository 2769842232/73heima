<template>
  <div class="publish-center">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
      </div>
      <el-form label-width="100px" :model="articleForm">
        <el-form-item label="标题">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- 富文本插件  与配值项 -->
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType()">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="img-btn" v-if="articleForm.cover.type===1">
            <!-- 双向数据绑定 子组件接收数据 -->
           <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if='articleForm.cover.type===3'>
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <!-- draft 是否存为草稿（true 为草稿） -->
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <!-- 修改显示 -->
        <el-form-item v-else>
          <el-button type="success" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      // 文章Id
      articleId: null,
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 单图 ,三图
          images: []
        },
        channel_id: null
      },
      // 富文本配置项
      editorOption: {
        placeholder: '请输入内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      }
    }
  },
  created () {
    // this.articleId = this.$route.query.id
    // // 获取文章数据
    // this.articleId && this.getArticle(this.articleId)
    this.articleId = this.$route.query.id
    // 获取文章数据
    this.articleId && this.getArticle(this.articleId)
  },
  watch: {
    $route () {
      this.articleId = this.$route.query.id
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 单图  三图
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    async getArticle (id) {
      const { data: { data } } = await this.axios.get('articles/' + id)
      this.articleForm = data
    },
    changeType () {
      // 重置图片数组
      this.articleForm.cover.images = []
    },
    // 发表成功
    async publish (draft) {
      // await this.axios.post('http://ttapi.research.itcast.cn/mp/v1_0/article?draft=' + draft, this.articleForm)
      // this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // this.$router.push('/article')
      await this.axios.post('articles?draft=' + draft, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // // 存入草稿
    // async cunru (draft) {
    //   await this.axios.post('articles?draft=' + draft, this.articleForm)
    //   this.$message.success(draft ? '存入草稿成功' : '发表成功')
    //   this.$router.push('/article')
    // },
    // // 修改 url获取到?id=id名
    // 再组件初始化的时候 获取文章id
    // 如果有id就是修改 如果没有就是发布
    async edit (draft) {
      // await this.axios.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      await this.axios.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '修改草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  }
  //   async getArticle (id) {
  //     const { data: { data } } = await this.axios.get('articles/' + id)
  //     this.articleForm = data
  //   },
  //   changeType () {
  //     // 重置图片数组
  //     this.articleForm.cover.images = []
  //   },
  //   async publish (draft) {
  //     // ...省略校验
  //     // draft  发布 false  草稿 true
  //     // 将来数据要地址栏？后传参的方式
  //     // this.$http({data:请全体,params:query数据地址栏数据})
  //     await this.axios.post('articles?draft=' + draft, this.articleForm)
  //     this.$message.success(draft ? '存入草稿成功' : '发表成功')
  //     this.$router.push('/article')
  //   },
  //   async edit (draft) {
  //     await this.axios.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
  //     this.$message.success(draft ? '修改草稿成功' : '修改成功')
  //     this.$router.push('/article')
  //   }
  // }
}
</script>

<style scoped lang='less'>

</style>
