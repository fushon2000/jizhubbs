<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer v-show="showFooter"/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  computed:{
    showFooter(){
      if (this.$route.path==="/publishPosting") {
        return false
      } else return true
    }
  },
  mounted() {
    // this.$router.push("/home")
  },
  watch: {
    // 监听token是因为异步请求后台获取token速度慢，此时cookie中没有token，数据还没有返回就被路由守卫拒绝了
    // '$store.state.user.token': {
    //   handler(newVal, oldVal) {
    //     console.log(newVal,"oldVal : "+oldVal )
    //   }
    // }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  height: 100%;
}
.el-popover {
  min-width: 50px!important;
}
.el-popover {
  padding: 0!important;
}
</style>
