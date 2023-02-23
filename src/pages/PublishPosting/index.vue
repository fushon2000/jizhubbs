<template>
  <div class="pub-posting">
    <!--    <pre id="eg-previewer" class="prettyprint linenums:1"></pre>-->
    <!--    <br />-->
<!--        <div ref="aa" v-html="testHtml"></div>-->
    <!-- 标题 -->
    <div class="title-box">
      <input type="text" v-model="postingInfo.title" class="title" placeholder="请输入标题（最多30字）">
    </div>
    <!-- 富文本 -->
    <div class="froala">
      <froala ref="froala" :tag="'textarea'" :config="froalaConfig" v-model="postingInfo.content"></froala>
    </div>
    <!-- 发布设置 -->
    <div class="pub-setting-box">
      <div class="pub-setting-main">
        <div class="pub-setting">
          <div class="setting-title">发布设置</div>
          <div class="settings">
            <div class="setting-item">
              实名评论
              <el-tooltip :content="postingInfo.noAnonymityComment===1?'是（学号 + 姓名）':'否（用户昵称）'" placement="top">
                <el-switch v-model="postingInfo.noAnonymityComment" active-color="#13ce66" inactive-color="gray"
                           :active-value="1" :inactive-value="0">
                </el-switch>
              </el-tooltip>
            </div>
            <div class="setting-item">
              文章标签
              <el-select v-model="postingInfo.tags" clearable multiple filterable allow-create default-first-option
                         collapse-tags
                         :multiple-limit="3"
                         placeholder="请输入文章标签">
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 发布栏 -->
    <div class="footer-box">
      <div class="footer-main">
        <button class="back-top" @click="backTop">
          返回顶部<i class="el-icon-arrow-up"></i>
        </button>
        <div class="font-number"> 当前字数: {{ fontNumber }}</div>
        <div class="author-info">
          {{ userInfo.department }} &nbsp;&nbsp; {{ userInfo.speciality }} &nbsp;&nbsp; {{ userInfo.uid }} &nbsp;&nbsp; {{ userInfo.realName }}
        </div>
        <button class="submit" @click="publishPosting">
          发布
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {publishPosting} from "@/api/posting";
import {mapState} from "vuex";

