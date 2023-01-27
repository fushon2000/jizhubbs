<template>
  <div class="home">
    <div class="home-box">
      <div class="home-box-header">
        <!-- 走马灯 -->
        <div class="slide">
          <el-carousel height="280px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 搜索框 -->
        <div class="search">
          <div class="search-header">
            <el-carousel :interval="3000" height="160px" direction="vertical">
              <el-carousel-item v-for="item in 6" :key="item">
                <h3 class="medium">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="search-bottom">
            <div>
              <label for="search" v-show="inPlaceholder"><i class="el-icon-search">&nbsp;&nbsp;请输入关键字进行搜索</i></label>
              <input type="text" id="search" @blur="showPlaceholder" @focus="hidePlaceholder" v-model="searchContent">
            </div>
            <ul>
              <li><a href="#">JAVA</a></li>
              <li><a href="#">技术</a></li>
              <li><a href="#">金融</a></li>
              <li><a href="#">工商</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="home-box-container">
        <!-- 校园热点时事排行模块 -->
        <div class="campus-hot-rank">
          <h2>校园热点</h2>
          <ul>
            <li>
              <div class="hot-preview">
                <div class="image-box">
                  <img src="../../assets/吉珠校徽.jpg"/>
                </div>
                <div class="text-box">
                  <h3>峥嵘岁月而崔嵬峥嵘岁月而崔嵬峥嵘岁月而崔嵬峥嵘岁月而崔嵬峥嵘岁月而崔嵬峥嵘岁月而崔嵬峥嵘岁月而崔嵬峥嵘岁月而崔嵬峥嵘岁月而崔嵬</h3>
                  <div class="timeAndView">
                    <span>{{ "梁静茹" }} · 2天前</span>
                    <span><i class="el-icon-user">116487</i></span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="hot-preview">
                <div class="image-box" v-if="">
                  <img src="../../assets/logo.png"/>
                </div>
                <div class="text-box">
                  <h3>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h3>
                  <div class="timeAndView">
                    <span>{{ "梁静茹" }} · 2天前</span>
                    <span><i class="el-icon-user">116111487</i></span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="hot-preview">
                <div class="image-box" v-if="">
                  <img src="../../assets/logo.png"/>
                </div>
                <div class="text-box">
                  <h3>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h3>
                  <div class="timeAndView">
                    <span>{{ "梁静茹" }} · 2天前</span>
                    <span><i class="el-icon-user">116111487</i></span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="hot-preview">

                <div class="text-box">
                  <h3>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h3>
                  <div class="timeAndView">
                    <span>{{ "梁静茹" }} · 2天前</span>
                    <span><i class="el-icon-user">116111487</i></span>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="hot-preview">
                <div class="image-box" v-if="">
                  <img src="../../assets/logo.png"/>
                </div>
                <div class="text-box">
                  <h3>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h3>
                  <div class="timeAndView">
                    <span>{{ "梁静茹" }} · 2天前</span>
                    <span><i class="el-icon-user">116111487</i></span>
                  </div>
                </div>
              </div>
            </li>

          </ul>
        </div>
        <!-- 最新发布模块 -->
        <div class="latest-publish">
          <div class="tab-box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="推荐" name="recommend">
                  <router-view key="recommend" name="recommend"></router-view>
<!--                <Recommend v-if="currentTab==='recommend'"></Recommend>-->
              </el-tab-pane>
              <el-tab-pane label="最近发布" name="latest">
                  <router-view key="latest" name="latest"></router-view>
<!--                <Latest v-if="currentTab==='latest'"></Latest>-->
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 其他模块：个人中心，发布文章，查看草稿等 -->
        <div class="other">
          <div class="operation-box">
            <div class="header">
              <i class="el-icon-guide"></i>
              <h5 style="display: inline-block;margin-left: 10px">创作中心</h5>
            </div>
            <div class="container">
              <ul class="operation">
                <li>
                  <button style="background-color: #e3f5f6; color:#26bdbe; cursor: pointer">
                    <font-awesome-icon icon="fa-solid fa-feather"/>
                    <p style="">写文章</p>
                  </button>
                </li>
                <li>
                  <button style="background-color: #fcdde2; color:#CC465D; cursor: pointer">
                    <font-awesome-icon icon="fa-regular fa-moon"/>
                    <p>写想法</p>
                  </button>
                </li>
              </ul>
              <div class="calculation">
                <div>
                  <div class="today-number" style="border-right: 2px solid white;padding-right: 40px">
                    <div>今日浏览量</div>
                    <div>114514</div>
                  </div>
                  <div class="today-number" style="padding-left: 40px;">
                    <div>今日点赞数</div>
                    <div>5201314</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="apartment-category-box">
            <div style="border-bottom: 1px gray solid; ">
              <h3 style="display: inline-block; border-bottom: 5px skyblue solid">学院分类</h3>
            </div>
            <div style="width: 100%;box-sizing: border-box;padding: 14px;">
              <el-tree
                  :props="departmentProps"
                  :load="loadData"
                  lazy
                  accordion
                  @node-click="handleNodeClick">
              </el-tree>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Recommend from './Recommend'
