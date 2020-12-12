### 地图坐标选择器
基于高德地图开发，可以手动选择坐标也可以可以模糊搜索；使用前请确定引入了高德地图js包 http://webapi.amap.com/maps?v=1.4.11&key=你的key&plugin=AMap.PlaceSearch
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
        poi: {}
      },
      options: {
        submit: (mode, done) => {
          console.log(mode);
          setTimeout(() => {
            done();
          }, 2000)
        },
        columns: [{
          title: "门店地址",
          data: "poi",
          type: "map-address",
          span: 24,
          props: {
            formatParams(params) {
              if(params.latitude) {
                return { latitude: params.latitude, longitude: params.longitude }
              } else if(params.location) {
                return { latitude: params.location.lat, longitude: params.location.lng }
              } else {
                return {}
              }
            },
            formatLabel(params) {
              if(params.longitude) {
                return `${params.longitude},${params.latitude}`
              } else {
                return '请选择地址';
              }
            }
          }
        }]
      }

    }
  }
}
</script>
```
:::