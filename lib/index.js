
        import Button from './Button';
import Form from './Form';
import MyComponent from './MyComponent';
  
        const version = '1.0.0';
        function install(Vue) {
            const components = [
				// !skipInstall.includes(item)
				Button,
    Form,
    MyComponent
            ];
        
            components.forEach(item => {
                if (item.install) {
                    Vue.use(item);
                } else if (item.name) {
                    Vue.component(item.name, item);
                }
            });
        }
        
        if (typeof window !== 'undefined' && window.Vue) {
            install(window.Vue);
        }
        
        export {
            install,
            version,
            Button,
  Form,
  MyComponent
        };
        
        export default {
            install,
            version
        };
  