import Latest from './Latest'

export default {
  name: "Home",
  components: {
    Recommend,
    Latest,
  },
  data() {
    return {
      searchContent: "",
      inPlaceholder: true,
      activeName: 'recommend',
      currentTab: 'recommend',
      data: [
        {
          name: '商学院',
          label: '商学院',
          children: []
        },
        {
          name: '药学与食品科学学院',
          label: '药学与食品科学学院',
          children: [
            {
              name: '中药学',
              label: '中药学',
            },
            {
              name: '制药学',
              label: '制药学',
            },
            {
              name: '药物分析',
              label: '药物分析',
            }
          ]
        },
        {
          name: '计算机学院',
          label: '计算机学院',
          children: [
            {
              name: '软件工程',
              label: '软件工程'
            },
            {
              name: '网络工程',
              label: '网络工程'
            },
            {
              name: '计算机科学与技术',
              label: '计算机科学与技术',
              children: [
                {
                  name: '网络工程',
                  label: '网络工程'
                },
              ]
            }
          ]
        }],
      departmentProps: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
    }
  },
  methods: {
    showPlaceholder(e) {
      if (this.searchContent.trim() === "") this.inPlaceholder = true
    },
    hidePlaceholder() {
      this.inPlaceholder = false
    },
    //切换tabs
    handleClick(tab, event) {
      this.$router.push({name: `${tab.name}`})
      // this.currentTab = tab.name
    },
    handleNodeClick(data) {
      // console.log(data);
    },
    // 懒加载学院分类数据
    loadData(node, resolve) {
      // 判断所有学院是否有子学院，若没有子学院则取消下拉键
      this.data.forEach(i => {
        if (i.children.length === 0) {
          i.leaf = true
        }
      })
      // 若该节点为根节点则进行首次渲染
      if (node.level === 0) {
        return resolve(this.data);
      }

      // 判断该节点是否具有子节点
      let hasChild;
      if (node.data.children) {
        hasChild = true
        // 判断该节点是否有孙子节点，没有则子节点提前取消下拉框
        node.data.children.forEach(i => {
          if (!i.children) {
            i.leaf = true
          }
        })
      } else {
        hasChild = false
      }

      setTimeout(() => {
        if (hasChild) {
          resolve(node.data.children)
        } else {
          resolve([])
        }
      }, 500);
    }
  },
  mounted() {
    $(".el-tree-node").css({
      // "border-bottom":"1px grey solid",
      "box-shadow": "0 3px 5px rgba(0, 0, 0, .3)",
      "padding": "5px 0"
    })
    this.$router.push({name: "recommend"})
  }
}

</script>

<style scoped>
.home-box-container {
  box-sizing: border-box;
  margin: 0 auto 30px auto;
  height: 100%;
  width: 1280px;
  border-radius: 10px;
  overflow: hidden;
}

/* 个人操作模块 */
.other {
  display: inline-block;
  vertical-align: top;
  margin-left: 24px;
  width: 380px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, .5);
}

.operation-box {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .5);
}

.operation-box .header {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 52px;
  padding: 0 12px;
}

.operation-box .container {
  width: 100%;
}

.operation {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
}

.operation li {
  float: left;
  padding-left: 16px;
}

.operation button {
  border: none;
  padding: 16px;
  border-radius: 50%;
}

.operation button p {
  margin-top: 5px;
  font-family: 幼圆;
}

.calculation {
  padding: 16px 16px 0 16px;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  overflow: hidden;
}

