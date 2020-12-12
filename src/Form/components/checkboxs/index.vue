<template>
  <component class="hc-form-checkbox" :disabled="disabled" :is="C('checkbox-group')" v-model="checkboxValue" v-bind="{ ...$attrs, ...groupAttr }">
    <component :disabled="disabled || item.disabled" :is="C(libName() === 'element-ui' ? checkboxItem : 'checkbox')" v-for="(item, index) in currentOptions" v-bind="{ ...$attrs, ...checkboxAttrs }" :key="index" :label="item[props.label || 'label']"></component>
  </component>
</template>

<script>
import { C, libName } from '../../utils.js'
export default {
  props: {
    value: {},
    options: {
      type: [Array, Function],
      default() {
        return []
      }
    },
    checkboxItem: {
      type: String,
      default: 'checkbox'
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
      default() {
        return {};
      }
    },
    checkboxAttrs: {
      default() {
        return {};
      }
    },
    
  },
  data() {
    return {
      checkboxValue: this.value || [],
      currentOptions: []
    }
  },
  watch: {
    checkboxValue: {
      handler(value) {
        if (value) {
          this.$emit('input', value || []);
        }
      },
      immediate: true
    },
    value(val) {
      this.checkboxValue = val || [];
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
.hc-form-checkbox .is-bordered.el-checkbox ,.el-radio {
  margin-right: 0px;
}
</style>
