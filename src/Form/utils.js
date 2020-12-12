const componentMap = {
  el: {
    'auto-complete': 'el-input',
    transfers: 'el-transfer',
    dialog: 'el-dialog'
  },
  iv: {
    switch: 'i-switch',
    transfers: 'Transfer',
    dialog: 'Modal'
  }
}
export const libName = () => {
  return window.componentLib || 'element-ui'; 
};
export const C = (name) => {
  
  const ignoreNameArr = ['selects', 'checkboxs', 'radios', 'uploads', 'slider', 'transfer', 'div', 'span', 'i', 'multiItem', 'editors', 'map-address'];
  const componentLib = window.componentLib || 'element-ui';
  if (ignoreNameArr.includes(name) || name.slice(0,2) === 'c-') return name;
  switch (componentLib) {
    case 'element-ui':
      return (componentMap.el)[name] || `el-${name}`;
    case 'iview':
      return (componentMap.iv)[name] || name.replace(/(^|-)(\w)/g, (m, $1 ,$2 )=> $2.toUpperCase());
  }
};