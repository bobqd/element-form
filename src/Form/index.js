import Form from './index.vue'

Form.install  =  function (Vue, componentLib) {
  window.componentLib = (componentLib || {}).lib || 'element-ui'
  Vue.component(Form.name, Form)
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  Form.install(window.Vue);
}

export default Form
