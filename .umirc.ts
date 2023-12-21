import { defineConfig } from '@umijs/max';
import { chainWebpack } from './config/chainWebpack';

import routes from './config/router';
import proxy from './config/proxy';
import theme from './config/theme';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  antd: {},
  access: {},
  plugins: ['./src/plugins/auto-export-img', '@szhz/umi-plugin-dh-theme'],
  title: 'swagger-platform',
  hash: true,
  proxy,
  routes: routes,
  theme,
  extraBabelPlugins: [isProd ? 'transform-remove-console' : ''],
  chainWebpack,
  qiankun: {
    master: {},
  },
  autoImgExport: {
    dirPath: './src/assets/images',
    deep: true,
    reg: /\.(png|jpe?g|svg|gif)$/,
  },
  npmClient: 'pnpm',
});
