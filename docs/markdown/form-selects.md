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
  label: '北京烤鸭',
  disabled: true
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
      model: {
        mselects: []
      },
      options: {
        submit: (e) => {
          console.log(e)
        },
        columns: [
          {
            title: '基础分组',
            type: 'selects',
            data: 'selects',
            props: {
              options
            },
            row: true
          }, 
          {
            title: '禁用',
            type: 'selects',
            data: 'selects',
            disabled: true,
            row: true
          },
          {
            title: '可清空单选',
            type: 'selects',
            data: 'selects',
            props: {
              selectAttr: {
                clearable: true
              },
              options
            },
            row: true
          },
          {
            title: '基础多选',
            type: 'selects',
            data: 'mselects',
            props: {
              selectAttr: {
                multiple: true
              },
              options
            }
          },
          {
            title: '基础多选2',
            type: 'selects',
            data: 'mselects',
            props: {
              selectAttr: {
                collapseTags: true,
                multiple: true
              },
              options
            }
          },
          {
            title: '自定义模板',
            type: 'selects',
            data: 'selects',
            props: {
              options,
              cSlots: [
              {
                style: {
                  float: 'left'
                },
                html: '{value}'
              },{
                style: {
                  float: 'right'
                },
                html: '-{label}-'
              }]
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