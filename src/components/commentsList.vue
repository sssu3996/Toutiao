<template>
  <!-- 评论列表组件 -->
  <div class="comments">
    <div class="top">
      <div class="left">
        <img :src="articalcomments && articalcomments.user.head_img" alt />
        <div class="info">
          <span>{{articalcomments && articalcomments.user.nickname}}</span>
          <span class="time">2小时前</span>
        </div>
      </div>
      <div class="right">回复</div>
    </div>
    <slot></slot>
    <span>{{articalcomments && articalcomments.content}}</span>
  </div>
</template>

<script>
export default {
  props: ['articalcomments']
}
</script>

<style lang='less' scoped>
.comments {
  border-bottom: 1px solid #999;
  padding: 0 10px;
  margin: 20px 0;
  > span {
    display: block;
    height: 40 / 360 * 100vw;
    line-height: 40 / 360 * 100vw;
  }
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      img {
        display: block;
        width: 60 / 360 * 100vw;
        height: 60 / 360 * 100vw;
        border-radius: 50%;
      }
      span {
        display: block;
        padding: 0 10px;
        line-height: 25 / 360 * 100vw;
      }
      .time {
        font-size: 13px;
        color: #999;
      }
    }
    .right {
      font-size: 15px;
      color: #999;
    }
  }
}
</style>
