<template>
  <div>
    <div class="input-box">
      <el-form ref="form" :model="posting" :rules="rules">
        <el-form-item label="编号" prop="uid">
          <el-input
              type="text"
              placeholder="请输入学生/教师编号"
              v-model.number="posting.uid"
              maxlength="8"
              show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="author">
          <el-input
              type="text"
              placeholder="请输入学生/教师姓名"
              v-model="posting.author"
              maxlength="4"
              show-word-limit>
          </el-input>
        </el-form-item>

        <el-form-item label="学院" prop="department">
          <el-input
              type="text"
              placeholder="请输入所属学院"
              v-model="posting.department"
              maxlength="10"
              show-word-limit
          >
          </el-input>
        </el-form-item>

        <el-form-item label="专业" prop="speciality">
          <el-input
              type="text"
              placeholder="请输入所属专业"
              v-model="posting.speciality"
              maxlength="10"
              show-word-limit
          >
          </el-input>
        </el-form-item>
        <div>
          <el-form-item label="标题" prop="title">
            <el-input
                type="textarea"
                autosize
                placeholder="标题"
                maxlength="20"
                show-word-limit
                v-model="posting.title"
                clearable
            >
            </el-input>
          </el-form-item>

          <div class="content">
            <el-form-item label="内容" prop="content">
              <el-input
                  type="textarea"
                  :rows="50"
                  placeholder="请输入内容"
                  v-model="posting.content"
              >
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <el-upload
        action="http://localhost:90/posting/testUpload/"
        ref="upload"
        list-type="picture-card"
        :auto-upload="false"
        :multiple="true"
        :file-list="fileList"
        :limit="imageLimit"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :on-change="handleChange"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </div>
</template>

<script>
import {addPosting, testUpload} from "@/api/posting";
import axios from "axios";
import request from "@/utils/request";

export default {
  name: "",
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      files: [],
      // 图片最大上传数
      imageLimit: 10,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      posting: {
        uid: '',
        author: '',
        title: '',
        content: '',
        department: '',
        speciality: '',
      },
      rules: {
        uid: [
          {required: true, message: "请输入编号", trigger: "blur"},
          {pattern:/^\d{8}$/,message: '编号必须为8位数字', trigger: "blur"},
        ],
        author: [
          {required: true, message: "请输入姓名", trigger: "blur"},
          // {min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur"},
        ],
        department: [
          {required: true, message: "请输入所属学院", trigger: "blur"},
          // {min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur"},
        ],
        speciality: [
          {required: true, message: "请输入所属专业", trigger: "blur"},
          // {min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur"},
        ],
        title: [
          {required: true, message: "标题不能为空", trigger: "blur"},
          // {min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur"},
        ],
        content: [
          {required: true, message: "内容不能为空", trigger: "blur"},
          // {min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    submitUpload() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$confirm(`<h4>编号:</h4><h2>${this.posting.uid}</h2><hr/>
                              <h4>姓名:</h4><h2>${this.posting.author}</h2><hr/>
                              <h4>学院:</h4><h2>${this.posting.department}</h2><hr/>
                              <h4>专业:</h4><h2>${this.posting.speciality}</h2><hr/>`,
              '确认添加',
              {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
              }).then(() => {
            // 起点
            let formDate = new FormData();
            this.fileList.forEach(
                (file, index) => {
                  // 相当于标签的name=file value=val.raw
                  formDate.append("files", file.raw);
                }
            );
            formDate.append("text", "fuck")
            for (let postingKey in this.posting) {
              formDate.append(postingKey, this.posting[postingKey])
            }
            addPosting(formDate).then(res => {
              this.fileList = []
              this.posting = {}
              this.$message({
                message: "上传成功！",
                type: 'success',
                duration: 1000
              });
            })
            // 终点
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消添加'
            });
          });
        } else {
          this.$message({
            message: '表单不合法，请修改后提交！',
            type: 'warning'
          });
        }
      })

    },
    // 超出图片上传数量limit
    handleExceed() {
      this.$message({
        message: `图片最大上传数为${this.imageLimit}张`,
        duration: 2000
      })
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleSuccess(response, file, fileList) {
      console.log(response/*,file,fileList*/)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
.input-box {
  width: 500px;
}

.input-box div {
  margin: 5px 0;
}

.content {
  width: 500px;
}
</style>