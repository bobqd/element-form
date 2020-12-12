### 基础
::: demo
```html
<div>
  <div>
    <v-form :options="options" v-model="model">
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
        submit: (mode, done) => {
          console.log(mode);
          alert(JSON.stringify(mode))
          setTimeout(() => {
            done();
          }, 2000)
        },
        columns: [{
          title: '用户名',
          type: 'selects',
          data: 'username',
          props: {
              options: () => {
                return new Promise((res, rej) => {
                    setTimeout(() => {
                        res([{
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
                        }])
                    }, 1000)
                })
              }
          },
          message: '异步获取搜索内容'
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

### 远程搜索
::: demo
```html
<div>
  <div>
    <v-form :options="options" v-model="model">
    </v-form>
  </div>
</div>

<script>
export default {
  data() {
    return {
        states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"],
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
        columns: [{
          title: '用户名',
          type: 'selects',
          data: 'username',
          props: {
              options: () => {
                return new Promise((res, rej) => {
                    setTimeout(() => {
                        res([{
                            value: '选项1',
                            label: '黄金糕'
                            }, {
                            value: '选项2',
                            label: '双皮奶'
                            }
                        ])
                    }, 1000)
                })
              },
                filterable: true,
                remote: true,
                "reserve-keyword": true,
                "remote-method": (query, options) => {
                    if(!query) return []
                    return new Promise((res, rej) => {
                        setTimeout(() => {
                            res(this.list.filter(item => {
                                return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                            }));
                        }, 3000)
                    })
                }
          },
          message: '请输入你要搜索的内容'
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
  },
  mounted() {
      this.list = this.states.map(item => {
        return { value: `${item}`, label: `${item}` };
      });
  }
}
</script>
```
:::