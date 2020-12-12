### 栏间距
通过span属性控制间隔
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
            span: 6
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
            span: 12
          },
        ]
      }

    }
  },
  methods: {
    
  }
}
</script>
```
:::