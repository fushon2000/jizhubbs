<template>
  <div class="stars">
    <PostList></PostList>
  </div>
</template>

<script>
import PostList from '@/pages/Homepage/Stars/PostList'
export default {
  name: "Stars",
  components: {
    PostList
  },

}
</script>

<style scoped>
.stars {
  color: white;
}

</style>