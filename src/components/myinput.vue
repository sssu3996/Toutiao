<template>
  <input
    class="inp"
    type="text"
    :placeholder="placeholder"
    :value="value"
    @input="handlerinput"
    @blur="handlerBlur"
    :class="{success:status==='success',error:status==='error'}"
  />
</template>

<script>
// import { Toast } from 'vant';

export default {
  props: [
    'placeholder', // 占位符
    'value', // 文本框的值
    'err_msg', // 错误信息提示
    'rules' // 验证规则
  ],
  methods: {
    //   监听对文本框内容变化的监听
    handlerinput () {
      // 发射获取到的文本框的值
      const { value } = event.target
      this.$emit('input', value)
      // console.log(value)
      //   验证规则，给相对应的样式
      // console.log(this.rules)
      if (this.rules) {
        if (this.rules.test(value)) {
          this.status = 'success'
        } else {
          this.status = 'error'
        }
      }
    },
    // 监听光标离开文本框后的验证规则
    handlerBlur () {
      // console.log(this.rules)
      const { value } = event.target
      if (this.rules) {
        if (!this.rules.test(value)) {
          this.$toast('请输入正确的手机号码')
        }
      }
    }
  },
  data () {
    return {
      status: ''
    }
  }
}
</script>

<style lang='less' scroped>
.inp {
  width: 100%;
  height: 40 / 360 * 100vw;
  line-height: 40 / 360 * 100vw;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid grey;
  font-size: 16 / 360 * 100vw;
  outline: none;
}
.success {
  border-bottom: 2px solid green;
}
.error {
  border-bottom: 2px solid red;
}
</style>
