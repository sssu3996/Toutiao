<template>
  <div class="search">
    <!-- 顶部 -->
    <div class="header">
      <span class="leftLogo iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </div>

    <!-- 历史记录 -->
    <div class="history" v-show="!isShow">
      <h3>历史记录</h3>
      <div class="list">
        <router-link
          class="historyDate"
          :to="'/post_search?keyword='+item"
          v-for="(item,index) in historyList"
          :key="index"
        >{{item}}</router-link>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div class="hot" v-show="!isShow">
      <hr />
      <h3>热门搜索</h3>
      <div class="list">
        <router-link class="historyDate" :to="'/post_search?keyword='">阿信</router-link>
      </div>
    </div>

    <!-- 搜索显示记录 -->
    <articalBlock :articals="item" v-for="item in searchList" :key="item.id" v-show="isShow"></articalBlock>
  </div>
</template>

<script>
import { searchArticals, hotSearch } from '../api/articals'
import articalBlock from '../components/articalBlock'

export default {
  components: { articalBlock },
  data () {
    return {
      keyword: '',
      searchList: [],
      isShow: false,
      historyList: []
    }
  },
  watch: {
    keyword () {
      // 当关键字为空的时候，隐藏文章列表
      if (this.keyword === '') {
        this.isShow = false
      } else {
        // 当关键字不为空的时候，发起请求，显示对应的文章，隐藏历史记录
        this.getData()
        // 切换显示内容
        this.isShow = true
      }
    }
  },
  mounted () {
    // 将本地存储的历史记录拿到并展示,要转化成数组或对象
    this.historyList = JSON.parse(
      localStorage.getItem('locationHistoryKeyword')
    )
    console.log(this.historyList)
  },
  methods: {
    // 发请求获取数据
    async getData () {
      // 发起请求
      let res = await searchArticals(this.keyword)
      if (res.status === 200) {
        this.searchList = res.data.data
        console.log(this.searchList)
        // 约定本地存储的键
        let locationHistoryStr =
          localStorage.getItem('locationHistoryKeyword') || '[]'
        console.log(locationHistoryStr)
        // 将本地存储获取的数组格式字符串转换为数组
        let arr = JSON.parse(locationHistoryStr)
        // 如果数据长度大于10（自己定义的数据）的话，则删除最前的那个(历史最久的)
        if (arr.length > 6) {
          arr.splice(0, 1)
        }
        // 查找本地存储里面有没有对应的关键字
        let index = arr.indexOf(this.keyword)
        if (index !== -1) {
          // 表示有重复的数据，则进行删除
          arr.splice(index, 1)
        }
        // 将关键字存储到数组里面
        arr.push(this.keyword)
        console.log(arr)
        // 将数组重新转换为字符串格式
        let finalStr = JSON.stringify(arr)
        // 存在本地存储当中
        localStorage.setItem('locationHistoryKeyword', finalStr)
      }
    },
    // 点击按钮，根据关键字搜索对应的数据
    onSearch () {
      // 获取关键字对应的文章数据
      this.getData()
    },
    // 发起热门搜索
    async getHotSearchData () {
      let res = await hotSearch(this.keyword)
      if (res.status === 200) {
        console.log(res)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  span {
    // flex: 1;
    display: block;
    width: 40 / 360 * 100vw;
    height: 60 / 360 * 100vw;
    line-height: 60 / 360 * 100vw;
    text-align: center;
  }
  /deep/.van-search {
    flex: 1;
  }
}

.history,
.hot {
  padding: 10px;
  line-height: 25 / 360 * 100vw;
  clear: both;

  h3 {
    font-weight: bold;
  }
}

.historyDate {
  display: block;
  color: #999;
  width: 50%;
  float: left;
}

.hr {
  margin-top: 10px;
  padding: 10px;
  line-height: 50px;
}
</style>
