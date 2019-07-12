<template>
  <div class="huan-center">
    <img src="../../assets/image/welcome.jpg" alt />
  </div>
</template>

<script>
export default {
  created () {
    this.axios.get('article').then((res) => {
      console.log(res.data)
    })
  }
}

</script>

<style scoped lang="less">
.huan-center {
  img {
    display: block;
    margin: auto;
    text-align: center;
  }
}
</style>
