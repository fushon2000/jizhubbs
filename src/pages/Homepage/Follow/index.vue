<template>
  <div class="follow">
    <!-- 关注列表侧边栏 -->
    <div class="sidebar">
      <ul>
        <li class="folder-item" @click="createGroupMaskVisible = !createGroupMaskVisible">
          <i class="el-icon-circle-plus-outline"></i>
          <a href="javascript:void(0);">新建分组</a>
        </li>
        <li class="folder-item" ref="li-1" @click="lastClickedIndex = -1">
          <i class="el-icon-circle-plus-outline"></i>
          <a href="javascript:void(0);" @click="getAllFollowList">全部关注</a>
          <span class="folder-item-number">{{ followGroup.count }}</span>
        </li>
        <li class="folder-item" ref="li-2" @click="lastClickedIndex = -2">
          <i class="el-icon-circle-plus-outline"></i>
          <a href="javascript:void(0);" @click="getDefaultFollowListByGroupId">默认分组</a>
          <span class="folder-item-number">{{ defaultFollowCount }}</span>
        </li>
        <li class="folder-item"
            :class="{'active': index === lastClickedIndex }"
            @click="lastClickedIndex = index"
            v-for="(group, index) in followGroup.groupList"
            :key="index">
          <i v-if="!group.isPrivate" class="el-icon-files"></i>
          <svg v-if="group.isPrivate" t="1682317869931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17542" width="16" height="16"><path d="M170.666667 170.666667h194.56a42.666667 42.666667 0 0 1 40.533333 29.013333l23.04 69.973333A42.666667 42.666667 0 0 0 469.333333 298.666667h298.666667a42.666667 42.666667 0 0 1 42.666667 42.666666 42.666667 42.666667 0 0 0 85.333333 0 128 128 0 0 0-128-128h-267.946667l-13.653333-42.666666a128 128 0 0 0-121.173333-85.333334H170.666667a128 128 0 0 0-128 128v554.666667a128 128 0 0 0 128 128h256a42.666667 42.666667 0 0 0 0-85.333333H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666z m725.333333 477.013333V597.333333a128 128 0 0 0-256 0v50.346667A128 128 0 0 0 554.666667 768v85.333333a128 128 0 0 0 128 128h170.666666a128 128 0 0 0 128-128v-85.333333a128 128 0 0 0-85.333333-120.32zM725.333333 597.333333a42.666667 42.666667 0 0 1 85.333334 0v42.666667h-85.333334z m170.666667 256a42.666667 42.666667 0 0 1-42.666667 42.666667h-170.666666a42.666667 42.666667 0 0 1-42.666667-42.666667v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667h170.666666a42.666667 42.666667 0 0 1 42.666667 42.666667z" p-id="17543" fill="var(--homepage_font_color)"></path></svg>
          <a href="javascript:void(0);" @click="getFollowListByGroupId(group.id)">{{ group.name }}</a>
          <span class="folder-item-number">{{ group.other.fanCount }}</span>
        </li>
      </ul>
    </div>
    <!-- 展示用户列表 -->
    <div class="list">
      <UserList v-if="followList.length" :followList="followList" :groupList="followGroup.groupList"></UserList>
    </div>
    <!-- 新建分组遮罩层 -->
    <el-dialog
        title="新建分组"
        :visible.sync="createGroupMaskVisible"
        width="20%">
      <div class="create-group-mask">
        <el-input
            v-model="newGroupName"
            placeholder="最多输入16个字"
            autofocus
            show-word-limit
            maxlength="16">
        </el-input>
        <div style="text-align:center;margin-top: 20px;">
          <el-button type="primary" size="small" @click="createGroup">确定</el-button>
          <el-button size="small" @click="createGroupMaskVisible = !createGroupMaskVisible">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 分组名不能为空遮罩层 -->
    <el-dialog
        title="错误提示"
        :visible.sync="createGroupErrorMaskVisible"
        width="20%">
      <div class="create-group-mask">
        <p style="display: block;text-align:center;">新建分组名称不能为空</p>
        <div style="text-align:center;margin-top: 20px;">
          <el-button type="primary" size="small" @click="createGroupErrorMaskVisible = false">知道了</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 分组名存在遮罩层 -->
    <el-dialog
        title="错误提示"
        :visible.sync="createGroupExistMaskVisible"
        width="20%">
      <div class="create-group-mask">
        <p style="display: block;text-align:center;">创建标签失败，该分组已经存在</p>
        <div style="text-align:center;margin-top: 20px;">
          <el-button type="primary" size="small" @click="createGroupExistMaskVisible = false">知道了</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  createGroup,
  getAllFollowList, getDefaultFollowListByGroupId,
  getFollowGroup,
  getFollowListByGroupId,
} from "@/api/follow";
import UserList from "@/pages/Homepage/Follow/UserList";

