<template>
<!-- 面包屑封装 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/Shou' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <slot></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  // 组件的name属性
  // 此处的name只是为了方便
  name: 'my-bread'
}
</script>

<style>

</style>
