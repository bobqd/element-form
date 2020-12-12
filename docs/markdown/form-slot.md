### 表单防重提交
提交后会禁止表单和按钮防止重复提交
::: demo
```html
<div>
  <div>
    <custom-test />
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
            type: 'button',
            data: 'name'
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