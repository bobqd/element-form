<template>
  <div :class="isDetail ? 'hc-form-detail' : ''">
    <component :is="C('form')" ref="editForm" :style="{height: lineHeight}" :class="{'hc-label-top': labelPosition}" :size="formSize" class="edit-fields" :model="formModel" :disabled="disabled" :rules="rules" :label-width="labelWidth" :inline="inline" :label-position="labelPosition">
      <div :class="{'hc-form-content' : lineHeight !== 'auto'}">
        <component :is="C(inline ? 'div' : 'row')" :gutter="gutter" style="width: 100%" :class="{'hc-form-inline': inline}">
          <component :is="C('tabs')" v-if="isTabs" v-model="tabsActive" @tab-click="handlerTabsClick">
            <component :is="C('tab-pane')" :label="tab.title" v-for="(tab, tabIdx) in tabsData" :key="tabIdx" :name="tab.title">
              <div v-for="(item, idx) in tab.tabs" :key="idx">
                <component :is="C('col')" v-if="item.type === 'group'" :span="24">
                  <span class="form-group-title" v-html="item.title"></span>
                  <hr class="form-hr" />
                </component>
                <component :is="C('col')" v-else :span="item.span || 12">
                  <component :is="C('form-item')" :size="item.size || ''" class="edit-field-container" :prop="item.data" :style="{ width: item.width }" :label="(item.title || '') + (isDetail ? '：' : '')" v-if="item.show ? item.show(formModel) : true">
                    <keep-alive>
                      <div>
                        <component v-if="!item.slotName" :disabled="isDetail || disabled || item.disabled" :isDetail="isDetail" :is="C(item.type)" v-bind="
                          typeof item.props == 'function'
                            ? item.props(formModel)
                            : item.props
                        " v-on="disposeEvent(item.events, formModel, item, rulesDataMap, hideDataMap)" v-model="formModel[item.data]">
                          <template :slot="items.name" v-for="(items, index) in item.slots">
                            <span :key="index">
                              <component v-model="formModel[items.data]" :is="items.type || 'span'" v-bind="items.props" v-html="items.html" v-on="disposeEvent(items.events, formModel, items)"></component>
                            </span>
                          </template>
                        </component>
                        <slot v-else :value="item" :name="item.slotName"></slot>
                      </div>
                    </keep-alive>
                    <span class="v-notice">{{ typeof item.message === "function" ? item.message(formModel) : item.message }}
                    </span>
                  </component>
                </component>
                <component v-if="item.row" :is="C('col')" :span="24"></component>
              </div>
            </component>
          </component>
          <div v-else v-for="(item, idx) in columns" :key="idx" :class="{'hc-form-inline': inline}">
            <template v-if="!isHide(item)">
              <component :is="C('col')" v-if="item.type === 'group'" :span="24">
                <span class="form-group-title" v-html="item.title"></span>
                <hr class="form-hr" />
              </component>
              <component :is="C(inline ? 'div' : 'col')" :class="{'hc-form-inline': inline}" v-else :span="item.span || 12">
                <component :is="C('form-item')" :class="handlerRenderItemClass(item)" :size="item.size || ''" class="edit-field-container" :prop="item.data" :style="{ width: item.width }" :label="(item.title || '') + (isDetail ? '：' : '')" v-if="item.show ? item.show(formModel) : true">
                  <keep-alive>
                    <div>
                      <component v-if="!item.slotName" :disabled="isDetail || disabled || item.disabled" :isDetail="isDetail" :is="C(item.type)" v-bind="
                        typeof item.props == 'function'
                          ? item.props(formModel)
                          : item.props
                      " v-on="disposeEvent(item.events, formModel, item, rulesDataMap, hideDataMap)" v-model="formModel[item.data]">
                        <template :slot="items.name" v-for="(items, index) in item.slots">
                          <span :key="index">
                            <component v-model="formModel[items.data]" :is="items.type || 'span'" v-bind="items.props" v-html="items.html" v-on="disposeEvent(items.events, formModel)"></component>
                          </span>
                        </template>
                      </component>
                      <slot v-else :value="item" :name="item.slotName"></slot>
                    </div>
                  </keep-alive>
                  <span class="v-notice">{{ typeof item.message === "function" ? item.message(formModel) : item.message }}
                  </span>
                </component>
              </component>
              <component v-if="item.row" :is="C('col')" :span="24"></component>
            </template>
          </div>
          <slot name="footer" :value="formModel" v-if="!isDetail && inline"></slot>
          <component :style="inline ? ('float:' + inlineDir) : ''" :is="C('form-item')" v-show="!isDetail && !$slots.footer && inline">
            <slot name="buttons" :value="formModel"></slot>
            <template v-if="!$slots.buttons">
              <component :is="C('button')" :loading="isSubmitLoading" type="primary" @click="handlerSubmit">{{submitText}}</component>
              <component :is="C('button')" :loading="isSubmitLoading" v-show="!hideEmptyButton" @click="handlerEmpty">{{emptyText}}</component>
            </template>
            <slot :value="formModel" name="button-append"></slot>
            <span class="hc-form-switch" v-if="!!options.lineNumber" @click="isFormOpen = !isFormOpen">{{isFormOpen ? '收缩' : '展开'}}</span>
          </component>
        </component>
        <slot name="footer" :value="formModel" v-if="!isDetail && !inline"></slot>
        <component style="margin-bottom: 0px;" :style="inline ? ('float:' + inlineDir) : ''" :is="C('form-item')" v-show="!isDetail && !$slots.footer && !inline && !hideButtons">
          <slot name="buttons" :value="formModel"></slot>
          <template v-if="!$slots.buttons">
            <component :is="C('button')" :loading="isSubmitLoading" type="primary" @click="handlerSubmit">{{submitText}}</component>
            <component :is="C('button')" :loading="isSubmitLoading" v-show="!hideEmptyButton" @click="handlerEmpty">{{emptyText}}</component>
          </template>
          <slot :value="formModel" name="button-append"></slot>
        </component>
      </div>
    </component>
  </div>
