// 主页信息栏的封装
<template>
  <div class="articalBlock">
    <div class="left">
      <p>{{articals.title}}</p>
      <span>{{articals.user.nickname}}</span>
      <span>{{articals.comment_length}}跟帖</span>
    </div>
    <img :src="articals.cover[0].url" alt />
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
</style>
