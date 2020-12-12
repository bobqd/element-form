### 组件事件
事件回调请看控制台
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
            events: {
              change: (m, v) => {
                this.log('change', m, v)
              },
              blur: (m, v, b) => {
                this.log('change', m, v)
              },
              input: (m, v, b) => {
                this.log('change', m, v)
              },
            }
          }
        ]
      },

    }
  },
  methods: {
    log(e, m, v) {
      console.log(`%c ${e}: `, 'background: #40BA82; color:#242424;', m, v)
    },
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