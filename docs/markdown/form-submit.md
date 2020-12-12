### 表单防重提交
提交后会禁止表单和按钮防止重复提交
::: demo
```html
<div>
  <div>
    <v-form :options="options" v-model="model" :submit="submit"></v-form>
  </div>
</div>

<script>
export default {
  data() {
    return {
      model: {},
      options: {
        submit: (m, d) => {
          this.submit(m, d)
        },
        columns: [
          {
            title: '姓名',
            type: 'input',
            data: 'name',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }
        ]
      }

    }
  },
  methods: {
    submit(m, d) {
      setTimeout(() => {
        d();
      }, 3000)
    }
  }
}
</script>
```
:::