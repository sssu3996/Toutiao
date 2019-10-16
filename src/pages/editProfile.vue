<template>
  <div class="edit_profile">
    <myheader title="编辑个人信息">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>

    <div class="myimg">
      <img :src="userdata.head_img" class="userImg" />
      <van-uploader :before-read="beforeRead" :after-read="afterRead" />
    </div>

    <div class="list">
      <mycells title="昵称" :desc="userdata.nickname" @click="nickshow = !nickshow"></mycells>
      <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="upUserNickname">
        <van-field
          :value="userdata.nickname"
          ref="nickname"
          type="text"
          label="昵称"
          placeholder="请输入昵称"
          required
        />
      </van-dialog>

      <mycells title="密码" :desc="userdata.password" @click="passwordshow = !passwordshow"></mycells>
      <van-dialog
        v-model="passwordshow"
        title="修改密码"
        show-cancel-button
        :before-close="beforeClose"
      >
        <van-field ref="password" type="text" label="密码" placeholder="请输入密码" required />
        <van-field ref="newPwd" type="text" label="新密码" placeholder="请输入新密码" required />
      </van-dialog>

      <mycells
        title="性别"
        :desc="userdata.gender === 1 ? '男' : '女'"
        @click="gendershow = !gendershow"
      ></mycells>
      <van-dialog v-model="gendershow" title="修改性别" show-cancel-button>
        <van-picker :columns="['女','男']" :default-index="userdata.gender" @change="onChange" />
      </van-dialog>
    </div>
  </div>
</template>

<script>
import myheader from '../components/myheader'
import { getPersonalInfo, updatePersonalInfo } from '../api/users'
import { uploadfile } from '../api/upload'
import mycells from '../components/mycells'

export default {
  components: { myheader, mycells },
  mounted () {
    //   获取用户信息
    const id = localStorage.getItem('toutiaocase1_id')
    getPersonalInfo(id)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.userdata.password = res.data.data.password
          this.userdata.nickname = res.data.data.nickname
          this.userdata.gender = res.data.data.gender
          this.userdata.head_img = res.data.data.head_img

          if (this.userdata.head_img) {
            // 如果图片是服务器的，就需要添加完成完整的服务器路径
            this.userdata.head_img =
              localStorage.getItem('baseurl') + res.data.data.head_img
          } else {
            this.userdata.head_img = './06.jpg'
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  data () {
    return {
      nickshow: false,
      passwordshow: false,
      gendershow: false,
      userdata: {
        password: '',
        nickname: '',
        head_img: '',
        gender: ''
      }
    }
  },
  methods: {
    // 上传图片
    //   在上传图片前进行格式校验
    beforeRead (file) {
      //   console.log(file.type)
      if (!(file.type.indexOf('image') === 0)) {
        this.$toast.fail('请上传格式正确的图片')
        return false
      }
      return true
    },
    // 上传图片： 上传 + 页面数据刷新  更新数据库
    async afterRead (file) {
      //   console.log(file)
      // 获取图片数据
      var formdata = new FormData()
      formdata.append('file', file.file)
      //   自行将文件上传到服务器
      let res = await uploadfile(formdata)
      console.log(res)
      if (res.status === 200) {
        //   刷新图片
        this.userdata.head_img =
          localStorage.getItem('baseurl') + res.data.data.url

        //   修改图片信息在数据库上的存储 ,传递对应的id 与地址值
        let res2 = await updatePersonalInfo(
          localStorage.getItem('toutiaocase1_id'),
          {
            head_img: res.data.data.url
          }
        )
        console.log(res2)

        if (res2.status === 200) {
          this.$toast.success(res2.data.message)
        }
      }
    },
    // 修改昵称
    async upUserNickname () {
      //   console.log(this.$refs.nickname.$refs.input.value)
      let newNickname = this.$refs.nickname.$refs.input.value
      let res = await updatePersonalInfo(
        localStorage.getItem('toutiaocase1_id'),
        { nickname: newNickname }
      )
      if (res.status === 200) {
        this.userdata.nickname = newNickname
        this.$toast.success(res.data.message)
      }
    },
    // 修改密码前
    // action: 当前操作  confirm : 确认  calcel： 取消
    // done: 对关闭弹窗有控制权，done(false)阻止关闭弹窗  done() 关闭
    async beforeClose (action, done) {
      let password = this.$refs.password.$refs.input.value
      //   console.log(password)
      //   console.log(this.userdata.password)
      //   如果是点击确认按钮
      if (action === 'confirm') {
        //   原始密码验证
        if (password !== this.userdata.password) {
          this.$toast('密码错误,请重新输入')
          //   阻止关闭弹窗
          done(false)
        } else {
          // 密码验证成功
          let newPwd = this.$refs.newPwd.$refs.input.value
          if (newPwd.trim().length === 0) {
            // 验证新密码不能为空
            this.$toast('新密码不能为空')
            done(false)
          } else {
            // 等待更改密码操作完成后，才关闭弹窗
            await this.upUserPassWord()
            done()
          }
        }
      } else {
        done()
      }
    },
    // 修改密码
    async upUserPassWord () {
      // 获取用户键入的新密码数据
      let newPwd = this.$refs.newPwd.$refs.input.value
      console.log(newPwd)
      //   调用修改用户数据接口
      let res = await updatePersonalInfo(
        localStorage.getItem('toutiaocase1_id'),
        {
          password: newPwd
        }
      )
      if (res.status === 200) {
        //   把新密码赋值当前页面上的用户数据，刷新页面
        this.userdata.password = newPwd
        this.$toast.success(res.data.message)
      }
    },
    // 修改性别
    async onChange (picker, value, index) {
      //   console.log(this.userdata.gender)
      //   this.$toast(`当前值：${value}, 当前索引：${index}`)
      //   将修改到的索引值赋值给当前页面的数据，展示数据使用
      this.userdata.gender = index
      //   调用接口，修改服务器内的数据
      let res = await updatePersonalInfo(
        localStorage.getItem('toutiaocase1_id'),
        {
          gender: this.userdata.gender
        }
      )
      console.log(res.data.message)
    }
  }
}
</script>

<style lang='less'>
// .myimg是容器，做相对定位
.myimg {
  position: relative;
  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
    margin: 40px auto;
  }
  /deep/.van-uploader {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: 0;
    // deep:可以影响子组件的样式
    /deep/.van-uploader__upload {
      width: 100/360 * 100vw;
      height: 100/360 * 100vw;
    }
  }
}
</style>
