### 引入

```js
import Vue from 'vue';
import { Form } from '@tiger/form';

Vue.use(Form);
```


### 用法总览
form表单组件兼容iview组件库，element-ui组件库。
::: demo
```html
<div>
  <div style="padding-bottom: 20px;">
    <Button type="info" @click="handlerChange">tabs</Button>
    <Button type="info" @click="handlerDetails">详情</Button>
    <Button type="info" @click="handlerDisabled">禁用</Button>
    <Button type="info" @click="handlerChangeLib">切换基础组件</Button>
    <Button type="info" @click="handlerReset">清空</Button>
    当前基础组件：{{lib}}
  </div>
  <v-form v-if="show" ref="form" v-model="model" :options="options">
    <template slot="button-append">
      <el-button>自定义按钮1</el-button>
      <el-button>自定义按钮2</el-button>
    </template>
  </v-form>
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
let tree = [{
  value: 'beijing',
  label: '北京',
  children: [
      {
          value: 'gugong',
          label: '故宫'
      },
      {
          value: 'tiantan',
          label: '天坛'
      },
      {
          value: 'wangfujing',
          label: '王府井'
      }
  ]
}, {
  value: 'jiangsu',
  label: '江苏',
  children: [
      {
          value: 'nanjing',
          label: '南京',
          children: [
              {
                  value: 'fuzimiao',
                  label: '夫子庙',
              }
          ]
      },
      {
          value: 'suzhou',
          label: '苏州',
          children: [
              {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
              },
              {
                  value: 'shizilin',
                  label: '狮子林',
              }
          ]
      }
  ],
}]
export default {
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${ i }`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    const currentFileList = [{
      uid: 1,
      status: 'done',
      name: '我是文件名称',
      url: 'http://cdn.tsbeer.com/hucais/picture/product/857022032888534016.png'
    }]
    const currentFileLists = [{
      uid: 1,
      status: 'done',
      name: '我是文件名称1',
      url: 'http://cdn.tsbeer.com/hucais/picture/product/857022032888534016.png'
    }, {
      uid: 2,
      status: 'done',
      name: '我是文件名称2',
      url: 'http://cdn.tsbeer.com/hucais/picture/product/857022032888534016.png'
    }, {
      uid: 3,
      status: 'done',
      name: '我是文件名称3',
      url: 'http://cdn.tsbeer.com/hucais/picture/product/857022032888534016.png'
    }]
    return {
      show: true,
      model: {
        inputVal: '7天原浆',
        webSite: 'm.tsbeer',
        selectVal: '选项1',
        date: '2020-06-12',
        daterange: ['2016-01-01', '2016-02-15'],
        colorPicker: '#19be6b',
        number: 1,
        rate: 5,
        checkboxV: ['双皮奶', '蚵仔煎'],
        radioV: '北京烤鸭',
        switch: true,
        slider: 40,
        cascader: ['jiangsu', 'suzhou', 'shizilin'],
        transfer: [1, 4],
        autoComplete: 111,
        appName: '7天原浆',
        img: currentFileList,
        imgs: currentFileLists
      },
      lib: 'element-ui',
      options: {
        columns: [
          {
            type: "group",
            title: '分组名称1'
          },
          {
            title: '头像',
            data: 'img',
            type: 'uploads',
            props: {
              action: 'https://avuejs.com/imgupload',
              fileList: currentFileList,
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
            title: '照片墙',
            data: 'imgs',
            type: 'uploads',
            props: {
              action: 'https://avuejs.com/imgupload',
              fileList: currentFileLists,
              limit: 5,
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
            title: "产品名称",
            data: "inputVal",
            type: "input",
            rules: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
            props: {
              placeholder: "请输入产品名称"
            }
          },
          {
            title: '网址',
            data: 'webSite',
            type: "input",
            rules: [{ required: true, message: "请输入网址", trigger: "blur" }],
            props: {
              placeholder: "请输入网址"
            },
            slots: [
              {
                name: 'prepend',
                html: 'http://'
              },
              {
                name: 'append',
                html: '.com'
              }
            ]
          },
          {
            title: "产品名称",
            data: "selectVal",
            type: "selects",
            rules: [{ required: true, message: "请选择产品名称", trigger: "change" }],
            props: {
              options
            }
          },
          {
            title: '计数器',
            type: 'input-number',
            data: 'number',
            props: {
              max: 10,
              min: 1
            }
          },
          {
            title: "日期",
            data: "date",
            type: "date-picker",
            props: {
              valueFormat: 'yyyy-MM-dd',
              placeholder: "请选择日期"
            }
          },
          {
            title: "日期范围",
            data: "daterange",
            type: "date-picker",
            props: {
              rangeSeparator: "至",
              startPlaceholder: "开始日期",
              endPlaceholder: "结束日期",
              type: 'daterange',
              placeholder: "请选择日期"
            }
          },
          {
            title: '评分',
            type: 'rate',
            data: 'rate',
            props: {
              showText: true
            },
            span: 24
          },
          {
            title: '多选组',
            data: 'checkboxV',
            type: 'checkboxs',
            props: {
              options
            },
            span: 24
          },
          {
            title: '单选组',
            data: 'radioV',
            type: 'radios',
            props: {
              options
            },
            span: 24
          },
          {
            title: '开关',
            data: 'switch',
            type: 'switch',
            props: {
              size: 'large',
            },
            slots: [
              {
                type: 'span',
                name: 'open',
                html: '开'
              },
              {
                type: 'span',
                name: 'close',
                html: '关'
              }
            ]
          },
          {
            title: '开关2',
            data: 'switch',
            type: 'switch',
            props: {
              size: 'large',
              activeText: '按月付费',
              inactiveText: '按年付费',
              activeColor: "#13ce66",
              inactiveColor: "#ff4949"
            },
            slots: [
              {
                type: 'span',
                name: 'open',
                html: '开'
              },
              {
                type: 'span',
                name: 'close',
                html: '关'
              }
            ]
          },
          {
            title: '滑块',
            data: 'slider',
            type: 'slider',
            span: 24
          },
          {
            title: '自动完成',
            data: 'autoComplete',
            type: 'auto-complete',
            props: {
              data: [],
              placeholder: '仅iview有用'
            },
            events: {
              'on-search': (params, value) => {
                params.row.props.data = !value ? [] : [
                  value,
                  value + value,
                  value + value + value
                ];
              }
            }
          },
          {
            title: '级联选择',
            type: 'cascader',
            data: 'cascader',
            props: {
              options: tree,
              data: tree
            }
          },
          {
            title: '穿梭框',
            type: 'transfer',
            data: 'transfer',
            props: {
              data: generateData(),
              targetKeys: [1,4]
            },
            events: {
              'on-change': (params, newTargetKeys, direction, moveKeys) => {
                params.row.props.targetKeys = newTargetKeys;
              }
            },
            span: 24
          },
          {
            title: "产品名称",
            data: "appName",
            type: "input",
            props: {
              placeholder: "请输入产品名称",
              type: 'textarea'
            }
          },
          {
            type: "group",
            title: '分组名称2'
          },
          {
            title: "产品名称",
            data: "appName",
            type: "input",
            props: {
              placeholder: "请输入产品名称"
            }
          },
          {
            type: "group",
            title: '分组名称3'
          },
          {
            title: "产品名称",
            data: "appName",
            type: "input",
            props: {
              placeholder: "请输入产品名称"
            }
          }
        ],
        isTabs: false,
        isDetail: false,
        disabled: false,
        submit: (model, done) => {
          this.submit(model, done);
        },
        // handlerReset: (model) => {
        //   this.model = {}
        // },
        packParameter(params) {
          let data = JSON.parse(JSON.stringify(params || {}));
          data.startDate =  params.daterange && params.daterange[0];
          data.endDate =  params.daterange && params.daterange[1];
          return data;
        }
      },
    };
  },
  mounted() {
  },
  methods: {
    handlerReset() {
      this.$refs['form'].handlerResetForm();
    },
    handlerChangeLib() {
      if (window.componentLib === 'element-ui') {
        window.componentLib = 'iview';
        this.lib = 'iview';
      } else if (window.componentLib === 'iview') {
        this.lib = 'element-ui';
        window.componentLib = 'element-ui';
      } else {
        window.componentLib = 'iview';
        this.lib = 'iview';
      }
      this.show = false;
      setTimeout(() => { this.show = true; }, 100);
    },
    handlerChange() {
      this.options.isTabs = !this.options.isTabs;
    },
    handlerDetails() {
      this.options.isDetail = !this.options.isDetail;
    },
    handlerDisabled() {
      this.options.disabled = !this.options.disabled;
    },
    handlerEmpty() {
      this.model = {};
    },
    submit(model, done) {
      console.log(model);
      setTimeout(() => {
        done();
      }, 3000)
    }
  }
};
</script>
```
:::