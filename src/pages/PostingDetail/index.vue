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
        发布于 {{posting.createTime}}
      </div>
      <div class="posting-tags">
        <ul>
          <li>SpringCloud</li>
          <li>JAVA</li>
        </ul>
      </div>
      <!-- 操作部分 -->
      <div class="posting-options">
        <ContentActions :actionsData="posting"></ContentActions>
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
            v-model="commentContent"
            @focus="commentFocus"
            @blur="commentBlur">
        </el-input>
        <button class="comment-input-button"><i class="el-icon-check"></i></button>
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
            <li class="floor">
              <div class="avatar">
                <img src="http://file.jizhubbs.cn/d5adfb0cced540138bff0f1469f18c17-2020-09-26 20-08-36.jpg">
              </div>
              <div class="floor-main">
                <div class="author">AxiosTTY</div>
                <div class="comment-content">
                  马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发
                  马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发
                  马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发
                </div>
                <div class="floor-footer">
                  <div class="time">
                    回复于 2023-02-22
                  </div>
                  <div class="repeat"><i class="el-icon-s-comment"></i>回复</div>
                  <div class="like"><i class="el-icon-star-on"></i>点赞</div>
                </div>
                <ul>
                  <li class="floor">
                    <div class="avatar">
                      <img src="http://file.jizhubbs.cn/d5adfb0cced540138bff0f1469f18c17-2020-09-26 20-08-36.jpg">
                    </div>
                    <div class="floor-main">
                      <div class="author">AxiosTTY</div>
                      <div class="comment-content">
                        马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发
                        马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发
                        马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发
                      </div>
                      <div class="floor-footer">
                        <div class="time">
                          回复于 2023-02-22
                        </div>
                        <div class="repeat"><i class="el-icon-s-comment"></i>回复</div>
                        <div class="like"><i class="el-icon-star-on"></i>点赞</div>
                      </div>
                      <ul>
                        <li></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li class="floor">
              <div class="avatar">
                <img src="http://file.jizhubbs.cn/d5adfb0cced540138bff0f1469f18c17-2020-09-26 20-08-36.jpg"
                     style=""
                >
              </div>
              <div class="floor-main">
                <div class="author">AxiosTTY</div>
                <div class="comment-content">
                  马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发
                  马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发
                  马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发马德发

                </div>
                <div class="floor-footer">
                  <div class="time">
                    回复于 2023-02-22
                  </div>
                  <div class="repeat"><i class="el-icon-s-comment"></i>回复</div>
                  <div class="like"><i class="el-icon-star-on"></i>点赞</div>
                </div>
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
import ContentActions from '@/pages/PublishedShow/ContentActions'

export default {
  name: "",
  components: {
    ContentActions
  },
  data() {
    return {
      commentContent: '',
      commentDisplayPattern: '默认',
      actionsData: {
        star: 0,
        save: 0,
        comment: 0,
      },
      testHtml: "<p><strong>测试正文</strong></p><p><strong><img src=\"http://file.jizhubbs.cn/b9a65b215b034ceb9d026230833d7cf4-12.jpg\" style=\"width: 300px;\" class=\"fr-fic fr-dib\"></strong></p><p><strong><br></strong></p><p><strong><img src=\"http://file.jizhubbs.cn/2926a81bbdf945ef94c70a595c766582-1111.jpg\" style=\"width: 300px;\" class=\"fr-fic fr-dib fr-fir\"></strong></p><p style=\"text-align: center;\"><strong><img src=\"http://file.jizhubbs.cn/d5adfb0cced540138bff0f1469f18c17-2020-09-26 20-08-36.jpg\" style=\"width: 300px;\" class=\"fr-fic fr-dib fr-fil\">我giao</strong></p>",
      posting: '',
    }
  },
  methods: {
    // 评论框获取焦点
    commentFocus() {
      $("#comment-input").attr("placeholder", "评论千万条，友善第一条。")
      $(".comment-input-button").css("display", "block")

    },
    // 评论框失去焦点
    commentBlur() {
      $("#comment-input").attr("placeholder", "此处发表评论（字数限制1000字）")
      $(".comment-input-button").css("display", "none")
    },
    // 选择评论的显示模式 （默认，最近）
    commentDisplayPatternChange(pattern) {
      console.log(pattern)
    }
  },
  computed: {

  },
  created() {
    this.posting = this.$route.query.posting

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
  color: rgb(68,68,68);
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
  background-color: rgb(64,158,255);
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