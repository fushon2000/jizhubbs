<template>
  <div class="container">
    <ul class="bulletin-items">
      <li class="bulletin-item" v-for="(posting, index) in postings" :key="index">
        <!-- 标题 -->
        <h3 class="bulletin-title">{{ posting.title }}</h3>
        <!-- 作者、创建时间 -->
        <div class="author-time" v-if="type === 'latest'">
          <div class="author">
              <div class="icon">
                <font-awesome-icon icon="fa-solid fa-user-large" />
              </div>
              <div>
                {{posting.author}}
              </div>
          </div>
          <div class="time">
            <div class="icon">
              <font-awesome-icon icon="fa-solid fa-clock" />
            </div>
            <div>
              {{posting.other.timeToCreate}}
            </div>
          </div>
        </div>
        <!-- 图片 有则显示 -->
        <div class="image-box" v-if="posting.images.length>0">
          <ul>
            <li v-for="image in posting.images.slice(0,4)">
              <el-image
                  style="width: 100%; height: 100%"
                  :src="image.url"
                  fit="cover"
                  :alt="image.name"
              >
              </el-image>
            </li>
          </ul>
        </div>
        <!-- 内容 -->
        <div class="bulletin-content">
          <p>{{ posting.content }}</p>
        </div>
        <!-- 点赞、收藏、评论 -->
        <div class="overflow-hide">
          <div class="operation">
            <ul>
              <li :id="`up${index}`" @click="thumbUp(index,posting.star)">
                <div class="thumbs-up-box">
                  <font-awesome-icon icon="fa-solid fa-thumbs-up"/>
                  <div class="dot-box" style="display: none">
                    <div class='dot dot1'></div>
                    <div class='dot dot2'></div>
                    <div class='dot dot3'></div>
                    <div class='dot dot4'></div>
                    <div class='dot dot5'></div>
                    <div class='dot dot6'></div>
                    <div class='dot dot7'></div>
                    <div class='dot dot8'></div>
                  </div>
                </div>
                <div class="thumbs-up-number">
                  点赞<span>{{ posting.star }}</span>
                </div>
              </li>
              <li :id="`down${index}`" @click="thumbDown(index,posting.star)"><i class="el-icon-caret-bottom"/></li>
              <li><i class="el-icon-chat-line-round" style="padding-right: 5px;"></i>{{ posting.comment }}评论</li>
              <li><i class="el-icon-star-on" style="padding-right: 5px;"></i>{{ posting.save }}收藏</li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div class="loading-box" v-show="this.isLoad">
      <ul class="loading" ref="loading">
        <li v-for="(word, index) in this.loadingMessage">{{ word }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {getRecommendPosting, getLatestPosting} from "@/api/posting";

export default {
  name: "",
  data() {
    return {
      // 当前路由的名字
      type: '',
      // 是否处于触底加载状态
      isLoad: false,
      // 当前页码
      page: 1,
      // 用于保存原始点赞数
      tmpStar: {},
      // 后端传回的帖子数据
      postings: [],
      // 触底加载显示的内容
      loadingMessage: 'loading...',
      // 触底加载完所有数据后显示的内容
      loadingNullMessage: '已经到底了哦~',
      // 触底加载是否为最后一页
      lastPage: false
    }
  },
  methods: {
    // 点赞效果
    thumbUp(index, star) {
      this.$set(this.tmpStar, `star${index}`, star)
      // li设置disabled属性无效，需要按钮或者标签才能生效，可以通过pointer-events: none来禁用鼠标事件
      $(`#up${index}`).addClass("disableClick")
      $(`#down${index}`).addClass("disableClick")
      // 先判断是否为踩状态
      if ($(`#down${index}`).is(":hidden")) {
        $(`#up${index} .thumbs-up-number`).show()
        $(`#up${index}`).css("backgroundColor", "blue")
        $(`#down${index}`).css("backgroundColor", "#176bff")
        $(`#down${index}`).show()
        $(`#up${index} .thumbs-up-box`).removeClass("thumbRotate180")
        this.postings[index].star += 1
      }

      if ($(`#up${index} .dot-box`).css("display") === "none") {
        // 1.显示大拇指上飞
        $(`#up${index} .thumbs-up-box`).addClass("dotFlyUp")
        // 2.点赞数+1
        this.postings[index].star += 1
        // 3.背景变蓝色
        $(`#up${index}`).css("backgroundColor", "blue")
        window.thumbsUp = setTimeout(() => {
          // 4.大拇指下滑
          $(`#up${index} .thumbs-up-box`).addClass("dotFlyDown")
        }, 1500)
        window.showDot = setTimeout(() => {
          // 5.显示八个圆点特效
          $(`#up${index} .dot-box`).css("display", "block")
          // 6.恢复点击事件
          $(`#up${index}`).removeClass("disableClick")
          $(`#down${index}`).removeClass("disableClick")
        }, 2000)
      } else {
        // 1.去除八个圆点盒子
        $(`#up${index} .dot-box`).css("display", "none")
        // 2.去除上下飞特效
        $(`#up${index} .thumbs-up-box`).removeClass("dotFlyUp")
        $(`#up${index} .thumbs-up-box`).removeClass("dotFlyDown")
        // 3.点赞数-1
        this.postings[index].star -= 1
        // 4.背景恢复
        $(`#up${index}`).css("backgroundColor", "#176bff")
        // 5.恢复点击事件
        $(`#up${index}`).removeClass("disableClick")
        $(`#down${index}`).removeClass("disableClick")
      }
      // console.log(this.postings[index].star)

    },
    thumbDown(index, star) {
      // 1.禁用点击事件
      $(`#up${index}`).addClass("disableClick")
      $(`#down${index}`).addClass("disableClick")
      // 2.踩键、点赞字和数字消失
      $(`#up${index} .thumbs-up-number`).hide(1000)
      $(`#down${index}`).css("background", "#a7a7a7").hide(1000)
      $(`#up${index} .dot-box`).css("display", "none")
      $(`#up${index} .thumbs-up-box`).removeClass("dotFlyUp")
      $(`#up${index} .thumbs-up-box`).removeClass("dotFlyDown")
      // 3.大拇指翻转180°
      $(`#up${index} .thumbs-up-box`).addClass("thumbRotate180")
      // 4.背景变成灰色
      $(`#up${index}`).css("background", "#a7a7a7")
      // 5.判断是否点赞，已点赞则点赞数-2，没点赞则点赞数-1
      if (this.tmpStar[`star${index}`] < star) {
        this.postings[index].star -= 2
      } else {
        this.postings[index].star -= 1
      }
      // 6.给延时1.5s恢复点击事件
      window.backOrigin = setTimeout(() => {
        $(`#up${index}`).removeClass("disableClick")
        $(`#down${index}`).removeClass("disableClick")
      }, 1500)
      // console.log(this.postings[index].star)
    },
  },
  created() {
    this.type = this.$route.name
    if (this.type === 'recommend') {
      getRecommendPosting('计算机学院', '软件工程', this.page++).then(res => {
        this.postings = res.data
      }).catch(err => {
        console.log(err)
      })
    }
    if (this.type === 'latest') {
      getLatestPosting('计算机学院', '软件工程', this.page++).then(res => {
        this.postings = res.data
        console.log(this.postings)
      }).catch(err => {
        console.log(err)
      })
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
    $(window).scroll(() => {
      let docHeight = $(document).height(); // 整个文档高度
      let winHeight = $(window).height(); // 浏览器可视窗口高度
      let scrollTop = $(window).scrollTop(); // 浏览器可视窗口顶端距离网页顶端的高度
      // 滚动条+可视高度+50，距离文档高度差50的时候就要加载数据了
      if ((scrollTop + winHeight + 80 > docHeight) && this.isLoad === false && this.lastPage === false) {
        this.isLoad = true
        // 发送ajax请求数据  请求4条数据  填充到尾部
        if (this.type === 'recommend') {
          getRecommendPosting('计算机学院', '软件工程', this.page++).then(res => {
            if (res.data.length > 0) {
              this.postings.push(...res.data)
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
          }).catch(err => {
            console.log(err)
          })
        }
        if (this.type === 'latest') {
          getLatestPosting('计算机学院', '软件工程', this.page++).then(res => {
            if (res.data.length > 0) {
              this.postings.push(...res.data)
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
          }).catch(err => {
            console.log(err)
          })
        }
      }
    });
  },
  beforeDestroy() {
    clearTimeout(window.thumbsUp)
    clearTimeout(window.backOrigin)
    clearTimeout(window.showDot)
    this.$message = null
    this.tmpStar = {}
  }

}
</script>

<style scoped>
li {
  list-style: none;
}

.container {

}

.bulletin-item {
  box-sizing: border-box;
  padding: 10px 0;
  border-bottom: 1px #8590a6 solid;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .5);
}

.bulletin-title {
  cursor: pointer;
}
.author-time {
  height: 20px;
  width: 100%;
  line-height: 20px;
  margin: 4px 0;
  font-size: xx-small;
}
.author-time div {
  display: inline-block;
  color: rgba(255,255,255,.6);
}
.author-time .time {
  margin-left: 20px;
}
.svg-inline--fa {
  vertical-align: unset;
}
.author-time .icon {
  margin-right: 4px;
}
.bulletin-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* 2表示行数，看自己需求设置超出多少行后出现... */
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.bulletin-content:hover {
  cursor: pointer;
  color: #b2b2b2;
}

.image-box {
  margin: 8px 0;
  height: 80px;
}

.image-box li {
  float: left;
  height: 80px;
  width: 80px;
  padding-left: 16px;
}

.image-box li:nth-child(1) {
  padding-left: 0;
}

.bulletin-content {
  margin-top: 8px;
}

.overflow-hide {
  overflow: hidden;
}

.operation {
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  margin-top: 16px;
}

.operation li {
  float: left;
  height: 40px;
  line-height: 40px;
  margin: 0 6px;
  color: #1719ff;
  opacity: .6;
  cursor: pointer;
}

.operation li:nth-child(1) {
  background-color: #176bff;
  margin-left: 0;
  border-radius: 5px;
  color: #ededee;
}

.operation li:nth-child(2) {
  width: 40px;
  background-color: #176bff;
  text-align: center;
  border-radius: 5px;
  color: #ededee;
}

.thumbs-up-box {
  display: inline-block;
  position: relative;
  width: 40px;
  text-align: center;
}

.thumbs-up-number {
  padding-right: 10px;
  display: inline-block;
}


.disableClick {
  pointer-events: none;
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

/* 写死的loading样式 */
/*
.loading li:nth-child(1) {
  animation: jump 2s 0ms linear infinite;
}
.loading li:nth-child(2) {
  animation: jump 2s 100ms linear infinite;
}
.loading li:nth-child(3) {
  animation: jump 2s 200ms linear infinite;
}
.loading li:nth-child(4) {
  animation: jump 2s 300ms linear infinite;
}
.loading li:nth-child(5) {
  animation: jump 2s 400ms linear infinite;
}
.loading li:nth-child(6) {
  animation: jump 2s 500ms linear infinite;
}
.loading li:nth-child(7) {
  animation: jump 2s 600ms linear infinite;
}
.loading li:nth-child(8) {
  animation: jump 2s 700ms linear infinite;
}
.loading li:nth-child(9) {
  animation: jump 2s 800ms linear infinite;
}
.loading li:nth-child(10) {
  animation: jump 2s 900ms linear infinite;
}
*/


@keyframes dotFlyUp {
  100% {
    transform: translateY(-100px);
  }
}

.dotFlyUp {
  animation: dotFlyUp 1.5s cubic-bezier(1, 0.9, 0.45, -2.04) forwards;
}

@keyframes dotFlyDown {
  from {
    transform: translateY(-40px);
  }
  to {
    transform: translateY(0);
  }
}

.dotFlyDown {
  animation: dotFlyDown .5s linear forwards
}

@keyframes thumbRotate180 {
  100% {
    transform: rotate(180deg);
  }
}

.thumbRotate180 {
  animation: thumbRotate180 1s ease-out forwards;
}

/* 点赞特效 */
/* 八个圆点 */
.dot {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 60%;
  height: 60%;
  animation: dotRotate 3s reverse linear infinite;
}

@keyframes dotRotate {
  100% {
    transform: rotate(-1080deg);
  }
}

.dot1::before, .dot2::before, .dot3::before,
.dot4::before, .dot5::before, .dot6::before,
.dot7::before, .dot8::before {
  content: "";
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: gold;
}

.dot1 {
  transform: rotate(45deg);
}

.dot2 {
  transform: rotate(90deg);
}

.dot3 {
  transform: rotate(135deg);
}

.dot4 {
  transform: rotate(180deg);
}

.dot5 {
  transform: rotate(225deg);
}

.dot6 {
  transform: rotate(270deg);
}

.dot7 {
  transform: rotate(315deg);
}

.dot8 {
  transform: rotate(360deg);
}

</style>
<style>
/* 动画不写全局的话，通过js或jq添加会无效 */
@keyframes jump {
  5% {
    transform: translateY(-4px);
  }
  10% {
    transform: translateY(0);
  }
  15% {
    transform: translateY(4px);
  }
  20% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-4px);
  }
  30% {
    transform: translateY(0);
  }
  35% {
    transform: translateY(4px);
  }
  40% {
    transform: translateY(0);
  }
}

.lastPageMessage {

  background-color: rgba(255, 255, 255, .8) !important;
  transform: translateX(-250px) !important;
}

.lastPageMessageIcon {

}
</style>