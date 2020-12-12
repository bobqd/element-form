<template>
    <div class="hc-com">
      <h4>我是一个自定义组件：{{calendarValue}}-</h4>
      <el-calendar v-model="calendarValue"></el-calendar>
    </div>
</template>
<script>
export default {
    name: 'c-component',
    props: {
      value: {}
    },
    watch: {
      value(val) {
        this.calendarValue = val || new Date();
      },
      calendarValue(val) {
        this.$emit('input', val)
      }
    },
    data() {
      return {
        calendarValue: this.value
      }
    }
}
</script>

<style scoped>
.hc-com {
  border: 2px solid #2db7f5;
}
.hc-com h4 {
  text-align: center;
}
</style>