<template>
  <div class="hc-form-radio">
    <el-radio-group v-on="_events" v-bind="{ ...groupAttr, ...$attrs }" :disabled="disabled" v-if="libName() === 'element-ui'" v-model="radioValue">
      <el-radio v-if="radioItem !== 'button'" v-bind="{ ...radioAttr, ...$attrs, disabled: !!item.disabled }" :label="item[props.value || 'value']" v-for="(item, index) in currentOptions" :key="index" v-on="_events">{{item[props.label || 'label']}}</el-radio>
      <el-radio-button v-if="radioItem === 'button'" v-bind="{ ...radioAttr, ...$attrs, disabled: !!item.disabled }" :label="item[props.value || 'value']" v-for="(item, index) in currentOptions" :key="index" v-on="_events">{{item[props.label || 'label']}}</el-radio-button>
    </el-radio-group>
    <RadioGroup v-on="_events" v-bind="{ ...groupAttr, ...$attrs }" :disabled="disabled" v-else v-model="radioValue">
      <Radio v-bind="{ ...radioAttr, ...$attrs, disabled: !!item.disabled }" :disabled="disedabl || item.disabled" :label="item[props.value || 'value']" v-for="(item, index) in currentOptions" :key="index" v-on="_events">{{item[props.label || 'label']}}</Radio>
    </RadioGroup>
  </div>
</template>

<script>
import { C, libName } from '../../utils.js'
export default {
  name: 'radios',
  props: {
    value: {},
    options: {
      type: [Array, Function],
      default() {
        return []
      }
    },
    radioItem: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    props: {
      default() {
        return {};
      }
    },
    groupAttr: {
      type: Object,
      default() {
        return {}
      }
    },
    radioAttr: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      radioValue: this.value || '',
      currentOptions: []
    }
  },
  watch: {
    radioValue: {
      handler(value) {
        this.$emit('input', value);
      },
      immediate: true
    },
    value(val) {
      this.radioValue = val;
    },
    options: {
      handler(options) {
        if (typeof options === 'function') {
          let result = options()
          if (result instanceof Array) {
            this.currentOptions = result
          } else {
            result.then(res => {
              this.currentOptions = res
            })
          }
        } else {
          this.currentOptions = options || []
        }
      },
      immediate: true
    }
  },
  methods: {
    C, libName
  }
}
</script>

<style>
 .hc-form-radio .el-checkbox ,.is-bordered.el-radio {
    margin-right: 0px;
  }
</style>
