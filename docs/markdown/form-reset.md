### 重置表单
重置表单数据和校验提示，通过调用表单组件的方法实现：handlerResetForm()
::: demo
```html
<div>
  <div>
    <el-button @click="handlerResetForm" style="margin-bottom: 10px;">重置表单和校验</el-button>
    <v-form :options="options" ref="form" v-model="model"></v-form>
  </div>
</div>

<script>
export default {
  data() {
    return {
      model: {
      },
      options: {
        hideButtons: true,
        columns: [
          {
            title: '必填',
            type: 'input',
            data: 'required',
            fastRule: ['required']
          }, {
            title: '手机',
            type: 'input',
            data: 'phone',
            fastRule: ['phone', 'required']
          }, {
            title: '金额',
            type: 'input',
            data: 'money',
            fastRule: ['required', 'money']
          }, {
            title: '数字',
            type: 'input',
            data: 'number',
            fastRule: ['required', 'number']
          }, {
            title: '邮箱',
            type: 'input',
            data: 'email',
            fastRule: ['required', 'email']
          }, {
            title: '网址',
            type: 'input',
            data: 'url',
            fastRule: ['required', 'url']
          }, {
            title: '折扣',
            type: 'input',
            data: 'discount',
            fastRule: ['required', 'discount']
          }, {
            title: '正整数',
            type: 'input',
            data: 'integer',
            fastRule: ['required', 'integer']
          }
        ]
      }

    }
  },
  methods: {
    handlerResetForm() {
      this.$refs.form.handlerResetForm();
    }
  }
}
</script>
```
:::