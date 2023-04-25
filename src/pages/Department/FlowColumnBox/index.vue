<template>
  <ul class="flow-column-box">
    <li v-for="i in 100">
      {{ i }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "FlowColumnBox",
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.flow-column-box {
  display: block;
  background-color: red;
  padding: 8px 16px;

}
.flow-column-box li {
  list-style: none;
  margin: 8px 0;
}
/* 往上滚动 */
@keyframes rollUp {
  100% {
    transform: translateY(100%);
  }
}
</style>