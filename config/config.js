import MBPageRoutes from './mbRouter.config';
const path = require('path');

export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      dll: true,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ]
      },
      title: {
        defaultTitle: '亚冠电竞',
      },
      hardSource: false,
    }],
  ],
  alias:{
    components:path.resolve(__dirname,'src/components'),
    utils:path.resolve(__dirname,'src/utils'),
    services:path.resolve(__dirname,'src/services'),
    models:path.resolve(__dirname,'src/models'),
    images:path.resolve(__dirname,'src/assets'),
    styles:path.resolve(__dirname,'src/styles')
  },
  // 路由配置
  routes:   MBPageRoutes,
  history: 'hash',
}
