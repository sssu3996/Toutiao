<template>
  <div class="comments">
    <!-- 头部 -->
    <div class="header">
      <myheader title="精彩评论">
        <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
    </div>

    <!-- 评论列表 -->
    <mycommentsList :articalcomments="item" v-for="item in commentsList" :key="item.id">
      <commentsReplay v-if="item.parent" :replaysInfo="item.parent">
        <!-- <commentsReplay v-if="item.parent" :replaysInfo="item.parent"></commentsReplay> -->
      </commentsReplay>
    </mycommentsList>
  </div>
</template>

<script>
import { getcommentsList } from '../api/articals'
import myheader from '../components/myheader'
import mycommentsList from '../components/commentsList'
import commentsReplay from '../components/commentsReplay'

export default {
  components: {
    myheader,
    mycommentsList,
    commentsReplay
  },
  data () {
    return {
      commentsList: {}
    }
  },
  mounted () {
    // console.log(this.$route.params.id)
    // 获取文章评论列表数据
    getcommentsList(this.$route.params.id)
      .then(res => {
        if (res.status === 200) {
          // 遍历从服务器拿到的数据
          res.data.data.forEach(value => {
            console.log(value)
            if (value.user.head_img) {
              // 补充完整图片地址
              value.user.head_img =
                localStorage.getItem('baseurl') + value.user.head_img
            } else {
              value.user.head_img = '/06.jpg'
            }
          })
          //   获取数据
          this.commentsList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang='less' scoped>
</style>
