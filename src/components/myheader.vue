<template>
  <div class="header">
    <!-- 具名插槽 -->
    <slot name="left">左</slot>
    <span>{{title}}</span>
    <!-- <slot name="right"/>右</slot> -->
    <div>
      <!-- 匿名插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-between;
  line-height: 46px;
  padding: 0px 10px;
  background-color: rgb(240, 239, 239);
  border-bottom: 1px solid #ccc;
}
</style>
