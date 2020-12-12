### 数组输入框
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
          setTimeout(() => {
            done();
          }, 2000)
        },
        columns: [{
          title: '用户名',
          type: 'multiItem',
          data: 'multiItem',
        }, {
          title: '用户名2',
          type: 'multiItem',
          data: 'multiItem2',
          props: {
            keyMap: ['label']
          }
        }, {
          title: '用户名3',
          type: 'multiItem',
          data: 'multiItem3',
          props: {
            keyMap: ['label', 'value', 'key']
          }
        }]
      }

    }
  }
}
</script>
```
:::