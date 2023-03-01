<template>
  <div class="posting-item">
    <h2 class="item-title" @click="viewPostingDetail(posting)">
      {{ posting.title }}
    </h2>
    <div class="item-content-box" @click="viewPostingDetail(posting)">
      <div class="item-image" v-if="posting.images[0]">
        <img :src="posting.images[0].url" alt="">
      </div>
      <div class="item-content">
        {{ posting.content | textFilter }}
      </div>
    </div>
    <ContentActions :posting="posting" :index="index"></ContentActions>
  </div>
</template>

<script>
import ContentActions from '@/components/ContentActions'
export default {
  name: "PostingItem",
  filters: {
    textFilter(html) {
      let txt = document.createElement("div");
      txt.innerHTML = html;
      let content = txt.innerText || txt.textContent;
      txt = null;
      return content;
    }
  },
  components: {
    ContentActions
  },
  props: ["posting","index"],
  methods: {
    viewPostingDetail(posting) {
      // 参数转换成JSON字符串的原因：路由跳转时可以接收到对象中的参数，当该路由进行刷新是，参数会变成[object,object]，无法接受参数
      // this.$router.push({name:"postingDetail",query: {posting:JSON.stringify(posting)}})

      // 第二种方法：只传帖子的pid过去，在created钩子中请求后台获取数据，因此不用担心刷新页面时数据丢失
      this.$router.push({name:"postingDetail", params: {pid: posting.pid}})
    }
  },
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
  word-break: break-word;
}

</style>