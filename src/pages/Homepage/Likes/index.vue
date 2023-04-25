<template>
  <div class="likes">
    <div class="sidebar">
      <ul>
        <li class="folder-item" @click="showCreateFavorite">
          <i class="el-icon-circle-plus-outline"></i>
          <a href="javascript:void(0);">新建收藏夹</a>
        </li>
        <li class="folder-item" v-for="(item, index) in postingPackageList" :key="index">
          <i v-if="!item.isPrivate" class="el-icon-files"></i>
          <svg v-if="item.isPrivate" t="1682317869931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17542" width="16" height="16"><path d="M170.666667 170.666667h194.56a42.666667 42.666667 0 0 1 40.533333 29.013333l23.04 69.973333A42.666667 42.666667 0 0 0 469.333333 298.666667h298.666667a42.666667 42.666667 0 0 1 42.666667 42.666666 42.666667 42.666667 0 0 0 85.333333 0 128 128 0 0 0-128-128h-267.946667l-13.653333-42.666666a128 128 0 0 0-121.173333-85.333334H170.666667a128 128 0 0 0-128 128v554.666667a128 128 0 0 0 128 128h256a42.666667 42.666667 0 0 0 0-85.333333H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666z m725.333333 477.013333V597.333333a128 128 0 0 0-256 0v50.346667A128 128 0 0 0 554.666667 768v85.333333a128 128 0 0 0 128 128h170.666666a128 128 0 0 0 128-128v-85.333333a128 128 0 0 0-85.333333-120.32zM725.333333 597.333333a42.666667 42.666667 0 0 1 85.333334 0v42.666667h-85.333334z m170.666667 256a42.666667 42.666667 0 0 1-42.666667 42.666667h-170.666666a42.666667 42.666667 0 0 1-42.666667-42.666667v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667h170.666666a42.666667 42.666667 0 0 1 42.666667 42.666667z" p-id="17543" fill="#c9d1d9"></path></svg>
          <a href="javascript:void(0);" @click="selectPostingPackage(item)">{{ item.name }}</a>
          <span class="folder-item-number">{{ item.other.count }}</span>
        </li>
      </ul>
    </div>
    <div class="main">
      <!-- 收藏夹详情 -->
      <div class="detail" v-if="postingPackageList.length">
        <div class="title">{{ selectedPostingPackage.name }}</div>
        <div class="introduction">{{ selectedPostingPackage.introduction }}</div>
        <div class="save-number">{{selectedPostingPackage.other.count}}条内容 · {{selectedPostingPackage.isPrivate?'私密':'公开'}}</div>
        <div class="create-time">创建于 {{ selectedPostingPackage.createTime }}</div>
        <div class="operation">
          <!-- 编辑收藏夹 -->
          <a href="javascript:void(0);" @click="showEditPostingPackage(selectedPostingPackage)"><i class="el-icon-edit-outline"> 编辑</i></a>
<!--          <a href="javascript:void(0);" @click="removePostingPackage(selectedPostingPackage)"><i class="el-icon-delete"> 删除</i></a>-->
          <!-- 删除收藏夹 -->
          <el-popconfirm
              popper-class="popconfirm-delete"
              confirm-button-text='确认'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="确认删除该收藏夹吗？"
              @confirm="removePostingPackage(selectedPostingPackage)"
          >
            <a href="javascript:void(0);" slot="reference">
              <i class="el-icon-delete"> 删除</i>
            </a>
          </el-popconfirm>
        </div>
      </div>
      <!-- 收藏内容 -->
      <div class="content" v-if="postingPackageList.length">
        <el-carousel indicator-position="outside" class="carousel" height="500px" :autoplay="true">
          <el-carousel-item v-for="foursSave in postingSaveList" class="carousel-item">
            <el-row :gutter="12" type="flex" style="flex-wrap: wrap;">
              <el-col :span="12" v-for="save in foursSave" style="padding-top: 10px;">
                <PostCard :selectedPostingPackage="selectedPostingPackage" :save="save" style="height: 100%"></PostCard>
              </el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 该收藏夹没有帖子时候显示 -->
      <div class="no-data" v-if="!postingPackageList.length">
        <div class="loader"></div>
      </div>
    </div>
    <!-- 新建收藏夹遮罩层 -->
    <CreatePostingPackage v-if="isCreateFavorite"></CreatePostingPackage>
    <!-- 编辑收藏夹信息遮罩层 -->
    <EditPostingPackage v-if="isEditFavorite" :selectedPostingPackage="selectedPostingPackage"></EditPostingPackage>
  </div>
</template>

