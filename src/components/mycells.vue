<template>
  <!-- 个人信息页面的导航栏封装 -->
  <div class="cell" @click="$emit('click')">
    <div class="title">{{title}}</div>
    <div class="desc">
      <span>{{desc}}</span>
      <van-icon name="arrow" size="18px" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc']
}
</script>

<style lang='less' scoped>
.cell {
  display: flex;
  height: 40px;
  line-height: 40px;
  padding: 10px;
  border-bottom: 1px solid #bbb;
  justify-content: space-between;
  margin: 0 15px;
}
.title {
  color: black;
}
.desc {
  color: #bbb;
  font-size: 14px;
  > span {
    padding: 0 10px;
  }
}
</style>
