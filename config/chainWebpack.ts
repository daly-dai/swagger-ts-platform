import CompressionPlugin from 'compression-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

export function chainWebpack(config: any) {
  config.merge({
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 1000,
        minChunks: 2,
        automaticNameDelimiter: '.',
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test({ resource }: any) {
              return /[\\/]node_modules[\\/]/.test(resource);
            },
            priority: 10,
          },
        },
      },
    },
  });

  if (isProd) {
    // Gzip压缩
    config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
      {
        test: /\.(js|css|html)$/i, // 匹配
        threshold: 10240, // 超过10k的文件压缩
        deleteOriginalAssets: false, // 不删除源文件
      },
    ]);
  }
}
