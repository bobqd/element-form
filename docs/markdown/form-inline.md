### 行内的表单域
设置 inline 属性可以让表单域变为行内的表单域
::: demo
```html
<div>
  <div>
    <v-form ref="form" :options="options"></v-form>
  </div>
</div>

<script>
export default {
  data() {
    return {
      options: {
        inline: true,
        inlineDir: 'right',
        columns: [
          {
            title: '姓名',
            type: 'input',
            data: 'name1',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }
        ]
      }

    }
  }
}
</script>
```
:::


### 行内的表单域
设置 lineNumber 表单展示的行数
::: demo
```html
<div>
  <div>
    <v-form ref="form" :options="options"></v-form>
  </div>
</div>

<script>
export default {
  data() {
    return {
      options: {
        inline: true,
        lineNumber: 2,
        inlineDir: 'right',
        columns: [
          {
            title: '姓名',
            type: 'input',
            data: 'name1',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }, {
            title: '姓名',
            type: 'input',
            data: 'name1',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }, {
            title: '姓名',
            type: 'input',
            data: 'name1',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }, {
            title: '姓名',
            type: 'input',
            data: 'name1',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          },{
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          },{
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          },{
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name2',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }
        ]
      }

    }
  }
}
</script>
```
:::


### 行内的表单域
自定义按钮控制多余的表单显示和隐藏
::: demo
```html
<div>
  <div>
    <v-form ref="form" :options="options" v-model="model">
      <template slot="button-append">
        <el-button @click="handlerOpen">{{isOpen ? '收起' : '展开'}}</el-button>
      </template>
    </v-form>
  </div>
</div>

<script>
export default {
  data() {
    return {
      isOpen: false,
      model: {
        radios: '验证姓名'
      },
      options: {
        inline: true,
        inlineDir: 'left',
        columns: [
          {
            title: '姓名',
            type: 'input',
            data: 'name1',
            hide: true,
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name2',
            hide: true,
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          },
          {
            title: '姓名',
            type: 'input',
            data: 'name3',
            hide: true,
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          },
          {
            title: '姓名',
            type: 'input',
            data: 'name4',
            hide: true,
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name5',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'name6',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }
        ]
      }

    }
  },
  methods: {
    handlerOpen() {
      this.isOpen = !this.isOpen;
      let data = this.$refs.form.getHideDataMap();
      data.name1 = !this.isOpen;
      data.name2 = !this.isOpen;
      data.name3 = !this.isOpen;
      data.name4 = !this.isOpen;
    },
    submit(m, d) {
      alert(JSON.stringify(m));
      d();
    }
  }
}
</script>
```
:::
