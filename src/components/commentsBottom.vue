<template>
  <!-- 封装评论底部 -->
  <div class="commentsButton">
    <!-- 评论内容区域  引用评论列表组件，目前显示第一个数据-->
    <!-- 如果评论的话，文章详情页面才显示评论，无评论就隐藏此模块 -->
    <commentsList
      :articalcomments="commList[0]"
      v-if="posts.comment_length !== 0 && this.$route.path.indexOf('comments') === -1"
    ></commentsList>

    <!-- 更多跟帖按钮 -->
    <div
      class="morecomments"
      v-if="posts.comment_length !== 0 && this.$route.path.indexOf('comments') === -1"
    >更多跟帖</div>

    <!-- 防止底部挡住内容 -->
    <div class="null" v-show="!isShow"></div>
    <div class="null2" v-show="isShow"></div>

    <!-- 底部 -->
    <div class="bottom" v-show="!isShow">
      <div class="answer" @click="popupTextarea({})">写跟帖</div>
      <div class="comment" @click="$router.push('/comments/' + posts.id)">
        <van-icon name="comment-o" />
        <em data-v-57a4f7da>{{posts.comment_length}}</em>
      </div>
      <div class="star" :class="{starIt:posts.has_star}" @click="starArticalsById">
        <van-icon name="star-o" />
      </div>
      <div class="share">
        <van-icon name="share" />
      </div>
    </div>

    <!-- 底部2 -->
    <div class="bottom2" v-show="isShow">
      <div class="left">
        <textarea
          ref="commonent"
          class="conmments"
          cols="25"
          rows="3"
          :placeholder="placeholder || '写跟帖'"
        ></textarea>
      </div>
      <div class="right" @click="sendReplay">
        <span>发送</span>
      </div>
      <div class="cancel" @click="isShow = !isShow">
        <span>取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { starArticals, getcommentsList, sendComments } from '../api/articals'
import commentsList from '../components/commentsList'
import myEventBus from '../utils/myEventBus'

export default {
  components: { commentsList },
  props: ['posts'],
  data () {
    return {
      isShow: false,
      commList: [],
      parent_id: '',
      placeholder: ''
    }
  },
  mounted () {
    // 接收评论列表发射的事件,定义方法弹出评论框
    myEventBus.$on('replay', this.popupTextarea)

    // 接收评论递归组件发射的事件，定义方法弹出评论框
    myEventBus.$on('replayUsers', this.popupTextarea)

    // 获取评论列表
    getcommentsList(this.$route.params.id).then(res => {
      console.log(res)
      // 遍历评论列表数据
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
      this.commList = res.data.data
      console.log(this.commList)
    })
  },
  methods: {
    // 弹出评论框
    popupTextarea (data) {
      this.parent_id = data.id
      // 当评论是回复用户的时候，设置默认值 (短路运算)
      this.placeholder = data.user && '@' + data.user.nickname
      // 调用弹框方法
      this.isShowIt()
    },
    // 点击发送按钮，发送评论内容
    async sendReplay () {
      // console.log(this.posts)
      // console.log(this.$refs.commonent.value)
      const id = this.posts.id
      const content = this.$refs.commonent.value
      const data = { content, parent_id: this.parent_id }
      // 发送评论请求
      let res = await sendComments(id, data)
      if (res.status === 200) {
        // console.log(res)
        this.$toast(res.data.message)
        // 清理文本框内容
        this.$refs.commonent.value = ''
        // 发射评论成功事件给父组件
        this.$emit('finishReplay')
      }
    },
    //   显示textarea 并且获取焦点
    isShowIt () {
      this.isShow = !this.isShow
      if (this.isShow === true) {
        //   异步队列操作
        // this.$nextTick(() => {
        //   this.$refs.commonent.focus()
        // })
        setTimeout(() => {
          this.$refs.commonent.focus()
        }, 0)
      }
    },
    // 文章收藏
    starArticalsById () {
      // 切换样式
      this.posts.has_star = !this.posts.has_star
      // 点击收藏，发起请求
      if (this.posts.has_star === true) {
        starArticals(this.posts.id).then(res => {
          if (res.status === 200) {
            this.$toast(res.data.message)
          }
        })
      } else {
        // 点击取消收藏，发起请求
        starArticals(this.posts.id).then(res => {
          if (res.status === 200) {
            this.$toast(res.data.message)
          }
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.null {
  height: 80 / 360 * 100vw;
}

.null2 {
  height: 170 / 360 * 100vw;
}

.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  line-height: 50 / 360 * 100vw;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  font-size: 28px;
  background-color: #fff;

  .answer {
    width: 140 / 360 * 100vw;
    height: 30 / 360 * 100vw;
    line-height: 30 / 360 * 100vw;
    border-radius: 20px;
    padding: 4px 20px;
    margin-top: 4px;
    background-color: #eee;
    font-size: 15px;
    color: #999;
  }
  .star {
    color: black;
    &.starIt {
      color: #f00;
    }
  }
}

.comment {
  position: relative;
  em {
    position: absolute;
    top: 2px;
    right: -6px;
    width: 20px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    background-color: #f00;
  }
}

.bottom2 {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #fff;
  padding: 15px 10px;
  justify-content: space-around;
  align-items: flex-end;
  border-top: 1px solid #ccc;
  box-sizing: border-box;

  .conmments {
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 18px;
  }
  .right,
  .cancel {
    display: block;
    width: 70px;
    height: 30px;
    border-radius: 20px;
    text-align: center;
    background-color: #f00;
    color: #fff;
    margin-bottom: 8px;
  }
}

.morecomments {
  width: 130 / 360 * 100vw;
  height: 40/ 360 * 100vw;
  line-height: 40/ 360 * 100vw;
  text-align: center;
  border: 1px solid #999;
  border-radius: 20px;
  margin: 0 auto;
}
</style>
