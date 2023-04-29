<template>
    <div class="card">
      <div class="main" @click="viewPostingDetail(pid)">
        <!-- 帖子的图片，最多显示四个，没有则显示默认图片 -->
        <div class="picture-box">
          <img src="https://img1.baidu.com/it/u=4050062314,1116360005&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" alt="" v-if="!posting.images.length">
          <img :src="imgItem.url" alt="" v-for="imgItem in posting.images" v-if="posting.images.length">
        </div>
        <!-- 帖子标题 -->
        <div class="title">{{ posting.title }}</div>
      </div>
      <!-- 收藏时间、操作 -->
      <div class="bottom">
        <div class="save-time">收藏于 {{ save.createTime }}</div>
        <div class="operation">
          <el-popover
              placement="bottom"
              width="110"
              trigger="hover">
            <table class="operation-popover-table" style="margin: 2px 0;border-collapse: collapse;">
              <tr style="display: block; padding: 6px;" @click="removePostingSave(save.id)">
                <td style="width: 30px; text-align: center;"><font-awesome-icon :icon="['fas', 'delete-left']" flip /></td>
                <td><span>取消收藏</span></td>
              </tr>
            </table>
            <span slot="reference" style="cursor: pointer;">···</span>
          </el-popover>
        </div>
      </div>
    </div>
</template>

<script>
import {removePostingSave} from "@/api/posting";

export default {
  name: "PostCard",
  props: ['save','selectedPostingPackage'],
  data() {
    return {
      images: [
        "https://img1.baidu.com/it/u=2841033695,3328217147&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800",
        "https://img2.baidu.com/it/u=2864589139,1134218305&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
        "https://img2.baidu.com/it/u=3207721921,3451553052&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        "https://img2.baidu.com/it/u=3331543825,980995998&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
      ],
    }
  },
  computed: {
    posting() {
      return this.save.other.posting
    },
    pid() {
      return this.save.pid
    }
  },
  methods: {
    viewPostingDetail(pid) {
      this.$router.push({name: 'postingDetail', params: {pid}})
    },
    removePostingSave(id) {
      removePostingSave(id).then(res => {
        this.$message.info(res.data)
      })
      this.$bus.emit("selectPostingPackage", this.selectedPostingPackage)
    }
  },

}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  color: black;
  border-radius: 6px;
  box-shadow: 0 2px 5px 1px rgba(255,255,255,.6);
}
.main {
  cursor: pointer;
  flex: 1;
}
.picture-box {
  width: 100%;
  height: 120px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));
  grid-gap: 0;
}
.picture-box img {
  display: block;
  width: 100%;
  height: 120px;
  object-fit: fill;
}
.title {
  font-size: 14px;
  font-weight: bold;
  margin-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  /* 2表示行数，看自己需求设置超出多少行后出现... */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 12px;
}
.operation-popover-table {
  width: 100%;
  border: none;
  margin: 2px 0;
  border-collapse: collapse;
}
.operation-popover-table tr {
  cursor: pointer;
}
.operation-popover-table tr:hover{
  background-color: rgba(0, 0, 0, .08);
}
</style>