# npm 私服使用指南


### nrm 切换源工具
nrm(npm registry manager )是npm的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换

```js
// 安装 nrm: 
    npm i nrm -g 
// 查看所有的可用的源 
    nrm ls 
// 添加源 nrm add 源的名称  https:// 
    nrm add tiger http://192.172.9.139/
// 删除某个源 nrm del 源的名字
    nrm del test
// 切换到某个源 nrm use 源的名字
    nrm use tiger
// 测试源的速度 
    nrm test
```