.calculation > div {
  display: flex;
  align-items: center;
  justify-content: center;
  /*background-color: #dbdbdb;*/
  background-color: rgba(255, 255, 255, .5);
  padding: 10px 0;
}

.today-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100%;
}

.today-number div {
  padding: 6px 0;
}

.today-number div:nth-child(1) {
  font-size: 6px;
  color: rgb(101 101 101);
}

.today-number div:nth-child(2) {
  font-weight: bold;
}

.apartment-category-box {
  box-sizing: border-box;
  margin-top: 20px;
  padding: 14px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .5);
}


/* 校园热点排行模块 */
.campus-hot-rank {
  display: inline-block;
  vertical-align: top;
  padding: 10px 16px;
  width: 240px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, .5);

}

.campus-hot-rank h2 {
  text-align: center;
  border-bottom: 1px #d3dce6 solid;
  padding-bottom: 10px;
}

.hot-preview {
  overflow: hidden;
  padding: 10px 0;
  border-bottom: 1px #d3dce6 solid;
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, .5);
}

.hot-preview .image-box img {
  width: 100%;
  height: 140px;
  object-fit: fill;
  border-radius: 5px;
}

.campus-hot-rank ul li:not(:first-child) .hot-preview {
  display: flex;
}

.campus-hot-rank ul li:not(:first-child) .hot-preview .image-box {
  min-width: 100px;
  height: 80px;
}

.campus-hot-rank ul li:not(:first-child) img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.campus-hot-rank ul li:not(:first-child) .text-box {
  box-sizing: border-box;
  padding: 0 10px;
  /*width: 160px;*/
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.campus-hot-rank ul li:not(:first-child) .timeAndView {
  height: unset;
}

.campus-hot-rank ul li:not(:first-child) .text-box .timeAndView span:nth-child(1) {
  float: none;
  display: block;
  line-height: normal;
  font-size: 6px;
}

.campus-hot-rank ul li:not(:first-child) .text-box .timeAndView span:nth-child(2) {
  float: none;
  display: block;
  line-height: normal;
}

.campus-hot-rank ul li:not(:first-child) .text-box h3 {
  font-size: 14px;
}

.hot-preview h3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.timeAndView {
  height: 24px;
  line-height: 24px;
  font-size: 8px;
}

.timeAndView span:nth-child(1) {
  float: left;
}

.timeAndView span:nth-child(2) {
  float: right;
}

/* 近期发布模块 */
.latest-publish {
  display: inline-block;
  vertical-align: top;
  margin: 0 16px;
  width: 572px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, .5);
}

.tab-box {
  box-sizing: border-box;
  padding: 10px 20px;
  width: 100%;
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, "sans-serif";
}

a {
  text-decoration: none;
  color: black;
}

li {
  list-style: none;
}

.home {
  background: transparent url("./img/吉珠背景图 星空.jpg") no-repeat fixed top center;
  background-size: 100% 100%;
}

.home-box {
  overflow: hidden;
}

.home-box-header {
  margin: 30px auto;
  height: 280px;
  width: 1280px;
  overflow: hidden;
}

.slide {
  float: left;
  border-radius: 14px;
  overflow: hidden;
  height: 100%;
  width: 860px;
}

.search {
  float: right;
  border-radius: 14px;
  overflow: hidden;
  height: 100%;
  width: 380px;
}

.search-header {
  overflow: hidden;
  border-radius: 14px;
  margin-bottom: 10px;
  height: 160px;
  width: 100%;
}

.search-bottom {
  padding: 10px 30px;
  overflow: hidden;
}

.search-bottom div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bottom label {
  font-size: 12px;
  color: #d3dce6;
  position: absolute;
}

.search-bottom input {
  height: 30px;
  width: 100%;
  border: 0 #d3dce6;
  border-radius: 30px;
  outline: none;
  padding: 5px 20px;

}

.search-bottom ul li {
  float: left;
  margin-top: 10px;
  padding: 0 10px;
  font-size: 12px;
}

.search-bottom ul li a {
  color: #d3dce6;
}

/* 走马灯 */
.search-header .el-carousel__item h3 {
  line-height: 160px;
}

.el-carousel__item h3 {
  text-align: center;
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 280px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}


</style>
<style>
.el-tabs__item.is-active {
  color: #176bff;
}

.el-tabs__item {
  font-weight: bold;
}
</style>