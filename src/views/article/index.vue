<template>
  <div class="center">
    <el-card>
      <div slot="header">
        <!-- 面包屑封装 -->
        <my-bread>内容管理</my-bread>
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Shou' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>-->
      </div>

      <!-- 筛选容器内容 -->
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态 :">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 频道 -->
        <el-form-item label="频道 :">
          <el-select v-model="reqParams.channel_id">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 日期控件 -->
        <el-form-item label="时间 :">
          <el-date-picker
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <!-- 筛选按钮 -->
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 结果容器 -->
    <el-card>
      <div slot="header">
        <!-- <span>根据筛选条件共查询到47679条结果:</span> -->

        <!------\\\\\\-------------------默认插槽 ----------\\\\\\--------->
        <!--||| 就是调用组件名 但是只能是一个插槽的时候使用 ||||-->
        <!-- <my-test>嗯嗯</my-test> -->

        <!--------|||||---------------- 具名插槽  -----------|||||-------->
        <!--||| 具名插槽适合多个插槽使用的时候 |||--->
        <!-- <my-test>
          <template slot="con">haha</template>
          <template slot="fot">xixi</template>
          enene
        </my-test>-->

        <!--------|||||------------------作用域插槽 ------------|||||----------->
        <!-- ||||拿组件内部数据 要用作用域插槽||||
          写上slot-scope  指定数据的名字 (自定义名字)  "scope"是收集了my-test上所有的自定义属性
          新版本 旧版本都支持
           旧版本:::;<template slot="con" slot-scope="scope(自定义的)">xix{{scope.my(组件那边属性名是那个这边就写哪个)}}</template>
           新版本:::<template v-slot:fot='ying(自定义的)'>嘿嘿{{ying.Date(组件那边属性名是那个这边就写哪个)}}</template>
        -->
        <!-- <my-test>
          <template slot="con" slot-scope="scope">xix{{scope.my}}</template>
          <template v-slot:fot='ying'>嘿嘿{{ying.Date}}</template>
           vue新版本的插槽语法 v-solt:插槽的名字='作用域数据'  v-solt:fot='ying'
        </my-test>-->
        根据筛选条件共查询到
        <b>{{total}}</b>条结果:
      </div>
      <!-- 定义获取文章列表的属性 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- element-ui提供的懒加载 lazy
              row 代表当前行数据 element-ui中提供的 自定义插槽
            -->
            <el-image lazy :src="scope.row.cover.images[0]" style="width:100px; height:75px">
              <div slot="error" class="image-slot">
                <img src="../../assets/image/error.gif" width="100" height="75" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status==1">待审核</el-tag>
            <el-tag v-if="scope.row.status==2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status==3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status==4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop='pubdate'></el-table-column>
        <el-table-column label="操作" width="120px">
            <el-button type="primary" icon="el-icon-edit" circle  plain></el-button>
             <el-button type="danger" icon="el-icon-delete" circle  plain></el-button>
        </el-table-column>
      </el-table>
      <!------------ 完成分页器 ----------------->
      <div class="box" style="text-align:center">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import MyBread from '../../components/MyBread'
export default {
  data () {
    return {
      // 提交给后台筛选条件 传参
      // 数据默认是'' 还是null的区别 如果是null 将不会发送字段
      reqParams: {
        status: null, // 文章状态
        channel_id: null, // 频道id
        begin_pubdate: null, // 起始时间
        end_pubdate: null // 结束时间
      },
      // 获取频道的信息
      channelOptions: [],
      // 表单控件的数据
      dateValues: [],
      // 文章列表
      articles: []
    }
  },
  created () {
    // 创建阶段
    // 获取频道信息列表
    this.getChanneLoptions()
    // 获取列表数据
    this.getArticles()
  },
  methods: {
    // 获取频道列表
    // await关键字必须再acync函数内部使用 否则报错
    async getChanneLoptions () {
      // 解构语法
      const {
        data: { data }
      } = await this.axios.get(
        'http://ttapi.research.itcast.cn/mp/v1_0/channels'
      )
      this.channelOptions = data.channels
    },
    // 获取列表数据
    async getArticles () {
      // get传参 axios.get('url',{params:{参数对象}})
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
      console.log(data.results)
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
