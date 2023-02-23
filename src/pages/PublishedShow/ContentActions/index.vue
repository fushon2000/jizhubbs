<template>
  <!-- 点赞、收藏、评论 -->
  <div class="overflow-hide">
    <div class="operation">
      <ul>
        <li :id="`up`" @click="thumbUp(actionsData.star)">
          <div class="thumbs-up-box">
            <div class="thumbs-box">
              <font-awesome-icon icon="fa-solid fa-thumbs-up" class="infinity-thumbs"/>
            </div>
            <div class="dot-box" style="display: none">
              <div class='thumb-dot dot1'></div>
              <div class='thumb-dot dot2'></div>
              <div class='thumb-dot dot3'></div>
              <div class='thumb-dot dot4'></div>
              <div class='thumb-dot dot5'></div>
              <div class='thumb-dot dot6'></div>
              <div class='thumb-dot dot7'></div>
              <div class='thumb-dot dot8'></div>
            </div>
          </div>
          <div class="thumbs-up-number">
            点赞<span>{{ actionsData.star }}</span>
          </div>
        </li>
        <li :id="`down`" @click="thumbDown(actionsData.star)"><i class="el-icon-caret-bottom"/></li>
        <li><i class="el-icon-chat-line-round" style="padding-right: 5px;"></i>{{ actionsData.comment }}评论</li>
        <li><i class="el-icon-star-on" style="padding-right: 5px;"></i>{{ actionsData.save }}收藏</li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "ContentActions",
  data(){
    return {
      // 帖子详情
      // 用于保存原始点赞数
      tmpStar: {},
    }
  },
  props: ["actionsData"],
  methods: {
    // 点赞效果
    thumbUp(star) {
      this.$set(this.tmpStar, `star`, star)
      // li设置disabled属性无效，需要按钮或者标签才能生效，可以通过pointer-events: none来禁用鼠标事件
      $(`#up`).addClass("disableClick")
      $(`#down`).addClass("disableClick")
      // 先判断是否为踩状态
      if ($(`#down`).is(":hidden")) {
        $(`#up .thumbs-up-number`).show()
        $(`#up`).css("backgroundColor", "blue")
        $(`#down`).css("backgroundColor", "#176bff")
        $(`#down`).show()
        $(`#up .thumbs-up-box`).removeClass("thumbRotate180")
        this.actionsData.star += 1
      }

      if ($(`#up .dot-box`).css("display") === "none") {
        // 1.显示大拇指上飞
        $(`#up .thumbs-up-box`).addClass("dotFlyUp")
        // 2.点赞数+1
        this.actionsData.star += 1
        // 3.背景变蓝色
        $(`#up`).css("backgroundColor", "blue")
        window.thumbsUp = setTimeout(() => {
          // 4.大拇指下滑
          $(`#up .thumbs-up-box`).addClass("dotFlyDown")
        }, 1500)
        window.showDot = setTimeout(() => {
          // 5.显示八个圆点特效
          $(`#up .dot-box`).css("display", "block")
          // 6.恢复点击事件
          $(`#up`).removeClass("disableClick")
          $(`#down`).removeClass("disableClick")
        }, 2000)
      } else {
        // 1.去除八个圆点盒子
        $(`#up .dot-box`).css("display", "none")
        // 2.去除上下飞特效
        $(`#up .thumbs-up-box`).removeClass("dotFlyUp")
        $(`#up .thumbs-up-box`).removeClass("dotFlyDown")
        // 3.点赞数-1
        this.actionsData.star -= 1
        // 4.背景恢复
        $(`#up`).css("backgroundColor", "#176bff")
        // 5.恢复点击事件
        $(`#up`).removeClass("disableClick")
        $(`#down`).removeClass("disableClick")
      }
    },
    // 点踩效果
    thumbDown(star) {
      // 1.禁用点击事件
      $(`#up`).addClass("disableClick")
      $(`#down`).addClass("disableClick")
      // 2.踩键、点赞字和数字消失
      $(`#up .thumbs-up-number`).hide(1000)
      $(`#down`).css("background", "#a7a7a7").hide(1000)
      $(`#up .dot-box`).css("display", "none")
      $(`#up .thumbs-up-box`).removeClass("dotFlyUp")
      $(`#up .thumbs-up-box`).removeClass("dotFlyDown")
      // 3.大拇指翻转180°
      $(`#up .thumbs-up-box`).addClass("thumbRotate180")
      // 4.背景变成灰色
      $(`#up`).css("background", "#a7a7a7")
      // 5.判断是否点赞，已点赞则点赞数-2，没点赞则点赞数-1
      if (this.tmpStar[`star`] < star) {
        this.actionsData.star -= 2
      } else {
        this.actionsData.star -= 1
      }
      // 6.给延时1.5s恢复点击事件
      window.backOrigin = setTimeout(() => {
        $(`#up`).removeClass("disableClick")
        $(`#down`).removeClass("disableClick")
      }, 1500)
    },
  },
  mounted() {

  },
  beforeDestroy() {
    clearTimeout(window.thumbsUp)
    clearTimeout(window.backOrigin)
    clearTimeout(window.showDot)
    this.tmpStar = {}
  }
}
</script>

<style scoped>
/* 点赞、收藏、评论 */
li {
  list-style: none;
}
.overflow-hide {
  overflow: hidden;
}

.operation {
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  margin: 16px 0;
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
.thumb-dot {
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