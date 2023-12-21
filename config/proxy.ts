export default {
  // 流程平台,如果不需要流程平台，请删除该配置
  '/api-flow': {
    target: 'http://10.0.77.31:15424',
    changeOrigin: true,
  },
  // 用户权限中心相关配置
  '/userCenterMicro': {
    target: 'http://10.0.77.31:15351/userCenterMicro/',
    changeOrigin: true,
    pathRewrite: { '^/userCenterMicro': '' },
  },
  // 用户权限中心相关配置
  '/userCenterApi': {
    target: 'http://10.0.77.31:15351/',
    changeOrigin: true,
    pathRewrite: { '^/userCenterApi': '' },
  },
  // 工时系统的proxy,使用的时候请删除该配置
  '/szhz-ets-server-web': {
    target: 'http://10.0.77.30:15551',
    changeOrigin: true,
  },
};
