<template>
  <div class="login">
    <div class="close" @click="$router.push('/')">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputs">
      <myinput
        placeholder="请输入手机号"
        class="input"
        :value="userinfo.username"
        @input="getinfo"
        :rules="/^1\d{10}$/"
        v-onBlur
      />
      <myinput placeholder="密码" class="input" type="password" v-model="userinfo.password" />
    </div>
    <p class="tips">
      没有账号？
      <a href="#/register" class>去注册</a>
    </p>
    <mybtn class="button" text="登录" @click="login"></mybtn>
  </div>
</template>

<script>
// 引入组件
import myinput from '../components/myinput.vue'
import mybtn from '../components/mybutton.vue'
import { login } from '../api/users.js'

export default {
  // 注册组件
  components: { myinput, mybtn },
  data () {
    return {
      userinfo: {
        username: '',
        password: ''
      }
    }
  },
  // 自定义指令
  directives: {
    onBlur: {
      // 为指定事件聚焦
      inserted (el) {
        el.focus()
      }
    }
  },
  methods: {
    getinfo (value) {
      this.userinfo.username = value
    },
    // 发送并处理登录请求
    login () {
      console.log(this.userinfo)
      login(this.userinfo)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            // 登录成功后，存储token值到本地
            localStorage.setItem('toutiaocase1', res.data.data.token)
            // 存储id
            localStorage.setItem('toutiaocase1_id', res.data.data.user.id)
            // 跳转到个人信息页面
            this.$router.push({ name: 'Personal' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
    // background-color: transparent;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
