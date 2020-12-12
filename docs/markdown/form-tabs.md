### 切换
::: demo
```html
<div>
  <div>
    <v-form :options="options" v-model="model">
      <template slot="button-append">
        <el-button @click="handlerFillData">填充数据</el-button>
      </template>
    </v-form>
  </div>
</div>

<script>
export default {
  data() {
    return {
      model: {
      },
      options: {
        isTabs: true,
        submit: (mode, done) => {
          console.log(mode);
          alert(JSON.stringify(mode))
          setTimeout(() => {
            done();
          }, 2000)
        },
        columns: [
        {
            type: "group",
            title: '分组名称1'
        }, {
          title: '用户名',
          type: 'input',
          data: 'username'
        }, {
          title: '姓名',
          type: 'input',
          data: 'name',
        }, {
          title: '类型',
          type: 'selects',
          data: 'type',
          props: {
            options: [{
              label: '真',
              value: 'true'
            }, {
              label: '假',
              value: 'false'
            }]
          }
        }, 
        {
          type: "group",
          title: '分组名称2'
        },
        {
          title: '权限',
          type: 'radios',
          data: 'grade',
          props: {
            options: [{
              label: '真',
              value: 'true'
            }, {
              label: '假',
              value: 'false'
            }]
          }
        }, {
          title: '开关',
          type: 'switch',
          data: 'switch',
        }, {
          title: "日期",
          data: "date",
          type: "date-picker",
          props: {
            valueFormat: 'yyyy-MM-dd',
            placeholder: "请选择日期"
          }
        }, {
          title: "价格",
          data: "price",
          type: "input",
          slots: [
            {
              name: 'append',
              html: '元'
            }
          ]
        }, {
          title: "产品名称",
          data: "appName",
          type: "input",
          props: {
            type: 'textarea'
          },
          span: 20
        }, {
          title: "产品名称",
          data: "appName",
          type: "editors",
        }]
      }

    }
  },
  methods: {
    handlerFillData() {
      this.model = {
        username: '大军',
        name: '大军',
        type: 'true',
        grade: 'true',
        switch: true,
        date: '2020-06-12',
        price: 199.32,
        appName: '大军'
      }
    }
  }
}
</script>
```
:::