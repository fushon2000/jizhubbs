<template>
  <div class="edit-posting-package">
    <div class="create-box">
      <div class="header">
        <h2>编辑收藏夹信息</h2>
      </div>
      <div class="main">
        <el-form :rules="rules" :model="postingPackage" ref="form">
          <el-form-item prop="name">
            <el-input
                type="text"
                placeholder="收藏夹名称"
                v-model="postingPackage.name"
                maxlength="20"
                show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item prop="introduction">
            <el-input
                class="introduction"
                type="textarea"
                placeholder="收藏夹描述（可选）"
                v-model="postingPackage.introduction"
                maxlength="300"
                resize="none"
                size="small"
                :autosize="{minRows:5, maxRows: 5}"
                show-word-limit
            ></el-input>
          </el-form-item>
          <div class="auth-setting">
            <el-radio v-model="postingPackage.isPrivate" :label="0">公开 <p class="private-description">所有人都可以查看此收藏夹</p></el-radio>
            <el-radio v-model="postingPackage.isPrivate" :label="1">私密 <p class="private-description">只有你自己可以查看此收藏夹</p></el-radio>
          </div>
        </el-form>
      </div>
      <div class="bottom">
        <button class="back-button" @click="back">返回</button>
        <button class="create-button" @click="create">确认创建</button>
      </div>
    </div>
  </div>
</template>

<script>
import {editPostingPackage} from "@/api/posting";
import $ from 'jquery'
export default {
  name: "EditPostingPackage",
  props: ['selectedPostingPackage'],
  data() {
    return {
      postingPackage: {
        name: '',
        introduction: '',
        createTime: '',
        saveNumber: 0,
        isPrivate: 0,
        other: {}
      },
      rules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, message: '长度不能少于2个字', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    back() {
      this.$bus.emit("showEditPostingPackage", false)
    },
    create() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          editPostingPackage(this.postingPackage).then(res => {
            this.$bus.emit("showEditPostingPackage", false, res.data)
          })
        } else {
          this.$message.warning({
            message: '表单不合法，请检查后再上传！~',
            duration: 2000,
          })
        }
      })

    }
  },
  created() {
    // 进行深拷贝，不然修改此处父组件的值也会被修改
    this.postingPackage = JSON.parse(JSON.stringify(this.selectedPostingPackage))
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
.edit-posting-package {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  background-color: rgba(0, 0, 0, .6);
}
.create-box {
  width: 536px;
  background-color: #fff;
}
.header {
  text-align: center;
  margin-top: 40px;
  color: black;
}
.main {
  margin-top: 36px;
  padding: 0 24px;
}
.auth-setting {
  margin-top: 20px;
}
.auth-setting :nth-child(2){
  margin-top: 12px;
}
.private-description {
  display: inline-block;
  color: #c9d1d9;
}
.bottom {
  display: flex;
  justify-content: space-between;
  margin: 50px 0 30px;
  padding: 0 24px;
  overflow: hidden;
}
.back-button {
  flex: 1;
  float: left;
  background-color: #fff;
  border: 1px solid #c9d1d9;
  color: #c9d1d9;
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
}
.create-button {
  flex: 1;
  float: right;
  background-color: #056de8;
  border: 1px solid #056de8;
  color: #fff;
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
  margin-left: 16px;
}
</style>