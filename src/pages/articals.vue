<template>
  <div class="articals">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <span class="leftLogo iconfont iconjiantou2" @click="$router.back()"></span>
        <span class="logo iconfont iconnew log"></span>
      </div>
      <span
        class="focus"
        :class="{active:articalsList.has_follow}"
        @click="handlerFollow"
      >{{this.articalsList.has_follow ? '已关注' :'关注'}}</span>
    </div>

    <!-- 内容部分 -->
    <div class="contents">
      <!-- 标题 -->
      <div class="title">{{articalsList.title}}</div>
      <!-- 作者信息 -->
      <div class="info">
        <span class="user">{{this.articalsList.user.nickname}}</span>&nbsp;
        <span class="time">2019-10-10</span>
      </div>

      <!-- 详情 -->
      <div class="detail" v-if="articalsList.type === 1" v-html="articalsList.content"></div>
      <div class="vedio" v-if="articalsList.type === 2">
        <video
          controls
          src="https://video.pearvideo.com/mp4/third/20191018/cont-1613411-10054243-102939-hd.mp4"
          :poster="articalsList.cover && articalsList.cover[0].url"
        ></video>
      </div>

      <!-- 点赞、链接部分 -->
      <div class="link">
        <div class="good" :class="{likeIt:articalsList.has_like}" @click="handlerLike">
          <van-icon name="good-job-o" :class="{likeIt:articalsList.has_like}" />
          {{articalsList.like_length}}
        </div>
        <div class="wetchat">
          <van-icon name="chat-o" />微信
        </div>
      </div>

      <!-- 底部 -->
      <commentsBottom :posts="articalsList"></commentsBottom>
    </div>
  </div>
</template>

<script>
import { getArticalsById, likeArticals } from '../api/articals'
import commentsBottom from '../components/commentsBottom'
import { userFocus, cancelUserFocus } from '../api/users'

export default {
  components: { commentsBottom },
  data () {
    return {
      isShow: false,
      // 文章详情列表
      articalsList: {
        user: {}
      }
    }
  },
  mounted () {
    // console.log(this.$route.params.id)
    // 获取路由id
    const id = this.$route.params.id
    // 发起请求获取文章详情数据
    getArticalsById(id)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          // 获取文章详情列表
          this.articalsList = res.data.data
          console.log(this.articalsList)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    // 关注按钮点击
    handlerFollow () {
      this.articalsList.has_follow = !this.articalsList.has_follow
      // console.log(this.articalsList.has_follow)
      // console.log(this.articalsList.user.id)

      if (this.articalsList.has_follow === true) {
        // 点击关注，发送请求
        userFocus(this.articalsList.user.id).then(res => {
          console.log(res)
          this.$toast(res.data.message)
        })
      } else {
        // 取消关注，发送请求
        cancelUserFocus(this.articalsList.user.id).then(res => {
          console.log(res)
          this.$toast(res.data.message)
        })
      }
    },
    // 点赞
    handlerLike () {
      // 样式切换
      this.articalsList.has_like = !this.articalsList.has_like
      // console.log(this.articalsList.has_like)
      // console.log(this.articalsList.id)
      // 点赞
      if (this.articalsList.has_like === true) {
        likeArticals(this.articalsList.id).then(res => {
          if (res.status === 200) {
            // 点赞成功，点赞数量+1,刷新页面
            this.articalsList.like_length++
          }
        })
      } else {
        // 取消点赞
        likeArticals(this.articalsList.id).then(res => {
          if (res.status === 200) {
            // 取消点赞，点赞数量-1，刷新页面
            this.articalsList.like_length--
          }
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  line-height: 30 / 360 * 100vw;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .left {
    position: relative;
    .leftLogo {
      position: absolute;
      top: -10px;
      left: 0;
      font-size: 25 / 360 * 100vw;
    }
    .log {
      position: absolute;
      top: -10px;
      left: 40px;
      display: block;
      font-size: 60 / 360 * 100vw;
    }
  }

  .focus {
    display: block;
    width: 60 / 360 * 100vw;
    height: 25/ 360 * 100vw;
    line-height: 25/ 360 * 100vw;
    text-align: center;
    border: 1px solid grey;
    border-radius: 20px;
    font-size: 14px;
    margin-top: 15px;
    &.active {
      background-color: #f00;
      color: #fff;
      border: 1px solid red;
    }
  }
}

.contents {
  padding: 10px;
  line-height: 28 / 360 * 100vw;
  box-sizing: border-box;
  .title {
    font-weight: 700;
    font-size: 20px;
  }
  .info {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .detail {
    text-indent: 2em;
    line-height: 24px;
    font-size: 17px;
    padding-bottom: 30px;
    width: 100%;
    /deep/a {
      color: #999;
      line-height: 35px;
    }

    /deep/img {
      display: block;
      width: 100%;
      text-align: center;
    }
  }
}

.vedio {
  width: 100%;
  video {
    width: 100%;
  }
}

.link {
  display: flex;
  padding: 0 13%;
  justify-content: space-between;
  .good,
  .wetchat {
    width: 80 / 360 * 100vw;
    text-align: center;
    padding: 5px;
    border-radius: 20px;
  }

  .good {
    border: 1px solid #999;
    &.likeIt {
      border: 1px solid #f00;
    }

    /deep/.van-icon {
      color: #999;
      font-size: 25px;
      padding-right: 5px;
      &.likeIt {
        color: #f00;
      }
    }
  }

  .wetchat {
    border: 1px solid #999;
    /deep/.van-icon {
      color: green;
      font-size: 23px;
      padding-right: 5px;
    }
  }
}
</style>
