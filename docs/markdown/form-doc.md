

### Attributes form表单属性说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| options | 组件配置属性，详情见下面Options属性 | Object| — | — |
| value/v-model | 表单绑定的数据 | Object| — | — |

### Options Attributes 参数说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| labelWidth | 表单的label宽度 | String | — | 100px |
| isTabs | 是否为选项卡模式（需要配合分组使用） | Boolean | — | false |
| inline | 是否行内显示 | Boolean | — | false |
| hideButtons | 是否隐藏按钮 | Boolean | — | false |
| labelPosition | 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width | String | right/left/top | right |
| isDetail | 是否是详情模式 | Boolean | — | false |
| disabled | 表单禁用 | Boolean | — | false |
| size | 表单尺寸 | String | — | medium |
| packParameter | 对返回的表单数据进行一层包装，使其达到符合提交数据的标准 | Function | — | — |
| submitText | 提交按钮的文字 | String | — | 提交 |
| emptyText | 清空按钮的文字 | String | — | 清空 |
| columns | form表单配置，详情见下面columns属性 | Object| — | — |
| submit | 点击提交按钮执行的方法，参数1是返回的表单数据，参数2为函数，执行可以重新编辑表单 | Function| — | — |
| handlerReset | 点击清空按钮返回执行的方法，返回表单绑定的数据 | Function| — | — |
| lineNumber | 在行内表单布局模式下显示的行数 | Number | — | — |
| comps | 传入的自定义组件。示例：comps: [{name: 'c-table', comp: () => import("@component/cTable.vue") }] | Array | — | — |



### columns Attributes 参数说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 表单的标题列字段 | String | — | — |
| data | 表单的绑定的参数 | String | — | — |
| type | 表单的组件名称（参考elementui和iview文档），可以是自定义组件（自定义组件名称前缀必须加c-） | String | — | — |
| props | 表单组件的参数 | Object | — | — |
| event | 表单组件的事件 | Function | — | — |
| span | 栅格的占位格数，可选值为0~24的整数，为 0 时，相当于display:none | Object | — | 6 |
| row | 是否一行显示 | Boolean | — | false |
| rules |  表单验证规则（参考elementui和iview文档） | Boolean | — | false |
| fastRule | 快速使用form表单内置组件 | Array | required（必填）、phone（手机号）、money（金额）、number（数字）、email（邮箱）、url（网址）、discount（折扣）、integer（正整数） | — |

### columns props Attributes 参数说明
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| options | 对应下拉选择，单选多选的option | Array、[]Function、[]Promise | — | — |

### ScopedSlot 参数说明
| 参数      | 说明    |
|---------- |-------- |
| footer | 自定义底部插槽，不会受表单元素影响，详情可以参考：[登录示例](http://192.172.9.138/tiger_form/#/form-login) |
| buttons | 自定义底部按钮插槽 |
| button-append | 自定义增加按钮插槽，用于补充按钮 |