<template>
  <div id="wangeditor" class="hc-wang-editor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>

<script>
import E from 'wangeditor';
export default {
  name: 'editors',
  props: {
    value: {},
    customConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    editorContent(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.editorContent = val || '';
      if(this.isEdit) {
        this.isEdit = false;
      } else {
        this.editor.txt.html(val || '');
      }
    },
    disabled(val) {
      this.editor.$textElem.attr('contenteditable', !val)
    }
  },
  data() {
    return {
      isEdit: false,
      editor: null,
      editorContent: this.value
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    this.editor.customConfig.onchange = html => {
      if(html === '<p><br></p>') {
        this.editorContent = '';
      } else {
        this.isEdit = true;
        this.editorContent = html;
      }
    };
    this.editor.customConfig.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'foreColor',
      'backColor',
      'link',
      'justify',
      'image'
    ];
    this.editor.customConfig = {
      ...this.editor.customConfig,
      ...this.customConfig
    };
    this.editor.create(); // 创建富文本实例
    this.editor.txt.html(this.editorContent);
    this.editor.$textElem.attr('contenteditable', !this.disabled)
  }
}
</script>

<style>
.hc-wang-editor {
  text-align:left !important;
  h1{ font-size:2em !important; margin: .67em 0 !important}
  h2{ font-size:1.5em !important; margin: .75em 0 !important}
  h3{ font-size:1.17em !important; margin: .83em 0 !important}
  h4, p,blockquote, ul,fieldset, form,ol, dl, dir,menu { margin: 1.12em 0 !important}
  h5 { font-size:.83em !important; margin: 1.5em 0 !important}
  h6{ font-size:.75em !important; margin: 1.67em 0 !important}
  b,strong  { font-weight: bolder !important}
}
</style>
