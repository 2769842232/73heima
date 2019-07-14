<template>
  <div class="center">
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Shou' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
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
  </div>
</template>

<script>
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
</style>
