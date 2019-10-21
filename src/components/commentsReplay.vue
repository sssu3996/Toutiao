<template>
  <!-- 评论回复数据列表 递归组件   -->
  <div class="commentsReplay">
    <div class="top">
      <div class="left">
        <span>{{replaysInfo.user.nickname}}</span> &nbsp;
        <span>2小时前</span>
      </div>
      <span @click="replayUser">回复</span>
    </div>
    <span>{{replaysInfo.content}}</span>
    <!-- 递归调用当前组件 -->
    <!-- 如果还存在下一级的parent，就传递下一级的数据并执行此组件，若无，则跳出递归 -->
    <commentsReplay v-if="replaysInfo.parent" :replaysInfo="replaysInfo.parent"></commentsReplay>
  </div>
</template>

<script>
import Bus from '../utils//myEventBus'

export default {
  // 给当前组件起名，（此处与文件同名）
  name: 'commentsReplay',
  props: ['replaysInfo'],
  methods: {
    replayUser () {
      console.log(this.replaysInfo)
      Bus.$emit('replayUsers', this.replaysInfo)
    }
  }
}
</script>

<style lang='less' scoped>
.commentsReplay {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 5px 0px 5px;
  .top {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #999;
  }
  span {
    line-height: 30 / 360 * 100vw;
    color: #999;
  }
}
</style>
