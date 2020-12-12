<template>
  <div class="hc-multi-form">
    <div class="hc-multi-item" v-for="(item, index) in list" :key="index">
      <component :is="C('row')" :gutter="gutter" class="hc-multi-input">
        <component v-for="(keyMapItem, keyMapIndex) in filterKeyMap" :key="keyMapIndex" :is="C('col')" :span="24 / filterKeyMap.length" class="hc-suffix">
          <component :is="C('input')" :placeholder="keyMapItem" v-model="list[index][keyMapItem]">
          </component>
        </component>
      </component>
      <div class="hc-multi-box">
        <button class="hc-multi-button" type="button" :class="{'hc-disabled': (index !== 0)}" @click="handlerUpdate(index !== 0, index)">
          {{index == 0 ? "＋" : "－"}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { C, libName } from '../../utils.js'
export default {
  props: {
    value: {},
    gutter: {
      type: Number,
      default: 5
    },
    keyMap: {
      type: Array,
      default() {
        return ['label', 'value']
      }
    }
  },
  watch: {
    value: {
      handler: function (val) {
        if (val && val.length && val.length > 0) {
          this.list = val || [{}];
        } else {
          this.list = [{}];
        }
      },
      immediate: true
    },
    list: {
      handler(arr) {
        this.$emit('input', arr)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    filterKeyMap() {
      if (this.keyMap.length > 0) {
        return this.keyMap;
      } else {
        return ['label', 'value']
      }
    }
  },
  data() {
    return {
      list: this.value || []
    }
  },
  mounted() {
  },
  methods: {
    C,
    handlerUpdate(flag, index) {
      if (flag) {
        // 减去
        this.list.splice(index, 1)
      } else {
        // 加上
        let tempObj = {}
        this.keyMap.forEach(item => {
          tempObj[item] = item
        });
        this.list.push(tempObj)
      }
    }
  }
}
</script>

<style>
.hc-multi-form {
  width: 100%;
}
.hc-multi-form .hc-multi-item {
  display: flex;
  margin-bottom: 10px;
}
.hc-multi-form .hc-multi-item .hc-multi-box {
  position: relative;
  width: 42px;
}
.hc-multi-form .hc-multi-item .hc-multi-input {
  flex: 1;
}
.hc-multi-form .hc-multi-item .hc-multi-input .hc-suffix {
  position: relative;
}
.hc-multi-form .hc-multi-item .hc-multi-input .hc-suffix ::after {
  display: inline-block;
  position: absolute;
}
.hc-multi-form .hc-multi-item .hc-multi-button {
  background: #3a8ee6;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  outline: none;
  border: none;
  margin-left: 12px;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  left: 0px;
  bottom: 0px;
  top: 0px;
  right: 0px;
  margin: auto;
  line-height: 16px;
}
.hc-multi-form .hc-multi-item .hc-multi-button.hc-disabled {
  background-color: #f56c6c;
}
</style>
