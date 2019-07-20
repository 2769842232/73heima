<template>
  <div>A
    <button @click="fn">传b数据</button>
  </div>
</template>

<script>
// 导入
import evevtBus from '../eventBus'
export default {
  name: 'my-coma',
  data () {
    return {
      aData: 'a组件数据'
    }
  },
  methods: {
    fn () {
      evevtBus.$emit('date', this.aData)
    }
  }
}
</script>

<style>

</style>
