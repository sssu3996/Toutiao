<template>
  <!-- 用户部分：我的收藏 -->
  <div class="myloves">
    <!-- 头部 -->
    <div class="header">
      <myheader title="我的收藏">
        <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>

      <!-- 内容 -->
      <articalBlock v-for="item in userLoveArticals" :key="item.id" :articals="item"></articalBlock>
    </div>
  </div>
</template>

<script>
import myheader from '../components/myheader'
import articalBlock from '../components/articalBlock'
import { getUserLoveArticals } from '../api/users'

export default {
  components: { myheader, articalBlock },
  data () {
    return {
      // 收藏的文章数据列表
      userLoveArticals: []
    }
  },
  mounted () {
    //   获取收藏文章数据
    getUserLoveArticals()
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.userLoveArticals = res.data.data
          console.log(this.userLoveArticals)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
</style>