</template>
<script>
// import Vue from 'vue'
import { C, libName } from './utils.js'
import selects from './components/selects/index'
import checkboxs from './components/checkboxs/index'
import radios from './components/radios/index'
import slider from './components/slider/index'
import transfer from './components/transfer/index'
import uploads from './components/uploads/index'
import editors from './components/editors/index'
import mapAddress from './components/mapAddress/index'
import multiItem from './components/multiItem/index'

export default {
  name: "v-form",
  components: { selects, checkboxs, radios, slider, transfer, uploads, editors, mapAddress, multiItem },
  props: {
    // comps: {
    //   type: Array,
    //   default() {
    //     return [{name: 'selects', comp: selects}]
    //   }
    // },
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    params: [Object, null],
    apiUrl: String,
    submit: Function,
    isFormOpenProp: Boolean
  },
  data() {
    let changeDataMap = (key) => {
      let tempObj = {};
      (this.options.columns || this.data || []).forEach(item => {
        tempObj[item.data] = item[key] || false;
      });
      if (key === 'hide') {
      }
      return tempObj;
    }
    return {
      editModel: this.value || {},
      cacheModel: JSON.parse(JSON.stringify(this.value || {})),
      tabsData: [],
      tabsActive: '',
      tabsArray: [],
      isFormOpen: !!this.isFormOpenProp,
      rulesDataMap: changeDataMap('loseRule'),
      hideDataMap: changeDataMap('hide'),
      isSubmitLoading: false
    };
  },
  provide() {
    return { edit: this.getEditModel };
  },
  computed: {
    rules() {
      const rules = this.columns.filter(item => {
        if (!this.rulesDataMap[item.data]) {
          return item.rules
        }
      });
      const rule = {};
      rules.forEach(item => {
        item.rules && (rule[item.data] = item.rules);
      });
      this.$refs.editForm && this.$refs.editForm.clearValidate && this.$refs.editForm.clearValidate();
      this.$refs.editForm && (this.$refs.editForm.fields || []).forEach((v) => {
        v.validateDisabled = true;
        v.validateState = '';
        v.validateMessage = '';
      })
      return rules.length > 0 ? rule : null;
    },
    submitText() {
      let tabIndex = this.tabsArray.findIndex(item => (item || {}).tab === this.tabsActive);
      if (this.isTabs && (tabIndex === this.tabsArray.length - 1)) {
        return this.options.submitText || '提交';
      } else if (this.isTabs && (tabIndex != this.tabsArray.length - 1)) {
        return '下一步';
      } else {
        return this.options.submitText || '提交';
      }
    },
    emptyText() {
      return this.options.emptyText || '清空';
    },
    comps() {
      return this.options.comps || [];
    },
    columns() {
      let columns = this.options.columns;
      let text = '请输入'
      columns.forEach(item => {
        if (item.type != 'input') {
          text = '请选择';
        } else {
          text = '请输入';
        };
        if (!(item.props || {}).placeholder) {
          if (item.props) {
            item.props.placeholder = (text + (item.title || ''))
          } else {
            item.props = {
              placeholder: (text + (item.title || ''))
            }
          }
        };
        if (item.fastRule) {
          item.rules = (this.getRulesByMap(item.fastRule, item.title)).concat(item.rules || []);
        }
      });
      return columns;
    },
    hideButtons() {
      return !!this.options.hideButtons;
    },
    hideEmptyButton() {
      return !!this.options.hideEmptyButton;
    },
    isTabs() {
      return !!this.options.isTabs;
    },
    isDetail() {
      return !!this.options.isDetail;
    },
    disabled() {
      return !!this.options.disabled || this.isSubmitLoading;
    },
    labelWidth() {
      return this.options.labelWidth || (this.libName() === 'element-ui' ? '100px' : 100);
    },
    inline() {
      return !!this.options.inline;
    },
    labelPosition() {
      return this.options.labelPosition || 'right';
    },
    formSize() {
      return this.options.size || '';
    },
    gutter() {
      return this.options.gutter || 0;
    },
    inlineDir() {
      if (this.options.inlineDir === 'left') {
        return '';
      } else {
        return this.options.inlineDir || 'right';
      }
    },
    formModel() {
      if (this.isDetail) {
        let model = {};
        for (const key in this.editModel) {
          if (this.editModel.hasOwnProperty(key)) {
            if (typeof this.editModel[key] === 'string') {
              model[key] = this.editModel[key] || '-'
            }
          }
        }
        this.columns.forEach(item => {
          if (item.type === 'input') {
            model[item.data] = this.editModel[item.data] || '-'
          } else {
            item.data && (model[item.data] = this.editModel[item.data]);
          }
        })
        return model;
      } else {
        return this.editModel;
      }
    },
    lineHeight() {
      if (this.options.lineNumber && !this.isFormOpen) {
        return ((this.options.lineNumber || 1) * 70) + 'px';
      } else {
        return 'auto'
      }
    }
  },
  watch: {
    value(model) {
      this.editModel = model || {};
    },
    editModel: {
      handler: function (model) {
        this.$emit('input', model);
      },
      deep: true,
    },
    'columns': {
      handler: function (val) {
        let tempObj = {};
        (val).forEach(item => {
          tempObj[item.data] = item['hide'] || false;
        });
        this.hideDataMap = tempObj
      },
      deep: true,
    }
  },
  mounted() {
    if (this.value) {
      let tempObj = {};
      this.columns.forEach(item => {
        if (item.value) {
          tempObj[item.data] = item.value;
        };
      })
      this.editModel = { ...tempObj, ...this.value };
    } else {
      this.initialize();
    }
    this.changeDataToTabs()
    // this.mountComponent()
  },
  created() {
    (this.comps).forEach(item => {
      window.Vue.component(item.name, item.comp);
    })
  },
  methods: {
    C, libName,
    handlerRenderItemClass({ props }) {
      let className = '';
      if (props && props.labelPosition === 'top') {
        className += ('hc-item-label-top')
      } else if (props && props.labelPosition === 'left') {
        className += ('hc-item-label-left hc-item-label-left' + `-${this.options.size || ''}`)
      } else if (props && props.labelPosition === 'right') {
        className += ('hc-item-label-right hc-item-label-right' + `-${this.options.size || ''}`)
      }
      return className;
    },
    getRulesByMap(map, title = '') {
      let inlayRulesMap = {
        required: { required: true, message: `${title}不能为空`, trigger: (this.options.trigger || 'blur') },
        phone: { pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: `${title}格式不正确`, trigger: (this.options.trigger || 'blur') },
        money: { pattern: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/, message: `${title}格式不正确`, trigger: (this.options.trigger || 'blur') },
        number: { pattern: /^[0-9]*$/, message: `${title}格式不正确`, trigger: (this.options.trigger || 'blur') },
        email: { pattern: /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/, message: `${title}格式不正确`, trigger: (this.options.trigger || 'blur') },
        url: { pattern: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/, message: `${title}格式不正确`, trigger: (this.options.trigger || 'blur') },
        discount: { pattern: /0\.[1-9]\d|1\.00/, message: `${title}格式不正确`, trigger: (this.options.trigger || 'blur') },
        integer: { pattern: /^\+?[1-9][0-9]*$/, message: `${title}必须是正整数`, trigger: (this.options.trigger || 'blur') },
      }
      if (!map) return [];
      if (typeof map === 'string') {
        return [inlayRulesMap[map]]
      } else if (map.length > 0) {
        let tempArr = [];
        map.forEach(item => {
          let rule = inlayRulesMap[item] || '';
          if (rule) { tempArr.push(rule) };
        })
        return tempArr;
      } else {
        return [];
      }
    },
    isHide(item) {
      return this.hideDataMap[item.data];
    },
    getHideDataMap() {
      return this.hideDataMap;
    },
    updateHideDataMap(data) {
      this.hideDataMap = data;
    },
    changeDataToTabs() {
      const data = this.columns;
      let newData = [];
      let index = -1;
      data.forEach((item, i) => {
        if (item.type === 'group') {
          index += 1;
          this.tabsArray.push({
            tab: item.title,
            index
          });
          newData.push({
            title: item.title,
            tabs: []
          });
        } else if (index != -1) {
          newData[index].tabs.push(item)
        }
      });
      this.tabsData = newData;
      this.tabsActive = (this.tabsArray[0] || {}).tab || '';
    },
    handlerTabsClick() {
    },
    async handlerSubmit() {
      let tabIndex = this.tabsArray.findIndex(item => (item || {}).tab === this.tabsActive);
      if (this.isTabs && tabIndex != this.tabsArray.length - 1) {
        this.tabsActive = (this.tabsArray[tabIndex + 1] || {}).tab;
      } else {
        const model = await this.getModel();
        if (model !== false) {
          const params = typeof this.options.packParameter === 'function' ? this.options.packParameter(model) : model
          this.isSubmitLoading = true;
          this.options.submit && this.options.submit(params, () => { this.isSubmitLoading = false; })
        }
      }
    },
    handlerEmpty() {
      if (this.options.handlerReset) {
        this.options.handlerReset(this.editModel);
      } else {
        this.editModel = JSON.parse(JSON.stringify(this.cacheModel));
      }
    },
    handlerResetForm() {
      // 重置model
      this.editModel = JSON.parse(JSON.stringify(this.cacheModel));
      // 重置校验
      this.$refs.editForm && this.$refs.editForm.clearValidate && this.$refs.editForm.clearValidate();
      this.$refs.editForm && (this.$refs.editForm.fields || []).forEach((v) => {
        v.validateDisabled = true;
        v.validateState = '';
        v.validateMessage = '';
      })
    },
    getEditModel() {
      return this.editModel;
    },
    disposeEvent(events, model, row, ruleMap, hideMap) {
      const obj = {}
      if (events) {
        Object.keys(events).forEach(key => {
          obj[key] = function (...args) {
            events[key]({
              model,
              row,
              ruleMap,
              hideMap
            }, ...args)
          }
        })
      }
      return obj
    },
    async validateForm() {
      return await this.$refs.editForm.validate();
    },
    filterHideModel() {
      let model = {};
      for (const key in this.editModel) {
        if (this.editModel.hasOwnProperty(key)) {
          if (!this.hideDataMap[key]) {
            model[key] = this.editModel[key]
          }
        }
      };
      return model;
    },
    async getModel() {
      try {
        if (this.rules) {
          const valid = await this.validateForm();
          if (!valid) {
            return false;
          } else {
            return this.filterHideModel();
          }
        } else {
          return this.filterHideModel();
        }
      } catch (error) {
        return false;
      }
    },
    initialize() {
      this.columns.forEach(item => {
        if (item.value) {
          this.editModel[item.data] = item.value;
        }
        if (item.slots) {
          item.slots.forEach(items => {
            this.editModel[items.data] = items.value;
          });
        }
      });
    },
    async initData(params) {
      this.initialize();
      const res = await request({
        url: this.apiUrl,
        params,
        method: "get"
      });
      const temp = Object.assign(this.editModel, res.data)
      this.editModel = JSON.parse(JSON.stringify(temp));
    }
  }
};
</script>
<style>
.hc-item-label-top .el-form-item__content {
  margin-left: auto !important;
}
.hc-item-label-left- .el-form-item__label {
  line-height: 40px !important;
  height: 40px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
}
.hc-item-label-left-small .el-form-item__label {
  line-height: 32px !important;
  height: 32px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
}
.hc-item-label-left-mini .el-form-item__label {
  line-height: 28px !important;
  height: 28px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
}
.hc-item-label-right .el-form-item__content {
  margin-left: 100px;
}
.hc-item-label-left .el-form-item__content {
  margin-left: 100px;
}
.hc-item-label-right .el-form-item__label {
  line-height: 40px !important;
  height: 40px;
  float: left;
  text-align: right;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hc-item-label-right-small .el-form-item__label {
  line-height: 32px !important;
  height: 32px;
  float: left;
  text-align: right;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hc-item-label-right-mini .el-form-item__label {
  line-height: 28px !important;
  height: 28px;
  float: left;
  text-align: right;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.edit-fields {
  overflow: hidden;
  /* height: 70px; */
  position: relative;
}
.edit-fields .form-hr {
  margin: 30px 0;
  margin-top: 5px;
  border: 0 none;
  border-top: 1px solid #eee;
}
.edit-fields .el-rate {
  height: 40px;
  display: flex;
  align-items: center;
}
.edit-fields .form-group-title {
  font-weight: bold;
  font-size: 16px;
}
.v-notice {
  position: absolute;
  top: 100%;
  left: 0;
  line-height: 1;
  padding-top: 6px;
  font-size: 12px;
  color: #a7a7a7;
}
.edit-fields .hc-form-switch {
  margin-left: 10px;
  color: #409eff;
  cursor: pointer;
}
.edit-fields .hc-form-switch:hover {
  text-decoration: underline;
}
.el-form--label-top .el-form-item__label {
  line-height: 20px;
  padding: 0px;
}

.edit-fields .hc-form-content {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
}

.edit-fields .hc-form-inline {
  display: inline-block;
  vertical-align: top;
}
.hc-form-detail .el-input-group__prepend,
.hc-form-detail .el-input-group__append {
  display: none;
}
.hc-form-detail .el-form-item {
  margin: 0px !important;
}
.hc-form-detail .el-input__inner,
.hc-form-detail .el-textarea__inner {
  border: none;
}
.hc-form-detail .el-input.is-disabled .el-input__inner,
.hc-form-detail .el-range-editor.is-disabled,
.hc-form-detail .el-range-editor.is-disabled input,
.hc-form-detail .el-textarea.is-disabled .el-textarea__inner {
  color: #606266;
  background-color: #fff;
}
.hc-form-detail .el-input__suffix,
.hc-form-detail .el-input__icon {
  display: none;
}
.hc-form-detail .el-input__inner {
  padding-left: 0px !important;
}
.hc-form-detail .el-range-input {
  width: 22% !important;
}
.hc-form-detail .el-range-separator {
  padding: 0px !important;
  color: #606266 !important;
}
.hc-form-detail .el-input-number__decrease,
.hc-form-detail .el-input-number__increase {
  display: none;
}
.hc-form-detail .el-input-number .el-input__inner {
  text-align: left;
}
.hc-form-detail .el-checkbox {
  display: none;
}
.hc-form-detail .el-checkbox .is-disabled.is-checked,
.hc-form-detail .el-checkbox.is-checked {
  display: inline-block;
  color: #606266;
}
.hc-form-detail .el-checkbox .el-checkbox__inner,
.hc-form-detail
  .el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  > .el-form-item__label:before,
.hc-form-detail
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before,
.hc-form-detail .el-input__suffix {
  display: none;
}
.hc-form-detail .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
}
.hc-form-detail .el-radio.is-disabled {
  display: none;
}
.hc-form-detail .el-radio.is-disabled.is-checked {
  display: inline-block;
}
.hc-form-detail .el-radio.is-disabled.is-checked .is-checked {
  display: none;
}
.hc-form-detail .el-radio.is-disabled.is-checked .el-radio__label {
  color: #606266;
}
.hc-form-detail .ivu-form-item-required .ivu-form-item-label:before,
.hc-form-detail .ivu-input-group-prepend,
.hc-form-detail .ivu-input-group-append {
  display: none;
}
.hc-form-detail .ivu-form-item {
  margin-bottom: 0px !important;
}
.hc-form-detail input,
.hc-form-detail textarea,
.hc-form-detail .ivu-select-selected-value,
.hc-form-detail .ivu-select,
.hc-form-detail .ivu-select-selection,
.hc-form-detail .ivu-input-number-disabled,
.hc-form-detail .ivu-input-group-append {
  background-color: #fff !important;
  border: none;
  color: #606266 !important;
}
.hc-form-detail .ivu-radio-wrapper-disabled,
.hc-form-detail .ivu-checkbox-wrapper-disabled {
  display: none;
}
.hc-form-detail .ivu-radio-wrapper-checked,
.hc-form-detail .ivu-checkbox-wrapper-checked {
  display: inline-block !important;
}
.hc-form-detail .ivu-radio-wrapper-checked .ivu-checkbox-disabled + span,
.hc-form-detail .ivu-checkbox-wrapper-checked .ivu-checkbox-disabled + span {
  color: #606266 !important;
}
.hc-form-detail .ivu-radio-wrapper-checked .ivu-radio-checked,
.hc-form-detail .ivu-checkbox-wrapper-checked .ivu-radio-checked,
.hc-form-detail .ivu-radio-wrapper-checked .ivu-checkbox,
.hc-form-detail .ivu-checkbox-wrapper-checked .ivu-checkbox {
  display: none;
}
.hc-form-detail .ivu-icon {
  display: none;
}
</style>
