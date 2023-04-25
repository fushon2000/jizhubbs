<template>
  <div class="save-mask">
    <div class="save-box">
      <div class="header">
        <h1>添加收藏</h1>
        <p style="color: #99a9bf;">请选择你想添加的收藏夹</p>
      </div>
      <div class="main">
        <ul>
          <li v-for="(savePackage, index) in savePackageList" :key="index">
            <div class="item">
              <div class="item-left">
                <h4 class="package-name">
                  {{ savePackage.name }}
                  <i class="el-icon-lock" v-if="savePackage.isPrivate"></i>
                </h4>
                <p class="package-introduction">{{ savePackage.introduction }}</p>
                <p class="save-number">{{ savePackage.other.count }} 条内容</p>
              </div>
              <div class="item-right">
                <!-- 通过v-if="savePackage.other.hasSaved" -->
                <button class="save-button" v-if="!savePackage.other.hasSaved" @click="savePosting(savePackage.packageId)">收藏</button>
                <button class="cancel-save-button" v-if="savePackage.other.hasSaved" @click="cancelSavePosting(savePackage.packageId)">已收藏</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <button class="new-package" @click="showCreate">创建收藏夹</button>
      </div>
      <div class="close-button" @click="closeSaveMask">
        <font-awesome-icon :icon="['fas', 'xmark']" beat size="2xl" style="color: white;"/>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import {cancelSavePosting, getPackageList, savePosting} from "@/api/posting";

export default {
  name: "SaveMask",
  props: ['pid'],
  data() {
    return {
      // 后端传回的收藏夹列表
      savePackageList: [],
      // 收藏帖子
      postingSave: {
        packageId: '',
        uid: this.$store.state.user.userInfo.uid,
        pid: this.pid
      },
    }
  },
  methods: {
    // 获取该用户的收藏夹列表
    getPackageList() {
      getPackageList(this.$store.state.user.userInfo.uid, this.pid).then(res => {
        this.savePackageList = res.data
      })
    },
    // 关闭遮罩层
    closeSaveMask() {
      this.$bus.emit("changeShow", false)
    },
    // 收藏帖子
    savePosting(packageId) {
      this.postingSave.packageId = packageId
      savePosting(this.postingSave).then(res=>{
        this.getPackageList()
      })
    },
    // 取消收藏帖子
    cancelSavePosting(packageId) {
      this.postingSave.packageId = packageId
      cancelSavePosting(this.postingSave).then(res => {
        this.getPackageList()
      })
    },
    // 显示创建收藏夹的遮罩层，并且隐藏此遮罩层
    showCreate() {
      this.$bus.emit("changeShowCreate", true)
      this.$bus.emit("changeShow", false)
    },
  },
  created() {
    this.getPackageList()
    console.log("pid",this.postingSave.pid)
  },
  mounted() {
    $('body').css("overflow", "hidden");
  },
  beforeDestroy() {
    $('body').css("overflow", "auto");
  }
}
</script>

<style scoped>
.save-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, .6);
}

.save-box {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  width: 520px;
  background-color: white;
  z-index: 10000;

}

.header {
  text-align: center;
  margin: 30px 0;
}

.main {
  flex: 1;
  display: block;
  overflow: auto;
  width: 100%;
  max-height: 300px;
}

li {
  list-style: none;
  padding: 0 28px;
  margin: 16px 0;
}

.item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid #c1ced2;
}

.package-introduction {
  font-size: 14px;
  margin-top: 8px;
  overflow: hidden;
  word-break: break-word;          /*在恰当的断字点进行换行*/
  text-overflow: ellipsis;          /*超出的文字用省略号表示*/
  display: -webkit-box;             /*将元素设为盒子伸缩模型显示*/
  -webkit-box-orient: vertical;     /*伸缩方向设为垂直方向*/
  -webkit-line-clamp: 3;            /*设定一共3行，超出的部分隐藏，并用省略号来表示*/

}

.save-number {
  color: #99a9bf;
  font-size: 14px;
  margin-top: 8px;
}

.item-right {
  display: flex;
  align-items: center;
}

.save-button {
  width: 76px;
  height: 34px;
  background-color: #fff;
  border: 1px solid #2c82ea;
  border-radius: 3px;
  color: #2c82ea;
  cursor: pointer;
}

.cancel-save-button {
  width: 76px;
  height: 34px;
  background-color: #5b5a5c;
  border: 1px solid #5b5a5c;
  border-radius: 3px;
  color: #ffffff;
  cursor: pointer;
}

.bottom {
  padding: 0 28px;
  margin: 16px 0;
  display: flex;
  justify-content: center;
}

.new-package {
  width: 220px;
  height: 34px;
  margin: 12px;
  background-color: #2c82ea;
  color: white;
  border: 1px solid #2c82ea;
  border-radius: 3px;
  cursor: pointer;
}

.close-button {
  position: absolute;
  right: -30px;
  top: 10px;
  cursor: pointer;
}
</style>