### 用户登录
通过配置labelWidth=0px隐藏表单title，同时插入footer底部的自定义button
::: demo
```html
<div>
  <div>
    <el-card style="width: 400px;">
      <v-form :options="options" ref="form" v-model="model">
        <template slot="footer">
          <el-button @click="handlerLogin" type="success" style="width: 100%;">登录</el-button>
        </template>
      </v-form>
    </el-card>
  </div>
</div>

<script>
export default {
  data() {
    return {
      model: {},
      options: {
        labelWidth: '0px',
        columns: [
          {
            type: 'input',
            data: 'username',
            span: 24,
            props: {
              placeholder: '请输入用户名'
            },
            rules: [{
              required: true,
              message: "请输入用户名",
              trigger: "blur"
            }]
          },
          {
            type: 'input',
            data: 'password',
            span: 24,
            props: {
              placeholder: '请输入密码',
              type: 'password',
              showPassword: true
            },
            rules: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            }]
          },
        ]
      }

    }
  },
  methods: {
    handlerLogin() {
      this.$refs.form.validateForm().then(res => {
        if (res) {
          alert('登录成功');
        }
      })
    }
  }
}
</script>
```
:::