### 日期
::: demo
```html
<div>
  <div>
    <v-form :options="options"></v-form>
  </div>
</div>

<script>
export default {
  data() {
    return {
      model: {},
      options: {
        columns: [
          {
            title: '日期',
            type: 'date-picker',
            data: 'date',
            props: {
              editable: false,
            }
          }, {
            title: '年份',
            type: 'date-picker',
            data: 'date-picker',
            props: {
              type: 'year',
            }
          }, {
            title: '月份',
            type: 'date-picker',
            data: 'date-picker',
            props: {
              type: 'month',
            }
          }, {
            title: '多个时间',
            type: 'date-picker',
            data: 'date-picker',
            props: {
              type: 'dates',
            }
          }, {
            title: '周',
            type: 'date-picker',
            data: 'date-picker',
            props: {
              type: 'week',
            }
          }, {
            title: '日期时间',
            type: 'date-picker',
            data: 'date-picker',
            props: {
              type: 'datetime',
            }
          }, {
            title: '日期时间范围',
            type: 'date-picker',
            data: 'date-picker',
            props: {
              type: 'datetimerange',
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间"
            }
          }, {
            title: '日期范围',
            type: 'date-picker',
            data: 'date-picker',
            props: {
              type: 'daterange',
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间"
            }
          }, {
            title: '月范围',
            type: 'date-picker',
            data: 'date-picker',
            props: {
              type: 'monthrange',
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间"
            }
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