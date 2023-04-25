<template>

</template>

<script>
export default {
  name: "Blank",
  watch: {

  },
  mounted() {
    // console.log(this)
    console.log(this.$route.query.from)
    // this.$router.push('网吧/stars')
    this.$router.push({name:'home',params:{username: `${this.$route.query.from}`}})
  },

}
</script>

<style scoped>

</style>