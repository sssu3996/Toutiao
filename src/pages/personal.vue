<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="users.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{users.nickname}}
          </div>
          <div class="time">{{users.time | timeformat()}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <div class="list">
      <router-link to="/myfocus">
        <mycells title="我的关注" desc="关注的用户"></mycells>
      </router-link>
      <router-link to="/myfollows">
        <mycells title="我的跟帖" desc="跟帖/回复"></mycells>
      </router-link>
      <router-link to="/myloves">
        <mycells title="我的收藏" desc="文章/视频"></mycells>
      </router-link>
      <router-link to="/mysettings">
        <mycells title="设置"></mycells>
      </router-link>
    </div>

    <div class="btn">
      <van-button type="info" @click="$router.push('/')">返回首页</van-button>
      <van-button type="info" @click="exitApp">退出</van-button>
    </div>
  </div>
</template>

<script>
import { getPersonalInfo } from '../api/users'
import { timeformat } from '../utils/myfiliters'
import mycells from '../components/mycells'

export default {
  components: { mycells },
  data () {
    return {
      users: {
        head_img: '',
        nickname: '',
        time: new Date()
      }
    }
  },
  mounted () {
    // 获取用户个人信息
    const id = localStorage.getItem('toutiaocase1_id')
    getPersonalInfo(id)
      .then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.users.nickname = res.data.data.nickname
          this.users.head_img = res.data.data.head_img
          if (this.users.head_img) {
            // 如果图片是服务器的，就需要添加完成完整的服务器路径
            this.users.head_img =
              localStorage.getItem('baseurl') + res.data.data.head_img
          } else {
            this.users.head_img = './06.jpg'
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  // 添加过滤器
  filters: {
    // 格式化时间
    timeformat
  },
  methods: {
    // 退出登录
    exitApp () {
      localStorage.removeItem('toutiaocase1')
      localStorage.removeItem('toutiaocase1_id')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='less' scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.btn {
  margin-top: 40%;
  /deep/.van-button {
    width: 90%;
    margin: 1% 5%;
  }
}
</style>
