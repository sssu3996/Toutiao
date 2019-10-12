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
    'placeholder', // 占位文本
    'value', // 文本框展示数据
    'err_msg', // 用户错误信息提示
    'rules' // 验证规则
  ],
  methods: {
    //   监听对文本框内容变化的监听
    handlerinput () {
      // 获取当前文本框的数值
      const { value } = event.target
      // 发射事件
      this.$emit('input', value)
      // console.log(value)
      //   验证规则，给相对应的样式
      // console.log(this.rules)
      // 监听当前值的变化，动态地添加样式
      if (this.rules) {
        // test：判断指定的字符串是否匹配当前的正则表达式
        if (this.rules.test(value)) {
          // 使success的状态为 true
          this.status = 'success'
        } else {
          this.status = 'error'
        }
      }
    },
    // 当失去焦点时触发
    handlerBlur () {
      // console.log(this.rules)
      const { value } = event.target
      if (this.rules) {
        if (!this.rules.test(value)) {
          // 给用户提示
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