export default {
  name: "Follow",
  components: {UserList},
  data() {
    return {
      // 所有分组
      followGroup: {
        // 分组列表
        groupList: [],
        // 总关注人数
        count: 0
      },
      // 被选中分组下的被关注者
      followList: [],
      // 是否显示新建分组遮罩层
      createGroupMaskVisible: false,
      // 是否显示分组名不能为空遮罩层
      createGroupErrorMaskVisible: false,
      // 是否显示分组名已存在遮罩层
      createGroupExistMaskVisible: false,
      // 新建分组名
      newGroupName: '',
      // 最后一次被点击的分组的索引
      lastClickedIndex: '',
    }
  },
  methods: {
    // 获取关注分组列表
    getFollowGroup() {
      getFollowGroup(this.$store.state.user.userInfo.uid).then(res => {
        this.followGroup = res.data
        console.log('refreshed')
      })
    },
    // 创建关注分组
    createGroup() {
      // 组名是否为空
      if (!this.newGroupName) {
        this.createGroupErrorMaskVisible = true
        return
      }
      // 组名是否存在
      if (this.followGroup.some(item => item.name === this.newGroupName)) {
        this.createGroupExistMaskVisible = true
        return;
      }
      createGroup(this.newGroupName, this.$store.state.user.userInfo.uid).then(res => {
        this.$message.success(res.data)
        location.reload()
      })
    },
    // 获取全部关注
    getAllFollowList() {
      getAllFollowList(this.$store.state.user.userInfo.uid).then(res => {
        this.followList = res.data
      })
    },
    // 获取默认关注
    getDefaultFollowListByGroupId() {
      getDefaultFollowListByGroupId(this.$store.state.user.userInfo.uid).then(res => {
        this.followList = res.data
      })
    },
    // 获取某个分组下的关注
    getFollowListByGroupId(groupId) {
      getFollowListByGroupId(groupId).then(res => {
        this.followList = res.data
      })
    },
  },
  computed: {
    defaultFollowCount() {
      return this.followGroup.count - this.followGroup.groupList.reduce((accumulator, item) => accumulator + item.other.fanCount, 0)
    }
  },
  watch: {
    lastClickedIndex: {
      handler(newVal, oldVal) {
        if (oldVal >= 0 && newVal < 0) {
          // 添加当前点击的div的active样式
          this.$refs['li' + newVal].classList.add('active')
        }
        if (oldVal < 0 && newVal >= 0) {
          // 取消上一个div的active样式
          this.$refs['li' + oldVal].classList.remove('active')
        }
        if (oldVal < 0 && newVal < 0) {
          this.$refs['li' + newVal].classList.add('active')
          this.$refs['li' + oldVal].classList.remove('active')
        }
      }
    }
  },
  created() {
    this.getFollowGroup()
    this.getAllFollowList()
    // 触发监听器，添加激活样式
    this.lastClickedIndex = -1
  },
  mounted() {
    // 刷新分组
    this.$bus.on('refreshGroup', () => {
      this.getFollowGroup()
    })
  },
  beforeDestroy() {
    this.$bus.off('refreshGroup')
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
i {
  color: var(--homepage_font_color);
}
li {
  list-style: none;
}
.follow {
  width: 100%;
  display: flex;
  color: var(--homepage_font_color);
}
.sidebar {
  max-height: 540px;
  overflow-y: auto;
  width: 210px;
  border-right: 1px solid var(--homepage_font_color);
}
/*滚动条整体*/
.sidebar::-webkit-scrollbar {
  width: 8px;
}
/*滚动条中的滑块*/
.sidebar::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: var(--homepage_font_color);
}
/*滚动条外层轨道*/
.sidebar::-webkit-scrollbar-track {
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
.folder-item {
  padding: 12px 18px;
  color: var(--homepage_font_color);
  display: flex;
  align-items: center;
  transition: .7s;
}
.folder-item.active {
  color: var(--homepage_bgc);
  background-color: white;
  border-radius: 5px;
  font-weight: bold;
  font-size: 12px;
}
.folder-item i {
  color: inherit;
}
.folder-item a{
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: inherit;
  flex: 1;
}
.folder-item-number {
  margin-left: 8px;
  font-size: 12px;
}
.list {
  flex: 1;
  overflow: hidden;
}
</style>