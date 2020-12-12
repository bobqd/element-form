<template>
  <component style="width: 100%;" :placeholder="placeholder" :disabled="disabled" :is="C('select')" v-model="selectValue" v-bind="{ ...currentAttrs, ...selectAttr }" :loading="$attrs.loading" v-on="_events">
    <component v-if="type != 'group'" :is="C('option')" v-for="(item, index) in currentOptions" :key="index" :label="item[props.label || 'label']" :disabled="item.disabled" :value="item[props.value || 'value']" v-bind="{ ...currentAttrs, ...optionAttr, disabled: item.disabled}" v-on="_events">
      <template v-for="(items, slotsIndex) in cSlots">
        <span :key="slotsIndex">
          <component :is="items.type || 'span'" v-bind="items.props" :style="items.style" v-html="filterHtml(items.html, item)"></component>
        </span>
      </template>
    </component>
    <component v-if="type === 'group'" :is="C('option-group')" :disabled="disabled" v-for="(group, index) in currentOptions" :key="index" :label="group.label">
      <component :is="C('option')" v-for="(item, index) in group[typeLabel || 'options']" :key="index" :label="item[props.label || 'label']" :disabled="item.disabled" :value="item[props.value || 'value']" v-bind="{ ...currentAttrs, ...optionAttr, disabled: item.disabled }" v-on="_events">
        <template v-for="(items, slotsIndex) in cSlots">
          <span :key="slotsIndex">
            <component :is="items.type || 'span'" v-bind="items.props" :style="items.style" v-html="filterHtml(items.html, item)"></component>
          </span>
        </template>
      </component>
    </component>
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
    type: {},
    typeLabel: {},
    disabled: {
      type: Boolean,
      default: false
    },
    optionAttr: {
      type: Object,
      default() {
        return {}
      }
    },
    selectAttr: {
      type: Object,
      default() {
        return {
          placeholder: ""
        }
      }
    },
    props: {
      default() {
        return {};
      }
    },
    cSlots: {
      default() {
        return [];
      }
    },
    placeholder: {}
  },
  data() {
    return {
      selectValue: this.value,
      currentOptions: []
    }
  },
  watch: {
    selectValue: {
      handler(value) {
        if (value) {
          this.$emit('input', value);
        }
      },
      immediate: true
    },
    value(val) {
      this.selectValue = val;
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
  mounted() {
    console.log(this.$attrs)
  },
  computed: {
    currentAttrs() {
      if(this.$attrs['remote-method']) {
        this.$attrs['loading'] = false
        let fn = this.$attrs['remote-method'];
        this.$attrs['remote-method'] = (query) => {
          this.currentOptions = []
          this.$attrs['loading'] = true
          let result = fn(query) || [];
          console.log(result)
          if (result instanceof Array) {
            this.currentOptions = result
            this.$attrs['loading'] = false
          } else {
            result.then(res => {
              this.currentOptions = res
              this.$attrs['loading'] = false
            })
          }
        }
      }
      return this.$attrs;
    }
  },
  methods: {
    C, libName,
    filterHtml(html, obj) {
      let str = html;
      let arr = (html.match(/{(\w+)\}/g) || []).map(item => item.replace(/{(\w+)\}/g, '$1'));
      arr.forEach(item => {
        let reg = new RegExp('{' + item + '}', 'g');
        str = str.replace(reg, obj[item]);
      })
      return str;
    }
  }
}
</script>

<style>
</style>
