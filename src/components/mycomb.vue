<template>
  <div>b---{{bData}}</div>
</template>

<script>
import eventBus from '../eventBus'
export default {
  name: 'my-comb',
  data () {
    return {
      bData: ''
    }
  },
  created () {
    eventBus.$on('date', (data) => {
      this.bData = data
    })
  }
}
</script>

<style>

</style>
