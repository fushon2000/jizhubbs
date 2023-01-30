<template>
  <div class="header">
    <div class="header-icon-box" @click="toTop">
      <img src="../assets/吉珠校徽.jpg" alt="吉珠校徽"/>
      <span>JZBBS</span>
    </div>
    <div class="header-items">
      <ul id="header-ul" @click="skip">
        <li>首页</li>
        <li>模块</li>
        <li>关于</li>
        <li>登录/注册</li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: "Header",
  data() {
    return {

    }
  },
  methods: {
    // 返回顶部，平滑滚动
    toTop(){
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
    },
    // 跳转页面
    skip(){
      this.$router.push("/home")
    }
  },
  mounted() {
    $("#header-ul li").hover(function () {
      $(this).addClass("showUnderline")
    }, function () {
      $(this).removeClass("showUnderline")
    })
  }
}
</script>

<style scoped>
.header {
  height: 50px;
  min-width: 1500px;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #e8e7ee;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, .3);
  position: sticky;
  z-index: 100;
  top: 0;
}

.header .header-icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  margin: 0 20px;
  font-family: '华文琥珀';
  /* 以下四行渲染渐变字体 */
  background-image: radial-gradient(circle, #46bfe2, #45b6ec, #5caaf1, #7c9cef, #9d8ce5);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 20px;
  cursor: pointer;
}

.header .header-icon-box img {

  width: 50px;
}

.header-items {
  margin-left: auto;
  margin-right: 20px;
}

.header-items ul li {
  margin: 0 20px;
  list-style: none;
  float: left;
  position: relative;
  cursor: pointer;
}

.header-items ul li:hover {
  color: skyblue;
  font-weight: bold;
}

.showUnderline::after {
  content: '';
  display: block;
  width: 100%;
  height: 3px;
  bottom: -15px;
  background-color: skyblue;
  position: absolute;
}

</style>