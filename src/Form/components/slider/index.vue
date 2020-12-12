<template>
  <div>
    <component :is="C('slider')" :disabled="disabled" v-show="!$attrs.isDetail" v-model="sliderValue" v-bind="$attrs"></component>
    <div v-show="$attrs.isDetail">{{sliderValue || 0}}</div>
  </div>
</template>

<script>
import { C, libName } from '../../utils.js'
export default {
  props: {
    value: {},
    disabled: {}
  },
  data() {
    return {
      sliderValue: this.value || 0
    }
  },
  watch: {
    sliderValue: {
      handler(value) {
        this.$emit('input', value);
      },
      immediate: true
    },
    value(val) {
      this.sliderValue = val;
    }
  },
  methods: {
    C
  }
}
</script>

<style>

</style>
