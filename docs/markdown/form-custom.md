### 引入三方任意组件
为了区别是element组件还是iview组件，引入第三方组件请用c-开头。c-开头form表单默认使用自定义组件，如果是全局组件，可以直接使用。如果是局部组件，在options传入自定义的组件。options.comps = [{name: 组件名称, comp: 组件实例}]
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
        componentVal: new Date()
      },
      options: {
        columns: [
          {
            title: '自定义组件',
            data: 'componentVal',
            type: 'c-component',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "change"
            }]
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

### 插槽形式使用自定义组件
::: demo
```html
<div>
  <div>
    <v-form :options="options" v-model="model">
      <template #slotName>
        <div>
          <el-input v-model="model.input"></el-input>
        </div>
      </template>
    </v-form>
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
}]

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
        columns: [
          {
            title: '实心多选',
            data: 'checkboxs',
            type: 'checkboxs',
            props: {
              options: () => {
                return new Promise((res,rej) => {
                  setTimeout(() => {
                    res(options)
                  }, 1000)
                })
              },
              checkboxItem: 'checkbox-button'
            },
            span: 24
          },
          {
            title: '实心多选',
            slotName: 'slotName',
            span: 12,
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