<template>
  <div class="hc-form-upload" :class="{'hc-upload-limit': isLimit, 'hc-upload-disabled' : disabled}">
    <div v-if="libName() === 'iview'" class="hc-form-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="hc-form-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handlerPreview(item)"></Icon>
          <Icon v-if="!disabled" type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
    <component :is="C('upload')" ref="form-upload" :class="libName() === 'iview' ? 'hc-iv-upload' : ''" v-bind="{ listType: 'picture-card', ...$attrs}" v-model="uploadList" :on-preview="handlerPreview" :before-upload="handleBeforeUpload" :on-success="handlerSuccess" :on-remove="handleRemove" :default-file-list="uploadList">
      <template v-if="libName() === 'iview'">
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </template>
      <i v-if="$attrs.listType === 'picture-card' || !$attrs.listType" class="el-icon-plus"></i>
    </component>
    <component :is="C('dialog')" :title="'图片预览'" v-model="visible" :visible.sync="visible">
      <img :src="imgSrc" v-if="visible" style="width: 100%">
    </component>
  </div>
</template>

<script>
import { C, libName } from '../../utils.js'
function getBase64(file, callback) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback && callback(reader)
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}
export default {
  props: {
    value: {},
    disabled: {}
  },
  data() {
    return {
      uploadList: this.value || [],
      visible: false,
      iviewFileUrl: '',
      imgSrc: ''
    }
  },
  watch: {
    ['$attrs.defaultFileList'](list) {
      this.uploadList = list;
    },
    value(val) {
      this.uploadList = val || [];
      if (this.uploadList.length <= 0) {
        (typeof this.$refs['form-upload'].clearFiles === 'function') && this.$refs['form-upload'].clearFiles();
      }
    },
    uploadList(val) {
      this.$emit('input', val)
    }
  },
  computed: {
    isLimit() {
      if ((!!this.$attrs.limit && this.$attrs.limit <= this.uploadList.length) || this.disabled) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    C, libName,
    handlerPreview(file) {
      if (typeof this.$attrs.handlerPreview === 'function') {
        this.$attrs.handlerPreview(file, uploadList);
      } else {
        this.imgSrc = file.url;
        this.visible = true;
      }
    },
    handleBeforeUpload(file) {
      getBase64(file, (r) => {
        this.iviewFileUrl = r.result;
      })
    },
    handlerSuccess(res, file, list) {
      if (this.libName() === 'iview') {
        this.uploadList.push({ url: this.iviewFileUrl, ...file });
      } else {
        this.uploadList = list;
      }
      if (typeof this.$attrs.onSuccess === 'function') {
        this.$attrs.onSuccess(res, file, list, this.uploadList);
      }
    },
    handleRemove(file, list) {
      if (list) {
        this.uploadList = list;
      } else {
        let index = this.uploadList.findIndex(item => {
          return item.uid === file.uid
        });
        this.uploadList.splice(index, 1);
      }
    }

  }
}
</script>

<style>
.hc-form-upload.hc-upload-limit .el-upload.el-upload--picture-card,
.hc-form-upload.hc-upload-limit .hc-iv-upload {
  display: none !important;
}
.hc-form-upload.hc-upload-disabled .el-upload-list__item-delete {
  display: none !important;
}
.hc-form-upload.hc-upload-disabled .ivu-icon.ivu-icon-ios-eye-outline {
  display: inline-block !important;
}
.hc-form-upload .hc-iv-upload {
  width: 58px;
  height: 58px;
  line-height: 58px;
  background: #fff;
  border: 1px dashed #dcdee2;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s ease;
  display: inline-block;
}
.hc-form-upload .hc-form-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.hc-form-upload .hc-form-upload-list img {
  width: 100%;
  height: 100%;
}
.hc-form-upload .hc-form-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.hc-form-upload .hc-form-upload-list:hover .hc-form-upload-list-cover {
  display: block;
}
.hc-form-upload .hc-form-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

</style>
