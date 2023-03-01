<template>
  <div class="posting-detail">
    <!-- 帖子主体部分 -->
    <div class="posting-main">
      <!-- 头部分 -->
      <div class="posting-header">
        <h1 class="posting-title">
          {{ posting.title }}
        </h1>
        <div class="posting-author">
          <div class="author-info">
            <div class="author-info-avatar">
              <img src="@/assets/img/吉珠校徽.jpg"/></div>
            <div class="author-info-content">
              <div class="author-name">
                {{ posting.author }}
              </div>
              <div class="author-signature">
                作者个性签名，作者个性签名，作者个性签名，作者个性签名，作者个性签名，作者个性签名，作者个性签名，
              </div>
            </div>
          </div>
          <button class="focus">
            关注
          </button>
        </div>
      </div>
      <!-- 富文本部分 -->
      <div class="posting-rich-text-container">
        <div class="rich-text" v-html="posting.content">

        </div>
      </div>
      <!-- 编辑时间 -->
      <div class="posting-edit-time">
        发布于 {{ posting.createTime }}
      </div>
      <div class="posting-tags">
        <ul>
          <li v-for="(tag,index) in posting.other.tags" :key="index">{{ tag }}</li>
        </ul>
      </div>
      <!-- 操作部分 -->
      <div class="posting-options">
        <ContentActions :posting="posting"></ContentActions>
      </div>
    </div>
    <!-- 评论区部分 -->
    <div class="posting-sub">
      <!-- 发评论 -->
      <div class="comment-publish">
        <el-input
            id="comment-input"
            type="textarea"
            autosize
            resize="none"
            placeholder="此处发表评论（字数限制1000字）"
            maxlength="1000"
            show-word-limit
            v-model="comment.content"
            @focus="commentFocus"
            @blur="commentBlur">
        </el-input>
        <button id="comment-input-button" class="comment-input-button" @click="commitPostingComment(comment)">
          <i class="el-icon-check"></i>
        </button>
      </div>
      <!-- 评论区主体 -->
      <div class="comment-main">
        <!-- 评论数、默认排序、时间排序 -->
        <div class="comment-header">
          <div class="comment-number">
            8条评论
          </div>
          <div class="display-pattern">
            <el-radio-group v-model="commentDisplayPattern" size="mini" @input="commentDisplayPatternChange">
              <el-radio-button label="默认"></el-radio-button>
              <el-radio-button label="最近"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <!-- 评论楼层 -->
        <div class="comment-floor">
          <ul>
            <li class="floor" v-for="(commentItem, index) in commentList" :key="index">
              <div class="avatar"><img :src="commentItem.user.avatar"></div>
              <div class="floor-main">
                <div class="author">{{ commentItem.author }}</div>
                <div class="comment-content">{{ commentItem.content }}</div>
                <div class="floor-footer">
                  <div class="time">回复于 {{ commentItem.createTime }}</div>
                  <div class="repeat"  @click="showCommentBox(commentItem.cid, commentItem.author)"><i class="el-icon-s-comment"></i> 回复</div>
                  <div :id="`comment${commentItem.cid}`" class="like" v-if="!commentItem.star" @click="likeComment(commentItem.cid,index)">
                    <i class="el-icon-star-on"></i> 点赞
                  </div>
                  <div :id="`comment${commentItem.cid}`" class="like" v-if="commentItem.star" @click="likeComment(commentItem.cid,index)">
                    <i class="el-icon-star-on"></i> {{ commentItem.star }}
                  </div>
                </div>
                <!-- 回复其他评论 -->
                <div :id="`commentBox${commentItem.cid}`" style="display: none" class="comment-publish">
                  <el-input
                      :id="`comment-input${commentItem.cid}`"
                      type="textarea"
                      autosize
                      resize="none"
                      placeholder="此处发表评论（字数限制300字）"
                      maxlength="300"
                      show-word-limit
                      v-model="commentItem.newComment">
                  </el-input>
                  <button :id="`commentButton${commentItem.cid}`" class="comment-input-button" @click="commitCommentComment(comment2,commentItem.cid,commentItem.newComment)">
                    <i class="el-icon-check"></i>
                  </button>
                </div  >
                <ul>
                  <li class="floor" v-for="(childItem, childIndex) in commentItem.children" :key="childIndex">
                    <div class="avatar"><img :src="childItem.user.avatar"></div>
                    <div class="floor-main">
                      <div class="author">
                        {{ childItem.author }}
                        <span class="author" v-if="childItem.parentCid !== commentItem.cid">
                          <i class="el-icon-caret-right"></i>
                          {{commentItem.children[commentItem.children.findIndex((item) => item.cid === childItem.parentCid)].author }}
                        </span>
                      </div>
                      <div class="comment-content">{{ childItem.content }}</div>
                      <div class="floor-footer">
                        <div class="time">
                          回复于 {{ childItem.createTime }}
                        </div>
                        <div class="repeat" @click="showCommentBox(childItem.cid, childItem.author)"><i class="el-icon-s-comment"></i> 回复</div>
                        <div :id="`childComment${childItem.cid}`" class="like" v-if="!childItem.star" @click="childLikeComment(childItem.cid,childIndex,index)">
                          <i class="el-icon-star-on"></i> 点赞
                        </div>
                        <div :id="`childComment${childItem.cid}`" class="like" v-if="childItem.star" @click="childLikeComment(childItem.cid,childIndex,index)">
                          <i class="el-icon-star-on"></i> {{ childItem.star }}
                        </div>
                      </div>
                      <!-- 回复其他评论 -->
                      <div :id="`commentBox${childItem.cid}`" style="display: none" class="comment-publish">
                        <el-input
                            :id="`comment-input${childItem.cid}`"
                            type="textarea"
                            autosize
                            resize="none"
                            placeholder="此处发表评论（字数限制300字）"
                            maxlength="300"
                            show-word-limit
                            v-model="childItem.newComment">
                        </el-input>
                        <button :id="`commentButton${childItem.cid}`" class="comment-input-button" @click="commitCommentComment(comment2,childItem.cid,childItem.newComment)">
                          <i class="el-icon-check"></i>
                        </button>
                      </div  >
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import ContentActions from '@/components/ContentActions'
import {getCommentListByPid, likeComment, submitComment} from "@/api/comment";
import {getPostingByPid} from "@/api/posting";

