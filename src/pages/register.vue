<template>
  <div class="register">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputs">
      <myinput
        placeholder="用户名/手机号"
        class="input"
        :value="userinfo.username"
        @input="getinfo"
        :rules="/^1\d{10}$/"
        v-onBlur
      />
      <myinput placeholder="昵称" v-model="userinfo.nickname" />
      <myinput placeholder="密码" class="input" type="password" v-model="userinfo.password" />
    </div>
    <p class="tips">
      有账号拉？
      <a href="#/login" class>去登录</a>
    </p>
    <mybtn class="button" text="注册" @click="register"></mybtn>
  </div>
</template>

<script>
// 引入组件
import myinput from '../components/myinput.vue'
import mybtn from '../components/mybutton.vue'
import { register } from '../api/users'
import { Toast } from 'vant'

export default {
  // 注册组件
  components: { myinput, mybtn },
  data () {
    return {
      userinfo: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  //   自定义指令
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
    // 发射注册请求
    // async 标记这个方法中会执行异步操作
    // await 等待： 等待后面的方法执行完毕后接收到它的返回值，它会帮助我们自动执行promise 并获取它的返回结果
    async register () {
      const res = await register(this.userinfo) // 返回了then获取的res
      if (res.status === 200) {
        Toast.success(res.data.message)
      } else {
        Toast.fail('注册失败')
      }
    }
    // register () {
    //   console.log(this.userinfo)
    //   register(this.userinfo)
    //     .then(res => {
    //       console.log(res)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  }
}
</script>

<style lang='less' scoped>
.register {
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
