### 滑块
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
      },
      options: {
        submit: (mode, done) => {
          console.log(mode);
          alert(JSON.stringify(mode))
          setTimeout(() => {
            done();
          }, 2000)
        },
        columns: [{
          title: '滑块',
          data: 'slider',
          type: 'slider',
          span: 16
        }, {
          title: '滑块2',
          data: 'slider2',
          type: 'slider',
          span: 16,
          props: {
            showInput: true
          }
        }, {
          title: '滑块3',
          data: 'slider3',
          type: 'slider',
          span: 16,
          props: {
            range: true,
            max: 10
          }
        }]
      }

    }
  },
  methods: {
  }
}
</script>
```
:::