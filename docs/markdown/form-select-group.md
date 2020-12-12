### 表单选择框分组
::: demo
```html
<div>
  <div>
    <v-form :options="options"></v-form>
  </div>
</div>

<script>
let options = [{
  value: '选项1',
  label: '黄金糕'
}, {
  value: '选项2',
  label: '双皮奶'
}, {
  value: '选项3',
  label: '蚵仔煎'
}, {
  value: '选项4',
  label: '龙须面'
}, {
  value: '选项5',
  label: '北京烤鸭'
}];
let optionsGroup = [{
  label: '热门城市',
  options: [{
    value: 'Shanghai',
    label: '上海'
  }, {
    value: 'Beijing',
    label: '北京'
  }]
}, {
  label: '城市名',
  options: [{
    value: 'Chengdu',
    label: '成都'
  }, {
    value: 'Shenzhen',
    label: '深圳'
  }, {
    value: 'Guangzhou',
    label: '广州'
  }, {
    value: 'Dalian',
    label: '大连'
  }]
}];
export default {
  data() {
    return {
      model: {},
      options: {
        submit: (e) => {
          console.log(e)
        },
        columns: [
          {
            title: '分组',
            type: 'selects',
            data: 'selects',
            props: {
              type: 'group',
              options: optionsGroup
            }
          }
        ]
      }
    }
  }
}
</script>
```
:::