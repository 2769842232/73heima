<template>
  <el-select :value="value" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>

/*
    子传父{
      绑定自定义事件 @input=fn(data)
      触发自定义事件 this.$emit("input",data)  使用$emit('自定义事件的名称',数据)
      给那个组件绑定的 谁猜能触发

    步骤 :
  1.使用子组件的时候 再标签上绑定的自定义时间指定一个函数
  2.再子组件的内部 使用$emit('自定义事件的名称',数据)
  3.父组件的函数 接收到数据
  }

  语法糖原理
  <input type="text" v-model='username'>
  本质 v-bind:value='username' v-on:input='获取值修改username'
*/
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 获取频道的信息
      channelOptions: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    fn (value) {
      // 触发自定义时间 this.$emit()
      this.$emit('date', value)
    },
    async getData () {
      // 解构语法
      const {
        data: { data }
      } = await this.axios.get(
        'http://ttapi.research.itcast.cn/mp/v1_0/channels'
      )
      this.channelOptions = data.channels
    }
  }
}
</script>

<style  scoped lang='less'>
</style>
