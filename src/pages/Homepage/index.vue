<template>
  <div class="homepage">
    <div class="homepage-container">
      <!-- 左侧边栏 头像、简介 -->
      <div class="left-sidebar">
        <!-- 头像盒子 -->
        <div class="avatar-box">
          <img :src="userInfo.avatar" alt="">
        </div>
        <!-- 简介 -->
        <div class="profile" v-if="!isEdited">
          <!-- 个人信息 -->
          <div class="personal-info">
            <div class="username hide-overflow-text">{{ userInfo.username }}</div>
            <div class="uid-realName hide-overflow-text">{{ userInfo.uid }} {{ userInfo.realName }}</div>
            <div class="dep-spe hide-overflow-text">{{ userInfo.department }} {{ userInfo.speciality }}</div>
          </div>
          <!-- 个性签名 -->
          <div class="note">
<!--            {{ userInfo.signature }}-->
            子曰：“絮儿实习中，不亦说乎！应聘者远方来，不亦乐乎！人本知而不言，不亦君子乎？”
          </div>
          <!-- 修改个人简介 包括头像、用户名、个性签名 -->
          <button class="edit-profile">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            <span>Edit profile ~</span>
          </button>
        </div>
        <!-- 编辑简介 -->
        <div class="profile" v-if="isEdited">
          <!-- 个人信息 -->
          <div class="personal-info">
            <input class="username hide-overflow-text" v-model="userInfo.username">
            <div class="uid-realName hide-overflow-text">{{ userInfo.uid }} {{ userInfo.realName }}</div>
            <div class="dep-spe hide-overflow-text">{{ userInfo.department }} {{ userInfo.speciality }}</div>
          </div>
          <!-- 个性签名 -->
          <div class="note">
            {{ userInfo.signature }}
          </div>
          <!-- 修改个人简介 包括头像、用户名、个性签名 -->
          <button class="edit-profile">
            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
            <span>Edit profile ~</span>
          </button>
        </div>

      </div>
      <!-- 主体内容 -->
      <div class="main">
        <!-- toolbar -->
        <div class="nav">
          <ul>
            <!-- 概况 -->
            <li id="overview" @click="selectedTag = 'overview'"><div><font-awesome-icon icon="fa-solid fa-book-open-reader" /><span>overview</span></div></li>
            <!-- 个人发布的帖子 -->
            <li id="repositories" @click="selectedTag = 'repositories'"><div><font-awesome-icon icon="fa-solid fa-book-bookmark" /><span>repositories</span></div></li>
            <!-- 收藏 -->
            <li id="stars" @click="selectedTag = 'stars'"><div><font-awesome-icon icon="fa-solid fa-thumbs-up" /><span>stars</span></div></li>
            <!-- 点赞 -->
            <li id="likes" @click="selectedTag = 'likes'"><div><font-awesome-icon icon="fa-solid fa-star" /><span>likes</span></div></li>
          </ul>
        </div>
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {getUserInfo} from "@/api/user";
export default {
  name: "Homepage",
  data() {
    return {
      // 个人主页默认选择的标签
      selectedTag: 'overview',
      // 个人信息
      userInfo: '',
      // 个人信息是否处于编辑状态
      isEdited: false,
    }
  },
  methods: {
    // 获取个人信息
    getUserInfo(token) {
      getUserInfo(token).then(({data}) => {
        this.userInfo = data
        console.log(this.userInfo)
      })
    }
  },
  watch: {
    selectedTag: {
      immediate: true,
      handler(newTag, oldTag) {
       this.$nextTick(()=>{
         $(`#${newTag}`).addClass('tag-isActive')
         $(`#${oldTag}`).removeClass('tag-isActive')
         this.$router.push({name: `${newTag}`})
       })
      }
    }
  },
  created() {
    // 获取
    this.getUserInfo(this.$store.state.user.token)
  }
}
</script>

<style scoped>
.homepage {
  background-color: rgb(13, 17, 23);
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
}
.homepage-container {
  width: 1200px;
  margin: 36px auto;
  display: flex;
}
.left-sidebar {
  width: 300px;
  height: 100%;
  position: relative;
  color: #c9d1d9;
}

.avatar-box {
  height: 300px;
  width: 100%;
}
.avatar-box img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 50%;
  border: 2px solid #c9d1d9;
}
.profile {
  margin-top: 22px;
}
.hide-overflow-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.username {
  font-size: 24px;
  font-weight: bold;
  line-height: 1.25em;
  margin: 10px 0;
}
.uid-realName, .dep-spe{
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
}
.note {
  margin-top: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* 设置超出多少行后出现... */
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  /* 截断整个单词 */
  word-break: break-word;
}
.edit-profile {
  box-sizing: border-box;
  width: 100%;
  margin-top: 16px;
  padding: 8px;
  color: #c9d1d9;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #b2b2b2;
  background-color: #21262d;
  border-radius: 6px;
  cursor: pointer;
}
.edit-profile span{
  margin-left: 8px;
}

/* 主要内容 */
.main {
  margin-left: 24px;
  width: 800px;
  flex: 1;
}
.nav {
  border-bottom: 1px solid #b2b2b2;
}
.nav li{
  box-sizing: border-box;
  list-style-type: none;
  display: inline-block;
  margin: 0 6px;
  padding: 8px 0;
  position: relative;
  color: #c9d1d9;
  cursor: pointer;
}
.tag-isActive::after {
  display: block;
  content: '';
  height: 3px;
  width: 100%;
  background-color: green;
  position: absolute;
  bottom: 0;
  border-radius: 999px;
}
.nav li div {
  padding: 6px;
  border-radius: 999px;
}
.nav li:hover div {
  background-color: rgba(255,255,255,.1);
}
.nav li span {
  margin-left: 8px;
}
</style>