export default {
  name: "",
  components: {
    ContentActions
  },
  data() {
    return {
      // 对帖子的评论
      comment: {
        uid: '',
        pid: '',
        parentCid: 0,
        author: '',
        content: '',
        department: '',
        speciality: '',
      },
      // 对评论的评论
      comment2: {
        uid: '',
        pid: '',
        parentCid: 0,
        author: '',
        content: '',
      },

      commentDisplayPattern: '默认',
      posting: {},
      commentList: [],
    }
  },
  methods: {
    // 帖子的评论框获取焦点
    commentFocus() {
      $("#comment-input").attr("placeholder", "评论千万条，友善第一条。")
      $("#comment-input-button").show()

    },
    // 帖子的评论框失去焦点
    commentBlur() {
      $("#comment-input").attr("placeholder", "此处发表评论（字数限制1000字）")
      // $(".comment-input-button").hide()
    },
    // 提交帖子评论
    commitPostingComment(comment) {
      comment.pid = this.posting.pid
      comment.uid = this.$store.state.user.userInfo.uid
      // 是否为实名评论
      comment.author = this.posting.noAnonymityComment ? this.$store.state.user.userInfo.realName : this.$store.state.user.userInfo.username
      submitComment(comment).then(res => {
        this.$message.success({
          message: "评论成功^_^",
          duration: "1000",
          onClose(msg) {
            window.location.reload()
          }
        })
      })
    },
    // 提交评论的评论
    commitCommentComment(comment, parentCid,newComment) {
      comment.pid = this.posting.pid
      comment.uid = this.$store.state.user.userInfo.uid
      // 是否为实名评论
      comment.author = this.posting.noAnonymityComment ? this.$store.state.user.userInfo.realName : this.$store.state.user.userInfo.username
      comment.parentCid = parentCid
      comment.content = newComment
      submitComment(comment).then(res => {
        this.$message.success({
          message: "评论成功^_^",
          duration: "1000",
          onClose(msg) {
            window.location.reload()
          }
        })
      })
    },
    // 给父评论点赞
    likeComment(cid,index) {
      likeComment(cid, this.$store.state.user.userInfo.uid).then(res=>{
        if (res.data === -1) {
          this.commentList[index].star -= 1
          $(`#comment${cid}`).css("color","rgb(153, 153, 153)")
        }
        if (res.data === 1) {
          this.commentList[index].star += 1
          $(`#comment${cid}`).css("color","rgb(51 109 255)")
        }
      })
    },
    // 回复父评论
    showCommentBox(cid, commentAuthor) {
      // 输入框整体
      let $cb = $(`#commentBox${cid}`)
      // 输入框input
      let $ci = $(`#comment-input${cid}`)
      // 提交按钮
      let $button = $(`#commentButton${cid}`)
      if ($cb.is(":hidden")) {
        $cb.show()
        $ci.attr("placeholder",`回复 ${commentAuthor}`)
        $ci.focus()
        $button.show()
      } else {
        $button.show()
        $cb.hide()
      }

    },
    // 给子评论点赞
    childLikeComment(cid,index,parentIndex) {
      likeComment(cid, this.$store.state.user.userInfo.uid).then(res=>{
        if (res.data === -1) {
          this.commentList[parentIndex].children[index].star -= 1
          $(`#childComment${cid}`).css("color","rgb(153, 153, 153)")

        }
        if (res.data === 1) {
          this.commentList[parentIndex].children[index].star += 1
          $(`#childComment${cid}`).css("color","rgb(51 109 255)")
        }
      })
    },
    // 选择评论的显示模式 （默认，最近）
    commentDisplayPatternChange(pattern) {
      console.log(pattern)
    }
  },
  computed: {},
  created() {
    // this.posting = JSON.parse(this.$route.query.posting)
    getPostingByPid(this.$route.params.pid).then(res => {
      this.posting = res.data
    })
    getCommentListByPid(this.$route.params.pid).then(res => {
      this.commentList = res.data
      // console.log(this.commentList)
    })
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

li {
  list-style: none;
  display: inline-block;
}

/* 帖子详情部分 */
.posting-detail {
  width: 100%;
  /*background: transparent url("../../assets/img/吉珠背景图 星空.jpg") no-repeat fixed top center;*/
  /*background-size: 100% 100%;*/
}

.posting-detail > div {
  margin: 0 auto;
  width: 690px;
}

.posting-main {
  position: relative;
  box-sizing: border-box;
  /* 防止外边距坍塌 */
  padding-top: 24px;
}

.posting-header {
  overflow: hidden;
}

.posting-title {
  margin-bottom: 24px;
}

.posting-author {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
}

.author-info {
  display: flex;
  flex: 1 1;
  height: 100%;
}

.author-info-avatar {
  display: inline-block;
  height: 100%;
  width: 44px;
  overflow: hidden;
}

.author-info-avatar img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.author-info-content {
  display: inline-block;
  height: 100%;
  width: 500px;
  flex: 1 1;
  margin-left: 14px;
  color: rgb(68, 68, 68);
}

.author-name {
  height: 50%;
  font-weight: bold;
}

.author-signature {
  height: 50%;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.focus {
  width: 80px;
  height: 70%;
  background-color: rgb(64, 158, 255);
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}


.posting-rich-text-container {
  overflow: hidden;
  position: relative;
}

.rich-text {
  margin: 20px 0;
}

.posting-edit-time {
  color: #8590a6;
  font-size: 14px;
}

.posting-tags {
  margin-top: 20px;
  margin-bottom: 14px;
  width: 100%;
}

.posting-tags li {
  height: 34px;
  line-height: 34px;
  margin: 0 4px;
  padding: 0 12px;
  border-radius: 20px;
  font-size: 12px;
  background-color: rgb(218, 233, 252);
  color: #056DE8;
}

.posting-options {
  position: sticky;
  bottom: 0;
  background-color: white;
}

/* 评论区部分 */
.posting-sub {
  box-sizing: border-box;
  padding-bottom: 24px;
}

.comment-publish {
  position: relative;
  width: 100%;
}

/*.comment-publish input {*/
/*  min-height: 36px;*/
/*  border: 1px solid #8590a6;*/
/*  border-radius: 5px;*/
/*  padding: 0 16px;*/
/*  width: 100%;*/
/*  outline: none;*/
/*  word-break:break-all;*/
/*  word-wrap: break-word;*/
/*}*/
#comment-input {
  border-radius: 5px;
}

.comment-input-button {
  display: none;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  line-height: 28px;
  background-color: #0461cf;
}

.comment-main {
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid rgb(235, 235, 235);
  margin-top: 12px;
}

.comment-header {
  border-bottom: 1px solid rgb(235, 235, 235);
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment-number {
}

.display-pattern {
  display: flex;
}

.comment-floor {
  padding: 0 20px;
}

.floor {
  display: flex;
  padding: 8px 0;
  width: 100%;
}

.avatar {
  display: inline-block;
  vertical-align: top;
}

.avatar img {
  object-fit: fill;
  border-radius: 8px;
  width: 30px;
  height: 30px;
}

.floor-main {
  flex: 1 1;
  display: inline-block;
  margin-left: 10px;
}

.author {
  font-size: 15px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.comment-content {
  margin-top: 4px;
  font-size: 15px;
}

.floor-footer {
  margin-top: 4px;
  display: flex;
  font-size: 13px;
  color: rgb(153, 153, 153);
}

.time {
  flex: 1 1;
}

.repeat {
  margin-right: 12px;
}

.repeat, .like {
  cursor: pointer;
}
</style>