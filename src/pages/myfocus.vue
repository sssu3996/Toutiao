<template>
  <div class="myfocus">
    <myheader title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>

    <div class="list">
      <div class="box" v-for="(value,index) in focusList" :key="index">
        <img :src="value.head_img" alt />
        <div class="center">
          <p>{{value.nickname}}</p>
          <span>2019-09-10</span>
        </div>
        <span @click="cancelFocus(value.id,index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '../components/myheader'
import { getUserFocus, cancelUserFocus } from '../api/users'

export default {
  components: { myheader },
  data () {
    return {
      focusList: []
    }
  },
  mounted () {
    //   获取用户关注列表
    getUserFocus()
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          // 遍历获取到的数组数据
          res.data.data.forEach(value => {
            //   把数据中的 图片路径地址补充完整
            value.head_img = localStorage.getItem('baseurl') + value.head_img
          })
          //   将数据接收到数组里
          this.focusList = res.data.data
          console.log(this.focusList)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    //   取消关注
    async cancelFocus (id, index) {
      // 调用接口删除服务器数据
      let res = await cancelUserFocus(id)
      if (res.status === 200) {
        //    刷新页面数据
        this.focusList.splice(index, 1)
        this.$toast(res.data.message)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.box {
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  align-items: center;
  border-bottom: 1px solid #999;

  > img {
    display: block;
    width: 60 / 360 * 100vw;
    height: 60 / 360 * 100vw;
    border-radius: 50%;
    padding: 0 10px;
  }
  .center {
    flex: 1;
    line-height: 20px;
    > span {
      font-size: 13px;
      color: #999;
    }
  }

  > span {
    display: block;
    width: 80 / 360 * 100vw;
    height: 30 / 360 * 100vw;
    line-height: 30 / 360 * 100vw;
    background-color: #eee;
    text-align: center;
    border-radius: 20px;
    font-size: 12px;
  }
}
</style>
