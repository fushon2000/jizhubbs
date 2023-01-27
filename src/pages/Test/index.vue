<template>
  <div>
    <ul class="infinite-list"
        v-infinite-scroll="load"
        infinite-scroll-distance="10"
        style="overflow:auto;height: 600px">
      <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0
    }
  },
  methods: {
    load () {
      this.count += 2
    }
  },
  beforeDestroy() {
    alert(123123)
  }
}
</script>

<style scoped>

</style>