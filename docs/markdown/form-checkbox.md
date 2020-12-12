### 表单单选多选类型
::: demo
```html
<div>
  <div>
    <v-form :options="options" v-model="model">
      <template #test>
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
        columns: [
          {
            title: '实心单选',
            data: 'radios',
            type: 'radios',
            props: {
              options,
              radioItem: 'button',
              groupAttr: {
                type: 'button'
              }
            },
            span: 24
          },
          {
            title: '空心单选',
            data: 'radios',
            type: 'radios',
            props: {
              options,
              radioAttr: {
                border: true
              }
            },
            span: 24
          },
          {
            title: '实心多选',
            data: 'checkboxs',
            type: 'checkboxs',
            props: {
              options,
              checkboxItem: 'checkbox-button'
            },
            span: 24
          },
          {
            title: '空心多选',
            data: 'checkboxs',
            type: 'checkboxs',
            props: {
              options,
              checkboxAttrs: {
                border: true
              }
            },
            span: 24
          },
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


### 表单单选多选类型(动态加载数据)
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
            title: '实心单选',
            data: 'radios',
            type: 'radios',
            props: {
              options: () => {
                return options
              },
              radioItem: 'button',
              groupAttr: {
                type: 'button'
              }
            },
            span: 24
          },
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
