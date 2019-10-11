<template>
  <div class="login">
    <div class="close">
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
import myinput from '../components/myinput.vue'
import mybtn from '../components/mybutton.vue'
import { login } from '../api/users.js'

export default {
  components: { myinput, mybtn },
  data () {
    return {
      userinfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    getinfo (value) {
      this.userinfo.username = value
    },
    login () {
      console.log(this.userinfo)
      login(this.userinfo)
        .then(res => {
          console.log(res)
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
