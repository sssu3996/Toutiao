<template>
  <div class="btn" @click="handlerbutton">{{text}}</div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    handlerbutton () {
      this.$emit('click')
    }
  }
}
</script>

<style lang='less' scoped>
.btn {
  width: 100%;
  height: 48 / 360 * 100vw;
  line-height: 48 / 360 * 100vw;
  background-color: #d81e06;
  border-radius: 40px;
  text-align: center;
  color: #fff;
  font-size: 20 / 360 * 100vw;
}
</style>
