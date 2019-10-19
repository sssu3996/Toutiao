// 主页信息栏的封装
<template>
  <!-- 一张图片：左右结构 type 为 1 -->
  <div
    class="articalBlock"
    @click="$router.push('/articals/'+ articals.id)"
    v-if="articals.type === 1 && articals.cover.length <= 2"
  >
    <div class="left">
      <p>{{articals.title}}</p>
      <span>{{articals.user.nickname}}</span>
      <span>{{articals.comment_length}}跟帖</span>
    </div>
    <img :src="articals.cover[0].url" alt />
  </div>

  <!-- 三张图片，上中下结构 type 为 1-->
  <div
    class="articalBlock2"
    @click="$router.push('/articals/'+ articals.id)"
    v-else-if="articals.type === 1 && articals.cover.length === 3"
  >
    <div class="left">
      <p>{{articals.title}}</p>
      <!-- <img :src="articals.cover[0].url" alt />
      <img :src="articals.cover[1].url" alt />
      <img :src="articals.cover[2].url" alt />-->
      <div class="imgs">
        <img :src="item.url" alt v-for="item in articals.cover" :key="item.id" />
      </div>
      <div class="info">
        <span>{{articals.user.nickname}}</span>
        <span>{{articals.comment_length}}跟帖</span>
      </div>
    </div>
  </div>

  <!-- 视频，上中下结构 type 为 2 -->
  <div
    class="articalBlock3"
    @click="$router.push('/articals/' + articals.id)"
    v-else-if="articals.type === 2"
  >
    <div class="left">
      <p>{{articals.title}}</p>
      <div class="video">
        <img :src="articals.cover[0].url" alt />
        <i class="iconfont iconshipin"></i>
      </div>
      <span>{{articals.user.nickname}}</span>&nbsp;
      <span>{{articals.comment_length}}跟帖</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articals']
}
</script>

<style lang='less' scoped>
.articalBlock {
  display: flex;
  justify-content: space-between;
  height: 80 / 360 * 100vw;
  border-bottom: 1px solid grey;
  padding: 10px;

  .left {
    flex: 1;
    overflow: hidden;
    > p {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > span {
      padding: 0px 5px;
      font-size: 12px;
      color: #999;
      line-height: 30px;
    }
  }

  > img {
    display: block;
    width: 120/360 * 100vw;
    height: 80 / 360 * 100vw;
    // 为了避免图片变形，一般会显示图片的某个区域
    object-fit: cover;
  }
}

.articalBlock2 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  .imgs {
    display: flex;
    justify-content: space-around;
    width: 100%;
    > img {
      width: 32%;
      display: block;
      padding: 10px 0;
    }
  }
  span {
    padding: 0px 5px;
    font-size: 12px;
    color: #999;
    line-height: 30px;
  }
}

.articalBlock3 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  span {
    color: #999;
    font-size: 12px;
  }
  .video {
    width: 100%;
    position: relative;
    > img {
      width: 100%;
      display: block;
      padding: 10px 0;
    }
    i {
      position: absolute;
      font-size: 60px;
      color: #fff;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid #fff;
      box-shadow: 0px 0px 5px #fff;
    }
  }
}
</style>
