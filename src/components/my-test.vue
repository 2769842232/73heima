<template>
  <div>
    <!------------ 具名插槽的使用 添加name ------------------->
    <p><slot name="con" :my='testName'>haha</slot></p>

    <div>
      <!-- 插槽 -->
      <!----------------- 后备内容 需要默认内容的时候使用 -------------------->
      <!-- ----------------slot 默认插槽 -------------------------------->
      <slot>哈哈</slot>
      <!-- 哈哈 是后备内容 -->
    </div>

    <!-- 具名插槽的使用 添加name -->
    <p><slot name="fot" :Date='date'>enen</slot></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      testName: '组件内部数据',
      date: '时间'
    }
  }
}
</script>

<style>

</style>
