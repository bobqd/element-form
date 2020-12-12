<template>
  <div class="hc-map">
    <el-button @click="box=true" class="hc-map-submit">{{textTitle}}</el-button>
    <el-dialog fullscreen class="hc-map-dialog" width="100%" append-to-body modal-append-to-body :title="title" @close="handleClose" :visible.sync="box">
      <div class="hc-map-content" v-if="box">
        <el-input class="hc-map-content-input" id="map-input" size="small" :readonly="disabled" v-model="text" clearable placeholder="输入关键字选取地点"></el-input>
        <div class="hc-map-content-box">
          <div id="map-container" class="hc-map-content-container" tabindex="0"></div>
          <div id="map-result" class="hc-map-content-result"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-if="!disabled">
        <el-button type="primary" @click="handleSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MapAddress",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    lnglat: {
      type: Object,
      default: () => {
        return {};
      }
    },
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formatParams: {
      type: Function
    },
    formatLabel: {
      type: Function
    }
  },
  data() {
    return {
      poi: { formattedAddress: '' },
      marker: null,
      map: null,
      text: "",
      box: false
    };
  },
  watch: {
    box: {
      handler() {
        if (this.box) {
          this.$nextTick(() =>
            this.init(() => {
              if (this.isPR) {
                this.addMarker(this.R, this.P);
                this.getAddress(this.R, this.P);
              }
            })
          );
        }
      },
      immediate: true
    }
  },
  computed: {
    title() {
      return this.disabled ? "查看坐标" : '选择坐标'
    },
    isPR() {
      return this.R && this.P;
    },
    P() {
      return this.lnglat.P || 0;
    },
    R() {
      return this.lnglat.R || 0;
    },
    textTitle() {
      const { name, address, location, pname, cityname, adname } = this.value;
      if (this.formatLabel) {
        return this.formatLabel(this.value || {});
      } else if ((this.value || {}).formattedAddress) {
        return `${(this.value || {}).formattedAddress || ''}${(this.value || {}).longitude},${(this.value || {}).latitude}`;
      } else if (this.value.name) {
        return pname + cityname + adname + address + name + location.lng + location.lat;
      } else {
        return '选择地址';
      }
    }
  },
  methods: {
    //新增坐标
    addMarker(R, P) {
      this.clearMarker();
      this.marker = new window.AMap.Marker({
        position: [R, P]
      });
      this.marker.setMap(this.map);
    },
    //清空坐标
    clearMarker() {
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = null;
      }
    },
    //获取坐标
    getAddress(R, P) {
      new window.AMap.service("AMap.Geocoder", () => {
        let geocoder = new window.AMap.Geocoder({});
        geocoder.getAddress([R, P], (status, result) => {
          if (status === "complete" && result.info === "OK") {
            const regeocode = result.regeocode;
            this.poi = Object.assign(regeocode, {
              longitude: R,
              latitude: P
            });
            this.text = regeocode.formattedAddress;
            // 自定义点标记内容
            var markerContent = document.createElement("div");
            // 点标记中的图标
            var markerImg = document.createElement("img");
            markerImg.src =
              "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
            markerContent.appendChild(markerImg);
            // 点标记中的文本
            var markerSpan = document.createElement("span");
            markerSpan.className = "hc-map-marker";
            markerSpan.innerHTML = this.text;
            markerContent.appendChild(markerSpan);
            this.marker.setContent(markerContent);
          }
        });
      });
    },
    handleClose() {
      this.text = "";
      window.poiPicker.clearSearchResults();
      this.poi = {};
    },
    handleSubmit() {
      if (this.formatParams) {
        this.$emit("input", this.formatParams(this.poi));
      } else {
        this.$emit("input", this.poi);
      }
      this.poi = {};
      this.box = false;
    },
    addClick() {
      this.map.on("click", e => {
        const lnglat = e.lnglat;
        const P = lnglat.P;
        const R = lnglat.R;
        this.addMarker(R, P);
        this.getAddress(R, P);
      });
    },
    init(callback) {
      this.map = new window.AMap.Map("map-container", {
        zoom: 13,
        center: (() => {
          if (this.isPR) {
            return [this.R, this.P];
          }
        })()
      });
      this.initPoip();
      this.addClick();
      callback();
    },
    initPoip() {
      window.AMapUI.loadUI(["misc/PoiPicker"], PoiPicker => {
        var poiPicker = new PoiPicker({
          input: "map-input",
          placeSearchOptions: {
            map: this.map,
            pageSize: 10
          },
          searchResultsContainer: "map-result"
        });
        //初始化poiPicker
        this.poiPickerReady(poiPicker);
      });
    },
    poiPickerReady(poiPicker) {
      window.poiPicker = poiPicker;
      //选取了某个POI
      poiPicker.on("poiPicked", poiResult => {
        this.clearMarker();
        var source = poiResult.source,
          poi = poiResult.item;
        this.text = poi.name;
        this.poi = poi;
        if (source !== "search") {
          poiPicker.searchByKeyword(poi.name);
        }
      });
    }
  }
};
</script>

<style>
.amap-icon img,
.amap-marker-content img {
  width: 25px;
  height: 34px;
}
.hc-map-submit {
  width: 100%;
}
.hc-map-marker {
  position: absolute;
  top: -20px;
  right: -118px;
  color: #fff;
  padding: 4px 10px;
  box-shadow: 1px 1px 1px rgba(10, 10, 10, 0.2);
  white-space: nowrap;
  font-size: 12px;
  font-family: "";
  background-color: #25a5f7;
  border-radius: 3px;
}
.hc-map-content-input {
  margin-bottom: 10px;
}
.hc-map-content-box {
  position: relative;
}
.hc-map-content-container {
  width: 100%;
  height: 450px;
}
.hc-map-content-result {
  display: block !important;
  position: absolute;
  top: 0;
  right: -8px;
  width: 250px;
  height: 450px;
  overflow-y: auto;
}
.hc-map-dialog {
  z-index: 999999 !important;
}
</style>
