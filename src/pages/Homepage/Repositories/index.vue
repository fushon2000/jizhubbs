<template>
  <div class="repositories">
    <div class="search-box">
      <div class="search-input">
        <input type="text" class="input"
               placeholder="查询一个或多个您发布的帖子..."
               v-model="tmpTitle"
               @input="changeInput(tmpTitle)">
      </div>
      <div class="search-options">
        <!-- 匿名or实名 -->
        <div class="search-options-type">
          <el-select
              class="repositories-type-select"
              v-model="filterContent.condition"
              clearable
              :collapse-tags="true"
              placeholder="类型选项">
            <el-option v-for="item in options.condition" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <!-- 排序类型 -->
        <div class="search-options-sort">
          <el-select
              class="repositories-type-sort"
              v-model="filterContent.sort"
              clearable
              placeholder="排序类型">
            <el-option v-for="item in options.sort" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <!-- 正序倒序 -->
        <div class="search-options-order" @click="changeOrder">
          <i class="el-icon-sort"></i>
        </div>
      </div>
      <div class="add">
        <button class="add-button"><font-awesome-icon icon="fa-solid fa-plus" /> New</button>
      </div>
    </div>
    <PostingList class="posting-list"></PostingList>
  </div>
</template>

<script>
import _ from 'lodash'
import PostingList from "@/components/PostingList";
import {getPostingByUidWithCondition} from "@/api/posting";
export default {
  name: "Repositories",
  components: {PostingList},
  data() {
    return {
      tmpTitle:'',
      // 查询条件
      filterContent: {
        // 查询内容
        title: '',
        // 查询条件 （如：{uid:13191125,noAnonymityComment:0,status:1}）
        condition: '',
        // 按什么排序 （如：点赞数、评论数、收藏数、创建时间、修改时间）
        sort: '',
        // 排序条件 （升降序）
        order: 'asc',
      },
      options: {
        condition: [
          {
            label:'实名评论',
            value:'no_anonymity_comment:1',
          },
          {
            label:'匿名评论',
            value:'no_anonymity_comment:0',
          },
          {
            label:'已发布',
            value:'status:1',
          },
          {
            label:'审核中',
            value:'status:0',
          }
        ],
        sort: [
          {
            label:'浏览数',
            value:'view',
          },
          {
            label:'点赞数',
            value:'star',
          },
          {
            label:'评论数',
            value:'comment',
          },
          {
            label:'收藏数',
            value:'save',
          },
          {
            label:'创建时间',
            value:'create_time',
          },
          {
            label:'最后修改时间',
            value:'update_time',
          },
        ]
      },
      postingList: []
    }
  },
  methods: {
    // 输入框节流
    changeInput: _.throttle(function (tmpTitle){
      this.filterContent.title = tmpTitle
    },1000,{
      // 不要马上响应，默认刚输入就响应一次
      leading: false
    }),
    // 改变排序顺序
    changeOrder() {
      if (this.filterContent.order === 'asc') {
        this.filterContent.order = 'desc'
      } else
      if (this.filterContent.order === 'desc') {
        this.filterContent.order = 'asc'
      }
    },
    // 修改filterContent的condition格式，转变为json格式
    modifyFormat(filterContent) {
      let obj = {}
      Array.from(filterContent.condition).forEach(i => {
        let arr = i.split(":")
        obj[arr[0]] = arr[1]
      })
      filterContent.condition = obj
      return filterContent
    },
  },
  watch: {
    filterContent: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        // watch在mounted之前执行，所以要加个nextTick以保证第一次获取成功
        this.$nextTick(function (){
          this.$bus.emit('filterContent',newVal)
        })
      }
    }
  },
}
</script>

<style scoped>
.repositories {
  /*width: 100%;*/
}
.search-box {
  display: flex;
  height: 36px;
  margin-top: 1px;
}
.search-input {
  flex: 1;
  height: 100%;
}
.input {
  width: 100%;
  border-radius: 6px;
  outline: none;
  border: 1px solid #30363d;
  height: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  background-color: #0D1117;
  color: white;
}
.search-options {
  height: 100%;
  margin-left: 14px;
  display: flex;
}
.search-options div {
  margin-left: 2px;
}
.search-options-order {
  color: white;
  height: 100%;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #21262d;
  border: 1px solid #5b5a5c;
  cursor: pointer;
  border-radius: 6px;
  box-sizing: border-box;
}
.add {
  height: 100%;
  margin-left: 16px;
}
.add-button {
  height: 100%;
  width: 100px;
  border-radius: 6px;
  background-color: #238636;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
}
.posting-list {
  margin-top: 16px;
}
</style>
<style>
.search-options input {
  height: 36px!important;
  width: 140px;
}
.repositories-custom-dropdown-button {
  background-color: #21262d;
  color: #c9d1d9;
  border: 1px solid rgba(240,246,252,0.1);
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 600;
}
.repositories-custom-dropdown-button:hover {
  background-color: rgba(255,255,255,.3);
  border-color: white;
}
.repositories-custom-dropdown-menu {
  width: 100px;
}
.repositories-type-select .el-select__tags{
  flex-wrap: nowrap;
}
.repositories-type-select input{
  background-color: #0D1117;
  border: 1px solid #30363d;
}
.repositories-type-select input::-webkit-input-placeholder {
  color: #8b949e;
  font-size: 13px;
}
.repositories-type-sort input{
  background-color: #0D1117;
  border: 1px solid #30363d;
}
.repositories-type-sort input::-webkit-input-placeholder {
  color: #8b949e;
  font-size: 13px;
}
</style>