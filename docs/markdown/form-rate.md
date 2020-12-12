### 评分
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
        columns: [{
          title: '评分',
          type: 'rate',
          data: 'rate',
          span: 24
        }, {
          title: '评分2',
          type: 'rate',
          data: 'rate2',
          span: 24,
          props: {
            allowHalf: true,
            showScore: true,
            textColor: "#ff9900",
            scoreTemplate: "{value}"
          }
        }, {
          title: '评分3',
          type: 'rate',
          data: 'rate3',
          span: 24,
          props: {
            showText: true
          }
        }]
      }
    }
  },
  methods: {
    handlerFillData() {
      this.model = {
      }
    }
  }
}
</script>
```
:::