export default {
  name: 'PublishPosting',
  data() {
    return {
      testHtml: "<p><strong>测试正文</strong></p><p><strong><img src=\"http://file.jizhubbs.cn/b9a65b215b034ceb9d026230833d7cf4-12.jpg\" style=\"width: 300px;\" class=\"fr-fic fr-dib\"></strong></p><p><strong><br></strong></p><p><strong><img src=\"http://file.jizhubbs.cn/2926a81bbdf945ef94c70a595c766582-1111.jpg\" style=\"width: 300px;\" class=\"fr-fic fr-dib fr-fir\"></strong></p><p style=\"text-align: center;\"><strong><img src=\"http://file.jizhubbs.cn/d5adfb0cced540138bff0f1469f18c17-2020-09-26 20-08-36.jpg\" style=\"width: 300px;\" class=\"fr-fic fr-dib fr-fil\">我giao</strong></p>",
      // 若为实名则提交的author=realName，反之=username
      postingInfo: {
        uid: this.$store.state.user.userInfo.uid,
        department: this.$store.state.user.userInfo.department,
        speciality: this.$store.state.user.userInfo.speciality,
        author: '',
        title: '',
        content: '',
        noAnonymityComment: 0,
        tags: [],
        images: [],
      },
      fontNumber: 0,
      //More -> https://www.froala.com/wysiwyg-editor/docs/options
      froalaConfig: {
        placeholderText: '请输入正文',
        heightMin: 720,
        theme: 'dark',
        language: 'zh_cn',//语言
        quickInsertEnabled: false,//便捷插入标签 Hit enter at the end of this line to see the Quick Insert toolbar.
        charCounterCount: false, //富文本的输入长度 Hit enter at the end of this line to see the Quick Insert toolbar.
        quickInsertButtons: ['image', 'table'],
        toolbarButtons: {
          'moreText': {
            'buttons': ['bold', 'italic', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
          },
          'moreParagraph': {
            'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
          },
          'moreRich': {
            'buttons': ['insertLink', 'insertImage', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertHR']
          },
          'moreMisc': {
            'buttons': ['undo', 'redo', 'fullscreen', 'html', 'spellChecker', 'selectAll', 'help'],
            'align': 'right',
            'buttonsVisible': 4
          }
        },
        imageEditButtons: ['imageReplace', 'imageAlign', 'imageRemove',
          //  '|','imageLink', 'linkOpen', 'linkEdit', 'linkRemove',
          '-', 'imageDisplay', 'imageStyle', 'imageAlt',/* 'imageSize'*/],//富文本对图片对操作
        imageUploadParam: 'file', //上传图片的字段
        imageUploadURL: '/api/oss/file/getSingleUrl',//请求地址
        imageUploadMethod: 'POST',
        // Allow to upload PNG and JPG.
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],//接受图片的类型
        // Set max file size to 20MB.
        fileMaxSize: 20 * 1024 * 1024, //限制图片大小
        toolbarSticky: true,
        // Allow to upload any file.
        events: {
          // 图片上传完成以后
          'image.uploaded': (response) => {
            this.postingInfo.images.push(JSON.parse(response).link)
          },
          // 删除插入的图片触发事件
          'image.removed': ($img) => {
            let index = this.postingInfo.images.indexOf($img[0].src)
            this.postingInfo.images.splice(index, 1,)
            // console.log($img[0].src.split('/').pop());
          },
          'click': function (clickEvent) {
          },
          initialized: function () {
            $('.fr-placeholder').click(function () {
              $('.fr-element').focus()
            })

          },
          contentChanged: function () {
            var editor = this
            $('pre#eg-previewer').text(editor.codeBeautifier.run(editor.html.get()))
            $('pre#eg-previewer').removeClass('prettyprinted');
            $('.font-number').text('当前字数: ' + this.charCounter.count())
          }
        }
      },
    }
  },
  computed: {
    ...mapState("user",["userInfo"])
  },
  methods: {
    publishPosting() {
      // 判断是否为实名评论，若为实名评论则作者也必须为实名
      if (this.postingInfo.noAnonymityComment===0) this.postingInfo.author = this.$store.state.user.userInfo.username
      if (this.postingInfo.noAnonymityComment===1) this.postingInfo.author = this.$store.state.user.userInfo.realName
      publishPosting(this.postingInfo).then((res) => {
        alert(res.data)
        // 重置data中的某个值
        this.postingInfo = this.$options.data.call(this).postingInfo
      })
    },
    backTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  },
  mounted() {

  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
/* 标题 */
.title-box {
  height: 80px;
  width: 100%;
  text-align: center;
  background-color: #F6F6F6;
}

.title {
  box-sizing: border-box;
  height: 100%;
  width: 920px;
  outline: none;
  border: none;
  padding: 0 20px;
  font-size: 32px;
  font-weight: 600;
  min-height: 44px;
}


/* 发布设置 */
.pub-setting-box {
  background-color: #F6F6F6;
  width: 100%;
}

.pub-setting-main {
  background-color: white;
  width: 920px;
  padding-bottom: 60px;
  margin: 0 auto;
}

.pub-setting {
  height: 100%;
  margin: 0 20px;
  border-top: 1px solid #EBEBEB;
}

.setting-title {
  height: 60px;
  width: 100%;
  text-align: left;
  font-size: 17px;
  font-weight: 500;
  line-height: 60px;
}

.settings {
  padding: 0 10px;
}

.setting-item {
  height: 60px;
  width: 100%;
  text-align: left;
  line-height: 60px;
}

/* 发布栏 */
.footer-box {
  background-color: white;
  width: 100%;
  height: 52px;
  position: fixed;
  bottom: 0;
  z-index: 2;
  border-top: 1px solid #EBEBEB;
}

.footer-main {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: inherit;
  width: 920px;
  margin: 0 auto;
  padding: 20px;
  color: #8590A6;
}

.back-top {
  background-color: transparent;
  border: none;
  font-size: 14px;
  color: #8590A6;
  cursor: pointer;
}

.back-top i {
  margin-left: 4px;
}

.font-number {
  font-size: 14px;
  padding: 0 16px;
}

.author-info {
  font-size: 14px;
  padding: 0 16px;
}

.submit {
  background: #2c82ea;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
  height: 32px;
  padding: 0 16px;
  text-align: center;
  margin-left: auto;
}
</style>
<style>
/* 富文本 */


.fr-top {
  border-radius: 0 !important;
}

.fr-wrapper > div[style*='z-index: 9999'] {
  position: absolute;
  top: -10000px;
  opacity: 0;
  display: none;
}

.fr-toolbar {
  border-left: none;
  border-right: none;
  /*top: 48px!important;*/
  z-index: 101!important;
}

.fr-wrapper {
  background-color: #F6F6F6 !important;
  border-bottom: none !important;
  border-left: none !important;
  border-right: none !important;
}

.fr-element {
  background-color: #fff !important;
  width: 920px;
  margin: 0 auto;
}

.fr-placeholder {
  color: rgb(117, 117, 117) !important;
  z-index: 2 !important;
  cursor: text !important;
}

.fr-second-toolbar {
  display: none;
}

</style>