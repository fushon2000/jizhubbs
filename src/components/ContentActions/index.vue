<template>
  <!-- 点赞、收藏、评论 -->
  <div class="overflow-hide">
    <div class="operation">
      <ul>
        <li :id="`up${index}`" @click="thumbUp(posting, index)">
          <div ref="thumbs-up-box" class="thumbs-up-box">
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
          <div ref="thumbs-up-number" class="thumbs-up-number">
            点赞<span>{{ posting.star }}</span>
          </div>
        </li>
        <li :id="`down${index}`" @click="thumbDown(posting, index)"><i class="el-icon-caret-bottom"/></li>
        <li><i class="el-icon-chat-line-round" style="padding-right: 5px;"></i>{{ posting.comment }}评论</li>
        <li @click="handleSaveMask(posting.pid)"><i class="el-icon-star-on" style="padding-right: 5px;"></i>{{ posting.save }}收藏</li>
      </ul>
    </div>
    <!-- 帖子收藏遮罩层 -->
    <SaveMask v-if="saveMask.show" :pid="saveMask.pid"></SaveMask>
    <!-- 创建收藏夹遮罩层 -->
    <CreatePostingPackage v-if="saveMask.showCreate"></CreatePostingPackage>
  </div>
</template>

<script>
import $ from "jquery";
import {increaseStar, decreaseStar} from "@/api/posting";
import SaveMask from '@/components/SaveMask'
import CreatePostingPackage from '@/components/SaveMask/CreatePostingPackage'

export default {
  name: "ContentActions",
  components: {SaveMask, CreatePostingPackage},
  props: {
    posting: {
      require: true
    },
    index: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      // 帖子详情
      // 用于保存原始点赞数
      tmpStar: 0,
      saveMask: {
        // 是否显示收藏遮罩层
        show: false,
        // 将pid传到遮罩层组件中
        pid: '',
        // 是否显示创建收藏夹遮罩层
        showCreate: false,
      },
    }
  },
  methods: {
    // 点赞效果
    thumbUp({pid,star},index) {
      if (!this.tmpStar.hasOwnProperty(`star${index}`)) {
        this.tmpStar = star
      }
      // li设置disabled属性无效，需要按钮或者标签才能生效，可以通过pointer-events: none来禁用鼠标事件
      $(`#up${index}`).addClass("disableClick")
      $(`#down${index}`).addClass("disableClick")
      // 先判断是否为踩状态
      // 踩状态
      if ($(`#down${index}`).is(":hidden")) {
        increaseStar(pid, this.$store.state.user.userInfo.uid, 1, "downToNormal").then(res=>{
          $(`#up${index} .thumbs-up-number`).show()
          $(`#up${index}`).css("backgroundColor", "blue")
          $(`#down${index}`).css("backgroundColor", "#176bff")
          $(`#down${index}`).show()
          $(`#up${index} .thumbs-up-box`).removeClass("thumbRotate180")
          $(`#up${index}`).css("backgroundColor", "#176bff")
          // 恢复点击事件
          $(`#up${index}`).removeClass("disableClick")
          $(`#down${index}`).removeClass("disableClick")
          this.posting.star += 1
        }).catch(err=>{
          // 恢复点击事件
          $(`#up${index}`).removeClass("disableClick")
          $(`#down${index}`).removeClass("disableClick")
        })
      }
      // 正常状态
      else if ($(`#up${index} .dot-box`).css("display") === "none") {
        increaseStar(pid, this.$store.state.user.userInfo.uid, 1, "normalToUp").then((res)=>{
          // 1.显示大拇指上飞
          $(`#up${index} .thumbs-up-box`).addClass("dotFlyUp")
          // 2.点赞数+1
          this.posting.star += res.data
          if (res.data ===2) this.tmpStar+=1
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
        }).catch(err=>{
          $(`#up${index}`).removeClass("disableClick")
          $(`#down${index}`).removeClass("disableClick")
        })
      }
      // 已赞状态
      else {
        decreaseStar(pid, this.$store.state.user.userInfo.uid, 1, "upToNormal").then(res=>{
          // 1.去除八个圆点盒子
          $(`#up${index} .dot-box`).css("display", "none")
          // 2.去除上下飞特效
          $(`#up${index} .thumbs-up-box`).removeClass("dotFlyUp")
          $(`#up${index} .thumbs-up-box`).removeClass("dotFlyDown")
          // 3.点赞数-1
          this.posting.star -= 1
          // 4.背景恢复
          $(`#up${index}`).css("backgroundColor", "#176bff")
          // 5.恢复点击事件
          $(`#up${index}`).removeClass("disableClick")
          $(`#down${index}`).removeClass("disableClick")
        }).catch(err=>{
          $(`#up${index}`).removeClass("disableClick")
          $(`#down${index}`).removeClass("disableClick")
        })
      }
    },
    // 点踩效果
    thumbDown({pid,star},index) {
      if (!this.tmpStar.hasOwnProperty(`star${index}`)) {
        this.tmpStar += 1
      }
      // 1.禁用点击事件
      $(`#up${index}`).addClass("disableClick")
      $(`#down${index}`).addClass("disableClick")

      // 5.判断是否点赞，已点赞则点赞数-2，没点赞则点赞数-1
      if (this.tmpStar < star) {
        decreaseStar(pid, this.$store.state.user.userInfo.uid, 2, "upToDown").then(res=>{
          this.posting.star -= 2
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
        })
      } else {

        decreaseStar(pid, this.$store.state.user.userInfo.uid, 1, "normalToDown").then(res=>{
          this.posting.star -= 1
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
        })
      }
      // 6.给延时1.5s恢复点击事件
      window.backOrigin = setTimeout(() => {
        $(`#up${index}`).removeClass("disableClick")
        $(`#down${index}`).removeClass("disableClick")
      }, 1500)
      // console.log(this.postings[index].star)
    },
    // 操作收藏遮罩层
    handleSaveMask(pid) {
      this.saveMask.show = !this.saveMask.show
      //将pid传到遮罩组件中
      this.saveMask.pid = pid
    },
  },
  mounted() {
    //绑定隐藏收藏遮罩层事件，触发组件为SaveMask
    this.$bus.on('changeShow', (val)=>{
      this.saveMask.show = val
    })
    //绑定改变创建收藏夹遮罩层事件，触发组件为CreatePostingPackage
    this.$bus.on('changeShowCreate', (val)=>{
      this.saveMask.showCreate = val
    })
  },
  beforeDestroy() {
    clearTimeout(window.thumbsUp)
    clearTimeout(window.backOrigin)
    clearTimeout(window.showDot)
    //解绑隐藏收藏遮罩层事件，触发组件为SaveMask
    this.$bus.off('changeShow')
    this.$bus.off('changeShowCreate')
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
  margin: 16px 0 20px;
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