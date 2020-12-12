### 编辑和详情之间的切换
::: demo
```html
<div>
  <div>
    <Button @click="options.isDetail = !options.isDetail">详情</Button>
    <v-form :options="options" v-model="model" :submit="submit"></v-form>
  </div>
</div>

<script>
const options = [{
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
        name: '测试',
        select:  '选项1',
        selectsV: ['选项1', '选项4']
      },
      options: {
        isDetail: false,
        columns: [
          {
            title: '头像',
            data: 'img',
            type: 'uploads',
            props: {
              action: 'https://avuejs.com/imgupload',
              fileList: [{
                name: '我是文件名称',
                url: 'http://cdn.tsbeer.com/hucais/picture/product/857022032888534016.png'
              }],
              limit: 1,
              beforeUpload(file, a) {
                console.log(file)
              },
              onSuccess: (res, file, list, value) => {
                console.log(this.model)
              }
            },
            span: 24,
          },
          {
            title: '姓名',
            type: 'input',
            data: 'name',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }],
            props: {
              maxlength: 10,
              showWordLimit: true
            },
          },
          {
            title: "产品名称",
            data: "select",
            type: "selects",
            rules: [{ required: true, message: "请选择产品名称", trigger: "change" }],
            props: {
              options
            }
          },
          {
            title: '多选',
            type: 'selects',
            data: 'selectsV',
            props: {
              selectAttr: {
                multiple: true,
              },
              options
            }
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

