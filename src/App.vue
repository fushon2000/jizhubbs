<template>
  <div id="app">
    <Header v-if="hideHeader"/>
    <router-view></router-view>
    <Footer v-if="showFooter"/>
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
    // 哪些路由隐藏头部导航栏
    hideHeader(){
      if (this.$route.path==="/login") {
        return false
      } else return true
    },
    // 哪些路由显示页脚
    showFooter(){
      if (this.$route.path==="/login"
          ||this.$route.path==="/home/recommend"
          ||this.$route.path==="/home/latest") {
        return true
      } else return false
    }
  },
  mounted() {
    // this.$router.push("/home")
  },
  watch: {

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
#app {
  min-width: 1500px;
}
.el-popover {
  min-width: 50px!important;
}
.el-popover {
  padding: 0!important;
}
/*滚动条整体*/
body::-webkit-scrollbar {
  width: 8px;
}
/*滚动条中的滑块*/
body::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(0,0,0,0.3);
  background-clip: padding-box;
}
/*滚动条外层轨道*/
body::-webkit-scrollbar-track {
  border-radius: 0;
}
body::-webkit-scrollbar-thumb:hover{
  background-color: rgba(0, 0, 0, 0.70);
}
</style>
