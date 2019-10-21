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

    <!-- 底部 -->
    <commentsBottom :posts="postsDetail" @finishReplay="getPostsComments();getPosts()"></commentsBottom>
  </div>
</template>

<script>
import { getcommentsList, getArticalsById } from '../api/articals'
import myheader from '../components/myheader'
import mycommentsList from '../components/commentsList'
import commentsReplay from '../components/commentsReplay'
import commentsBottom from '../components/commentsBottom'

export default {
  components: {
    myheader,
    mycommentsList,
    commentsReplay,
    commentsBottom
  },
  data () {
    return {
      commentsList: {},
      postsDetail: {}
    }
  },
  methods: {
    // 获取文章评论列表数据
    async getPostsComments () {
      let res = await getcommentsList(this.$route.params.id)
      if (res.status === 200) {
        // 遍历从服务器拿到的数据
        res.data.data.forEach(value => {
          // console.log(value)
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
        console.log(this.commentsList)
      }
    },
    // 获取文章数据
    async getPosts () {
      let res = await getArticalsById(this.$route.params.id)
      if (res.status === 200) {
        this.postsDetail = res.data.data
        console.log(this.postsDetail)
      }
    }
  },
  mounted () {
    // 获取文章评论列表数据
    this.getPostsComments()

    // 获取文章数据
    this.getPosts()
  }
}
</script>

<style lang="less" scoped></style>