<script>
import PostCard from '@/pages/Homepage/Likes/PostCard'
import {getPackageListByUid, getPostingSaveByPackageId, removePostingPackage} from "@/api/posting";
import CreatePostingPackage from "@/pages/Homepage/Likes/CreatePostingPackage";
import EditPostingPackage from "@/pages/Homepage/Likes/EditPostingPackage";
import Stars from "@/pages/Homepage/Stars";
export default {
  name: "Likes",
  components: {Stars, EditPostingPackage, CreatePostingPackage,PostCard},
  data() {
    return {
      // 用于展示被选中的收藏夹的信息
      selectedPostingPackage: {
        name: '标题',
        introduction: '简介',
        createTime: '2023-04-23',
        saveNumber: 41,
        isPrivate: 1,
        other: {}
      },
      // 收藏夹列表
      postingPackageList: [],
      // 被选中的收藏夹所收藏的所有帖子
      postingSaveList: [],
      // 是否显示新建收藏夹遮罩层
      isCreateFavorite: false,
      // 是否显示编辑收藏夹遮罩层
      isEditFavorite: false,
    }
  },
  methods: {
    // 获取所有收藏夹
    init() {
      getPackageListByUid(this.$store.state.user.userInfo.uid).then(res => {
        this.postingPackageList = res.data.reverse()
        if (this.postingPackageList.length) {
          this.selectPostingPackage(this.postingPackageList[0])
        }
      })
    },
    // 显示创建收藏夹遮罩层
    showCreateFavorite() {
      this.isCreateFavorite = true
    },
    // 选择某个收藏夹
    selectPostingPackage(postingPackage) {
      this.selectedPostingPackage = postingPackage
      this.postingSaveList = []
      getPostingSaveByPackageId(postingPackage.packageId).then(res => {
        let tmpArr = [], counter = 1
        res.data.forEach(item => {
          tmpArr.push(item)
          // 每满四个就将该数组刷进postingSaveList中，然后清空数组
          if (counter++ % 4 === 0) {
            this.postingSaveList.push(tmpArr)
            tmpArr = []
          }
        })
        // 剩下的不满四个的刷进postingSaveList中
        if (tmpArr.length) this.postingSaveList.push(tmpArr)
      })
    },
    // 显示编辑收藏夹遮罩层
    showEditPostingPackage(item) {
      this.isEditFavorite = true
    },
    // 删除某个收藏夹
    removePostingPackage(postingPackage) {
      removePostingPackage(postingPackage.packageId).then(res => {
        this.init()
      })
    },
  },
  created() {
    this.init()
  },
  mounted() {
    this.$bus.on('changeShowCreate', (val, postingPackage) => {
      this.isCreateFavorite = val
      if (postingPackage) {
        postingPackage.other.count = 0
        this.postingPackageList.unshift(postingPackage)
      }
    })
    this.$bus.on('showEditPostingPackage', (val, postingPackage) => {
      this.isEditFavorite = val
      if (postingPackage) {
        this.selectedPostingPackage = postingPackage
      }
    })
    this.$bus.on('selectPostingPackage', (postingPackage) => {
      postingPackage.other.count -= 1
      this.selectPostingPackage(postingPackage)
    })
  },
  beforeDestroy() {
    this.$bus.off('changeShowCreate')
    this.$bus.off('showEditPostingPackage')
    this.$bus.off('selectPostingPackage')
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #c9d1d9;
}
i {
  color: #c9d1d9;
}
li {
  list-style: none;
}
.likes {
  display: flex;
  color: #c9d1d9;
}
.sidebar {
  min-height: 400px;
  max-height: 540px;
  overflow-y: auto;
  width: 210px;
}
/*滚动条整体*/
.sidebar::-webkit-scrollbar {
  width: 8px;
}
/*滚动条中的滑块*/
.sidebar::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: #c9d1d9;
}
/*滚动条外层轨道*/
.sidebar::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
.folder-item {
  padding: 12px 18px;
  color: #c9d1d9;
  display: flex;
  align-items: center;
}
.folder-item a{
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}
.folder-item-number {
  margin-left: 8px;
  font-size: 12px;
}
.main {
  flex: 1;
  margin-left: 18px;
}
.detail {
  border-bottom: 1px solid #c9d1d9;
  padding: 12px 0;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.introduction {
  margin-top: 16px;
}
.save-number, .create-time {
  font-size: 12px;
  margin-top: 8px;
}
.operation {
  font-size: 12px;
  margin-top: 12px;
}
.operation > * {
  margin-right: 16px;
}
.carousel-item {
  height: 500px;
}
.no-data {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  position: relative;
  width: 120px;
  height: 90px;
  margin: 0 auto;
}

.loader:before {
  content: "";
  position: absolute;
  bottom: 30px;
  left: 50px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: #2a9d8f;
  animation: loading-bounce 0.5s ease-in-out infinite alternate;
}

.loader:after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  height: 7px;
  width: 45px;
  border-radius: 4px;
  box-shadow: 0 5px 0 #f2f2f2, -35px 50px 0 #f2f2f2, -70px 95px 0 #f2f2f2;
  animation: loading-step 1s ease-in-out infinite;
}

@keyframes loading-bounce {
  0% {
    transform: scale(1, 0.7);
  }

  40% {
    transform: scale(0.8, 1.2);
  }

  60% {
    transform: scale(1, 1);
  }

  100% {
    bottom: 140px;
  }
}

@keyframes loading-step {
  0% {
    box-shadow: 0 10px 0 rgba(0, 0, 0, 0),
    0 10px 0 #f2f2f2,
    -35px 50px 0 #f2f2f2,
    -70px 90px 0 #f2f2f2;
  }

  100% {
    box-shadow: 0 10px 0 #f2f2f2,
    -35px 50px 0 #f2f2f2,
    -70px 90px 0 #f2f2f2,
    -70px 90px 0 rgba(0, 0, 0, 0);
  }
}
</style>
<style>
.popconfirm-delete {
  padding: 16px!important;
}
.popconfirm-delete button:nth-child(2) {
  background-color: transparent;
  border: none;
  color: red;
  padding: 0;
}
</style>