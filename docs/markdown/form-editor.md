### 富文本编辑器
form表单组件引入了第三方插件wangEditor（https://www.kancloud.cn/wangfupeng/wangeditor3/332599），参数可以通过customConfig进行更改或者增加。
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
        appName: '<p>富文本编辑器</p>'
      },
      options: {
        submit: (mode, done) => {
          console.log(mode);
          setTimeout(() => {
            done();
          }, 2000)
        },
        columns: [{
          title: "产品名称",
          data: "appName",
          type: "editors",
          span: 24,
          disabled: false,
          props: {
            customConfig: {
              uploadImgServer: '/zuul/opc/admin/file/uploadPictureWithWangEditor'
            }
          }
        }]
      }

    }
  },
  methods: {
    handlerFillData() {
      this.model = { appName: '<h1><span style="font-weight: bold; text-decoration-line: line-through; color: rgb(194, 79, 74);">大军</span></h1>' }
    }
  }
}
</script>
```
:::