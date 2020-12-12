### 动态的显示隐藏
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
      model: {
        radios: "显示"
      },
      options: {
        columns: [
          {
            title: '内容1',
            data: 'radios',
            type: 'radios',
            props: {
              options: [{value: '显示', label: '显示'}, {value: '隐藏', label: '隐藏'}]
            },
            events: {
              change: (m, v) =>{
                console.log(m, v)
                m.hideMap.data = (v === '隐藏');
              },
              'on-change': (m, v) =>{
                console.log(m, v)
                m.hideMap.data = (v === '隐藏');
              }
            }
          },
          {
            title: '内容2',
            data: 'data',
            type: 'input',
            hide: false
          }
        ]
      }

    }
  },
  methods: {
    submit(m, d) {
      console.log(m)
      setTimeout(() => {
        d();
      }, 3000)
    }
  }
}
</script>
```
:::