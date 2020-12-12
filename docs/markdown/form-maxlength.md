### 字符长度提示
右下角和右侧的字符长度提示
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
      model: {},
      options: {
        columns: [
          {
            title: '姓名',
            type: 'input',
            data: 'name',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }],
            props: {
              maxlength: 10,
              showWordLimit: true
            },
            row: true
          },
          {
            title: '姓名',
            type: 'input',
            data: 'name',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }],
            props: {
              type: 'textarea',
              maxlength: 10,
              showWordLimit: true
            },
            row: true
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