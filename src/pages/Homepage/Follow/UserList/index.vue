<template>
  <div class="user-list">
    <ul>
      <li class="list-item" v-for="(user) in userList" :key="user.id">
        <div class="avatar">
          <img :src="user.avatar" alt="头像">
        </div>
        <div class="content">
          <!-- 只能关注实名发布的作者，因此此处只能显示真名。并且访问用户空间时，只能看到实名发布的帖子，匿名发布无法查看 -->
          <div class="header">
            <span class="realName">{{ user.realName }}</span>
            <span class="grade small-info">{{ user.grade }}级</span>
            <span class="department small-info">{{ user.department }}</span>
            <span class="speciality small-info">{{ user.speciality }}</span>
          </div>
          <div class="signature">{{ user.signature }}{{ user.signature }}</div>
        </div>
        <div class="operation">
          <el-popover
              placement="bottom"
              width="110"
              trigger="hover"
              :close-delay="0">
            <table class="operation-popover-table">
              <tr style="display: block; padding: 6px;" @click="changeGroupMaskVisible(user.uid)">
                <td style="width: 30px; text-align: center;"><font-awesome-icon :icon="['fas', 'up-down']" /></td>
                <td><span>更换分组</span></td>
              </tr>
              <tr style="display: block; padding: 6px;" >
                <td style="width: 30px; text-align: center;"><font-awesome-icon :icon="['fas', 'xmark']" /></td>
                <td><span>取消关注</span></td>
              </tr>
            </table>
            <button class="opt-btn" slot="reference">
              <font-awesome-icon :icon="['fas', 'bars']" bounce /> 已关注
            </button>
          </el-popover>
        </div>
      </li>
    </ul>
    <!-- 更换分组遮罩层 -->
    <el-dialog
        title="更换分组"
        :visible.sync="groupMaskVisible"
        width="20%">
      <div class="create-group-mask">
        <el-select v-model="newGroupId" placeholder="请选择">
          <el-option
              v-for="group in groupList"
              :key="group.id"
              :label="group.name"
              :value="group.id">
          </el-option>
        </el-select>
        <div style="text-align:center;margin-top: 20px;">
          <el-button type="primary" size="small" @click="changeGroup">确定</el-button>
          <el-button size="small" @click="groupMaskVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {changeGroup} from "@/api/follow";

export default {
  name: "UserList",
  props: ['followList', 'groupList'],
  data() {
    return {
      // 是否显示更改用户分组遮罩层
      groupMaskVisible: false,
      // 被选中的用户id
      selectedUserId: '',
      // 将要去往的分组id
      newGroupId: '',
    }
  },
  methods: {
    // 显示更改分组遮罩层，并且获取被选中的用户uid
    changeGroupMaskVisible(uid) {
      this.selectedUserId = uid
      this.groupMaskVisible = true
    },
    // 更改已关注用户所处的分组
    changeGroup() {
      changeGroup(this.selectedUserId, this.newGroupId).then(res => {
        this.$router.push({name: 'overview', params:{username:this.$route.params.username}})
        // this.$router.push({name: 'overflow', params:{username:this.$route.params.username}}) 不存在的name貌似也可以
        this.$router.push({name: 'follow', params:{username:this.$route.params.username}})
      })
    },
  },
  computed: {
    userList() {
      return this.followList.map(item => item.other.user)
    }
  },
}
</script>

<style scoped>
.list-item {
  list-style: none;
  display: flex;
  padding: 20px 10px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--homepage_font_color);
}

.avatar img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}

.content {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
}

.realName {
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
}

.small-info {
  margin-left: 12px;
  font-size: 12px;
  font-weight: bold;
  font-style: italic;
  white-space: nowrap;
}

.signature {
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.operation {
  display: flex;
  align-items: center;
  margin-left: 25px;
}

.opt-btn {
  padding: 4px 12px;
  border-radius: 5px;
  border: none;
  font-size: 12px;
  color: #6d757a;
  cursor: pointer;
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