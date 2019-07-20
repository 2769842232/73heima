<template>
  <div class="comment-center">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table style="width: 100%" :data="comments">
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?"正常":"关闭"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <!-- 操作 -->
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.comment_status"
              @click="toggleStatus(scope.row)"
              type="success"
              size="mini"
            >打开评论</el-button>
            <el-button v-else @click="toggleStatus(scope.row)" type="danger" size="mini">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center">
        <el-pagination
          background
          @current-change="changePager"
          :current-change="reqParams.page"
          :page-size="reqParams.per_page"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 10,
        response_type: 'comment'
      },
      total: 0,
      comments: []
    }
  },
  created () {
    // 初始化后
    this.getComment()
  },
  methods: {
    // 分页点击
    changePager (newpage) {
      this.reqParams.page = newpage
      this.getComment()
    },
    async getComment () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    // 评论操作
    toggleStatus (row) {
      const txt1 = '确认要打开评论吗?'
      const txt2 = '关闭后用户无法对该文章进行评论,您确认要关闭评论吗?'
      this.$confirm(row.comment_status ? txt2 : txt1, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: { data } } = await
          this.axios.put('comments/status?article_id=' + row.id, { allow_comment: !row.comment_status })
          this.$message.success('修改状态成功')
          row.comment_status = data.allow_comment
          // console.log(data.allow_comment)
        }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="less">
</style>
