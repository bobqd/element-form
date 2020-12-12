### 验证
form表单组件兼容iview组件库，element-ui组件库。
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
        radios: '1'
      },
      options: {
        columns: [
          {
            title: '选择',
            type: 'radios',
            data: 'radios',
            props: {
              options: [{label: '验证姓名', value: '1'}, {label: '不验证', value: '2'}]
            },
            events: {
              'on-change': (params, value) => {
                if (value === '验证姓名') {
                  params.ruleMap.name = false
                } else {
                  params.ruleMap.name = true
                }
              },
              'change': (params, value) => {
                if (value === '验证姓名') {
                  params.ruleMap.name = false
                } else {
                  params.ruleMap.name = true
                }
              }
            },
            row: true
          },
          {
            title: '姓名',
            type: 'input',
            data: 'name',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'sex',
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
    submit(m, d) {
      alert(JSON.stringify(m));
      d();
    }
  }
}
</script>
```
:::

### 自定义验证
form表单组件兼容iview组件库，element-ui组件库。
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
    var validatePass = (rule, value, callback)=>{
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback)=>  {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.model.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
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
            }]
          }, {
            title: '性别',
            type: 'input',
            data: 'sex',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }, {
            title: '密码',
            type: 'input',
            data: 'password',
            rules: [{ validator: validatePass, trigger: 'blur' }]
          }, {
            title: '确认密码',
            type: 'input',
            data: 'oldpassword',
            rules: [{ validator: validatePass2, trigger: 'blur' }]
          }
        ]
      }

    }
  },
  methods: {
    submit(m, d) {
      alert(JSON.stringify(m));
      d();
    }
  }
}
</script>
```
:::