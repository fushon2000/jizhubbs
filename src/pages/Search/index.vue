<template>
  <div class="search">
    <div class="search-box">
      <!-- 搜索页头部 显示查询的关键字 -->
      <div class="search-header">
        <div class="header-title">搜索结果</div>
        <div class="header-keyword"><span>#</span>冬天要到了。。</div>
        <div class="header-result">共查询到 16 条记录</div>
      </div>
      <!-- 搜索页主体 -->
      <div class="search-body">
        <div class="display-pattern">
          <div class="pattern-default" @click="isActive = 'default'">默认</div>
          <div class="pattern-latest" @click="isActive = 'latest'">最近</div>
        </div>
        <!-- 搜索结果展示 -->
        <div class="search-main">
          <PostingItem class="posting-item" :posting="posting" :index="index" v-for="(posting, index) in postings" :key="index"></PostingItem>
        </div>
      </div>
    </div>
    <!-- 侧边栏 -->
    <div class="sidebar">
      <!-- 搜索框 放组件 -->
      <div class="search-bar">
        <SearchBox carouselImages=""></SearchBox>
      </div>
      <!-- 推荐搜索 -->
      <div class="search-recommend">
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import PostingItem from '@/components/PostingItem'
import ContentActions from '@/components/ContentActions'
import SearchBox from '@/components/SearchBox'
export default {
  name: "Search",
  components: {
    PostingItem,
    ContentActions,
    SearchBox,
  },
  data() {
    return {
      isActive: 'default',
      postings: [
        {
          title: 123,
          content:"　　Nevertheless, when I opened the window one morning, to my amazement, the tree was almost bare beyond " +
              "recognition as a result of the storm ravages the night before. Struck by the plight, I was seized with a sadness " +
              "at the thought “all the blossom is doomed to fall”. I could not help sighing with emotion: the course of " +
              "life never runs smooth, for there are so many ups and downs, twists and turns. The vicissitudes of my life" +
              " saw my beloved friends parting one after another. Isn't it similar to the tree shedding its flowers in the wind?",
          image:['http://file.jizhubbs.cn/0fca9296b56345c293bd8721f87f8b98-81C866C2-E395-457B-9D73-65B610941305.jpeg'],
          star: 1000,
          save:1000,
          comment: 2000,
        },
        {
          title: 123,
          content:"　　Nevertheless, when I opened the window one morning, to my amazement, the tree was almost bare beyond " +
              "recognition as a result of the storm ravages the night before. Struck by the plight, I was seized with a sadness " +
              "at the thought “all the blossom is doomed to fall”. I could not help sighing with emotion: the course of " +
              "life never runs smooth, for there are so many ups and downs, twists and turns. The vicissitudes of my life" +
              " saw my beloved friends parting one after another. Isn't it similar to the tree shedding its flowers in the wind?",
          image:['http://file.jizhubbs.cn/0fca9296b56345c293bd8721f87f8b98-81C866C2-E395-457B-9D73-65B610941305.jpeg'],
          star: 1000,
          save:1000,
          comment: 2000,
        },
        {
          title: 123,
          content:"　　Nevertheless, when I opened the window one morning, to my amazement, the tree was almost bare beyond " +
              "recognition as a result of the storm ravages the night before. Struck by the plight, I was seized with a sadness " +
              "at the thought “all the blossom is doomed to fall”. I could not help sighing with emotion: the course of " +
              "life never runs smooth, for there are so many ups and downs, twists and turns. The vicissitudes of my life" +
              " saw my beloved friends parting one after another. Isn't it similar to the tree shedding its flowers in the wind?",
          image:['http://file.jizhubbs.cn/0fca9296b56345c293bd8721f87f8b98-81C866C2-E395-457B-9D73-65B610941305.jpeg'],
          star: 1000,
          save:1000,
          comment: 2000,
        },
      ],
    }
  },
  watch: {
    isActive: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$nextTick(function() {
          $(`.pattern-${newVal}`).addClass("pattern-isActive")
          $(`.pattern-${oldVal}`).removeClass("pattern-isActive")
        })
      }
    }
  },
}
</script>

<style scoped>
li {
  list-style: none;
  display: inline-block;
}
.search {
  display: flex;
  width: 1000px;
  min-height: 100vh;
  margin: 16px auto;
}
/* 主体 */
.search-box {
  width: 680px;
}
.search-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  padding: 16px;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 3px 3px 5px rgba(0,0,0,.3),3px 3px 5px rgba(0,0,0,.3) inset;
}
.header-title {
  color: #8590a6;
}
.header-keyword {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
}
.header-keyword span {
  margin-right: 10px;
  font-size: 30px;
  font-weight: 500;
}
.header-result {
  color: rgb(160,160,160);
}
/* 搜索内容 */
.search-body {
  margin-top: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 3px 3px 5px rgba(0,0,0,.3),3px 3px 5px rgba(0,0,0,.3) inset;
}
.display-pattern {
  margin: 0 20px;
  height: 50px;
  border-bottom: 1px rgb(160,160,160) solid;
  box-sizing: border-box;
  display: flex;
  align-items: end;
}
.display-pattern div {
  padding-bottom: 5px;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
}
.pattern-isActive {
  font-weight: bold;
}
.pattern-isActive::after {
  content: '';
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background-color: rgb(71,180,236);
  bottom: 0;
}
.search-main {
  margin: 0 20px;
  box-sizing: border-box;
}





/* 侧边栏 */
.sidebar {
  width: 300px;
  margin-left: auto;
}
.search-bar {
  width: 100%;
  overflow: hidden;
  box-shadow: 3px 3px 5px rgba(0,0,0,.3),3px 3px 5px rgba(0,0,0,.3) inset;
  border-radius: 5px;
}
</style>