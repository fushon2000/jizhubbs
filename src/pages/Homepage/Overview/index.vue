<template>
  <div class="overview">
    <header class="header">Popular Posting</header>
    <div class="posting-box">
      <ul>
        <li class="li-posting" v-for="posting in postingPage.records">
          <div class="posting-item">
            <div class="posting-title" @click="viewPosting(posting.pid)">{{ posting.title }}</div>
            <!-- 返回1显示实名评论 返回0显示匿名评论 -->
            <div class="posting-extra">
              <span>{{ posting.noAnonymityComment === 1 ? '实名' : '匿名' }}</span>
            </div>
            <div class="posting-degree">
            <span>
              <font-awesome-icon icon="fa-solid fa-eye"/>
              {{ posting.view > 999999 ? '999999+' : posting.view }}
            </span>
              <span>
              <font-awesome-icon icon="fa-solid fa-thumbs-up"/>
              {{ posting.star > 999999 ? '999999+' : posting.star }}
            </span>
              <span>
              <font-awesome-icon icon="fa-regular fa-comment-dots"/>
              {{ posting.comment > 999999 ? '999999+' : posting.comment }}
            </span>
              <span>
              <font-awesome-icon icon="fa-solid fa-star"/>
              {{ posting.save > 999999 ? '999999+' : posting.save }}
            </span>
            </div>
            <div class="posting-editTime">Updated {{ posting.other.time }}</div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import {getPopularPostingListByUid} from "@/api/posting";

export default {
  name: "Overview",
  data() {
    return {
      postingPage: {}
    }
  },
  methods: {
    viewPosting(pid) {
      this.$router.push({name:"postingDetail",params:{pid}})
    }
  },
  created() {
    getPopularPostingListByUid(this.$store.state.user.userInfo.uid, 1).then(({data})=>{
      this.postingPage = data
      console.log(this.postingPage.records)
    })
  }
}
</script>

<style scoped>
li {
  list-style-type: none;
}

.header {
  margin-top: 16px;
  margin-left: 8px;
  font-weight: 400;
  font-size: 16px;
  color: #c9d1d9;
}

.posting-box ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.li-posting {
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  padding: 0 8px;
  margin-top: 16px;
}

.posting-item {
  border: 1px #99a9bf solid;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.posting-item > div:not(:last-child) {
  margin-bottom: 8px;
}

.posting-title {
  color: #58a6ff;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
}
.posting-extra {
  flex: 1;
}
.posting-extra > span {
  border: 1px solid #99a9bf;
  border-radius: 999px;
  font-size: 13px;
  /*color: #8b949e;*/
  color: #c9d1d9;
  padding: 2px 6px;
  display: inline-block;
  height: 16px;
  line-height: 16px;
  vertical-align: top;
  background-color: rgba(255, 255, 255, .3);
}

.posting-degree {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  color: #c9d1d9;
  overflow: hidden;
}

.posting-degree > span {
  /*margin-right: 16px;*/
  white-space: nowrap;
  font-weight: 600;

}

.posting-editTime {
  font-size: 12px;
  color: #c9d1d9;
}
</style>