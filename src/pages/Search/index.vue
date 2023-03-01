<template>
  <div class="search">
    <div class="search-box">
      <!-- 搜索页头部 显示查询的关键字 -->
      <div class="search-header">
        <div class="header-title">搜索结果</div>
        <div class="header-keyword"><span>#</span>{{ $route.query.content }}</div>
        <div class="header-result">共查询到 {{ postingPages.total > 0 ? postingPages.total : 0 }} 条记录</div>
      </div>
      <!-- 搜索页主体 -->
      <div class="search-body">
        <div class="display-pattern">
          <div class="pattern-default" @click="pattern = 'default'">默认</div>
          <div class="pattern-latest" @click="pattern = 'latest'">最近</div>
        </div>
        <!-- 搜索结果展示 -->
        <div class="search-main">
          <PostingItem class="posting-item" :posting="posting" :index="index" v-for="(posting, index) in postingList"
                       :key="index"></PostingItem>
          <div class="loading-box" v-show="this.isLoad">
            <ul class="loading" ref="loading">
              <li v-for="(word, index) in this.loadingMessage">{{ word }}</li>
            </ul>
          </div>
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
import {getSearchedPostingList} from "@/api/posting";

export default {
  name: "Search",
  components: {
    PostingItem,
    ContentActions,
    SearchBox,
  },
  data() {
    return {
      pattern: 'default',
      postingList: [],
      // 后台传回的分页对象
      postingPages: {},
      // 是否处于触底加载状态
      isLoad: false,
      // 当前页码
      page: 1,
      // 触底加载是否为最后一页
      lastPage: false,
      // 触底加载显示的内容
      loadingMessage: 'loading...',
      // 触底加载完所有数据后显示的内容
      loadingNullMessage: '已经到底了哦~',

    }
  },
  methods: {
    loadPosting() {
      this.isLoad = true
      getSearchedPostingList(this.$route.query.content, this.pattern, this.page++).then(res => {
        if (res.data) {
          this.postingPages = res.data
          this.postingList.push(...res.data.records)
        } else {
          this.lastPage = true
          this.$message({
            message: this.loadingNullMessage,
            // offset: 60,
            offset: 520,
            center: true,
            iconClass: 'lastPageMessageIcon',
            customClass: 'lastPageMessage'
          });
        }
        this.isLoad = false
      })
    }
  },
  watch: {
    pattern: {
      immediate: true,
      handler(newPattern, oldPattern) {
        this.$nextTick(function () {
          $(`.pattern-${newPattern}`).addClass("pattern-isActive")
          $(`.pattern-${oldPattern}`).removeClass("pattern-isActive")
          this.postingList = []
          // 后台传回的分页对象
          this.postingPages = {}
          // 是否处于触底加载状态
          this.isLoad = false
          // 当前页码
          this.page = 1
          // 触底加载是否为最后一页
          this.lastPage = false
          this.loadPosting()
        })
      }
    },
    // 监听路由修改，跳转到当前页面时重新渲染数据
    '$route.query.content'(to, from) {
      this.postingList = []
      // 后台传回的分页对象
      this.postingPages = {}
      // 是否处于触底加载状态
      this.isLoad = false
      // 当前页码
      this.page = 1
      // 触底加载是否为最后一页
      this.lastPage = false
      this.loadPosting()
    }
  },
  mounted() {
    // 添加加载动画样式
    for (let i = 0; i < this.loadingMessage.length; i++) {
      this.$refs.loading.children[i].style.animation = "jump 2s " + (i - 1) * 100 + "ms linear infinite"
    }
    // jQuery 实现触底加载更多
    // 添加滚动事件
    // 滚动一次请求页数+1 每页4条数据
    this.$nextTick(() => {
      $(document).scroll(() => {
        let docHeight = $(document).height(); // 整个文档高度
        let winHeight = $(window).height(); // 浏览器可视窗口高度
        let scrollTop = $(window).scrollTop(); // 浏览器可视窗口顶端距离网页顶端的高度
        // 滚动条+可视高度+150，距离文档高度差150的时候就要加载数据了
        if ((scrollTop + winHeight + 150 > docHeight) && this.isLoad === false && this.lastPage === false) {
          // 发送ajax请求数据  请求4条数据  填充到尾部
          this.loadPosting(this.page++)
        }
      });
    })
  },
  beforeDestroy() {
    $(document).unbind('scroll');
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
  box-shadow: 3px 3px 5px rgba(0, 0, 0, .3), 3px 3px 5px rgba(0, 0, 0, .3) inset;
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
  color: rgb(160, 160, 160);
}

/* 搜索内容 */
.search-body {
  margin-top: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, .3), 3px 3px 5px rgba(0, 0, 0, .3) inset;
}

.display-pattern {
  margin: 0 20px;
  height: 50px;
  border-bottom: 1px rgb(160, 160, 160) solid;
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
  background-color: rgb(71, 180, 236);
  bottom: 0;
}

.search-main {
  margin: 0 20px;
  box-sizing: border-box;
}

/* 加载提示 */
.loading-box {
  display: block;
  height: 40px;
  width: 100%;
}

.loading {
  display: flex;
  height: 100%;
  width: 120px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 6px;
}

.loading li {
  padding: 0 1px;
  font-weight: bold;
}

/* 侧边栏 */
.sidebar {
  width: 300px;
  margin-left: auto;
}

.search-bar {
  width: 100%;
  overflow: hidden;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, .3), 3px 3px 5px rgba(0, 0, 0, .3) inset;
  border-radius: 5px;
}
</style>