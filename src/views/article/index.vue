<template>
  <div class="center">
    <el-card>
      <div slot="header">

        <!-- 面包屑封装 -->
       <my-bread>内容管理</my-bread>
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Shou' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb> -->
      </div>

      <!-- 筛选容器内容 -->
      <el-form
        :model="reqParams"
        size="small"
        label-width="80px"
      >
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
        </my-test> -->

        <!--------|||||------------------作用域插槽 ------------|||||----------->
        <!-- ||||拿组件内部数据 要用作用域插槽||||
          写上slot-scope  指定数据的名字 (自定义名字)  "scope"是收集了my-test上所有的自定义属性
          新版本 旧版本都支持
           旧版本:::;<template slot="con" slot-scope="scope(自定义的)">xix{{scope.my(组件那边属性名是那个这边就写哪个)}}</template>
           新版本:::<template v-slot:fot='ying(自定义的)'>嘿嘿{{ying.Date(组件那边属性名是那个这边就写哪个)}}</template>
         -->
        <my-test>
          <template slot="con" slot-scope="scope">xix{{scope.my}}</template>
          <template v-slot:fot='ying'>嘿嘿{{ying.Date}}</template>
          <!-- vue新版本的插槽语法 v-solt:插槽的名字='作用域数据'  v-solt:fot='ying'-->
        </my-test>

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
      // 假数据
      channelOptions: [{ name: 'Java', id: 1 }],
      // 表单控件的数据
      dateValues: []
    }
  }
}
</script>

<style scoped lang='less'>
  .el-card{
    margin-bottom: 20px;
  }
</style>
