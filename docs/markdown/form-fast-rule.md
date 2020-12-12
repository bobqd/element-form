### 内置验证规则
增加参数fastRule（数组），可选：required（必填）、phone（手机号）、money（金额）、number（数字）、email（邮箱）、url（网址）、discount（折扣）、integer（正整数）
::: demo
```html
<div>
  <div>
    <v-form :options="options" v-model="model"></v-form>
  </div>
</div>

<script>
export default {
  data() {
    return {
      model: {
        radios: '1'
      },
      options: {
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
    submit(m, d) {
      alert(JSON.stringify(m));
      d();
    }
  }
}
</script>
```
:::