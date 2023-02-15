<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer/>
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
  mounted() {
    // this.$router.push("/home")
  }
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
