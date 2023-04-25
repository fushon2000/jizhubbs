<template>
  <div class="posting-item">
    <h2 ref="title" class="item-title" @click="viewPostingDetail(posting)">
      {{ posting.title }}
    </h2>
    <div class="item-content-box" @click="viewPostingDetail(posting)">
      <div class="item-image" v-if="posting.images[0]">
        <img :src="posting.images[0].url" :alt="posting.images[0].name" @error="loadingVideo">
      </div>
      <div ref="content" class="item-content">
        {{ posting.content | textFilter }}
      </div>
    </div>
    <ContentActions :posting="posting" :index="index"></ContentActions>
  </div>
</template>

<script>
import ContentActions from '@/components/ContentActions'
import loadingVideo from '@/assets/video/加载中.gif'
export default {
  name: "PostingItem",
  filters: {
    textFilter(html) {
      let txt = document.createElement("div");
      txt.innerHTML = html;
      let content = txt.innerText || txt.textContent;
      txt = null;
      return content;
    },
    setKeywordColor(text, setKeywordColor, keyword) {
      if (setKeywordColor && keyword !== '' && text.includes(keyword)) {
        return text.replace(keyword, `<span style="color:red;">${keyword}</span>`)
      } else return text
    }
  },
  components: {
    ContentActions
  },
  props: {
    posting: {
      require: true
    },
    index: {
      require: true
    },
    // 是否标红关键字
    setKeywordColor: {
      default: false
    }
  },
  computed: {
    keyword() {
      return this.$route.query.content
    }
  },
  methods: {
    loadingVideo(e) {
      e.target.src = loadingVideo
    },
    viewPostingDetail(posting) {
      // 参数转换成JSON字符串的原因：路由跳转时可以接收到对象中的参数，当该路由进行刷新是，参数会变成[object,object]，无法接受参数
      // this.$router.push({name:"postingDetail",query: {posting:JSON.stringify(posting)}})

      // 第二种方法：只传帖子的pid过去，在created钩子中请求后台获取数据，因此不用担心刷新页面时数据丢失
      this.$router.push({name: "postingDetail", params: {pid: posting.pid}})
    },
    titleHighlightKeywords(str, keywords) {
      const regex = new RegExp(`(${keywords})`, 'gi');
      return str.replace(regex, '<span style="color:#ff8581;">$1</span>');
    },
    contentHighlightKeywords(str, keywords) {
      const regex = new RegExp(`(${keywords})`, 'gi');
      return str.replace(regex, '<span style="color:#40afff;">$1</span>');
    },

  },
  mounted() {
    this.$nextTick(() => {
      if (this.setKeywordColor) {
        this.$refs.title.innerHTML = this.titleHighlightKeywords(this.$refs.title.innerHTML, this.keyword)
        this.$refs.content.innerHTML = this.contentHighlightKeywords(this.$refs.content.innerHTML, this.keyword)
      }
    })
  }
}
</script>

<style scoped>
.posting-item {
  padding-top: 20px;
  border-bottom: 1px rgb(160, 160, 160) solid;
}

.item-title:hover {
  color: rgb(160, 160, 160);
  cursor: pointer;
}

.item-content-box {
  display: flex;
  margin-top: 8px;
}

.item-content-box:hover {
  color: rgb(160, 160, 160);
  cursor: pointer;
}

.item-image {
  width: 190px;
  height: 105px;
  margin-right: 14px;
  border-radius: 5px;
  overflow: hidden;
}

.item-image img {
  height: 100%;
  width: 100%;
  object-fit: fill;
}

.item-content {
  height: 100%;
  width: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* 设置超出多少行后出现... */
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  /* 截断整个单词 */
  word-break: break-word;
}

</style>