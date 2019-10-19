<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo iconfont iconnew logo"></div>
      <div class="search" @click="$router.push('/search')">
        <van-icon name="search" />
        <span>搜索新闻</span>
      </div>
      <div class="user" @click="$router.push('/personal')">
        <van-icon name="manager-o" />
      </div>
    </div>

    <!-- 导航栏 -->
    <div class="title">
      <van-tabs sticky swipeable v-model="active">
        <van-tab v-for="item in categoryList" :title="item.name" :key="item.id">
          <!-- 添加上拉加载组件 -->
          <van-list
            :immediate-check="false"
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            loading-text="正在玩命加载ing..."
            @load="onLoad"
            :offset="10"
          >
            <!-- 添加下拉刷新组件 -->
            <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
              <!-- 当前栏目的文章列表数据 -- 动态生成,默认情况下显示头条数据 -->
              <articalBlock
                v-for="(value,index) in item.articalList"
                :key="index"
                :articals="value"
              ></articalBlock>
              <!-- 下拉刷新组件 -->
            </van-pull-refresh>
            <!-- 上拉加载页面组件 -->
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getCategory } from '../api/category'
import articalBlock from '../components/articalBlock'
import { getArticals } from '../api/articals'

export default {
  components: { articalBlock },
  data () {
    return {
      // 栏目的索引
      active: localStorage.getItem('toutiaocase1_id') ? 1 : 0,
      // 栏目的数据列表
      categoryList: []
    }
  },
  methods: {
    init () {
      //   获取对应栏目的数据列表中的数值，根据后台文档传递相对应的参数
      const id = this.categoryList[this.active].id
      const pageIndex = this.categoryList[this.active].pageIndex
      const pageSize = this.categoryList[this.active].pageSize

      // 调用接口获取栏目相对应的数据列表
      getArticals({ category: id, pageIndex, pageSize })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.categoryList[this.active].articalList = res.data.data

            // 上拉加载设置加载状态为完成状态 false
            this.categoryList[this.active].loading = false
            // 上拉加载设置数据加载完毕状态(数据列表长度为0时加载完毕),如果小于总页数,就不需要再重新加载了
            if (res.data.data.length < pageSize) {
              this.categoryList[this.active].finished = true
            }
            // 下拉刷新,重置标识
            this.categoryList[this.active].isLoading = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 下拉刷新
    onRefresh () {
      // 要重新向服务器发送请求获取最新的数据
      // 下拉时,当前栏目的最新页码应该为1
      this.categoryList[this.active].pageIndex = 1
      // 重置数组
      this.categoryList[this.active].articalList.length = 0
      // 发起请求
      this.init()
    },
    // 上拉加载
    onLoad () {
      console.log(11)
      // 修改页码
      this.categoryList[this.active].pageIndex++

      // 修改页面后,重新向服务器发起请求加载数据
      this.init()
    }
  },
  watch: {
    active (newV, oldV) {
      // console.log(newV, oldV)
      //   监听栏目滑动或点击事件（index就是active）,切换相对应栏目的数据
      this.init()
    }
  },
  mounted () {
    //   获取栏目数据
    getCategory()
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.categoryList = res.data.data.map(value => {
            return {
              ...value,
              articalList: [], // 当前栏目的文章列表数据
              pageIndex: 1, // 当前栏目的当前页码
              pageSize: 8, // 每一页查询的数据条数
              isLoading: false, // 下拉刷新标识
              loading: false, // 正在上拉加载标识
              finished: false // 上拉加载数据完成标识
            }
          })
          console.log(this.categoryList)
          //   页面初始化时的数据
          this.init()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50 / 360 * 100vw;
  background-color: #f00;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .logo {
    font-size: 50 / 360 * 100vw;
  }
  .search {
    width: 220 / 360 * 100vw;
    height: 34 / 360 * 100vw;
    line-height: 34 / 360 * 100vw;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: center;
    font-size: 16px;
    /deep/.van-icon {
      padding: 0 4px;
    }
  }
  .user {
    font-size: 25px;
  }
}
</style>
