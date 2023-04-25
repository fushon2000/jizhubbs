<template>
  <div class="SearchBox">
    <div class="carousel-picture">
      <el-carousel height="160px" direction="vertical" :autoplay="true">
        <el-carousel-item v-for="item in carouselImages" :key="item">
          <img :src="item" height="100%" width="100%"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="SearchMain">
      <div class="SearchBar">
        <label style="cursor: text" for="search" v-show="inPlaceholder"><i class="el-icon-search">&nbsp;&nbsp;请输入关键字进行搜索</i></label>
        <input type="text" id="search"
               @blur="showPlaceholder"
               @focus="hidePlaceholder"
               @keydown.enter="search(searchContent)"
               v-model="searchContent">
      </div>
      <div class="SearchHistory">
        <ul>
          <li>JAVA</li>
          <li>C++</li>
          <li>冬天要到了。。</li>
          <li>vue 父组件样式覆盖了子组件</li>
          <li>解码2023年中国经济关键词</li>
          <li>俄方宣布：已发现“大批部队集结”</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  data() {
    return {
      carouselImages: [
          "https://img1.baidu.com/it/u=2841033695,3328217147&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
          "https://img2.baidu.com/it/u=2864589139,1134218305&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          "https://img2.baidu.com/it/u=3207721921,3451553052&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
          "https://img2.baidu.com/it/u=3331543825,980995998&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
          "https://img1.baidu.com/it/u=4050062314,1116360005&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
          "https://picnew10.photophoto.cn/20160731/xunyicaohuahaifengjingtupiansucai-26365586_1.jpg",
      ],
      inPlaceholder: true,
      searchContent: "",
    }
  },
  methods: {
    showPlaceholder(e) {
      if (this.searchContent.trim() === "") this.inPlaceholder = true
    },
    hidePlaceholder() {
      this.inPlaceholder = false
    },
    search(content) {
      this.$router.push({name: "search",query:{content}})
    },
  }
}
</script>

<style scoped>
.SearchBox {
  width: 300px;

}
.carousel-picture {
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.SearchMain {
  box-sizing: border-box;
  overflow: hidden;
  padding: 16px 0;
}
.SearchBar {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 34px;
  margin: 10px 16px;
  border-radius: 999px;
  background-color: #f6f6f6;
}
.SearchBar label {
  font-size: 12px;
  color: #d3dce6;
  position: absolute;
  z-index: 0;
}
.SearchBar label i {
  vertical-align: baseline;
}
.SearchBar input {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 0 16px;
  border: none;
  outline: none;
  border-radius: 999px;
  z-index: 1;
  background-color: transparent;
}
.SearchHistory {
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  font-size: 13px;
}
.SearchHistory li {
  list-style: none;
  display: inline-block;
  margin: 0 8px;
  cursor: pointer;
}

</style>