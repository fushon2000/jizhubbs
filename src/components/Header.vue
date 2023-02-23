<template>
  <div class="header">
    <div class="header-icon-box" @click="toTop">
      <img src="@/assets/img/珠科校徽.png" alt="珠科校徽"/>
      <span>JZBBS</span>
    </div>
    <div class="header-items">
      <ul id="header-ul">
        <li>首页</li>
        <li>模块</li>
        <li>关于</li>
        <li v-if="userInfo">
          <div class="personal-center">
            <div class="avatar">
<!--              <el-avatar :src="userInfo.avatar" :size="30"></el-avatar>-->
              <el-popover
                  placement="bottom-start"
                  width="110"
                  trigger="hover">
                <table class="avatar-table" style="margin: 2px 0;border-collapse: collapse;">
                  <tr style="display: block; padding: 6px;" @click="toIdentity">
                    <td style="width: 30px; text-align: center;"><i class="el-icon-s-home"></i></td>
                    <td><span>个人信息</span></td>
                  </tr>
                  <tr style="display: block; padding: 6px;" @click="signOut">
                    <td style="width: 30px; text-align: center;"><i class="el-icon-moon-night"></i></td>
                    <td><span>退出</span></td>
                  </tr>
                </table>
                <el-avatar :src="userInfo.avatar" :size="34" slot="reference"></el-avatar>
              </el-popover>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {mapState} from 'vuex'
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
    toIdentity(){
      this.$router.push("/identity")
    },
    signOut(){
      this.$store.dispatch("user/removeToken")
      this.$store.dispatch("user/removeUserInfo")
      this.$router.push("/login")
    }
  },
  computed:{
    ...mapState("user",["userInfo"])
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
  width: 42px;
  height: 42px;
}
.header-icon-box span {
  margin-left: 8px;
}
.header-items {
  margin-left: auto;
  margin-right: 20px;
  height: 100%;

}
.header-items ul {
  height: 100%;
}
.header-items ul li {
  margin: 0 20px;
  list-style: none;
  float: left;
  position: relative;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
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
  bottom: 0;
  background-color: skyblue;
  position: absolute;
}
.personal-center {
  display: flex;
  align-items: center;
}
.personal-center .avatar {
  display: inline-block;
  height: 34px;
  width: 34px;
}
.personal-center .name {
  margin-left: 6px;
  display: inline-block;
}
.avatar-table {
  width: 100%;
  border: none;
}
.avatar-table tr {
  cursor: pointer;
}
.avatar-table tr:hover{
  background-color: rgba(0, 0, 0, .08);
  /*box-shadow: 1px 1px 5px 3px rgba(0,0,0,.5) inset,-1px -1px 5px 3px rgba(0,0,0,.5) inset;*/

}
</style>
<style>

</style>