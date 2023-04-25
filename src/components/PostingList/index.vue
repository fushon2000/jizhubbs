<template>
  <div class="posting-list">
    <ul class="posting-list-ul">
      <li v-for="posting in postingPage.records">
        <div class="posting-info">
          <h3 class="posting-title">
            <a href="#">{{ posting.title }}</a>
            <span class="posting-noAnonymityComment">{{ posting.noAnonymityComment === 1 ? '实名' : '匿名' }}</span>
          </h3>
          <div class="posting-tags">
            {{ posting.tags | tagFilter }}
          </div>
          <div class="posting-editTime">
            <!-- Updated 3 days ago -->
            最后修改时间 {{ posting.updateTime }}
          </div>
        </div>
        <div class="posting-actions">
          <el-dropdown>
            <el-button type="primary" class="repositories-custom-dropdown-button">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" class="repositories-custom-dropdown-menu">
              <el-dropdown-item>编辑</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </li>
    </ul>
    <div class="pagination">
      <el-pagination
          class="custom-postingList-pagination"
          background
          layout="prev, pager, next"
          :hide-on-single-page="true"
          :page-size="postingPage.size"
          :total="postingPage.total"
          :current-page="page"
          @current-change="changePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getPopularPostingListByUid, getPostingByUidWithCondition} from "@/api/posting";

export default {
  name: "PostingList",
  filters: {
    tagFilter(tags) {
      if (tags!==""){
        let filteredTags = tags.substring(1, tags.length-1).replaceAll(",", " ")
        return filteredTags
      }
    }
  },
  data() {
    return {
      postingPage: {},
      filterContent: {},
      page: 1,

    }
  },
  props: {
    postingList: {
      type: Array,
      default: Array
    }
  },
  methods: {
    changePage(page) {
      this.page = page
      getPostingByUidWithCondition(this.$store.state.user.userInfo.uid, this.filterContent, this.page).then(({data}) => {
        this.postingPage = data
      })
    }
  },
  created() {
    // getPostingByUidWithCondition(this.$store.state.user.userInfo.uid, this.filterContent, this.page)
    this.$bus.on("filterContent", (filterContent) => {
      // 每次修改查询条件，回到第一页
      this.page = 1
      this.filterContent = filterContent
      getPostingByUidWithCondition(this.$store.state.user.userInfo.uid, filterContent, this.page).then(({data}) => {
        this.postingPage = data
        // console.log("data", data)
      })
    })
  },
  mounted() {

  },
  beforeDestroy() {
    this.$bus.off("filterContent")
  }
}
</script>

<style scoped>
/* 显示区域 */
.posting-list {
  background-color: #0D1117;
}

.posting-list-ul {
  display: block;
  height: 100%;

}

.posting-list-ul li {
  list-style: none;
  padding: 24px 0;
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid #30363d;
}

.posting-list-ul li:nth-child(1) {
  border-top: 1px solid #30363d;

}

.posting-info {
  flex: 1;
  color: #8b949e;
}

.posting-title {

}

.posting-title a {
  text-decoration: none;
  color: #58a6ff;
  display: inline-block;
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.posting-noAnonymityComment {
  border-radius: 999px;
  font-size: 12px;
  margin-left: 12px;
  border: 1px solid #99a9bf;
  color: #c9d1d9;
  padding: 2px 6px;
  display: inline-block;
  height: 16px;
  line-height: 16px;
  vertical-align: bottom;
  background-color: rgba(255, 255, 255, .3);
  font-weight: 600;
}

.posting-tags {
  margin-top: 4px;
  font-size: 14px;
}

.posting-editTime {
  margin-top: 16px;
  font-size: 12px;
}

.posting-actions {
  width: 16.66667%;
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>
<style>
.custom-postingList-pagination button, .custom-postingList-pagination li {
  background-color: #21262d !important;
}
</style>