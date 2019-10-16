<template>
  <div class="myfollows">
    <!-- 头部 -->
    <myheader title="我的跟帖">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>

    <!-- 内容 -->
    <div class="commentsList" v-for="(value,index) in commentsList " :key="index">
      <div class="time">2019-09-09 20:10</div>
      <!-- 回复 -->
      <div class="follow" v-if="value.parent">
        <div class="name">回复：{{value.parent.user.nickname}}</div>
        <div class="answer">{{value.parent.content}}</div>
      </div>

      <div class="article">
        <div class="title">{{value.content}}</div>
        <div class="content">
          <router-link class="postlink" :to="'/post?id=' + value.post.id">原文：{{value.post.title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '../components/myheader'
import { getUserComments } from '../api/users'

export default {
  components: { myheader },
  data () {
    return {
      // 评论数据列表
      commentsList: []
    }
  },
  mounted () {
    // 查询页面数据
    getUserComments()
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          // 获取数据库数据，并且赋值到当前评论数据列表中
          this.commentsList = res.data.data
          console.log(this.commentsList)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang='less' scoped>
.commentsList {
  line-height: 50 / 360 * 100vw;
  border-bottom: 1px solid #ccc;
  margin: 10px;

  .time {
    font-size: 13px;
    color: #999;
  }

  .article {
    line-height: 25px;

    .title {
      font-weight: 700;
    }
    .content {
      font-size: 12px;
      color: #999;
    }
  }
}
.follow {
  // height: 40 / 360 * 100vw;
  line-height: 30 / 360 * 100vw;
  background-color: #eee;
  padding: 10px;
  margin: 10px 5px;
  font-size: 13px;
  color: #999;
}
.postlink {
  color: #999;
}
</style>
