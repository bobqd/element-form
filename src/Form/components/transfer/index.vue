<template>
  <div>
    <!-- <component :is="C('transfer')" v-if="!$attrs.disabled" v-model="transferValue" v-bind="$attrs"></component> -->
    <component v-if="!$attrs.isDetail" :is="C('transfers')" v-model="transferValue" :data="$attrs.data" v-bind="$attrs" v-on="_events"></component>
    <div v-if="$attrs.isDetail">{{transferLabel.join() || '-'}}</div>
  </div>
</template>

<script>
import { C, libName } from '../../utils.js'
export default {
  props: {
    value: {}    
  },
  data() {
    return {
      transferValue: this.value || [],
      transferLabel: []
    }
  },
  watch: {
    transferValue: {
      handler(value) {
        this.$emit('input', value || []);
      },
      immediate: true
    },
    value(val) {
      this.transferValue = val || [];
      this.getTransferLabel();
    },
    ['$attrs.targetKeys'](val) {
      if(libName() === 'iview') {
        this.$emit('input', val);
        this.getTransferLabel();
      }
    }
  },
  methods: {
    C,
    getTransferLabel() {
      this.transferLabel = [];
      this.$attrs.data.forEach(item => {
        this.transferValue.forEach(item2 => {
          if(item2 === item.key) {
            this.transferLabel.push(item.label);
          }
        })
      });
    }
  },
  mounted() {
    this.getTransferLabel();
  }
}
</script>

<style>

</style>
